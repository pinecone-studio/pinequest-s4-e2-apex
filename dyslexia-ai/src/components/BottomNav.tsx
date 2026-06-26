'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { IconType } from 'react-icons';
import { IoHome, IoLibrary, IoGameController, IoStatsChart, IoPerson } from 'react-icons/io5';
import { View, Text, Pressable } from '../rn/primitives';
import { colors, fonts } from '../theme';

const TABS: { path: string; icon: IconType; label: string }[] = [
  { path: '/home', icon: IoHome, label: 'Нүүр' },
  { path: '/stories', icon: IoLibrary, label: 'Үлгэр' },
  { path: '/games', icon: IoGameController, label: 'Тоглоом' },
  { path: '/parent', icon: IoStatsChart, label: 'Эцэг эх' },
  { path: '/profile', icon: IoPerson, label: 'Профайл' },
];

/** Custom tab bar — ported from the Expo BottomNav. */
export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={styles.nav}>
      {TABS.map(({ path, icon: Icon, label }) => {
        const active = pathname === path;
        return (
          <Pressable key={path} style={styles.item} onPress={() => router.push(path)}>
            <Icon size={24} color={active ? colors.lavender.dark : colors.warm.lightgray} />
            <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = {
  nav: {
    backgroundColor: colors.warm.card,
    borderTopWidth: 1,
    borderTopColor: '#EAE0D5',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingTop: 12,
    paddingBottom: 12,
    height: 80,
    flexShrink: 0,
    shadowColor: '#2D231E',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
  },
  item: { alignItems: 'center', gap: 4 },
  label: { fontFamily: fonts.lexend.regular, fontSize: 10 },
  labelActive: { fontFamily: fonts.lexend.semibold, color: colors.lavender.dark },
  labelInactive: { color: colors.warm.lightgray },
} as const;
