'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import { View, Text, StyleSheet, ScrollView, Pressable } from '../../../rn/primitives';
import { LinearGradient } from '../../../rn/LinearGradient';
import StatusBarRow from '../../../components/StatusBarRow';
import AppIcon from '../../../components/AppIcon';
import { colors, fonts, shadows } from '../../../theme';
import { useChild } from '../../../hooks/useChild';

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const { child } = useChild();
  return (
    <View style={styles.root}>
      <StatusBarRow />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.titleRow}>
          <AppIcon name="person" size={22} color={colors.lavender.dark} />
          <Text style={styles.title}>Миний профайл</Text>
        </View>

        {/* Avatar card */}
        <LinearGradient colors={['#6A98B0', '#8B7AB8']} style={styles.avatarCard}>
          <View style={[styles.deco, { top: 12, left: 20 }]}>
            <AppIcon name="star" size={18} color="#F5D27A" />
          </View>
          <View style={[styles.deco, { top: 24, right: 24 }]}>
            <AppIcon name="sparkles" size={16} color="#FFF0B8" />
          </View>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 56 }}>{child?.avatar ?? '🦊'}</Text>
          </View>
          <Text style={styles.name}>{child?.name ?? '...'}</Text>
          <View style={styles.level}>
            <Text style={styles.levelText}>
              {child?.level ?? 1}-р түвшин · {child?.title ?? 'Унших аялагч'}
            </Text>
          </View>
        </LinearGradient>

        {/* Account */}
        {user?.username ? <Text style={styles.account}>Нэвтэрсэн: @{user.username}</Text> : null}
        <Pressable style={styles.signOut} onPress={() => signOut({ redirectUrl: '/sign-in' })}>
          <AppIcon name="logout" size={18} color={colors.peach.dark} />
          <Text style={styles.signOutText}>Гарах</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.warm.beige },
  content: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 24 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { fontFamily: fonts.fredoka.bold, fontSize: 24, color: colors.warm.text },
  avatarCard: { marginTop: 16, borderRadius: 24, padding: 24, alignItems: 'center', ...shadows.lavender },
  deco: { position: 'absolute', opacity: 0.85 },
  avatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: colors.warm.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  name: { fontFamily: fonts.fredoka.bold, fontSize: 20, color: '#fff', marginTop: 12 },
  level: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginTop: 4 },
  levelText: { fontFamily: fonts.lexend.semibold, fontSize: 12, color: '#fff' },
  account: { fontFamily: fonts.lexend.regular, fontSize: 13, color: colors.warm.gray, textAlign: 'center', marginTop: 24 },
  signOut: {
    marginTop: 12,
    backgroundColor: colors.warm.card,
    borderRadius: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: colors.peach.light,
  },
  signOutText: { fontFamily: fonts.fredoka.semibold, fontSize: 15, color: colors.peach.dark },
});
