import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StatusBarRow from '../components/StatusBarRow';
import AppIcon, { AppIconName } from '../components/AppIcon';
import { colors, fonts, shadows } from '../theme';
import { useChild } from '../hooks/useChild';
import { expProgress } from '../lib/api';

const cards: { to: string; bg: string; icon: AppIconName; color: string; title: string; sub: string }[] = [
  { to: 'Reading', bg: colors.sand.lightest, icon: 'book', color: '#A8895F', title: 'Унших хичээл', sub: 'AI-аар тохируулсан дасгал' },
  { to: 'Games', bg: colors.peach.lightest, icon: 'game', color: colors.peach.dark, title: 'Сургалтын тоглоом', sub: '4 хөгжилтэй тоглоом' },
  { to: 'Stories', bg: colors.slate.light, icon: 'library', color: colors.slate.dark, title: 'Үлгэрийн ертөнц', sub: '12 үлгэр' },
  { to: 'DyslexiaTest', bg: colors.lavender.lightest, icon: 'brain', color: colors.lavender.dark, title: 'Дислекси шалгалт', sub: '5 мин · 4-7 нас' },
];

const STAT_ICONS: { icon: AppIconName; color: string }[] = [
  { icon: 'star', color: '#F5B945' },
  { icon: 'coin', color: '#E0A82E' },
  { icon: 'flame', color: '#E8835A' },
];

export default function HomeScreen({ navigation }: { navigation: any }) {
  const { child } = useChild();

  const stats: [string, string][] = [
    [String(child?.stars ?? 0), 'Од'],
    [String(child?.coins ?? 0), 'Зоос'],
    [String(child?.streak ?? 0), 'Дараалал'],
  ];
  const { level, current, needed } = expProgress(child?.exp ?? 0);

  return (
    <View style={styles.root}>
      <StatusBarRow />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.greetRow}>
          <View>
            <Text style={styles.greetHi}>Сайн уу,</Text>
            <Text style={styles.greetName}>{child?.name ?? '...'}!</Text>
          </View>
          <LinearGradient colors={['#D8C4B0', '#C4A08C']} style={styles.avatar}>
            <Text style={{ fontSize: 30 }}>{child?.avatar ?? '🦊'}</Text>
          </LinearGradient>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map(([val, label], i) => (
            <View key={label} style={styles.statCard}>
              <AppIcon name={STAT_ICONS[i].icon} size={20} color={STAT_ICONS[i].color} />
              <Text style={styles.statVal}>{val}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* Level / EXP progress */}
        <View style={styles.expCard}>
          <View style={styles.expHead}>
            <View style={styles.expLevelRow}>
              <AppIcon name="medal" size={16} color={colors.lavender.dark} />
              <Text style={styles.expLevel}>{level}-р түвшин</Text>
            </View>
            <Text style={styles.expValue}>{current} / {needed} EXP</Text>
          </View>
          <View style={styles.expBar}>
            <View style={[styles.expFill, { width: `${(current / needed) * 100}%` }]} />
          </View>
        </View>

        {/* Quick access — мөр бүрд нэг карт */}
        <View style={styles.grid}>
          {cards.map(({ to, icon, title, sub, bg, color }, i) => (
            <Pressable key={i} style={styles.gridCard} onPress={() => navigation.navigate(to)}>
              <View style={[styles.gridIcon, { backgroundColor: bg }]}>
                <AppIcon name={icon} size={26} color={color} />
              </View>
              <View style={styles.gridText}>
                <Text style={styles.gridTitle}>{title}</Text>
                <Text style={styles.gridSub}>{sub}</Text>
              </View>
              <AppIcon name="arrowForward" size={20} color={colors.warm.lightgray} />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.warm.beige },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 },
  greetRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  greetHi: { fontFamily: fonts.lexend.regular, fontSize: 16, color: colors.warm.gray },
  greetName: { fontFamily: fonts.fredoka.bold, fontSize: 30, color: colors.warm.text },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.peach,
  },
  statsRow: { flexDirection: 'row', gap: 10, marginTop: 20 },
  statCard: {
    flex: 1,
    backgroundColor: colors.warm.card,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    ...shadows.card,
  },
  statVal: { fontFamily: fonts.fredoka.bold, fontSize: 20, color: colors.warm.text, marginTop: 2 },
  statLabel: { fontFamily: fonts.lexend.regular, fontSize: 11, color: colors.warm.gray },
  expCard: { backgroundColor: colors.warm.card, borderRadius: 16, padding: 14, marginTop: 12, ...shadows.card },
  expHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  expLevelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  expLevel: { fontFamily: fonts.fredoka.semibold, fontSize: 14, color: colors.warm.text },
  expValue: { fontFamily: fonts.lexend.semibold, fontSize: 12, color: colors.lavender.dark },
  expBar: { height: 10, backgroundColor: colors.warm.secondary, borderRadius: 5, overflow: 'hidden' },
  expFill: { height: '100%', backgroundColor: colors.lavender.mid, borderRadius: 5 },
  banner: {
    marginTop: 20,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    ...shadows.lavender,
  },
  bannerTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 18, color: '#fff' },
  bannerSub: { fontFamily: fonts.lexend.regular, fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  bannerBtn: {
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: colors.sand.DEFAULT,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  bannerBtnText: { fontFamily: fonts.fredoka.semibold, fontSize: 14, color: colors.warm.text },
  grid: { marginTop: 16, gap: 12 },
  gridCard: {
    width: '100%',
    backgroundColor: colors.warm.card,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    ...shadows.card,
  },
  gridIcon: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridText: { flex: 1 },
  gridTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: colors.warm.text },
  gridSub: { fontFamily: fonts.lexend.regular, fontSize: 12, color: colors.warm.gray, marginTop: 2 },
});
