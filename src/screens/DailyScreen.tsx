import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StatusBarRow from '../components/StatusBarRow';
import { colors, fonts, shadows } from '../theme';
import { useChild } from '../hooks/useChild';
import { api } from '../lib/api';

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

const REWARD = { coins: 30, exp: 50 };
const QUESTION_COUNT = 3;

type Question = { emoji: string; answer: string; options: string[] };

const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

// Энэ session-д өнөөдрийн сорил аваагдсан эсэх (RN-д localStorage байхгүй тул санах ойд).
const claimedDays = new Set<string>();
const todayKey = () => new Date().toISOString().slice(0, 10);

function buildQuestions(): Question[] {
  const picks = shuffle(POOL).slice(0, QUESTION_COUNT);
  return picks.map((p) => {
    const distractors = shuffle(POOL.filter((x) => x.word !== p.word)).slice(0, 2).map((x) => x.word);
    return { emoji: p.emoji, answer: p.word, options: shuffle([p.word, ...distractors]) };
  });
}

export default function DailyScreen({ navigation }: { navigation: any }) {
  const { child, refresh } = useChild();
  const [phase, setPhase] = useState<'already' | 'playing' | 'finished'>(
    claimedDays.has(todayKey()) ? 'already' : 'playing'
  );
  const [questions] = useState<Question[]>(() => buildQuestions());
  const [qIndex, setQIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const claimedRef = useRef(false);

  const current = questions[qIndex];

  const claimReward = () => {
    if (claimedRef.current) return;
    claimedRef.current = true;
    claimedDays.add(todayKey());
    if (child?.clerkId) api.reward(child.clerkId, REWARD).then(refresh).catch(() => {});
  };

  const choose = (opt: string) => {
    if (picked) return;
    setPicked(opt);
    const correct = opt === current.answer;
    setTimeout(() => {
      if (!correct) {
        setPicked(null);
        return;
      }
      if (qIndex < questions.length - 1) {
        setQIndex((i) => i + 1);
        setPicked(null);
      } else {
        claimReward();
        setPhase('finished');
      }
    }, 700);
  };

  return (
    <View style={styles.root}>
      <StatusBarRow />
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.back}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Өдрийн сорил</Text>
        {phase === 'playing' ? (
          <View style={styles.scoreChip}>
            <Text style={styles.scoreText}>{qIndex + 1}/{questions.length}</Text>
          </View>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {phase === 'playing' && current && (
          <>
            <LinearGradient colors={['#F0E4D4', '#F5DDD5']} style={styles.qCard}>
              <Text style={styles.qEmoji}>{current.emoji}</Text>
              <Text style={styles.qLabel}>Энэ юу вэ? Зөв үгийг сонго</Text>
            </LinearGradient>
            <View style={styles.options}>
              {current.options.map((opt) => {
                const isPicked = picked === opt;
                const isAnswer = opt === current.answer;
                return (
                  <Pressable
                    key={opt}
                    style={[styles.option, isPicked && isAnswer && styles.optionCorrect, isPicked && !isAnswer && styles.optionWrong]}
                    onPress={() => choose(opt)}
                    disabled={!!picked}
                  >
                    <Text style={styles.optionText}>{opt}</Text>
                  </Pressable>
                );
              })}
            </View>
          </>
        )}

        {phase === 'finished' && (
          <View style={styles.resultCard}>
            <Text style={styles.resultEmoji}>🎉</Text>
            <Text style={styles.resultTitle}>Сорил амжилттай!</Text>
            <View style={styles.rewardChips}>
              <View style={styles.chipPeach}><Text style={styles.chipPeachText}>+{REWARD.exp} EXP</Text></View>
              <View style={styles.chipSand}><Text style={styles.chipSandText}>+{REWARD.coins} 🪙</Text></View>
            </View>
            <Text style={styles.resultNote}>Маргааш дахин ирээрэй!</Text>
            <Pressable style={styles.doneBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.doneBtnText}>Дуусгах</Text>
            </Pressable>
          </View>
        )}

        {phase === 'already' && (
          <View style={styles.resultCard}>
            <Text style={styles.resultEmoji}>✅</Text>
            <Text style={styles.resultTitle}>Өнөөдрийн сорил дууссан</Text>
            <Text style={styles.resultNote}>Маргааш шинэ сорилоор дахин ирээрэй!</Text>
            <Pressable style={styles.doneBtn} onPress={() => navigation.goBack()}>
              <Text style={styles.doneBtnText}>Буцах</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.warm.beige },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 6 },
  iconBtn: { width: 40, height: 40, borderRadius: 16, backgroundColor: colors.warm.card, alignItems: 'center', justifyContent: 'center', ...shadows.card },
  back: { fontSize: 28, color: colors.warm.dark },
  headerTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 18, color: colors.warm.text },
  scoreChip: { backgroundColor: colors.warm.card, paddingHorizontal: 14, height: 40, borderRadius: 16, alignItems: 'center', justifyContent: 'center', ...shadows.card },
  scoreText: { fontFamily: fonts.fredoka.bold, fontSize: 14, color: colors.warm.text },
  content: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40, gap: 20 },
  qCard: { borderRadius: 24, paddingVertical: 32, alignItems: 'center', gap: 10, ...shadows.sand },
  qEmoji: { fontSize: 88 },
  qLabel: { fontFamily: fonts.lexend.regular, fontSize: 14, color: '#8A7060' },
  options: { gap: 12 },
  option: { backgroundColor: colors.warm.card, borderRadius: 18, paddingVertical: 20, alignItems: 'center', borderWidth: 2, borderColor: '#EDE3D5', ...shadows.cardSm },
  optionCorrect: { backgroundColor: colors.sage.light, borderColor: colors.sage.mid },
  optionWrong: { backgroundColor: '#F4C7C0', borderColor: '#D88B7E' },
  optionText: { fontFamily: fonts.fredoka.semibold, fontSize: 24, color: colors.warm.text },
  resultCard: { backgroundColor: colors.warm.card, borderRadius: 24, padding: 28, alignItems: 'center', gap: 12, marginTop: 20, ...shadows.card },
  resultEmoji: { fontSize: 64 },
  resultTitle: { fontFamily: fonts.fredoka.bold, fontSize: 22, color: colors.warm.text, textAlign: 'center' },
  rewardChips: { flexDirection: 'row', gap: 10, marginTop: 4 },
  chipPeach: { backgroundColor: colors.peach.lightest, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 },
  chipPeachText: { fontFamily: fonts.lexend.semibold, fontSize: 14, color: colors.peach.dark },
  chipSand: { backgroundColor: colors.sand.light, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 16 },
  chipSandText: { fontFamily: fonts.lexend.semibold, fontSize: 14, color: '#8A6E45' },
  resultNote: { fontFamily: fonts.lexend.regular, fontSize: 13, color: colors.warm.gray, textAlign: 'center' },
  doneBtn: { backgroundColor: colors.lavender.dark, borderRadius: 20, paddingVertical: 14, paddingHorizontal: 40, alignItems: 'center', marginTop: 8, ...shadows.lavender },
  doneBtnText: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: '#fff' },
});
