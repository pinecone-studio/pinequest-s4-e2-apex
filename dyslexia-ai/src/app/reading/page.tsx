'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator, Slider } from '../../rn/primitives';
import { LinearGradient } from '../../rn/LinearGradient';
import StatusBarRow from '../../components/StatusBarRow';
import AppIcon from '../../components/AppIcon';
import { colors, fonts, shadows } from '../../theme';
import { useChild } from '../../hooks/useChild';
import { api } from '../../lib/api';
import { MicRecorder } from '../../lib/audio';
import { diffReading, type DiffResult } from '../../lib/wordDiff';

type Task = { text: string; generated: boolean };

export default function ReadingScreen() {
  const router = useRouter();
  const { child, loading, refresh } = useChild();

  const [task, setTask] = useState<Task | null>(null);
  const [loadingTask, setLoadingTask] = useState(true);
  const [ttsBusy, setTtsBusy] = useState(false);
  const [recording, setRecording] = useState(false);
  const [sttBusy, setSttBusy] = useState(false);
  const [result, setResult] = useState<DiffResult | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [speed, setSpeed] = useState(1); // TTS унших хурд (×)

  const recorderRef = useRef<MicRecorder | null>(null);
  const startedRef = useRef(false);

  const loadTask = useCallback(async () => {
    setLoadingTask(true);
    setResult(null);
    setErr(null);
    try {
      const res = await fetch('/api/reading-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          weakSkills: child?.dyslexiaWeakSkills ?? [],
          risk: child?.dyslexiaRisk ?? 'low',
        }),
      });
      const data = await res.json();
      setTask({ text: data.text, generated: !!data.generated });
    } catch {
      setErr('Даалгавар үүсгэхэд алдаа гарлаа');
      setTask({ text: 'Бяцхан зулзага наранд тоглож байна.', generated: false });
    } finally {
      setLoadingTask(false);
    }
  }, [child?.dyslexiaWeakSkills, child?.dyslexiaRisk]);

  // Эхний даалгаврыг child дата бэлэн болсны дараа НЭГ удаа ачаална.
  // (Дараа нь зөвхөн «Дараах» товчоор шинэ даалгавар авна — өөрөө сольдоггүй.)
  useEffect(() => {
    if (loading || startedRef.current) return;
    startedRef.current = true;
    loadTask();
  }, [loading, loadTask]);

  // "Сонсох" — Chimege TTS уншуулна.
  const onListen = async () => {
    if (!task || ttsBusy) return;
    setTtsBusy(true);
    setErr(null);
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: task.text }),
      });
      if (!res.ok) throw new Error('tts');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audio.playbackRate = speed; // унших хурд
      audio.onended = () => {
        setTtsBusy(false);
        URL.revokeObjectURL(url);
      };
      audio.onerror = () => setTtsBusy(false);
      await audio.play();
    } catch {
      setErr('Дуу гаргахад алдаа гарлаа');
      setTtsBusy(false);
    }
  };

  // "Унших" — микрофон асаах/унтраах. Зогсооход STT → үг харьцуулна.
  const onMic = async () => {
    if (!task || sttBusy) return;

    if (recording) {
      setRecording(false);
      setSttBusy(true);
      try {
        const blob = await recorderRef.current!.stop();
        recorderRef.current = null;
        const res = await fetch('/api/stt', {
          method: 'POST',
          headers: { 'Content-Type': 'audio/wav' },
          body: blob,
        });
        if (!res.ok) throw new Error('stt');
        const { transcript } = await res.json();
        const diff = diffReading(task.text, transcript || '');
        setResult(diff);
        // Эцэг эхийн самбарт тусгахаар уншлагын session-ийг бүртгэнэ.
        if (child?.clerkId && diff.total > 0) {
          api
            .recordReadingSession(child.clerkId, {
              accuracy: Math.round((diff.correct / diff.total) * 100),
              durationMin: 1,
              wordsRead: diff.total,
            })
            .then(() => refresh())
            .catch(() => {});
        }
      } catch {
        setErr('Дуу хоолой танихад алдаа гарлаа');
      } finally {
        setSttBusy(false);
      }
      return;
    }

    // эхлүүлэх
    setErr(null);
    setResult(null);
    try {
      const rec = new MicRecorder();
      await rec.start();
      recorderRef.current = rec;
      setRecording(true);
    } catch {
      setErr('Микрофон нээх боломжгүй байна');
    }
  };

  const words = result ? result.words : task ? task.text.split(/\s+/).map((w) => ({ word: w, ok: true })) : [];

  return (
    <View style={styles.root}>
      <StatusBarRow />

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <AppIcon name="arrowBack" size={20} color={colors.warm.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Унших хичээл</Text>
        <Pressable style={[styles.iconBtn, { backgroundColor: colors.lavender.light }]} onPress={loadTask}>
          <AppIcon name="repeat" size={18} color={colors.lavender.dark} />
        </Pressable>
      </View>
      <Text style={styles.subtitle}>
        {task?.generated ? 'AI-аар таньд тохируулсан даалгавар' : 'Унших дасгал'}
      </Text>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Passage card */}
        <LinearGradient colors={['#F5EAD8', '#EDD8C6']} style={styles.card}>
          {loadingTask ? (
            <ActivityIndicator color={colors.peach.dark} />
          ) : (
            <View style={styles.sentenceRow}>
              {words.map((w, i) => (
                <Text key={i} style={[styles.word, result && !w.ok && styles.wordWrong, result && w.ok && styles.wordOk]}>
                  {w.word}
                </Text>
              ))}
            </View>
          )}
        </LinearGradient>

        {err && <Text style={styles.error}>{err}</Text>}

        {/* Controls */}
        <View style={styles.actions}>
          <Pressable
            style={[styles.actionBtn, { backgroundColor: colors.slate.mid }, ttsBusy && { opacity: 0.6 }]}
            onPress={onListen}
            disabled={ttsBusy || loadingTask}
          >
            <AppIcon name="volume" size={18} color="#fff" />
            <Text style={styles.actionText}>{ttsBusy ? 'Уншиж байна…' : 'Сонсох'}</Text>
          </Pressable>

          <Pressable
            style={[styles.actionBtn, { backgroundColor: recording ? '#C4463A' : colors.peach.dark }, sttBusy && { opacity: 0.6 }]}
            onPress={onMic}
            disabled={sttBusy || loadingTask}
          >
            <AppIcon name="mic" size={18} color="#fff" />
            <Text style={styles.actionText}>{recording ? 'Зогсоох' : sttBusy ? 'Шалгаж байна…' : 'Унших'}</Text>
          </Pressable>
        </View>

        {/* Унших хурд */}
        <View style={styles.speedRow}>
          <AppIcon name="volume" size={16} color={colors.slate.dark} />
          <Text style={styles.speedLabel}>Хурд</Text>
          <Slider
            style={{ flex: 1 }}
            minimumValue={0.5}
            maximumValue={1.5}
            step={0.1}
            value={speed}
            onValueChange={setSpeed}
            minimumTrackTintColor={colors.slate.DEFAULT}
            maximumTrackTintColor="#E0D8CC"
            thumbTintColor={colors.slate.mid}
          />
          <Text style={styles.speedVal}>{speed.toFixed(1)}×</Text>
        </View>

        <Text style={styles.hint}>
          {recording
            ? '🎤 Чанга уншаад дуусахдаа «Зогсоох» дар'
            : 'Эхлээд «Сонсох» дараад, дараа нь «Унших» дарж чанга унш'}
        </Text>

        {/* Result */}
        {result && (
          <View style={styles.result}>
            <View style={styles.resultHead}>
              <AppIcon name="star" size={20} color="#F5B945" />
              <Text style={styles.resultTitle}>
                {result.total} үгнээс {result.correct} зөв
              </Text>
            </View>

            {result.wrong > 0 ? (
              <>
                <Text style={styles.resultSub}>{result.wrong} үг алдсан байна:</Text>
                <View style={styles.wrongChips}>
                  {result.wrongWords.map((w, i) => (
                    <View key={i} style={styles.wrongChip}>
                      <Text style={styles.wrongChipText}>{w}</Text>
                    </View>
                  ))}
                </View>
              </>
            ) : (
              <Text style={styles.resultPerfect}>🎉 Бүх үгийг зөв уншлаа!</Text>
            )}

            {result.heard ? (
              <Text style={styles.heard}>Таны уншсан: «{result.heard}»</Text>
            ) : (
              <Text style={styles.heard}>Дуу хоолой танигдсангүй — дахин оролдоно уу.</Text>
            )}
          </View>
        )}

        {/* Дараагийн даалгавар руу зөвхөн дарахад шилжинэ */}
        <Pressable
          style={[styles.nextBtn, (loadingTask || recording || sttBusy) && { opacity: 0.5 }]}
          onPress={loadTask}
          disabled={loadingTask || recording || sttBusy}
        >
          <Text style={styles.nextBtnText}>Дараах даалгавар →</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.warm.beige },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 6,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: colors.warm.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  headerTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 18, color: colors.warm.text },
  subtitle: {
    fontFamily: fonts.lexend.regular,
    fontSize: 12,
    color: colors.warm.gray,
    textAlign: 'center',
    marginTop: 6,
  },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 40, gap: 16 },
  card: {
    borderRadius: 24,
    padding: 24,
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentenceRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' },
  word: {
    fontFamily: fonts.lexend.medium,
    fontSize: 26,
    color: colors.warm.text,
    marginRight: 8,
    marginBottom: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    letterSpacing: 1,
  },
  wordOk: { color: colors.sage.dark },
  wordWrong: { backgroundColor: '#F4C7C0', color: '#B23A2E' },
  error: { fontFamily: fonts.lexend.regular, fontSize: 13, color: '#B23A2E', textAlign: 'center' },
  actions: { flexDirection: 'row', gap: 12 },
  actionBtn: {
    flex: 1,
    borderRadius: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...shadows.card,
  },
  actionText: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: '#fff' },
  speedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.warm.card,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    ...shadows.cardSm,
  },
  speedLabel: { fontFamily: fonts.lexend.semibold, fontSize: 12, color: colors.warm.gray },
  speedVal: { fontFamily: fonts.fredoka.semibold, fontSize: 13, color: colors.slate.dark, width: 40, textAlign: 'right' },
  hint: { textAlign: 'center', fontFamily: fonts.lexend.regular, fontSize: 12, color: colors.warm.gray },
  result: {
    backgroundColor: colors.warm.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.sage.light,
    ...shadows.card,
  },
  resultHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  resultTitle: { fontFamily: fonts.fredoka.bold, fontSize: 20, color: colors.warm.text },
  resultSub: { fontFamily: fonts.lexend.semibold, fontSize: 13, color: colors.peach.darker, marginTop: 12 },
  wrongChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  wrongChip: { backgroundColor: '#F4C7C0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14 },
  wrongChipText: { fontFamily: fonts.lexend.semibold, fontSize: 14, color: '#B23A2E' },
  resultPerfect: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: colors.sage.text, marginTop: 12 },
  heard: { fontFamily: fonts.lexend.regular, fontSize: 13, color: colors.warm.gray, marginTop: 14, fontStyle: 'italic' },
  nextBtn: {
    backgroundColor: colors.lavender.dark,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
    ...shadows.lavender,
  },
  nextBtnText: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: '#fff' },
});
