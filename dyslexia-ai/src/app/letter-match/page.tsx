'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, StyleSheet, Pressable, ScrollView } from '../../rn/primitives';
import { LinearGradient } from '../../rn/LinearGradient';
import StatusBarRow from '../../components/StatusBarRow';
import AppIcon from '../../components/AppIcon';
import { colors, fonts, shadows } from '../../theme';
import { useChild } from '../../hooks/useChild';
import { api } from '../../lib/api';

const POOL = [
  { word: 'МУУР', emoji: '🐱' },
  { word: 'НОХОЙ', emoji: '🐶' },
  { word: 'ЗАГАС', emoji: '🐟' },
  { word: 'ШУВУУ', emoji: '🐦' },
  { word: 'МОРЬ', emoji: '🐴' },
  { word: 'АЛИМ', emoji: '🍎' },
  { word: 'НАР', emoji: '☀️' },
  { word: 'МОД', emoji: '🌳' },
  { word: 'ЦЭЦЭГ', emoji: '🌸' },
  { word: 'НОМ', emoji: '📖' },
  { word: 'ГЭР', emoji: '🏠' },
  { word: 'БӨМБӨГ', emoji: '⚽' },
];

const LETTERS = ['М', 'Н', 'А', 'Б', 'Г', 'Д', 'З', 'Ц', 'Ш', 'Т', 'О', 'Х', 'С', 'Р'];
const REWARD = { coins: 8, exp: 12 };

type Q = { emoji: string; answer: string; options: string[] };
const shuffle = <T,>(a: T[]): T[] => [...a].sort(() => Math.random() - 0.5);

function build(): Q {
  const p = POOL[Math.floor(Math.random() * POOL.length)];
  const answer = [...p.word][0];
  const distractors = shuffle(LETTERS.filter((l) => l !== answer)).slice(0, 2);
  return { emoji: p.emoji, answer, options: shuffle([answer, ...distractors]) };
}

export default function LetterMatchScreen() {
  const router = useRouter();
  const { child, refresh } = useChild();
  const [q, setQ] = useState<Q | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [solved, setSolved] = useState(0);
  const awardedRef = useRef(false);

  const newQuestion = useCallback(() => {
    setQ(build());
    setPicked(null);
    awardedRef.current = false;
  }, []);

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
      setTimeout(newQuestion, 1100);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBarRow />
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <AppIcon name="arrowBack" size={20} color={colors.warm.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Үсэг тааруулах</Text>
        <View style={styles.scoreChip}>
          <AppIcon name="star" size={14} color="#F5B945" />
          <Text style={styles.scoreText}>{solved}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#EDE8F5', '#E8E3F5']} style={styles.qCard}>
          <Text style={styles.qEmoji}>{q?.emoji ?? '❓'}</Text>
          <Text style={styles.qLabel}>Энэ үг ямар үсгээр эхэлж байна вэ?</Text>
        </LinearGradient>

        {picked && q && (
          <Text style={picked === q.answer ? styles.fbOk : styles.fbBad}>
            {picked === q.answer ? `🎉 Зөв! +${REWARD.exp} EXP` : 'Дахин оролдоорой 💪'}
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
  qCard: { borderRadius: 24, paddingVertical: 32, alignItems: 'center', gap: 10, ...shadows.lavender },
  qEmoji: { fontSize: 88 },
  qLabel: { fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.lavender.darker, textAlign: 'center' },
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
