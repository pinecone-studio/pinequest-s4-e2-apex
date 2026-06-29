'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, Pressable } from '../rn/primitives';
import { LinearGradient } from '../rn/LinearGradient';
import AppIcon from './AppIcon';
import { colors, fonts } from '../theme';

export default function ProverbCard() {
  const router = useRouter();
  const [proverb, setProverb] = useState('Эрдэм номын далай гүн.');
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    let active = true;
    fetch('/api/proverb', { method: 'POST' })
      .then((r) => r.json())
      .then((d) => {
        if (active && typeof d.proverb === 'string' && d.proverb.trim()) setProverb(d.proverb.trim());
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  return (
    <Pressable onPress={() => router.push('/proverb')}>
      <LinearGradient colors={['#F0E8D8', '#F5DDD5']} style={{ borderRadius: 16, padding: 16, marginTop: 12, gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <AppIcon name="sparkles" size={16} color={colors.peach.dark} />
          <Text style={{ fontFamily: fonts.fredoka.semibold, fontSize: 13, color: colors.peach.dark }}>
            Өдрийн зүйр цэцэн үг
          </Text>
        </View>

        <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 15, color: colors.warm.text, lineHeight: 24 }}>
          «{proverb}»
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontFamily: fonts.fredoka.semibold, fontSize: 13, color: colors.peach.dark }}>Уншиж сурах</Text>
          <AppIcon name="arrowForward" size={14} color={colors.peach.dark} />
        </View>
      </LinearGradient>
    </Pressable>
  );
}
