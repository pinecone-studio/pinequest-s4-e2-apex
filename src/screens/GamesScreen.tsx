import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StatusBarRow from '../components/StatusBarRow';
import AppIcon, { AppIconName } from '../components/AppIcon';
import { colors, fonts, shadows } from '../theme';
import { useChild } from '../hooks/useChild';
import { api, expProgress } from '../lib/api';

type GameDef = {
  emoji: string;
  title: string;
  sub: string;
  grad: string[];
  coins: number;
  exp: number;
  route?: string;
  soon?: boolean;
};

const GAMES: GameDef[] = [
  { emoji: '🔤', title: 'Үсэг тааруулах', sub: 'Зургийн эхний үсгийг ол', grad: ['#7A6AA8', '#8B7AB8'], coins: 15, exp: 20, route: 'LetterMatch' },
  { emoji: '🧱', title: 'Үсгийг зөв байрлуулах', sub: 'Үгийн үсгийг зөв дараалуул', grad: ['#7A9E74', '#8FB487'], coins: 15, exp: 20, route: 'WordBuild' },
  { emoji: '🕵️', title: 'Авианы мөрдөгч', sub: 'Сонсоод үсгийг сонго', grad: ['#6094A8', '#7AAEC0'], coins: 15, exp: 20, route: 'SoundDetective' },
];

export default function GamesScreen({ navigation }: { navigation: any }) {
  const { child, refresh } = useChild();
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const { level, current, needed } = expProgress(child?.exp ?? 0);

  const award = async (coins: number, exp: number, label: string) => {
    if (!child?.clerkId || busy) return;
    setBusy(true);
    try {
      await api.reward(child.clerkId, { coins, exp });
      await refresh();
      setToast(`${label}: +${exp} EXP, +${coins} 🪙`);
      setTimeout(() => setToast(null), 2500);
    } catch (e) {
      console.warn('Шагнал олгоход алдаа:', e);
    } finally {
      setBusy(false);
    }
  };

  const onGame = (game: GameDef) => {
    if (game.route) {
      navigation.navigate(game.route);
      return;
    }
    if (game.soon) {
      setToast(`🚧 «${game.title}» тун удахгүй нэмэгдэнэ`);
      setTimeout(() => setToast(null), 2200);
      return;
    }
    award(game.coins, game.exp, game.title);
  };

  const stats: { icon: AppIconName; color: string; val: string; label: string; bg: string }[] = [
    { icon: 'star', color: '#F5B945', val: String(child?.stars ?? 0), label: 'Од', bg: colors.sand.lightest },
    { icon: 'coin', color: '#E0A82E', val: String(child?.coins ?? 0), label: 'Зоос', bg: colors.sand.light },
    { icon: 'medal', color: colors.lavender.dark, val: String(level), label: 'Түвшин', bg: colors.lavender.light },
  ];

  return (
    <View style={styles.root}>
      <StatusBarRow />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Сургалтын тоглоом</Text>
        <Text style={styles.subtitle}>Тоглоод шагнал ав!</Text>

        {/* Stats */}
        <View style={styles.statsRow}>
          {stats.map(({ icon, color, val, label, bg }) => (
            <View key={label} style={[styles.statCard, { backgroundColor: bg }]}>
              <View style={styles.statValRow}>
                <AppIcon name={icon} size={18} color={color} />
                <Text style={styles.statVal}>{val}</Text>
              </View>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* EXP progress to next level */}
        <View style={styles.expCard}>
          <View style={styles.expHead}>
            <Text style={styles.expLabel}>Туршлага (EXP)</Text>
            <Text style={styles.expValue}>{current} / {needed}</Text>
          </View>
          <View style={styles.expBar}>
            <View style={[styles.expFill, { width: `${(current / needed) * 100}%` }]} />
          </View>
          <Text style={styles.expHint}>{needed - current} EXP дараагийн түвшинд</Text>
        </View>

        {toast && (
          <View style={styles.toast}>
            <AppIcon name="party" size={16} color={colors.sage.text} />
            <Text style={styles.toastText}>{toast}</Text>
          </View>
        )}

        {/* Game grid — «тун удахгүй» тоглоомуудыг түр нуусан */}
        <View style={styles.grid}>
          {GAMES.filter((g) => !g.soon).map((game) => (
            <Pressable key={game.title} style={styles.gameCard} disabled={busy} onPress={() => onGame(game)}>
              <LinearGradient
                colors={game.grad as [string, string]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.gameInner}
              >
                <Text style={{ fontSize: 36 }}>{game.emoji}</Text>
                <View style={styles.gameTextWrap}>
                  <Text style={styles.gameTitle}>{game.title}</Text>
                  <Text style={styles.gameSub}>{game.sub}</Text>
                </View>
                <Text style={styles.gameReward}>{game.route ? 'Тоглох →' : `+${game.exp} EXP`}</Text>
              </LinearGradient>
            </Pressable>
          ))}
        </View>

        {/* Daily challenge */}
        <Pressable style={styles.challenge} onPress={() => navigation.navigate('Daily')}>
          <AppIcon name="party" size={28} color={colors.peach.dark} />
          <View style={{ flex: 1 }}>
            <Text style={styles.challengeTitle}>Өдрийн сорил</Text>
            <Text style={styles.challengeSub}>+50 EXP, +30 🪙 хож!</Text>
          </View>
          <View style={styles.challengeBtn}>
            <Text style={styles.challengeBtnText}>Тоглох</Text>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.warm.beige },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 },
  title: { fontFamily: fonts.fredoka.bold, fontSize: 24, color: colors.warm.text },
  subtitle: { fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.warm.gray },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 16 },
  statCard: { flex: 1, borderRadius: 16, padding: 10, alignItems: 'center' },
  statValRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statVal: { fontFamily: fonts.fredoka.bold, fontSize: 18, color: colors.warm.text },
  statLabel: { fontFamily: fonts.lexend.regular, fontSize: 10, color: colors.warm.gray },
  expCard: { backgroundColor: colors.warm.card, borderRadius: 16, padding: 14, marginTop: 12, ...shadows.card },
  expHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  expLabel: { fontFamily: fonts.fredoka.semibold, fontSize: 13, color: colors.warm.text },
  expValue: { fontFamily: fonts.lexend.semibold, fontSize: 12, color: colors.lavender.dark },
  expBar: { height: 10, backgroundColor: colors.warm.secondary, borderRadius: 5, overflow: 'hidden', marginTop: 8 },
  expFill: { height: '100%', backgroundColor: colors.lavender.mid, borderRadius: 5 },
  expHint: { fontFamily: fonts.lexend.regular, fontSize: 10, color: colors.warm.gray, marginTop: 6 },
  toast: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, backgroundColor: colors.sage.light, borderRadius: 14, paddingVertical: 10, paddingHorizontal: 14, marginTop: 12 },
  toastText: { fontFamily: fonts.lexend.semibold, fontSize: 13, color: colors.sage.text, textAlign: 'center' },
  gameReward: { position: 'absolute', top: 14, right: 16, fontFamily: fonts.fredoka.semibold, fontSize: 12, color: 'rgba(255,255,255,0.9)' },
  grid: { marginTop: 16 },
  gameCard: { width: '100%', borderRadius: 24, marginBottom: 12, overflow: 'hidden', ...shadows.lavender },
  gameInner: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 20 },
  gameTextWrap: { flex: 1 },
  gameTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 18, color: '#fff' },
  gameSub: { fontFamily: fonts.lexend.regular, fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  challenge: {
    marginTop: 16,
    borderRadius: 24,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#F0E4D4',
    ...shadows.sand,
  },
  challengeTitle: { fontFamily: fonts.fredoka.bold, fontSize: 16, color: colors.warm.text },
  challengeSub: { fontFamily: fonts.lexend.regular, fontSize: 11, color: '#7A6845' },
  challengeBtn: { backgroundColor: colors.warm.card, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 16 },
  challengeBtnText: { fontFamily: fonts.fredoka.semibold, fontSize: 14, color: colors.warm.text },
});
