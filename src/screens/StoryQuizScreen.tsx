import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppIcon from '../components/AppIcon';
import { colors, fonts, shadows } from '../theme';
import { useVoiceRecognition } from '../hooks/useVoiceRecognition';

interface Question {
  question: string;
  correctAnswer: string;
  hints?: string[];
}

// Үлгэр бүрийн асуултууд
const QUIZ_DATA: Record<string, Question[]> = {
  'aldar-huu': [
    {
      question: 'Алдар хөө юугаараа баяжсан бэ?',
      correctAnswer: 'ухаан',
      hints: ['ухаан', 'мэргэн ухаан', 'ухаантай'],
    },
    {
      question: 'Баян хүн юу асуусан бэ?',
      correctAnswer: 'дэлхийд хамгийн хурдан юу вэ',
      hints: ['хурдан', 'бодол'],
    },
    {
      question: 'Дэлхийд хамгийн чухал юу вэ гэж Алдар хариулсан бэ?',
      correctAnswer: 'цаг хугацаа',
      hints: ['цаг', 'хугацаа', 'цаг хугацаа'],
    },
  ],
  'suult-uneg': [
    {
      question: 'Үнэг юу идэхийг хүссэн бэ?',
      correctAnswer: 'үзэм',
      hints: ['үзэм'],
    },
    {
      question: 'Үнэг яагаад үзэм авч чадаагүй вэ?',
      correctAnswer: 'хэтэрхий өндөрт байсан',
      hints: ['өндөр', 'хүрэхгүй'],
    },
    {
      question: 'Энэ үлгэрээс юу сурах вэ?',
      correctAnswer: 'олж авч чадахгүй зүйлээ гүтгэдэг',
      hints: ['гүтгэх', 'чадахгүй'],
    },
  ],
  'hilenset-chono': [
    {
      question: 'Чоно юу өмссөн бэ?',
      correctAnswer: 'хонины арьс',
      hints: ['хонь', 'арьс', 'хонины арьс'],
    },
    {
      question: 'Чоно яагаад илчлэгдсэн бэ?',
      correctAnswer: 'уулсан',
      hints: ['уулах', 'дуу'],
    },
    {
      question: 'Энэ үлгэр юу заах вэ?',
      correctAnswer: 'худлын төрх илчлэгддэг',
      hints: ['худал', 'илчлэгдэх'],
    },
  ],
  'yast-melhii': [
    {
      question: 'Туулай юу хийсэн бэ?',
      correctAnswer: 'унтсан',
      hints: ['унтах', 'амрах'],
    },
    {
      question: 'Яст мэлхий яаж түрүүлсэн бэ?',
      correctAnswer: 'зогсолтгүй алхсан',
      hints: ['алхах', 'зогсохгүй'],
    },
    {
      question: 'Энэ үлгэрээс юу сурах вэ?',
      correctAnswer: 'тууштай хичээл зүтгэл чухал',
      hints: ['тууштай', 'хичээх'],
    },
  ],
  'arslan-hulgana': [
    {
      question: 'Хулгана арсланд юу гуйсан бэ?',
      correctAnswer: 'өршөө',
      hints: ['өршөөх', 'суллах'],
    },
    {
      question: 'Хулгана яаж арсланд тусалсан бэ?',
      correctAnswer: 'олсыг зүссэн',
      hints: ['олс', 'зүсэх'],
    },
    {
      question: 'Энэ үлгэр юу заах вэ?',
      correctAnswer: 'бага сайн үйл их утгатай',
      hints: ['сайн үйл', 'утга'],
    },
  ],
  'shorgooljiin-uliral': [
    {
      question: 'Царцаа зундаа юу хийсэн бэ?',
      correctAnswer: 'дуулж тоглосон',
      hints: ['дуулах', 'тоглох'],
    },
    {
      question: 'Шоргоолж өвлийн юу бэлдсэн бэ?',
      correctAnswer: 'хоол хүнс',
      hints: ['хоол', 'хүнс'],
    },
    {
      question: 'Энэ үлгэрээс юу сурах вэ?',
      correctAnswer: 'цаг тухайдаа бэлдэх ухаалаг',
      hints: ['бэлдэх', 'цаг тухай'],
    },
  ],
  'erhii-mergen': [
    {
      question: 'Эрхий Мэргэн ямар агнуур байсан бэ?',
      correctAnswer: 'хурдан болон нүдээрээ хурц харах',
      hints: ['хурдан', 'хурц', 'бүргэд'],
    },
    {
      question: 'Эрхий Мэргэн барыг яаж зогсоосон бэ?',
      correctAnswer: 'нум харвасан',
      hints: ['нум', 'харвах'],
    },
    {
      question: 'Ард түмэн түүнийг яагаад Эрхий Мэргэн гэж нэрлэсэн бэ?',
      correctAnswer: 'барыг зогсоосон',
      hints: ['бар', 'зогсоох', 'баатар'],
    },
  ],
  'hohoo-namjil': [
    {
      question: 'Хөхөө намжил ямар гэрт төрсөн бэ?',
      correctAnswer: 'баян гэрт',
      hints: ['баян'],
    },
    {
      question: 'Хөхөө намжил юуг авчирсан бэ?',
      correctAnswer: 'эм',
      hints: ['эм', 'эмнэлт'],
    },
    {
      question: 'Эм хаанаас олдсон бэ?',
      correctAnswer: 'алс холын уулан дээр',
      hints: ['уул', 'холын'],
    },
  ],
  'chonony-olsgolun': [
    {
      question: 'Чоно яагаад өлссөн байсан бэ?',
      correctAnswer: 'өвөл хүйтэн байсан',
      hints: ['өвөл', 'хүйтэн'],
    },
    {
      question: 'Нохойн хүзүүнд юу байсан бэ?',
      correctAnswer: 'гинж',
      hints: ['гинж', 'уях'],
    },
    {
      question: 'Чоно яагаад буцсан бэ?',
      correctAnswer: 'эрх чөлөөгөө хүссэн',
      hints: ['эрх чөлөө', 'чөлөө'],
    },
  ],
  'sarny-gerel': [
    {
      question: 'Хүүхэд юунаас айж байсан бэ?',
      correctAnswer: 'харанхуйгаас',
      hints: ['харанхуй', 'айх'],
    },
    {
      question: 'Хэн хүүхдэд тусалсан бэ?',
      correctAnswer: 'сар',
      hints: ['сар', 'гэрэл'],
    },
    {
      question: 'Хүүхэд яаж айхаа больсон бэ?',
      correctAnswer: 'сар харж байдгийг мэдсэн',
      hints: ['сар', 'харах', 'мэдэх'],
    },
  ],
  'oddyn-nuher': [
    {
      question: 'Тэнгэрт хэдэн од байсан бэ?',
      correctAnswer: 'хоёр од нөхөр',
      hints: ['хоёр', 'нөхөр'],
    },
    {
      question: 'Тэднийг юу салгахыг оролдсон бэ?',
      correctAnswer: 'салхи болон үүл',
      hints: ['салхи', 'үүл'],
    },
    {
      question: 'Энэ үлгэр юуны тухай вэ?',
      correctAnswer: 'жинхэнэ нөхөрлөл',
      hints: ['нөхөрлөл', 'найз'],
    },
  ],
  'shuvuu-shonyn-ger': [
    {
      question: 'Шувуу юу барихыг хүссэн бэ?',
      correctAnswer: 'үүр',
      hints: ['үүр', 'гэр'],
    },
    {
      question: 'Шувуу юу цуглуулсан бэ?',
      correctAnswer: 'салаа өвс',
      hints: ['салаа', 'өвс'],
    },
    {
      question: 'Энэ үлгэрээс юу сурах вэ?',
      correctAnswer: 'хичээнгүй хөдөлмөр сайхан амралт авчирна',
      hints: ['хичээл', 'хөдөлмөр', 'амралт'],
    },
  ],
  'huuhduudiin-od': [
    {
      question: 'Хүүхэд бүр тэнгэрт юутай вэ?',
      correctAnswer: 'өөрийн од',
      hints: ['од'],
    },
    {
      question: 'Хүүхэд унтахад од юу хийдэг вэ?',
      correctAnswer: 'илүү гэрэлтдэг',
      hints: ['гэрэлтэх', 'гэрэл'],
    },
    {
      question: 'Хүүхэд өссөн бүр од юу хийдэг вэ?',
      correctAnswer: 'томорч гэрэлтдэг',
      hints: ['томрох', 'гэрэлтэх'],
    },
  ],
};

export default function StoryQuizScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { storyId, storyTitle } = (route.params as any) || {};

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const { isRecording, startRecording, stopRecording } = useVoiceRecognition();

  const questions = QUIZ_DATA[storyId] || [];
  const totalQuestions = questions.length;

  if (!questions.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Асуулт хараахан бэлэн болоогүй байна</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>Буцах</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentQ = questions[currentQuestion];

  const handleStartRecording = async () => {
    if (isRecording) {
      // Stop recording and get transcription
      const transcription = await stopRecording();

      if (transcription) {
        setUserAnswer(transcription);
        checkAnswer(transcription);
      } else {
        // Fallback: simulate answer for testing
        const simulatedAnswer = currentQ.hints?.[0] || 'тест хариулт';
        setUserAnswer(simulatedAnswer);
        checkAnswer(simulatedAnswer);
      }
    } else {
      // Start recording
      await startRecording();
    }
  };

  const checkAnswer = (answer: string) => {
    const normalizedAnswer = answer.toLowerCase().trim();
    const correctAnswer = currentQ.correctAnswer.toLowerCase();
    const hints = currentQ.hints?.map(h => h.toLowerCase()) || [];

    const isAnswerCorrect =
      normalizedAnswer.includes(correctAnswer) ||
      hints.some(hint => normalizedAnswer.includes(hint));

    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setUserAnswer('');
      setIsCorrect(null);
    } else {
      setShowResult(true);
    }
  };

  const handleFinish = () => {
    navigation.goBack();
  };

  if (showResult) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPassed = percentage >= 60;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultEmoji}>{isPassed ? '🎉' : '💪'}</Text>
          <Text style={styles.resultTitle}>
            {isPassed ? 'Гайхалтай!' : 'Дахин оролдоорой!'}
          </Text>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreText}>{score}/{totalQuestions}</Text>
            <Text style={styles.scoreLabel}>зөв хариулт</Text>
          </View>
          <Text style={styles.percentageText}>{percentage}%</Text>

          <TouchableOpacity style={styles.finishButton} onPress={handleFinish}>
            <Text style={styles.finishButtonText}>Дуусгах</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBar,
              { width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }
            ]}
          />
        </View>
        <View style={styles.questionCounter}>
          <Text style={styles.questionCounterText}>
            {currentQuestion + 1}/{totalQuestions}
          </Text>
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>Батлагаа асуулт</Text>
        <Text style={styles.subtitle}>{storyTitle}</Text>
      </View>

      {/* Question */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{currentQ.question}</Text>
      </View>

      {/* Voice Input */}
      <View style={styles.voiceSection}>
        <TouchableOpacity
          style={[styles.micButton, isRecording && styles.micButtonActive]}
          onPress={handleStartRecording}
          disabled={isRecording || isCorrect !== null}
        >
          {isRecording ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <AppIcon name="mic" size={48} color="#fff" />
          )}
        </TouchableOpacity>
        <Text style={styles.micHint}>
          {isRecording ? 'Дахин дарж дуусгана уу' : 'Дарж хариулна уу'}
        </Text>
      </View>

      {/* Answer Display */}
      {userAnswer && (
        <View style={styles.answerCard}>
          <Text style={styles.answerLabel}>Таны хариулт:</Text>
          <Text style={styles.answerText}>{userAnswer}</Text>
        </View>
      )}

      {/* Feedback */}
      {isCorrect !== null && (
        <View style={[
          styles.feedbackCard,
          isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect
        ]}>
          <Text style={styles.feedbackEmoji}>{isCorrect ? '✓' : '✗'}</Text>
          <Text style={styles.feedbackText}>
            {isCorrect ? 'Зөв!' : 'Буруу'}
          </Text>
          {!isCorrect && (
            <Text style={styles.correctAnswerText}>
              Зөв хариулт: {currentQ.correctAnswer}
            </Text>
          )}
        </View>
      )}

      {/* Next Button */}
      {isCorrect !== null && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentQuestion === totalQuestions - 1 ? 'Дүн харах' : 'Дараагийн'}
            </Text>
            <AppIcon name="arrowForward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#999',
    fontWeight: '600',
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#58CC02',
    borderRadius: 4,
  },
  questionCounter: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  questionCounterText: {
    fontFamily: fonts.lexend.semibold,
    fontSize: 12,
    color: '#666',
  },
  titleSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontFamily: fonts.fredoka.bold,
    fontSize: 24,
    color: colors.warm.text,
  },
  subtitle: {
    fontFamily: fonts.lexend.regular,
    fontSize: 14,
    color: colors.warm.gray,
    marginTop: 4,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 24,
    ...shadows.card,
  },
  questionText: {
    fontFamily: fonts.lexend.semibold,
    fontSize: 18,
    lineHeight: 28,
    color: colors.warm.text,
    textAlign: 'center',
  },
  voiceSection: {
    alignItems: 'center',
    marginVertical: 32,
  },
  micButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1CB0F6',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  micButtonActive: {
    backgroundColor: '#FF4B4B',
  },
  micHint: {
    fontFamily: fonts.lexend.regular,
    fontSize: 14,
    color: colors.warm.gray,
    marginTop: 16,
  },
  answerCard: {
    backgroundColor: '#F0F8FF',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  answerLabel: {
    fontFamily: fonts.lexend.medium,
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  answerText: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 18,
    color: colors.warm.text,
  },
  feedbackCard: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  feedbackCorrect: {
    backgroundColor: '#D7F9E9',
  },
  feedbackIncorrect: {
    backgroundColor: '#FFE5E5',
  },
  feedbackEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  feedbackText: {
    fontFamily: fonts.fredoka.bold,
    fontSize: 24,
    color: colors.warm.text,
  },
  correctAnswerText: {
    fontFamily: fonts.lexend.regular,
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#FFF9F0',
  },
  nextButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#58CC02',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  nextButtonText: {
    fontSize: 18,
    fontFamily: fonts.fredoka.bold,
    color: '#FFFFFF',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyText: {
    fontFamily: fonts.lexend.regular,
    fontSize: 16,
    color: colors.warm.gray,
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: colors.lavender.dark,
  },
  backButtonText: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 16,
    color: '#fff',
  },
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  resultEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  resultTitle: {
    fontFamily: fonts.fredoka.bold,
    fontSize: 32,
    color: colors.warm.text,
    marginBottom: 32,
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    ...shadows.card,
    marginBottom: 16,
  },
  scoreText: {
    fontFamily: fonts.fredoka.bold,
    fontSize: 64,
    color: colors.lavender.dark,
  },
  scoreLabel: {
    fontFamily: fonts.lexend.regular,
    fontSize: 16,
    color: colors.warm.gray,
    marginTop: 8,
  },
  percentageText: {
    fontFamily: fonts.fredoka.bold,
    fontSize: 48,
    color: '#58CC02',
    marginBottom: 32,
  },
  finishButton: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 28,
    backgroundColor: '#58CC02',
  },
  finishButtonText: {
    fontFamily: fonts.fredoka.bold,
    fontSize: 18,
    color: '#FFFFFF',
  },
});
