'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, ScrollView, Pressable } from '../../rn/primitives';
import { LinearGradient } from '../../rn/LinearGradient';
import StatusBarRow from '../../components/StatusBarRow';
import AppIcon from '../../components/AppIcon';
import { colors, fonts, shadows } from '../../theme';

const FALLBACK = { proverb: 'Эрдэм номын далай гүн.', explanation: 'Сурах зүйл хязгааргүй их, тиймээс байнга суралцах хэрэгтэй.' };

export default function ProverbScreen() {
  const router = useRouter();
  const [proverb, setProverb] = useState(FALLBACK.proverb);
  const [explanation, setExplanation] = useState(FALLBACK.explanation);
  const [showMeaning, setShowMeaning] = useState(false);
  const [ttsBusy, setTtsBusy] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const load = async () => {
    setShowMeaning(false);
    try {
      const r = await fetch('/api/proverb', { method: 'POST' });
      const d = await r.json();
      if (typeof d.proverb === 'string' && d.proverb.trim()) setProverb(d.proverb.trim());
      if (typeof d.explanation === 'string' && d.explanation.trim()) setExplanation(d.explanation.trim());
    } catch {
      // fallback хэвээр
    }
  };

  useEffect(() => {
    load();
  }, []);

  const speak = async (text: string) => {
    if (ttsBusy) return;
    setTtsBusy(true);
    try {
      audioRef.current?.pause();
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error('tts');
      const url = URL.createObjectURL(await res.blob());
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => {
        setTtsBusy(false);
        URL.revokeObjectURL(url);
      };
      audio.onerror = () => setTtsBusy(false);
      await audio.play();
    } catch {
      setTtsBusy(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.warm.beige }}>
      <StatusBarRow />

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 8 }}>
        <Pressable
          style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.warm.card }}
          onPress={() => router.back()}
        >
          <AppIcon name="arrowBack" size={20} color={colors.warm.text} />
        </Pressable>
        <Text style={{ fontFamily: fonts.fredoka.bold, fontSize: 18, color: colors.warm.text }}>Зүйр цэцэн үг</Text>
        <Pressable
          style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.lavender.light }}
          onPress={load}
        >
          <AppIcon name="repeat" size={18} color={colors.lavender.dark} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 40, gap: 16 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 13, color: colors.warm.gray }}>Уншаад утгыг нь олж үзээрэй</Text>

        <LinearGradient colors={['#F5EAD8', '#EDD8C6']} style={{ borderRadius: 20, padding: 28, alignItems: 'center', ...shadows.peach }}>
          <Text style={{ fontFamily: fonts.lexend.semibold, fontSize: 22, color: colors.warm.text, textAlign: 'center', lineHeight: 36 }}>
            «{proverb}»
          </Text>
        </LinearGradient>

        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            paddingVertical: 14,
            borderRadius: 16,
            backgroundColor: colors.slate.mid,
            opacity: ttsBusy ? 0.6 : 1,
          }}
          onPress={() => speak(proverb)}
          disabled={ttsBusy}
        >
          <AppIcon name="volume" size={18} color="#fff" />
          <Text style={{ fontFamily: fonts.fredoka.semibold, fontSize: 15, color: '#fff' }}>
            {ttsBusy ? 'Уншиж байна…' : 'Сонсох'}
          </Text>
        </Pressable>

        <Pressable
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            paddingVertical: 14,
            borderRadius: 16,
            backgroundColor: colors.warm.card,
            borderWidth: 1,
            borderColor: colors.peach.light,
          }}
          onPress={() => setShowMeaning((s) => !s)}
        >
          <AppIcon name="brain" size={18} color={colors.peach.dark} />
          <Text style={{ fontFamily: fonts.fredoka.semibold, fontSize: 15, color: colors.peach.dark }}>
            {showMeaning ? 'Утгыг нуух' : 'Үгийн утга харах'}
          </Text>
        </Pressable>

        {showMeaning && (
          <View style={{ borderRadius: 16, padding: 16, backgroundColor: colors.warm.card, gap: 10, ...shadows.card }}>
            <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 15, color: colors.warm.text, lineHeight: 24 }}>
              {explanation}
            </Text>
            <Pressable
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', opacity: ttsBusy ? 0.6 : 1 }}
              onPress={() => speak(explanation)}
              disabled={ttsBusy}
            >
              <AppIcon name="volume" size={16} color={colors.slate.dark} />
              <Text style={{ fontFamily: fonts.fredoka.semibold, fontSize: 13, color: colors.slate.dark }}>Утгыг сонсох</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
