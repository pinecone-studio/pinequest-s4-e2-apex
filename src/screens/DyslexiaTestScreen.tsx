import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, fonts, shadows } from '../theme';
import { useChild } from '../hooks/useChild';
import { api, DyslexiaRisk } from '../lib/api';
import { SKILL_AREAS, SkillArea } from '../lib/dyslexia';

type TaskAnswer = boolean | null;

const TASKS = [
  {
    id: 1,
    type: 'sound-matching',
    instruction: "Аль нь 'Б' авиагаар эхэлж байна вэ?",
    options: [
      { emoji: '🍎', label: 'Алим', correct: false },
      { emoji: '🎈', label: 'Бөмбөг', correct: true },
      { emoji: '🚗', label: 'Машин', correct: false },
    ],
  },
  {
    id: 2,
    type: 'syllable-counting',
    instruction: 'ТЭМЭЭ гэдэг үгийг үеэр тас — хэдэн үе байна вэ?',
    word: 'ТЭМЭЭ',
    options: [
      { label: '1', correct: false },
      { label: '2', correct: true },
      { label: '3', correct: false },
    ],
  },
  {
    id: 3,
    type: 'sound-blending',
    instruction: 'М … А … Т … А … Р — ямар үг вэ?',
    options: [
      { label: 'МАТАР', correct: true },
      { label: 'МОРЬ', correct: false },
      { label: 'НОХОЙ', correct: false },
    ],
  },
  {
    id: 4,
    type: 'sentence-repetition',
    instruction: 'Бага хүү бариулыг барив — дагаад хэлээрэй.',
    parentJudge: true,
  },
  {
    id: 5,
    type: 'mirror-discrimination',
    instruction: 'Ганцаараа өөр зүг рүү сэлж байгаа загасыг дараарай.',
    fishExample: '→',
    options: [
      { fish: '→', correct: false },
      { fish: '←', correct: true },
      { fish: '→', correct: false },
    ],
  },
  {
    id: 6,
    type: 'orientation',
    instruction: 'Баруун гараа өргөөрэй. Зүүн чихээ бариарай.',
    parentJudge: true,
  },
];

export default function DyslexiaTestScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const onboarding = route.params?.onboarding === true;
  const { child, refresh } = useChild();
  const [currentTask, setCurrentTask] = useState(0);
  const [answers, setAnswers] = useState<TaskAnswer[]>(Array(6).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [saved, setSaved] = useState(false);
  const fadeAnim = useState(new Animated.Value(1))[0];

  const task = TASKS[currentTask];

  const handleAnswer = (isCorrect: boolean) => {
    const newAnswers = [...answers];
    newAnswers[currentTask] = isCorrect;
    setAnswers(newAnswers);

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      if (currentTask < TASKS.length - 1) {
        setCurrentTask(currentTask + 1);
      } else {
        setShowResult(true);
      }
    }, 300);
  };

  const wrongCount = answers.filter((a) => a === false).length;
  const score = 6 - wrongCount;
  const risk: DyslexiaRisk = wrongCount <= 1 ? 'low' : wrongCount <= 3 ? 'medium' : 'high';

  // Буруу хариулсан даалгаврууд → сул ур чадварын төрлүүд. Үр дүнгийн зөвлөмж
  // болон цаашдын хичээлийг хүүхэд бүрд тааруулахад ашиглана.
  const weakAreas = TASKS.filter((t, i) => answers[i] === false).map(
    (t) => t.type as SkillArea
  );

  // When the test finishes, persist the result to the backend (and mark the
  // onboarding test as done so the learner isn't asked again next time).
  useEffect(() => {
    if (!showResult || saved || !child?.clerkId) return;
    setSaved(true);
    const answerPayload = TASKS.map((t, i) => ({
      type: t.type,
      correct: answers[i] === true,
    }));
    api
      .saveDyslexiaResult(child.clerkId, { score, risk, answers: answerPayload })
      .then(() => refresh())
      .catch((e) => console.warn('Дислекси үр дүн хадгалахад алдаа:', e));
  }, [showResult, saved, child, score, risk, refresh]);

  const resultColor =
    wrongCount <= 1 ? colors.sage.DEFAULT : wrongCount <= 3 ? colors.sand.DEFAULT : colors.peach.DEFAULT;
  const resultText =
    wrongCount <= 1
      ? 'Маш сайн! Хүүхэд хэвийн хөгжиж байна.'
      : wrongCount <= 3
      ? 'Зарим дасгал хэрэгтэй байж болзошгүй. Өдөр бүр авиан тоглоом тоглоорой.'
      : 'Дислексийн эрт илрүүлгийн шинж тэмдэг ажиглагдаж байна. Мэргэжилтэнтэй зөвлөлдөхийг зөвлөж байна.';

  if (showResult) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView contentContainerStyle={styles.resultContainer}>
          <View style={[styles.resultCard, { backgroundColor: resultColor }]}>
            <Text style={styles.resultTitle}>Шалгалт дууссан</Text>
            <Text style={styles.resultScore}>
              {6 - wrongCount}/6 зөв
            </Text>
          </View>

          <View style={styles.feedbackCard}>
            <Text style={styles.feedbackText}>{resultText}</Text>
          </View>

          {weakAreas.length > 0 ? (
            <View style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>Анхаарах ур чадвар:</Text>
              {weakAreas.map((area) => {
                const meta = SKILL_AREAS[area];
                if (!meta) return null;
                return (
                  <View key={area} style={styles.weakItem}>
                    <Text style={styles.weakLabel}>
                      {meta.emoji} {meta.label}
                    </Text>
                    <Text style={styles.tipItem}>• {meta.tip}</Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>Эцэг эхийн зөвлөмж:</Text>
              <Text style={styles.tipItem}>• Өдөр бүр шүлэг, хэл зүгшрүүлэх үг дасгалла</Text>
              <Text style={styles.tipItem}>• Дуут үлгэр сонсго, дагуулж хэлүүл</Text>
              <Text style={styles.tipItem}>• Үсэг, авиатай тоглоом тоглоорой</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.doneButton}
            onPress={() => (onboarding ? navigation.replace('Main') : navigation.goBack())}
          >
            <Text style={styles.doneButtonText}>{onboarding ? 'Эхлэх' : 'Дуусгах'}</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        {onboarding ? (
          <View style={{ width: 32 }} />
        ) : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
        )}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentTask + 1) / 6) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            Даалгавар {currentTask + 1} / 6
          </Text>
        </View>
        <View style={{ width: 32 }} />
      </View>

      <Animated.View style={[styles.taskContainer, { opacity: fadeAnim }]}>
        <View style={styles.instructionBox}>
          <View style={styles.instructionHeader}>
            <Text style={styles.instructionLabel}>📖 Заавар:</Text>
          </View>
          <Text style={styles.instruction}>{task.instruction}</Text>
          <Text style={styles.instructionNote}>
            Эцэг эх заавар уншиж, хүүхдэд тайлбарлана уу.
          </Text>
        </View>

        {task.type === 'sound-matching' && (
          <View style={styles.optionsGrid}>
            {task.options?.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.emojiButton}
                onPress={() => handleAnswer(option.correct)}
              >
                <Text style={styles.emoji}>{option.emoji}</Text>
                <Text style={styles.emojiLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {task.type === 'syllable-counting' && (
          <View style={styles.centerContent}>
            <Text style={styles.largeWord}>{task.word}</Text>
            <View style={styles.numberRow}>
              {task.options?.map((option, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.numberButton}
                  onPress={() => handleAnswer(option.correct)}
                >
                  <Text style={styles.numberText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {task.type === 'sound-blending' && (
          <View style={styles.optionsColumn}>
            {task.options?.map((option, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.wordButton}
                onPress={() => handleAnswer(option.correct)}
              >
                <Text style={styles.wordButtonText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {task.type === 'sentence-repetition' && (
          <View style={styles.judgeContainer}>
            <TouchableOpacity
              style={[styles.judgeButton, styles.judgeCorrect]}
              onPress={() => handleAnswer(true)}
            >
              <Text style={styles.judgeEmoji}>✅</Text>
              <Text style={styles.judgeText}>Зөв хэлсэн</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.judgeButton, styles.judgeWrong]}
              onPress={() => handleAnswer(false)}
            >
              <Text style={styles.judgeEmoji}>❌</Text>
              <Text style={styles.judgeText}>Алдаатай хэлсэн</Text>
            </TouchableOpacity>
          </View>
        )}

        {task.type === 'mirror-discrimination' && (
          <View style={styles.centerContent}>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleLabel}>Жишээ:</Text>
              <Text style={styles.fishLarge}>🐟</Text>
            </View>
            <View style={styles.fishGrid}>
              {task.options?.map((option, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.fishButton}
                  onPress={() => handleAnswer(option.correct)}
                >
                  <Text style={[styles.fishIcon, option.fish === '←' && styles.fishFlipped]}>
                    🐟
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {task.type === 'orientation' && (
          <View style={styles.judgeContainer}>
            <TouchableOpacity
              style={[styles.judgeButton, styles.judgeCorrect]}
              onPress={() => handleAnswer(true)}
            >
              <Text style={styles.judgeEmoji}>✅</Text>
              <Text style={styles.judgeText}>Зөв хийсэн</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.judgeButton, styles.judgeWrong]}
              onPress={() => handleAnswer(false)}
            >
              <Text style={styles.judgeEmoji}>❌</Text>
              <Text style={styles.judgeText}>Андуурсан</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.warm.beige,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  backButton: {
    fontSize: 32,
    color: colors.warm.dark,
  },
  progressContainer: {
    flex: 1,
    gap: 4,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.warm.secondary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.lavender.mid,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 13,
    fontFamily: fonts.lexend.medium,
    color: colors.warm.gray,
    textAlign: 'center',
  },
  speakerButton: {
    fontSize: 28,
  },
  speakerDisabled: {
    opacity: 0.5,
  },
  taskContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  instructionBox: {
    backgroundColor: colors.lavender.lightest,
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: colors.lavender.light,
  },
  instructionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  instructionLabel: {
    fontSize: 14,
    fontFamily: fonts.lexend.semibold,
    color: colors.lavender.dark,
    textTransform: 'uppercase',
  },
  playingIndicator: {
    fontSize: 11,
    fontFamily: fonts.lexend.medium,
    color: colors.lavender.mid,
  },
  instruction: {
    fontSize: 20,
    fontFamily: fonts.fredoka.semibold,
    color: colors.warm.text,
    lineHeight: 30,
    marginBottom: 8,
  },
  instructionNote: {
    fontSize: 12,
    fontFamily: fonts.lexend.regular,
    color: colors.warm.gray,
    fontStyle: 'italic',
  },
  optionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 16,
  },
  emojiButton: {
    backgroundColor: colors.warm.card,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    minWidth: 100,
    minHeight: 120,
    justifyContent: 'center',
    ...shadows.card,
  },
  emoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  emojiLabel: {
    fontSize: 18,
    fontFamily: fonts.fredoka.medium,
    color: colors.warm.text,
  },
  centerContent: {
    alignItems: 'center',
    gap: 32,
  },
  largeWord: {
    fontSize: 48,
    fontFamily: fonts.fredoka.bold,
    color: colors.lavender.dark,
  },
  numberRow: {
    flexDirection: 'row',
    gap: 20,
  },
  numberButton: {
    backgroundColor: colors.warm.card,
    borderRadius: 20,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  numberText: {
    fontSize: 36,
    fontFamily: fonts.fredoka.bold,
    color: colors.warm.text,
  },
  optionsColumn: {
    gap: 16,
  },
  wordButton: {
    backgroundColor: colors.warm.card,
    borderRadius: 16,
    paddingVertical: 24,
    alignItems: 'center',
    ...shadows.card,
  },
  wordButtonText: {
    fontSize: 28,
    fontFamily: fonts.fredoka.semibold,
    color: colors.warm.text,
  },
  judgeContainer: {
    gap: 20,
    paddingTop: 40,
  },
  judgeButton: {
    borderRadius: 20,
    paddingVertical: 32,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    ...shadows.card,
  },
  judgeCorrect: {
    backgroundColor: colors.sage.light,
  },
  judgeWrong: {
    backgroundColor: colors.peach.light,
  },
  judgeEmoji: {
    fontSize: 40,
  },
  judgeText: {
    fontSize: 22,
    fontFamily: fonts.fredoka.semibold,
    color: colors.warm.text,
  },
  exampleBox: {
    backgroundColor: colors.lavender.lightest,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    ...shadows.cardSm,
  },
  exampleLabel: {
    fontSize: 16,
    fontFamily: fonts.lexend.medium,
    color: colors.warm.gray,
    marginBottom: 8,
  },
  fishLarge: {
    fontSize: 64,
  },
  fishGrid: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  fishButton: {
    backgroundColor: colors.warm.card,
    borderRadius: 20,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  fishIcon: {
    fontSize: 56,
  },
  fishFlipped: {
    transform: [{ scaleX: -1 }],
  },
  resultContainer: {
    padding: 20,
    gap: 20,
  },
  resultCard: {
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    ...shadows.card,
  },
  resultTitle: {
    fontSize: 24,
    fontFamily: fonts.fredoka.bold,
    color: colors.warm.text,
    marginBottom: 12,
  },
  resultScore: {
    fontSize: 48,
    fontFamily: fonts.fredoka.bold,
    color: colors.warm.dark,
  },
  feedbackCard: {
    backgroundColor: colors.warm.card,
    borderRadius: 20,
    padding: 24,
    ...shadows.card,
  },
  feedbackText: {
    fontSize: 18,
    fontFamily: fonts.lexend.medium,
    color: colors.warm.text,
    lineHeight: 28,
    textAlign: 'center',
  },
  tipsCard: {
    backgroundColor: colors.lavender.lightest,
    borderRadius: 20,
    padding: 24,
    ...shadows.cardSm,
  },
  tipsTitle: {
    fontSize: 20,
    fontFamily: fonts.fredoka.semibold,
    color: colors.lavender.darker,
    marginBottom: 16,
  },
  tipItem: {
    fontSize: 16,
    fontFamily: fonts.lexend.regular,
    color: colors.warm.text,
    lineHeight: 26,
    marginBottom: 8,
  },
  weakItem: {
    marginBottom: 12,
  },
  weakLabel: {
    fontSize: 16,
    fontFamily: fonts.lexend.semibold,
    color: colors.lavender.darker,
    marginBottom: 4,
  },
  doneButton: {
    backgroundColor: colors.lavender.mid,
    borderRadius: 16,
    paddingVertical: 20,
    alignItems: 'center',
    marginTop: 12,
    ...shadows.lavender,
  },
  doneButtonText: {
    fontSize: 18,
    fontFamily: fonts.fredoka.semibold,
    color: colors.warm.card,
  },
});
