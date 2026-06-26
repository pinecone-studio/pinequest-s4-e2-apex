'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, StyleSheet, Pressable, ScrollView } from '../../rn/primitives';
import { LinearGradient } from '../../rn/LinearGradient';
import StatusBarRow from '../../components/StatusBarRow';
import LexiBot from '../../components/LexiBot';
import AppIcon from '../../components/AppIcon';
import { colors, fonts, shadows } from '../../theme';
import { useChild } from '../../hooks/useChild';
import { SKILL_AREAS, normalizeWeakAreas } from '../../lib/dyslexia';
import { api } from '../../lib/api';

const BARS = [
  { h: 18, color: '#9B8BC4' },
  { h: 34, color: '#A8C4CE' },
  { h: 46, color: '#C4876A' },
  { h: 28, color: '#D8C4A8' },
  { h: 42, color: '#9AB894' },
  { h: 22, color: '#9B8BC4' },
  { h: 38, color: '#A8C4CE' },
  { h: 30, color: '#C4876A' },
];

function WaveBar({ height, color, listening, delay }: { height: number; color: string; listening: boolean; delay: number }) {
  return (
    <div
      className={listening ? 'lexi-wave-bar' : undefined}
      style={{
        width: 5,
        height,
        backgroundColor: color,
        borderRadius: 4,
        opacity: listening ? 1 : 0.4,
        transform: listening ? undefined : 'scaleY(0.4)',
        animationDelay: `${delay}ms`,
      }}
    />
  );
}

export default function PracticeScreen() {
  const router = useRouter();
  const [listening, setListening] = useState(false);
  const [done, setDone] = useState(false);
  const [earned, setEarned] = useState<{ stars: number; coins: number; exp: number } | null>(null);
  const { child, refresh } = useChild();

  // Дислекси шалгалтаар илэрсэн сул ур чадварт хичээлийг тааруулна.
  const weakAreas = normalizeWeakAreas(child?.dyslexiaWeakSkills);

  const handleMic = () => {
    setListening(true);
    setTimeout(async () => {
      setListening(false);
      setDone(true);
      // Дасгалыг бодитоор бүртгэж, exp + coin + од олгоно.
      if (child?.clerkId) {
        try {
          const r = await api.recordReadingSession(child.clerkId, {
            accuracy: 90,
            durationMin: 1,
            wordsRead: 9,
          });
          setEarned({ stars: r.earnedStars, coins: r.earnedCoins, exp: r.earnedExp });
          refresh();
        } catch (e) {
          console.warn('Дасгал бүртгэхэд алдаа:', e);
        }
      }
    }, 3000);
  };

  return (
    <LinearGradient colors={['#EDE8F5', '#F5EFE6']} style={styles.root}>
      <StatusBarRow />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerText}>
          <Text style={styles.title}>Лекситэй унш</Text>
          <Text style={styles.subtitle}>Өгүүлбэрийг чанга унш</Text>
        </View>

        {/* Шалгалтын үр дүнд тааруулсан, хүүхэд бүрд зориулсан анхаарах чиглэл */}
        {weakAreas.length > 0 && (
          <View style={styles.focusCard}>
            <Text style={styles.focusTitle}>🎯 Танд тохирсон анхаарах чиглэл</Text>
            {weakAreas.map((area) => {
              const meta = SKILL_AREAS[area];
              return (
                <View key={area} style={styles.focusRow}>
                  <Text style={styles.focusEmoji}>{meta.emoji}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.focusLabel}>{meta.label}</Text>
                    <Text style={styles.focusText}>{meta.focus}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <LexiBot size="md" animate={listening ? 'bob' : 'float'} />
        </View>

        {/* Sentence */}
        <View style={styles.sentenceCard}>
          <Text style={styles.sentence}>
            Нар өнөөдөр маш <Text style={styles.highlight}>тод</Text> гэрэлтэж байна.
          </Text>
        </View>

        {/* Waveform */}
        <View style={styles.wave}>
          {BARS.map((b, i) => (
            <WaveBar key={i} height={b.h} color={b.color} listening={listening} delay={i * 60} />
          ))}
        </View>

        {/* Mic button */}
        <View style={{ alignItems: 'center', marginTop: 16 }}>
          <Pressable onPress={handleMic} style={styles.micWrap}>
            <LinearGradient colors={['#C4876A', '#D8A48F']} style={styles.mic}>
              <AppIcon name="mic" size={36} color="#fff" />
            </LinearGradient>
          </Pressable>
        </View>
        <Text style={styles.hint}>{listening ? 'Сонсож байна… зогсооход дар' : 'Унших бэлэн бол дар'}</Text>

        {/* Feedback */}
        {done && (
          <View style={styles.feedback}>
            <View style={styles.feedbackHead}>
              <AppIcon name="star" size={22} color="#F5B945" />
              <Text style={styles.feedbackTitle}>Гайхалтай!</Text>
              {earned && <Text style={styles.feedbackStar}>+{earned.stars} ⭐</Text>}
            </View>
            <Text style={styles.feedbackText}>
              Чи <Text style={{ fontFamily: fonts.lexend.bold }}>10-аас 9</Text> үгийг зөв уншлаа!
            </Text>
            {earned && (
              <View style={styles.feedbackChips}>
                <View style={styles.chipPeach}>
                  <Text style={styles.chipPeachText}>+{earned.exp} EXP</Text>
                </View>
                <View style={styles.chipSlate}>
                  <Text style={styles.chipSlateText}>+{earned.coins} 🪙</Text>
                </View>
              </View>
            )}
          </View>
        )}

        <Pressable style={{ marginTop: 24, alignItems: 'center' }} onPress={() => router.push('/home')}>
          <Text style={styles.back}>← Нүүр</Text>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingBottom: 32 },
  headerText: { alignItems: 'center', paddingHorizontal: 20, paddingTop: 6 },
  title: { fontFamily: fonts.fredoka.bold, fontSize: 24, color: colors.warm.text },
  subtitle: { fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.warm.gray, marginTop: 4 },
  focusCard: { marginHorizontal: 20, marginTop: 16, backgroundColor: colors.lavender.lightest, borderRadius: 20, padding: 16, borderWidth: 1, borderColor: colors.lavender.light, ...shadows.cardSm },
  focusTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 15, color: colors.lavender.darker, marginBottom: 10 },
  focusRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
  focusEmoji: { fontSize: 24 },
  focusLabel: { fontFamily: fonts.lexend.semibold, fontSize: 14, color: colors.warm.text },
  focusText: { fontFamily: fonts.lexend.regular, fontSize: 12, color: colors.warm.gray },
  sentenceCard: { marginHorizontal: 20, marginTop: 12, backgroundColor: colors.warm.card, borderRadius: 24, padding: 20, alignItems: 'center', ...shadows.card },
  sentence: { fontFamily: fonts.lexend.medium, fontSize: 24, color: colors.warm.text, textAlign: 'center', lineHeight: 34 },
  highlight: { color: colors.peach.dark, fontFamily: fonts.lexend.semibold },
  wave: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, height: 56, marginTop: 24 },
  micWrap: { borderRadius: 999 },
  mic: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderColor: colors.warm.card,
    ...shadows.peach,
  },
  hint: { textAlign: 'center', fontFamily: fonts.lexend.regular, fontSize: 12, color: colors.warm.gray, marginTop: 10 },
  feedback: { marginHorizontal: 20, marginTop: 16, backgroundColor: colors.warm.card, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: colors.sage.light, ...shadows.card },
  feedbackHead: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  feedbackTitle: { fontFamily: fonts.fredoka.bold, fontSize: 20, color: colors.sage.text },
  feedbackStar: { marginLeft: 'auto', fontFamily: fonts.fredoka.regular, fontSize: 14, color: '#B08060' },
  feedbackText: { fontFamily: fonts.lexend.regular, fontSize: 14, color: '#5A4E47', marginTop: 8 },
  feedbackChips: { flexDirection: 'row', gap: 8, marginTop: 12 },
  chipPeach: { backgroundColor: colors.peach.lightest, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  chipPeachText: { fontFamily: fonts.lexend.semibold, fontSize: 12, color: colors.peach.dark },
  chipSlate: { backgroundColor: colors.slate.light, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16 },
  chipSlateText: { fontFamily: fonts.lexend.semibold, fontSize: 12, color: colors.slate.dark },
  back: { fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.lavender.dark, textDecorationLine: 'underline' },
});
