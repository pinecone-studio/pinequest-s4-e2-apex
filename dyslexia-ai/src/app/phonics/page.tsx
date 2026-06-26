'use client';

import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from '../../rn/primitives';
import { LinearGradient } from '../../rn/LinearGradient';
import StatusBarRow from '../../components/StatusBarRow';
import AppIcon, { type AppIconName } from '../../components/AppIcon';
import { colors, fonts, shadows } from '../../theme';

const TABS = ['Үсэг', 'Авиа', 'Холих', 'Үг'];
const ACTIVITIES: { icon: AppIconName; label: string; bg: string; text: string }[] = [
  { icon: 'ear', label: 'Сонс', bg: colors.sage.light, text: colors.sage.text },
  { icon: 'repeat', label: 'Давт', bg: colors.lavender.light, text: colors.lavender.dark },
  { icon: 'puzzle', label: 'Тааруул', bg: colors.sand.lightest, text: '#8A7860' },
  { icon: 'drag', label: 'Чирэх', bg: colors.slate.light, text: colors.slate.dark },
  { icon: 'voice', label: 'Хэл', bg: colors.peach.lightest, text: colors.peach.dark },
];

export default function PhonicsScreen() {
  const [tab, setTab] = useState(0);
  return (
    <View style={styles.root}>
      <StatusBarRow />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <AppIcon name="brain" size={22} color={colors.lavender.dark} />
          <Text style={styles.title}>Авиа дасгалжуулагч</Text>
        </View>

        <View style={styles.tabs}>
          {TABS.map((t, i) => (
            <Pressable key={t} onPress={() => setTab(i)} style={[styles.tab, tab === i ? styles.tabActive : styles.tabIdle]}>
              <Text style={[styles.tabText, tab === i ? { color: '#fff' } : { color: colors.warm.gray }]}>{t}</Text>
            </Pressable>
          ))}
        </View>

        <LinearGradient colors={['#F5DDD5', '#F0E8D8']} style={styles.hero}>
          <Text style={styles.heroLabel}>Өнөөдрийн авиа</Text>
          <Text style={styles.heroLetter}>Ш</Text>
          <Text style={styles.heroExample}>
            жишээ нь <Text style={{ fontFamily: fonts.lexend.bold }}>шувуу</Text> 🐦
          </Text>
          <Pressable style={styles.heroBtn}>
            <AppIcon name="volume" size={20} color={colors.peach.dark} />
            <Text style={styles.heroBtnText}>Авиаг сонс</Text>
          </Pressable>
        </LinearGradient>

        <Text style={styles.sectionTitle}>Дасгалууд</Text>
        <View style={styles.activities}>
          {ACTIVITIES.map(({ icon, label, bg, text }) => (
            <Pressable key={label} style={[styles.activity, { backgroundColor: bg }]}>
              <AppIcon name={icon} size={22} color={text} />
              <Text style={[styles.activityLabel, { color: text }]}>{label}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={styles.progressLabels}>
            <Text style={styles.progressLeft}>Хичээлийн явц</Text>
            <Text style={styles.progressRight}>3 / 5</Text>
          </View>
          <View style={styles.progressTrack}>
            <LinearGradient
              colors={['#B8C9B0', '#8FB487']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.progressFill}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.startBtn}>
          <Text style={styles.startBtnText}>Дасгал эхлэх →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.warm.beige },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 110 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontFamily: fonts.fredoka.bold, fontSize: 24, color: colors.warm.text },
  tabs: { flexDirection: 'row', gap: 8, marginTop: 16 },
  tab: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 },
  tabActive: { backgroundColor: colors.lavender.dark },
  tabIdle: { backgroundColor: colors.warm.card, ...shadows.cardSm },
  tabText: { fontFamily: fonts.fredoka.semibold, fontSize: 12 },
  hero: { marginTop: 16, borderRadius: 24, padding: 28, alignItems: 'center', ...shadows.peach },
  heroLabel: { fontFamily: fonts.lexend.regular, fontSize: 14, color: '#8A7060' },
  heroLetter: { fontFamily: fonts.fredoka.bold, fontSize: 80, color: colors.peach.dark, marginTop: 4 },
  heroExample: { fontFamily: fonts.lexend.regular, fontSize: 16, color: colors.warm.text, marginTop: 4 },
  heroBtn: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.warm.card,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    ...shadows.card,
  },
  heroBtnText: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: colors.warm.text },
  sectionTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: colors.warm.text, marginTop: 20 },
  activities: { flexDirection: 'row', gap: 8, marginTop: 12 },
  activity: { flex: 1, borderRadius: 16, paddingVertical: 12, alignItems: 'center' },
  activityLabel: { fontFamily: fonts.lexend.semibold, fontSize: 10, marginTop: 4 },
  progressLabels: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLeft: { fontFamily: fonts.lexend.regular, fontSize: 12, color: colors.warm.gray },
  progressRight: { fontFamily: fonts.lexend.semibold, fontSize: 12, color: colors.sage.text },
  progressTrack: { height: 12, backgroundColor: '#EDE6DA', borderRadius: 999, overflow: 'hidden' },
  progressFill: { height: '100%', width: '60%', borderRadius: 999 },
  footer: { position: 'absolute', bottom: 24, left: 0, right: 0, paddingHorizontal: 20 },
  startBtn: { backgroundColor: colors.lavender.dark, paddingVertical: 16, borderRadius: 24, alignItems: 'center', ...shadows.lavender },
  startBtnText: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: '#fff' },
});
