'use client';

import { View, Text, StyleSheet } from '../rn/primitives';
import { levelBadge } from '../lib/api';

export default function LevelBadge({ level, size = 80 }: { level: number; size?: number }) {
  const tier = levelBadge(level);
  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <View style={[styles.hex, { width: size, height: size, backgroundColor: tier.color }]}>
        <Text style={{ fontSize: size * 0.42 }}>{tier.glyph}</Text>
      </View>
      <Text style={[styles.sparkle, { fontSize: size * 0.26 }]}>✨</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'relative', alignItems: 'center', justifyContent: 'center' },
  hex: {
    alignItems: 'center',
    justifyContent: 'center',
    clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
    boxShadow: 'inset 0 -6px 14px rgba(0,0,0,0.22), inset 0 6px 14px rgba(255,255,255,0.3)',
  },
  sparkle: { position: 'absolute', top: -2, right: 0 },
});
