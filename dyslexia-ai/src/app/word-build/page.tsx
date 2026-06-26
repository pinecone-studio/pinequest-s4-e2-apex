'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator } from '../../rn/primitives';
import { LinearGradient } from '../../rn/LinearGradient';
import StatusBarRow from '../../components/StatusBarRow';
import AppIcon from '../../components/AppIcon';
import { colors, fonts, shadows } from '../../theme';
import { useChild } from '../../hooks/useChild';
import { api } from '../../lib/api';

type WordItem = { word: string; emoji: string };

// AI татаж чадаагүй үед ашиглах нөөц жагсаалт.
const FALLBACK_WORDS: WordItem[] = [
  { word: 'МУУР', emoji: '🐱' },
  { word: 'НОХОЙ', emoji: '🐶' },
  { word: 'НАР', emoji: '☀️' },
  { word: 'МОД', emoji: '🌳' },
  { word: 'АЛИМ', emoji: '🍎' },
  { word: 'ЗАГАС', emoji: '🐟' },
  { word: 'ШУВУУ', emoji: '🐦' },
  { word: 'НОМ', emoji: '📖' },
];

type Tile = { id: number; char: string; used: boolean };

const REWARD = { coins: 10, exp: 15 };

function scramble(word: string): Tile[] {
  const chars = [...word];
  let order = chars.map((c, i) => ({ id: i, char: c, used: false }));
  // Эх үгтэй адил болохгүй болтол холино.
  for (let attempt = 0; attempt < 20; attempt++) {
    order = [...order].sort(() => Math.random() - 0.5);
    if (order.map((t) => t.char).join('') !== word) break;
  }
  return order;
}

export default function WordBuildScreen() {
  const router = useRouter();
  const { child, refresh } = useChild();

  const [words, setWords] = useState<WordItem[]>(FALLBACK_WORDS);
  const [wordsLoaded, setWordsLoaded] = useState(false);
  const [idx, setIdx] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [slots, setSlots] = useState<number[]>([]); // байрлуулсан tile id-ууд
  const [status, setStatus] = useState<'playing' | 'correct' | 'wrong'>('playing');
  const [solved, setSolved] = useState(0);
  const [ttsBusy, setTtsBusy] = useState(false);

  const current = words[idx];
  const awardedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fetchedRef = useRef(false);

  // Тоглоомын үгсийг AI-аар (дислекси түвшинд тааруулж) нэг удаа татна.
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    let active = true;
    fetch('/api/word-list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        weakSkills: child?.dyslexiaWeakSkills ?? [],
        risk: child?.dyslexiaRisk ?? 'low',
      }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (active && Array.isArray(d.words) && d.words.length >= 4) setWords(d.words);
      })
      .catch(() => {})
      .finally(() => {
        if (active) {
          setIdx(0);
          setWordsLoaded(true);
        }
      });
    return () => {
      active = false;
    };
  }, [child?.dyslexiaWeakSkills, child?.dyslexiaRisk]);

  // Chimege-ээр угсрах үгийг чанга хэлнэ.
  const speakWord = useCallback(async (text: string) => {
    setTtsBusy(true);
    try {
      audioRef.current?.pause();
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.toLowerCase() }),
      });
      if (!res.ok) throw new Error('tts');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        setTtsBusy(false);
        URL.revokeObjectURL(url);
      };
      audio.onerror = () => setTtsBusy(false);
      await audio.play();
    } catch {
      setTtsBusy(false); // autoplay хориглосон бол «Сонсох»-оор сонсоно
    }
  }, []);

  const setup = useCallback(
    (i: number) => {
      setTiles(scramble(words[i].word));
      setSlots([]);
      setStatus('playing');
      awardedRef.current = false;
    },
    [words]
  );

  useEffect(() => {
    setup(idx);
  }, [idx, setup]);

  // Шинэ үг гарах бүрд (үгс ачаалагдсаны дараа) автоматаар чанга хэлнэ.
  useEffect(() => {
    if (!wordsLoaded) return;
    speakWord(words[idx].word);
  }, [idx, words, wordsLoaded, speakWord]);

  const built = slots.map((id) => tiles.find((t) => t.id === id)?.char ?? '').join('');

  // Үсэг бүрэн орсон үед шалгана.
  useEffect(() => {
    if (status !== 'playing' || slots.length === 0) return;
    if (slots.length !== current.word.length) return;

    if (built === current.word) {
      setStatus('correct');
      setSolved((s) => s + 1);
      if (!awardedRef.current && child?.clerkId) {
        awardedRef.current = true;
        api.reward(child.clerkId, REWARD).then(refresh).catch(() => {});
      }
      const t = setTimeout(() => setIdx((p) => (p + 1) % words.length), 1400);
      return () => clearTimeout(t);
    }
    setStatus('wrong');
  }, [slots, built, status, current.word, child?.clerkId, refresh]);

  const tapTile = (tile: Tile) => {
    if (status === 'correct' || tile.used) return;
    setTiles((prev) => prev.map((t) => (t.id === tile.id ? { ...t, used: true } : t)));
    setSlots((prev) => [...prev, tile.id]);
    if (status === 'wrong') setStatus('playing');
  };

  const backspace = () => {
    if (status === 'correct' || slots.length === 0) return;
    const lastId = slots[slots.length - 1];
    setSlots((prev) => prev.slice(0, -1));
    setTiles((prev) => prev.map((t) => (t.id === lastId ? { ...t, used: false } : t)));
    setStatus('playing');
  };

  const clear = () => {
    if (status === 'correct') return;
    setSlots([]);
    setTiles((prev) => prev.map((t) => ({ ...t, used: false })));
    setStatus('playing');
  };

  const next = () => setIdx((p) => (p + 1) % words.length);

  const slotChars = [...current.word].map((_, i) => (slots[i] !== undefined ? tiles.find((t) => t.id === slots[i])?.char ?? '' : ''));

  if (!wordsLoaded) {
    return (
      <View style={styles.root}>
        <StatusBarRow />
        <View style={styles.header}>
          <Pressable style={styles.iconBtn} onPress={() => router.back()}>
            <AppIcon name="arrowBack" size={20} color={colors.warm.text} />
          </Pressable>
          <Text style={styles.headerTitle}>Үсгийг зөв байрлуулах</Text>
          <View style={{ width: 40 }} />
        </View>
        <View style={styles.loading}>
          <ActivityIndicator color={colors.peach.dark} size={32} />
          <Text style={styles.loadingText}>Үг бэлдэж байна…</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBarRow />

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <AppIcon name="arrowBack" size={20} color={colors.warm.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Үсгийг зөв байрлуулах</Text>
        <View style={styles.scoreChip}>
          <AppIcon name="star" size={14} color="#F5B945" />
          <Text style={styles.scoreText}>{solved}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Hint */}
        <LinearGradient colors={['#F5DDD5', '#F0E8D8']} style={styles.hint}>
          <Text style={styles.hintEmoji}>{current.emoji}</Text>
          <Text style={styles.hintLabel}>Сонсоод үгийг угсар</Text>
        </LinearGradient>

        {/* Сонсох — Chimege уг үгийг хэлнэ */}
        <Pressable
          style={[styles.listenBtn, ttsBusy && { opacity: 0.6 }]}
          onPress={() => speakWord(current.word)}
          disabled={ttsBusy}
        >
          <AppIcon name="volume" size={20} color="#fff" />
          <Text style={styles.listenText}>{ttsBusy ? 'Уншиж байна…' : 'Дахин сонсох'}</Text>
        </Pressable>

        {/* Answer slots */}
        <View style={styles.slots}>
          {slotChars.map((ch, i) => (
            <View
              key={i}
              style={[
                styles.slot,
                ch ? styles.slotFilled : null,
                status === 'correct' ? styles.slotCorrect : null,
                status === 'wrong' && ch ? styles.slotWrong : null,
              ]}
            >
              <Text style={styles.slotChar}>{ch}</Text>
            </View>
          ))}
        </View>

        {/* Feedback */}
        {status === 'correct' && <Text style={styles.feedbackOk}>🎉 Зөв! +{REWARD.exp} EXP</Text>}
        {status === 'wrong' && <Text style={styles.feedbackBad}>Дахин оролдоорой 💪</Text>}
        {status === 'playing' && <Text style={styles.feedbackHint}>Үсгүүдийг дарж үгийг угсар</Text>}

        {/* Letter tiles */}
        <View style={styles.tiles}>
          {tiles.map((tile) => (
            <Pressable
              key={tile.id}
              style={[styles.tile, tile.used && styles.tileUsed]}
              onPress={() => tapTile(tile)}
              disabled={tile.used || status === 'correct'}
            >
              <Text style={styles.tileChar}>{tile.char}</Text>
            </Pressable>
          ))}
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          <Pressable style={[styles.ctrlBtn, { backgroundColor: colors.warm.card }]} onPress={backspace}>
            <AppIcon name="arrowBack" size={18} color={colors.warm.text} />
            <Text style={styles.ctrlText}>Устгах</Text>
          </Pressable>
          <Pressable style={[styles.ctrlBtn, { backgroundColor: colors.warm.card }]} onPress={clear}>
            <AppIcon name="repeat" size={18} color={colors.warm.text} />
            <Text style={styles.ctrlText}>Арилгах</Text>
          </Pressable>
          <Pressable style={[styles.ctrlBtn, { backgroundColor: colors.lavender.dark }]} onPress={next}>
            <Text style={[styles.ctrlText, { color: '#fff' }]}>Дараах →</Text>
          </Pressable>
        </View>
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
  headerTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: colors.warm.text, textAlign: 'center' },
  scoreChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.warm.card,
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 16,
    justifyContent: 'center',
    ...shadows.card,
  },
  scoreText: { fontFamily: fonts.fredoka.bold, fontSize: 15, color: colors.warm.text },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  loadingText: { fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.warm.gray },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40, gap: 20 },
  hint: { borderRadius: 24, paddingVertical: 28, alignItems: 'center', gap: 8, ...shadows.peach },
  hintEmoji: { fontSize: 72 },
  hintLabel: { fontFamily: fonts.lexend.regular, fontSize: 14, color: '#8A7060' },
  listenBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    alignSelf: 'center',
    backgroundColor: colors.slate.mid,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    ...shadows.card,
  },
  listenText: { fontFamily: fonts.fredoka.semibold, fontSize: 15, color: '#fff' },
  slots: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  slot: {
    width: 48,
    height: 56,
    borderRadius: 14,
    backgroundColor: colors.warm.card,
    borderWidth: 2,
    borderColor: '#E6DACB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotFilled: { borderColor: colors.lavender.mid },
  slotCorrect: { backgroundColor: colors.sage.light, borderColor: colors.sage.mid },
  slotWrong: { backgroundColor: '#F4C7C0', borderColor: '#D88B7E' },
  slotChar: { fontFamily: fonts.fredoka.bold, fontSize: 26, color: colors.warm.text },
  feedbackOk: { textAlign: 'center', fontFamily: fonts.fredoka.bold, fontSize: 18, color: colors.sage.text },
  feedbackBad: { textAlign: 'center', fontFamily: fonts.fredoka.semibold, fontSize: 15, color: '#B23A2E' },
  feedbackHint: { textAlign: 'center', fontFamily: fonts.lexend.regular, fontSize: 13, color: colors.warm.gray },
  tiles: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
  tile: {
    width: 54,
    height: 60,
    borderRadius: 16,
    backgroundColor: colors.lavender.light,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.cardSm,
  },
  tileUsed: { opacity: 0.3 },
  tileChar: { fontFamily: fonts.fredoka.bold, fontSize: 28, color: colors.lavender.darker },
  controls: { flexDirection: 'row', gap: 10, marginTop: 4 },
  ctrlBtn: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    ...shadows.cardSm,
  },
  ctrlText: { fontFamily: fonts.fredoka.semibold, fontSize: 14, color: colors.warm.text },
});
