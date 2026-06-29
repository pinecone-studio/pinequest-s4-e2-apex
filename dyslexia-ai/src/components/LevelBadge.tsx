'use client';

import { View, Text } from '../rn/primitives';
import { levelBadge } from '../lib/api';

export default function LevelBadge({ level, size = 80 }: { level: number; size?: number }) {
  const tier = levelBadge(level);
  return (
    <View style={{ position: 'relative', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          width: size,
          height: size,
          backgroundColor: tier.color,
          alignItems: 'center',
          justifyContent: 'center',
          clipPath: 'polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)',
          boxShadow: 'inset 0 -6px 14px rgba(0,0,0,0.22), inset 0 6px 14px rgba(255,255,255,0.3)',
        }}
      >
        <Text style={{ fontSize: size * 0.42 }}>{tier.glyph}</Text>
      </View>
      <Text style={{ position: 'absolute', top: -2, right: 0, fontSize: size * 0.26 }}>✨</Text>
    </View>
  );
}