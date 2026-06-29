import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, fonts, shadows } from "../theme";

const WINDOW_WIDTH = Dimensions.get("window").width;
const CARD_PADDING = 16;
const CARD_GAP = 12;
const CARD_WIDTH = (WINDOW_WIDTH - CARD_PADDING * 2 - CARD_GAP * 3) / 4;

type LetterData = {
  upper: string;
  lower: string;
  romanization: string;
};

const MONGOLIAN_ALPHABET: LetterData[] = [
  { upper: "А", lower: "а", romanization: "a" },
  { upper: "Б", lower: "б", romanization: "b" },
  { upper: "В", lower: "в", romanization: "v" },
  { upper: "Г", lower: "г", romanization: "g" },
  { upper: "Д", lower: "д", romanization: "d" },
  { upper: "Е", lower: "е", romanization: "ye" },
  { upper: "Ё", lower: "ё", romanization: "yo" },
  { upper: "Ж", lower: "ж", romanization: "j" },
  { upper: "З", lower: "з", romanization: "z" },
  { upper: "И", lower: "и", romanization: "i" },
  { upper: "Й", lower: "й", romanization: "y" },
  { upper: "К", lower: "к", romanization: "k" },
  { upper: "Л", lower: "л", romanization: "l" },
  { upper: "М", lower: "м", romanization: "m" },
  { upper: "Н", lower: "н", romanization: "n" },
  { upper: "О", lower: "о", romanization: "o" },
  { upper: "Ө", lower: "ө", romanization: "ö" },
  { upper: "П", lower: "п", romanization: "p" },
  { upper: "Р", lower: "р", romanization: "r" },
  { upper: "С", lower: "с", romanization: "s" },
  { upper: "Т", lower: "т", romanization: "t" },
  { upper: "У", lower: "у", romanization: "u" },
  { upper: "Ү", lower: "ү", romanization: "ü" },
  { upper: "Х", lower: "х", romanization: "kh" },
  { upper: "Ц", lower: "ц", romanization: "ts" },
  { upper: "Ч", lower: "ч", romanization: "ch" },
  { upper: "Ш", lower: "ш", romanization: "sh" },
  { upper: "Щ", lower: "щ", romanization: "shch" },
  { upper: "Ъ", lower: "ъ", romanization: '"' },
  { upper: "Ы", lower: "ы", romanization: "y" },
  { upper: "Ь", lower: "ь", romanization: "'" },
  { upper: "Э", lower: "э", romanization: "e" },
  { upper: "Ю", lower: "ю", romanization: "yu" },
  { upper: "Я", lower: "я", romanization: "ya" },
];

const VOWELS: LetterData[] = [
  { upper: "А", lower: "а", romanization: "a" },
  { upper: "Э", lower: "э", romanization: "e" },
  { upper: "И", lower: "и", romanization: "i" },
  { upper: "О", lower: "о", romanization: "o" },
  { upper: "У", lower: "у", romanization: "u" },
  { upper: "Ү", lower: "ү", romanization: "ü" },
  { upper: "Е", lower: "е", romanization: "ye" },
  { upper: "Ё", lower: "ё", romanization: "yo" },
  { upper: "Ю", lower: "ю", romanization: "yu" },
  { upper: "Я", lower: "я", romanization: "ya" },
];

const STORAGE_KEY = "@alphabet_progress";

export default function AlphabetScreen() {
  const navigation = useNavigation();
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [progress, setProgress] = useState<Record<string, number>>({});

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProgress(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    }
  };

  const getLetterProgress = (letter: string): number => {
    return progress[letter] || 0;
  };

  const getProgressPercentage = (letter: string): number => {
    const level = getLetterProgress(letter);
    return (level / 3) * 100;
  };

  const handleLetterPress = (letter: LetterData) => {
    setSelectedLetter(letter.upper);

    (navigation as any).navigate("TraceLetter", { letter: letter.upper });
  };

  const renderLetterCard = (letter: LetterData, index: number) => {
    const level = getLetterProgress(letter.upper);
    const progressPercent = getProgressPercentage(letter.upper);
    const isStarted = level > 0;
    const isSelected = selectedLetter === letter.upper;

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.letterCard,
          isStarted && styles.letterCardStarted,
          isSelected && styles.letterCardSelected,
        ]}
        onPress={() => handleLetterPress(letter)}
        activeOpacity={0.7}
      >
        <Text style={styles.letterText}>
          {letter.upper}
          <Text style={styles.letterLower}>{letter.lower}</Text>
        </Text>
        <Text style={styles.romanization}>{letter.romanization}</Text>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[styles.progressBarFill, { width: `${progressPercent}%` }]}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerButton}>
            <Text style={styles.headerButtonText}>ҮСЭГ СУРАХ</Text>
          </View>
        </View>

        <View style={styles.gridContainer}>
          {MONGOLIAN_ALPHABET.map((letter, index) =>
            renderLetterCard(letter, index),
          )}
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <View style={styles.dividerLeft} />
            <Text style={styles.sectionTitle}>Эгшиг үсгүүд</Text>
            <View style={styles.dividerRight} />
          </View>

          <View style={styles.vowelGrid}>
            {VOWELS.map((letter, index) => renderLetterCard(letter, index))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.warm.beige,
  },
  scrollContent: {
    paddingHorizontal: CARD_PADDING,
    paddingTop: 16,
    paddingBottom: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerButton: {
    backgroundColor: colors.slate.DEFAULT,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    ...shadows.card,
  },
  headerButtonText: {
    fontFamily: fonts.fredoka.bold,
    fontSize: 18,
    color: colors.warm.card,
    letterSpacing: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: CARD_GAP,
  },
  letterCard: {
    width: CARD_WIDTH,
    backgroundColor: colors.warm.card,
    borderRadius: 12,
    padding: 8,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    borderColor: colors.warm.lightgray,
    minHeight: 100,
    ...shadows.cardSm,
  },
  letterCardStarted: {
    borderColor: colors.sand.DEFAULT,
  },
  letterCardSelected: {
    backgroundColor: colors.sand.lightest,
    borderColor: colors.sand.mid,
  },
  letterText: {
    fontFamily: fonts.fredoka.bold,
    fontSize: 32,
    color: colors.warm.text,
    marginTop: 4,
  },
  letterLower: {
    fontSize: 24,
    color: colors.warm.gray,
  },
  romanization: {
    fontFamily: fonts.lexend.medium,
    fontSize: 11,
    color: colors.warm.gray,
    marginTop: 2,
  },
  progressBarContainer: {
    width: "100%",
    marginTop: 8,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: colors.warm.secondary,
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: colors.sand.DEFAULT,
    borderRadius: 2,
  },
  sectionContainer: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLeft: {
    flex: 1,
    height: 1,
    backgroundColor: colors.warm.lightgray,
    marginRight: 12,
  },
  sectionTitle: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 16,
    color: colors.warm.text,
  },
  dividerRight: {
    flex: 1,
    height: 1,
    backgroundColor: colors.warm.lightgray,
    marginLeft: 12,
  },
  vowelGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: CARD_GAP,
  },
});
