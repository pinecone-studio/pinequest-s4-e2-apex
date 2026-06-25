import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Share, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StatusBarRow from '../components/StatusBarRow';
import AppIcon from '../components/AppIcon';
import { colors, fonts, shadows } from '../theme';
import { useChild } from '../hooks/useChild';
import { api, Stats } from '../lib/api';
import { SKILL_AREAS, normalizeWeakAreas } from '../lib/dyslexia';

const WEEKDAYS = ['Ня', 'Да', 'Мя', 'Лх', 'Пү', 'Ба', 'Бя'];
const RISK_LABEL: Record<string, string> = { low: 'Бага', medium: 'Дунд', high: 'Өндөр' };

// Сүүлийн 7 хоногийн уншлагын нарийвчлалыг өдрөөр нэгтгэж график болгоно.
function buildWeeklyBars(recent: Stats['recent']) {
  const today = new Date();
  const days: { key: string; label: string; sum: number; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push({ key: d.toDateString(), label: WEEKDAYS[d.getDay()], sum: 0, count: 0 });
  }
  for (const s of recent) {
    const key = new Date(s.createdAt).toDateString();
    const day = days.find((x) => x.key === key);
    if (day) {
      day.sum += s.accuracy;
      day.count += 1;
    }
  }
  return days.map((d) => ({ label: d.label, value: d.count ? Math.round(d.sum / d.count) : 0 }));
}

export default function ParentScreen({ navigation }: { navigation: any }) {
  const { child } = useChild();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!child?.clerkId) return;
    let active = true;
    setLoading(true);
    api
      .stats(child.clerkId)
      .then((s) => active && setStats(s))
      .catch((e) => active && setError(e?.message ?? 'Алдаа гарлаа'))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [child?.clerkId]);

  const weakAreas = normalizeWeakAreas(child?.dyslexiaWeakSkills);
  const totalMin = stats?.totalMinutes ?? 0;
  const hours = Math.floor(totalMin / 60);
  const timeText = hours > 0 ? `${hours}ц ${totalMin % 60}м` : `${totalMin}м`;

  const statCards = [
    {
      l: 'Уншлагын нарийвчлал',
      v: `${stats?.avgAccuracy ?? 0}%`,
      sub: `${stats?.sessions ?? 0} дасгалын дундаж`,
      color: colors.sage.text,
    },
    { l: 'Уншсан хугацаа', v: timeText, sub: `Нийт ${stats?.sessions ?? 0} удаа`, color: colors.lavender.dark },
    {
      l: 'Уншсан үг',
      v: String(stats?.totalWords ?? 0),
      sub: `${stats?.sessions ?? 0} дасгалд`,
      color: colors.slate.dark,
    },
    {
      l: 'Дислексийн эрсдэл',
      v: child?.dyslexiaTestDone ? RISK_LABEL[child?.dyslexiaRisk ?? 'low'] ?? '—' : 'Тест өгөөгүй',
      sub: child?.dyslexiaTestDone ? `${child?.dyslexiaScore ?? 0}/6 оноо` : 'дарж шалга',
      color: colors.peach.dark,
    },
  ];

  const bars = buildWeeklyBars(stats?.recent ?? []);
  const maxVal = Math.max(100, ...bars.map((b) => b.value));

  const onShare = () => {
    Share.share({
      message:
        `${child?.name ?? 'Хүүхэд'}-ийн явц:\n` +
        `• Нарийвчлал: ${stats?.avgAccuracy ?? 0}%\n` +
        `• Уншсан хугацаа: ${timeText}\n` +
        `• Дасгалын тоо: ${stats?.sessions ?? 0}\n` +
        (child?.dyslexiaTestDone
          ? `• Дислексийн эрсдэл: ${RISK_LABEL[child?.dyslexiaRisk ?? 'low'] ?? '—'}`
          : ''),
    }).catch(() => {});
  };

  return (
    <View style={styles.root}>
      <StatusBarRow />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Эцэг эхийн самбар</Text>
            <Text style={styles.subtitle}>{child?.name ?? '...'}-ийн явц</Text>
          </View>
          <Pressable style={styles.shareBtn} onPress={onShare}>
            <AppIcon name="share" size={18} color={colors.lavender.dark} />
          </Pressable>
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 40 }} color={colors.lavender.dark} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <View style={styles.statsGrid}>
              {statCards.map(({ l, v, sub, color }) => (
                <View key={l} style={styles.statCard}>
                  <Text style={styles.statLabel}>{l}</Text>
                  <Text style={[styles.statVal, { color }]}>{v}</Text>
                  <Text style={[styles.statSub, { color }]}>{sub}</Text>
                </View>
              ))}
            </View>

            {/* Weekly chart */}
            <View style={styles.chartCard}>
              <View style={styles.chartHead}>
                <Text style={styles.chartTitle}>7 хоногийн нарийвчлал</Text>
                <Text style={styles.chartRange}>%</Text>
              </View>
              {stats && stats.sessions > 0 ? (
                <View style={styles.bars}>
                  {bars.map((b, i) => (
                    <View key={i} style={styles.barCol}>
                      <View
                        style={[
                          styles.bar,
                          {
                            height: Math.max(4, (b.value / maxVal) * 96),
                            backgroundColor: b.value ? colors.lavender.mid : colors.lavender.light,
                          },
                        ]}
                      />
                      <Text style={styles.barLabel}>{b.label}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.emptyText}>Дасгал хийсний дараа энд явц харагдана.</Text>
              )}
            </View>

            {/* AI tip — дислекси шалгалтын сул чадварт тааруулсан */}
            <LinearGradient colors={['#8B7AB8', '#A090C8']} style={styles.tip}>
              <View style={styles.tipHead}>
                <AppIcon name="robot" size={20} color="#fff" />
                <Text style={styles.tipTitle}>AI зөвлөмж</Text>
              </View>
              {weakAreas.length > 0 ? (
                <Text style={styles.tipText}>
                  {child?.name ?? 'Хүүхэд'}-д{' '}
                  <Text style={{ fontFamily: fonts.lexend.bold, color: colors.sand.DEFAULT }}>
                    {weakAreas.map((a) => SKILL_AREAS[a].label).join(', ')}
                  </Text>{' '}
                  ур чадварыг бэхжүүлэх хэрэгтэй. {SKILL_AREAS[weakAreas[0]].tip}
                </Text>
              ) : child?.dyslexiaTestDone ? (
                <Text style={styles.tipText}>
                  Шалгалтын дүн сайн байна! Өдөр бүр 10 минут унших дасгалаа үргэлжлүүлээрэй.
                </Text>
              ) : (
                <Text style={styles.tipText}>
                  Дислексийн эрт илрүүлгийн шалгалтыг өгснөөр хүүхдэд тохирсон зөвлөмж харагдана.
                </Text>
              )}
            </LinearGradient>

            {/* Dyslexia Test Card */}
            <Pressable style={styles.testCard} onPress={() => navigation.navigate('DyslexiaTest')}>
              <View style={styles.testHeader}>
                <AppIcon name="brain" size={32} color={colors.lavender.dark} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.testTitle}>Дислексийн шалгалт</Text>
                  <Text style={styles.testSubtitle}>
                    {child?.dyslexiaTestDone ? 'Дахин шалгах' : '4-7 насны хүүхдэд зориулсан эрт илрүүлгийн тест'}
                  </Text>
                </View>
                <AppIcon name="arrowForward" size={22} color={colors.lavender.mid} />
              </View>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.warm.secondary },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontFamily: fonts.fredoka.bold, fontSize: 20, color: colors.warm.text },
  subtitle: { fontFamily: fonts.lexend.regular, fontSize: 12, color: colors.warm.gray },
  shareBtn: { width: 40, height: 40, borderRadius: 16, backgroundColor: colors.warm.card, alignItems: 'center', justifyContent: 'center', ...shadows.card },
  errorText: { fontFamily: fonts.lexend.regular, fontSize: 13, color: colors.peach.dark, textAlign: 'center', marginTop: 40 },
  emptyText: { fontFamily: fonts.lexend.regular, fontSize: 13, color: colors.warm.gray, textAlign: 'center', paddingVertical: 24 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 16 },
  statCard: { width: '48%', backgroundColor: colors.warm.card, borderRadius: 16, padding: 14, marginBottom: 10 },
  statLabel: { fontFamily: fonts.lexend.regular, fontSize: 11, color: colors.warm.gray },
  statVal: { fontFamily: fonts.fredoka.bold, fontSize: 22, marginTop: 2 },
  statSub: { fontFamily: fonts.lexend.regular, fontSize: 10, marginTop: 2 },
  chartCard: { backgroundColor: colors.warm.card, borderRadius: 16, padding: 16, marginTop: 4 },
  chartHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  chartTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 14, color: colors.warm.text },
  chartRange: { fontFamily: fonts.lexend.regular, fontSize: 12, color: colors.lavender.dark },
  bars: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: 6, height: 96, marginTop: 16 },
  barCol: { flex: 1, alignItems: 'center', gap: 6 },
  bar: { width: '100%', borderRadius: 8 },
  barLabel: { fontFamily: fonts.lexend.regular, fontSize: 9, color: colors.warm.lightgray },
  tip: { marginTop: 12, borderRadius: 16, padding: 16, ...shadows.lavender },
  tipHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  tipTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 14, color: '#fff' },
  tipText: { fontFamily: fonts.lexend.regular, fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 8, lineHeight: 22 },
  testCard: { marginTop: 16, backgroundColor: colors.warm.card, borderRadius: 16, padding: 16, ...shadows.card },
  testHeader: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  testTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: colors.warm.text },
  testSubtitle: { fontFamily: fonts.lexend.regular, fontSize: 12, color: colors.warm.gray, marginTop: 2 },
});
