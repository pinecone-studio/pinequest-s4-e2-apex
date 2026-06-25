import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { colors, fonts } from '../theme';

const META: Record<string, { emoji: string; label: string }> = {
  Home: { emoji: '🏠', label: 'Нүүр' },
  Stories: { emoji: '📚', label: 'Үлгэр' },
  Games: { emoji: '🎮', label: 'Тоглоом' },
  Parent: { emoji: '📊', label: 'Эцэг эх' },
  Profile: { emoji: '👤', label: 'Профайл' },
};

/** Custom tab bar — ported from components/BottomNav.tsx. */
export default function BottomNav({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.nav, { paddingBottom: insets.bottom, height: 80 + insets.bottom }]}>
      {state.routes.map((route, index) => {
        const meta = META[route.name];
        if (!meta) return null;
        const active = state.index === index;

        const onPress = () => {
          const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!active && !event.defaultPrevented) navigation.navigate(route.name);
        };

        return (
          <Pressable key={route.key} style={styles.item} onPress={onPress}>
            <Text style={[styles.emoji, !active && styles.emojiInactive]}>{meta.emoji}</Text>
            <Text style={[styles.label, active ? styles.labelActive : styles.labelInactive]}>{meta.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    backgroundColor: colors.warm.card,
    borderTopWidth: 1,
    borderTopColor: '#EAE0D5',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingTop: 12,
    shadowColor: '#2D231E',
    shadowOpacity: 0.04,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
  item: { alignItems: 'center', gap: 4 },
  emoji: { fontSize: 22 },
  emojiInactive: { opacity: 0.5 },
  label: { fontFamily: fonts.lexend.regular, fontSize: 10 },
  labelActive: { fontFamily: fonts.lexend.semibold, color: colors.lavender.dark },
  labelInactive: { color: colors.warm.lightgray },
});
