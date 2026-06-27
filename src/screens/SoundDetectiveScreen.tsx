import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StatusBarRow from '../components/StatusBarRow';
import AppIcon from '../components/AppIcon';
import { colors, fonts, shadows } from '../theme';
import { useChild } from '../hooks/useChild';
import { api } from '../lib/api';
import { playTts } from '../lib/tts';

const POOL = ['МУУР', 'НОХОЙ', 'ЗАГАС', 'ШУВУУ', 'МОРЬ', 'АЛИМ', 'НАР', 'МОД', 'ЦЭЦЭГ', 'НОМ', 'ГЭР', 'СУМ', 'ТОМ', 'ХОТ'];
const LETTERS = ['М', 'Н', 'А', 'Б', 'Г', 'Д', 'З', 'Ц', 'Ш', 'Т', 'О', 'Х', 'С', 'Р'];
const REWARD = { coins: 8, exp: 12 };

type Q = { word: string; answer: string; options: string[] };
const shuffle = <T,>(a: T[]): T[] => [...a].sort(() => Math.random() - 0.5);

function build(): Q {
  const word = POOL[Math.floor(Math.random() * POOL.length)];
  const answer = [...word][0];
  const distractors = shuffle(LETTERS.filter((l) => l !== answer)).slice(0, 2);
  return { word, answer, options: shuffle([answer, ...distractors]) };
}

export default function SoundDetectiveScreen({ navigation }: { navigation: any }) {
  const { child, refresh } = useChild();
  const [q, setQ] = useState<Q | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [solved, setSolved] = useState(0);
  const [busy, setBusy] = useState(false);
  const awardedRef = useRef(false);

  const speak = useCallback(async (text: string) => {
    setBusy(true);
    try {
      await playTts(text);
    } catch {
      // дуу гаргаж чадсангүй — чимээгүй
    } finally {
      setBusy(false);
    }
  }, []);

  const newQuestion = useCallback(() => {
    const next = build();
    setQ(next);
    setPicked(null);
    awardedRef.current = false;
    speak(next.word);
  }, [speak]);

  useEffect(() => {
    newQuestion();
  }, [newQuestion]);

  const choose = (opt: string) => {
    if (!q || picked) return;
    setPicked(opt);
    if (opt === q.answer) {
      setSolved((s) => s + 1);
      if (!awardedRef.current && child?.clerkId) {
        awardedRef.current = true;
        api.reward(child.clerkId, REWARD).then(refresh).catch(() => {});
      }
      setTimeout(newQuestion, 1300);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBarRow />
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <AppIcon name="arrowBack" size={20} color={colors.warm.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Авианы мөрдөгч</Text>
        <View style={styles.scoreChip}>
          <AppIcon name="star" size={14} color="#F5B945" />
          <Text style={styles.scoreText}>{solved}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#D8E6EC', '#E8E3F5']} style={styles.qCard}>
          <Text style={styles.qEmoji}>🕵️</Text>
          <Text style={styles.qLabel}>Сонсоод эхний үсгийг сонго</Text>
          <Pressable style={[styles.listenBtn, busy && { opacity: 0.6 }]} onPress={() => q && speak(q.word)} disabled={busy}>
            <AppIcon name="volume" size={20} color="#fff" />
            <Text style={styles.listenText}>{busy ? 'Сонсож байна…' : 'Дахин сонсох'}</Text>
          </Pressable>
        </LinearGradient>

        {picked && q && (
          <Text style={picked === q.answer ? styles.fbOk : styles.fbBad}>
            {picked === q.answer ? `🎉 «${q.word}» — Зөв! +${REWARD.exp} EXP` : 'Дахин сонсоод оролдоорой 💪'}
          </Text>
        )}

        <View style={styles.options}>
          {q?.options.map((opt) => {
            const isPicked = picked === opt;
            const isAnswer = opt === q.answer;
            return (
              <Pressable
                key={opt}
                style={[styles.letter, isPicked && isAnswer && styles.letterOk, isPicked && !isAnswer && styles.letterBad]}
                onPress={() => choose(opt)}
                disabled={!!picked}
              >
                <Text style={styles.letterText}>{opt}</Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable style={styles.nextBtn} onPress={newQuestion}>
          <Text style={styles.nextText}>Дараах →</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.warm.beige },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 6 },
  iconBtn: { width: 40, height: 40, borderRadius: 16, backgroundColor: colors.warm.card, alignItems: 'center', justifyContent: 'center', ...shadows.card },
  headerTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 18, color: colors.warm.text },
  scoreChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.warm.card, paddingHorizontal: 12, height: 40, borderRadius: 16, justifyContent: 'center', ...shadows.card },
  scoreText: { fontFamily: fonts.fredoka.bold, fontSize: 15, color: colors.warm.text },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40, gap: 20 },
  qCard: { borderRadius: 24, paddingVertical: 28, alignItems: 'center', gap: 12, ...shadows.lavender },
  qEmoji: { fontSize: 64 },
  qLabel: { fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.slate.dark, textAlign: 'center' },
  listenBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.slate.mid, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 20, ...shadows.card },
  listenText: { fontFamily: fonts.fredoka.semibold, fontSize: 15, color: '#fff' },
  fbOk: { textAlign: 'center', fontFamily: fonts.fredoka.bold, fontSize: 18, color: colors.sage.text },
  fbBad: { textAlign: 'center', fontFamily: fonts.fredoka.semibold, fontSize: 15, color: '#B23A2E' },
  options: { flexDirection: 'row', justifyContent: 'center', gap: 14 },
  letter: { width: 84, height: 96, borderRadius: 20, backgroundColor: colors.warm.card, borderWidth: 2, borderColor: '#EDE3D5', alignItems: 'center', justifyContent: 'center', ...shadows.card },
  letterOk: { backgroundColor: colors.sage.light, borderColor: colors.sage.mid },
  letterBad: { backgroundColor: '#F4C7C0', borderColor: '#D88B7E' },
  letterText: { fontFamily: fonts.fredoka.bold, fontSize: 44, color: colors.warm.text },
  nextBtn: { backgroundColor: colors.lavender.dark, borderRadius: 20, paddingVertical: 14, alignItems: 'center', ...shadows.lavender },
  nextText: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: '#fff' },
});
