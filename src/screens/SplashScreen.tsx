import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LexiBot from '../components/LexiBot';
import AppIcon from '../components/AppIcon';
import { colors, fonts, shadows } from '../theme';
import { useChild } from '../hooks/useChild';

export default function SplashScreen({ navigation }: { navigation: any }) {
  const shimmer = useRef(new Animated.Value(0)).current;
  const { child, loading } = useChild();
  const navigatedRef = useRef(false);
  const [minElapsed, setMinElapsed] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const t = setTimeout(() => setMinElapsed(true), 2200);
    return () => clearTimeout(t);
  }, [shimmer]);

  // Once the splash has shown long enough and the learner profile has loaded,
  // route first-time users to the Lexi-AI dyslexia test, returners to the app.
  useEffect(() => {
    if (navigatedRef.current || !minElapsed || loading) return;
    navigatedRef.current = true;
    if (child && !child.dyslexiaTestDone) {
      navigation.replace('DyslexiaTest', { onboarding: true });
    } else {
      navigation.replace('Main');
    }
  }, [minElapsed, loading, child, navigation]);

  return (
    <LinearGradient colors={['#F0E6D8', '#FAF0E8', '#FFFDF8']} style={styles.container}>
      {/* Decorations */}
      <View style={[styles.deco, { top: 112, left: 32 }]}>
        <AppIcon name="sparkles" size={24} color="#E8B04A" />
      </View>
      <View style={[styles.deco, { top: 208, right: 40 }]}>
        <AppIcon name="star" size={20} color="#F5B945" />
      </View>
      <View style={[styles.deco, { top: 320, left: 48 }]}>
        <AppIcon name="sparkles" size={18} color="#C4A8E0" />
      </View>
      <View style={[styles.deco, { top: 96, right: 32 }]}>
        <AppIcon name="cloud" size={30} color="#CFE0EA" />
      </View>
      <View style={[styles.deco, { top: 256, left: 16 }]}>
        <AppIcon name="cloud" size={24} color="#E0D8CC" />
      </View>

      {/* Logo */}
      <View style={styles.logoWrap}>
        <View style={styles.logoCard}>
          <LinearGradient colors={['#E8D8C3', '#D8A48F']} style={styles.logoIcon}>
            <AppIcon name="book" size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.logoText}>
            LEXI <Text style={{ color: colors.peach.dark }}>AI</Text>
          </Text>
        </View>
        <Text style={styles.tagline}>Хамтдаа унших сурцгаая</Text>
      </View>

      {/* Bot */}
      <LexiBot size="lg" animate="bob" />

      {/* Progress */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <LinearGradient
            colors={['#D8A48F', '#E8D8C3', '#B8C9B0', '#CFC7E8', '#D8A48F']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.progressFill}
          />
        </View>
        <Text style={styles.progressText}>Адал явдлыг чинь бэлдэж байна…</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 64,
  },
  deco: { position: 'absolute' },
  logoWrap: { alignItems: 'center', marginTop: 96, gap: 16 },
  logoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.warm.card,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
    ...shadows.lavender,
  },
  logoIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontFamily: fonts.fredoka.bold,
    fontSize: 36,
    color: colors.lavender.dark,
  },
  tagline: {
    fontFamily: fonts.fredoka.medium,
    fontSize: 20,
    color: colors.warm.text,
    textAlign: 'center',
  },
  progressWrap: { width: '100%', paddingHorizontal: 48, paddingBottom: 16 },
  progressTrack: {
    height: 14,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  progressFill: { height: '100%', width: '66%', borderRadius: 999 },
  progressText: {
    textAlign: 'center',
    marginTop: 12,
    fontFamily: fonts.lexend.regular,
    fontSize: 14,
    color: '#5B6472',
  },
});
