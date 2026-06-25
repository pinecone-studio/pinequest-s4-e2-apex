import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import StatusBarRow from '../components/StatusBarRow';
import AppIcon from '../components/AppIcon';
import { colors, fonts, shadows } from '../theme';

const WORDS = ['Муур', 'бөмбөгтэй', 'тоглох', 'дуртай.'];

export default function ReadingScreen({ navigation }: { navigation: any }) {
  const [speed, setSpeed] = useState(45);
  const [activeWord, setActiveWord] = useState(0);
  const [dyslexia, setDyslexia] = useState(false);

  return (
    <View style={styles.root}>
      <StatusBarRow />

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <AppIcon name="arrowBack" size={20} color={colors.warm.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Унших хичээл</Text>
        <View style={[styles.iconBtn, { backgroundColor: colors.lavender.light }]}>
          <AppIcon name="settings" size={18} color={colors.lavender.dark} />
        </View>
      </View>
      <Text style={styles.subtitle}>6-р хичээл · «М» үсэг</Text>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Illustration */}
        <LinearGradient colors={['#F5EAD8', '#EDD8C6']} style={styles.illustration}>
          <View style={[styles.decoSmall, { top: 16, left: 24 }]}>
            <AppIcon name="sparkles" size={16} color="#E8B04A" />
          </View>
          <View style={[styles.decoSmall, { bottom: 20, right: 28 }]}>
            <AppIcon name="star" size={16} color="#F5B945" />
          </View>
          <Text style={{ fontSize: 100 }}>🐱</Text>
          <Text style={styles.illustrationWord}>Муур</Text>
          <Text style={styles.illustrationPhon}>М · уу · р</Text>
        </LinearGradient>

        {/* Sentence card */}
        <View style={styles.card}>
          <View style={styles.sentenceRow}>
            {WORDS.map((w, i) => (
              <Pressable key={i} onPress={() => setActiveWord(i)}>
                <Text
                  style={[
                    styles.word,
                    dyslexia && styles.wordDyslexia,
                    i === activeWord && styles.wordActive,
                  ]}
                >
                  {w}
                </Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.chipRow}>
            <View style={styles.chipLavender}>
              <Text style={styles.chipLavenderText}>Үгийг дарж сонс</Text>
            </View>
            <Pressable
              onPress={() => setDyslexia((d) => !d)}
              style={[styles.chipSage, !dyslexia && styles.chipSageOff]}
            >
              <Text style={[styles.chipSageText, !dyslexia && { color: colors.warm.gray }]}>
                Аа Дислекси горим
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Speed slider */}
        <View style={styles.speedRow}>
          <Text style={styles.speedLabel}>Хурд</Text>
          <Slider
            style={{ flex: 1 }}
            minimumValue={20}
            maximumValue={100}
            value={speed}
            onValueChange={setSpeed}
            minimumTrackTintColor={colors.slate.DEFAULT}
            maximumTrackTintColor="#E0D8CC"
            thumbTintColor={colors.slate.mid}
          />
          <Text style={styles.speedVal}>{(speed / 45).toFixed(1)}×</Text>
        </View>
      </ScrollView>

      {/* Buttons */}
      <View style={styles.actions}>
        <Pressable style={[styles.actionBtn, { backgroundColor: colors.slate.mid }]}>
          <AppIcon name="volume" size={18} color="#fff" />
          <Text style={styles.actionText}>Сонсох</Text>
        </Pressable>
        <Pressable style={[styles.actionBtn, { backgroundColor: colors.peach.dark }]}>
          <AppIcon name="mic" size={18} color="#fff" />
          <Text style={styles.actionText}>Унших</Text>
        </Pressable>
        <Pressable style={styles.nextBtn}>
          <AppIcon name="arrowForward" size={22} color="#fff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.warm.beige },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 6,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 16,
    backgroundColor: colors.warm.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  headerTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 18, color: colors.warm.text },
  subtitle: {
    fontFamily: fonts.lexend.regular,
    fontSize: 12,
    color: colors.warm.gray,
    textAlign: 'center',
    marginTop: 6,
  },
  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 120, gap: 16 },
  illustration: {
    borderRadius: 24,
    padding: 24,
    height: 224,
    alignItems: 'center',
    justifyContent: 'center',
  },
  decoSmall: { position: 'absolute', fontSize: 16, opacity: 0.5 },
  illustrationWord: { fontFamily: fonts.fredoka.bold, fontSize: 36, color: colors.warm.text, marginTop: 8 },
  illustrationPhon: { fontFamily: fonts.lexend.regular, fontSize: 14, color: '#8A7060', letterSpacing: 3, marginTop: 4 },
  card: { backgroundColor: colors.warm.card, borderRadius: 24, padding: 20, ...shadows.card },
  sentenceRow: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  word: {
    fontFamily: fonts.lexend.medium,
    fontSize: 24,
    color: colors.warm.text,
    marginRight: 8,
    marginBottom: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 8,
  },
  wordDyslexia: { letterSpacing: 2 },
  wordActive: { backgroundColor: colors.sand.DEFAULT, color: '#fff' },
  chipRow: { flexDirection: 'row', gap: 8, marginTop: 16, flexWrap: 'wrap' },
  chipLavender: { backgroundColor: colors.lavender.light, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  chipLavenderText: { fontFamily: fonts.lexend.semibold, fontSize: 12, color: colors.lavender.dark },
  chipSage: { backgroundColor: colors.sage.light, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  chipSageOff: { backgroundColor: 'rgba(216,232,212,0.6)' },
  chipSageText: { fontFamily: fonts.lexend.semibold, fontSize: 12, color: colors.sage.text },
  speedRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  speedLabel: { fontFamily: fonts.lexend.regular, fontSize: 12, color: colors.warm.gray },
  speedVal: { fontFamily: fonts.fredoka.semibold, fontSize: 12, color: colors.slate.dark, width: 36, textAlign: 'right' },
  actions: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 12,
  },
  actionBtn: { flex: 1, borderRadius: 24, paddingVertical: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, ...shadows.card },
  actionText: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: '#fff' },
  nextBtn: {
    width: 56,
    backgroundColor: colors.sand.DEFAULT,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sand,
  },
});
