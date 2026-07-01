import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import AppIcon from '../components/AppIcon';
import { colors, fonts, shadows } from '../theme';
import { useSpeech } from '../hooks/useSpeech';
import { useSpeechSpeed } from '../contexts/SpeechSpeedContext';

const WINDOW_WIDTH = Dimensions.get('window').width;

// Үлгэрийн бүрэн текст
const STORY_CONTENT: Record<string, { title: string; emoji: string; pages: string[] }> = {
  'aldar-huu': {
    title: 'Алдар хөө',
    emoji: '🐴',
    pages: [
      'Эрт урьд цагт Алдар гэдэг ухаалаг залуу байжээ. Тэр маш ядуу байсан ч сэтгэл санаа нь баян, мэргэн ухаантай хүн байжээ.',
      'Нэгэн өдөр Алдар замдаа явж байтал баян нэгэн хүнтэй таарав. Баян түүнийг харж: "Чи ямар ядуу юм бэ!" гэж шоолжээ.',
      'Алдар инээмсэглэн: "Би бие махбодоороо ядуу ч, оюун санаагаараа чамаас баян" гэж хариулав.',
      'Баян уурлаж: "Хэрэв чи үнэхээр ухаантай бол миний асуултад хариулж үз. Дэлхийд хамгийн хурдан юу вэ?" гэж асуулаа.',
      'Алдар: "Бодол бодох нь хамгийн хурдан. Салхи ч, морь ч бодлоос хурдан биш" гэж хариулав.',
      'Баян дахин асуув: "За тэгвэл дэлхийд хамгийн чухал юу вэ?"',
      'Алдар: "Цаг хугацаа. Учир нь цаг хугацаа өнгөрсний дараа буцаж авах аргагүй" гэлээ.',
      'Баян гайхаж: "Чи үнэхээр ухаантай залуу байна. Энэ алт аваад явбал болно" гэж түүнд шагнал өглөө.',
      'Алдар хөө ингэж ухаанаараа баяжиж, хүмүүст тусалж амьдарчээ.',
    ],
  },
  'suult-uneg': {
    title: 'Сүүлт үнэг',
    emoji: '🦊',
    pages: [
      'Нэгэн өдөр үнэг ойд хоол хайж явж байлаа. Тэр өлссөн байсан ч юу ч олохгүй байв.',
      'Гэнэт тэр том модны дор үзэм ургаж байхыг харлаа. Үзэм өндөрт байсан тул үнэг түүнд хүрч чадахгүй байв.',
      'Үнэг хэд хэдэн удаа үсрээд оролдсон ч амжилтгүй боллоо. Үзэм хэтэрхий өндөрт байлаа.',
      'Эцэст нь ядарч сульдсан үнэг: "Тэр үзэм үнэхээр исгэлэн байх л даа. Би авахыг ч хүсэхгүй байна" гэж хэлээд явчихлаа.',
      'Энэ үлгэрээс бид юу сурах вэ? Хүн олж авч чадахгүй зүйлээ гүтгэдэг.',
    ],
  },
  'hilenset-chono': {
    title: 'Хилэнцэт чоно',
    emoji: '🐺',
    pages: [
      'Нэгэн чоно хонины саваанд нэвтэрч орохыг хүссэн байв. Гэвч харуулч нохой сэргэг байлаа.',
      'Чоно бодож үзээд хонины арьс өмсөж, хонины дунд холилдлоо.',
      'Харуулч нь хонь гэж бодоод анзаарсангүй. Чоно саваанд амжилттай нэвтэрлээ.',
      'Гэвч шөнө болоход чоно тэвчиж чадалгүй, уулж эхлэв: "Ауууу!"',
      'Харуулч нохой дуу чимээг сонсоод гүйж ирэв. Чоныг бариад хөөн гаргалаа.',
      'Энэ үлгэр бидэнд юу заах вэ? Хэзээ нэгэн цагт худлын төрх илчлэгддэг.',
    ],
  },
  'erhii-mergen': {
    title: 'Эрхий Мэргэн',
    emoji: '🏹',
    pages: [
      'Эрт урьд Эрхий Мэргэн гэдэг агнуур байжээ. Тэр хар салхи шиг хурдан, нүдээрээ бүргэд шиг хурц харж чаддаг байв.',
      'Нэгэн өдөр тэр ан агнахаар явж байтал хүчирхэг бар гарч ирэв. Бар түүн рүү дайрлаа.',
      'Эрхий Мэргэн нум харваад барын хажууд оногдуулж: "Би чамайг алахыг хүсэхгүй байна. Явбал болно" гэлээ.',
      'Гэвч бар дахин дайрлаа. Энэ удаа Эрхий Мэргэн зөв онилж, барыг зогсоов.',
      'Тэр цагаас хойш ард түмэн түүнийг Эрхий Мэргэн гэж нэрлэдэг болжээ.',
    ],
  },
  'hohoo-namjil': {
    title: 'Хөхөө намжил',
    emoji: '🐎',
    pages: [
      'Хөхөө намжил гэдэг хөвгүүн баян гэрт төрсөн боловч сайхан сэтгэлтэй байжээ.',
      'Тэр өдөр бүр ядууст тусалж, хүнд хүнд сайн үйл хийдэг байв.',
      'Нэгэн өдөр түүний эцэг өвчилж, эм хэрэгтэй боллоо. Эм нь алс холын уулан дээр ургадаг байв.',
      'Хөхөө намжил морьтой гарч, олон бэрхшээлийг даван, эмийг олж авчирлаа.',
      'Түүний эцэг эдгэрч: "Чи жинхэнэ баатар хүү минь" гэж хэлжээ.',
      'Хөхөө намжил ингэж хайр энэрлээрээ алдаршжээ.',
    ],
  },
  'chonony-olsgolun': {
    title: 'Чононы өлсгөлөн',
    emoji: '🐺',
    pages: [
      'Өвлийн хүйтэн өдөр нэгэн чоно өлсөж байлаа. Тэр хоол хайж явж байтал тосгоны дэргэд бүдүүн нохой харав.',
      'Чоно: "Чи яаж ийм тарган сайхан байгаа юм бэ?" гэж асуулаа.',
      'Нохой: "Би гэрийн эзнийхээ байшинг харж, тэд надад хоол өгдөг. Чи ч биднтэй хамт ир" гэв.',
      'Чоно баярлаж явж байтал нохойн хүзүүнд гинж байгааг анзаарав.',
      '"Энэ юу вэ?" гэж асуухад нохой: "Өдөр хоногийн ихэнх цагийг намайг гинжээр уядаг" гэж хариулав.',
      'Чоно: "Би өлсөж үхвэл ч гэсэн эрх чөлөөгөө өгөхгүй" гэж хэлээд буцан явчихлаа.',
      'Эрх чөлөө бол хамгийн үнэтэй зүйл.',
    ],
  },
  'yast-melhii': {
    title: 'Яст мэлхий, туулай',
    emoji: '🐢',
    pages: [
      'Нэгэн өдөр туулай яст мэлхийг харж: "Чи ямар удаан юм бэ!" гэж шоолжээ.',
      'Яст мэлхий: "Би чамтай уралдъя. Хэн түрүүлж тэр толгой руу очихыг харъя" гэлээ.',
      'Туулай хөхөж: "Чи надтай хэзээ ч хурдлаж чадахгүй!" гэж хэллээ.',
      'Уралдаан эхлэв. Туулай хурдан гүйгээд удалгүй өндөр ахиж, ядарч унтжээ.',
      'Яст мэлхий удаан ч гэсэн зогсолтгүй алхаж, туулайг гүйцэж өнгөрлөө.',
      'Туулай сэрээд гүйсэн үед яст мэлхий аль хэдийн төгсгөлд хүрсэн байлаа.',
      'Тууштай хичээл зүтгэл бол хурдаас илүү чухал.',
    ],
  },
  'arslan-hulgana': {
    title: 'Арслан, хулгана',
    emoji: '🦁',
    pages: [
      'Нэгэн өдөр арслан унтаж байтал бяцхан хулгана түүний дээгүүр гүйж тоглож байв.',
      'Арслан сэрээд хулганыг барьж авлаа. "Би чамайг идэх болно!" гэж архирав.',
      'Хулгана гуйв: "Намайг өршөө. Хэзээ нэгэн цагт би чамд тусална."',
      'Арслан инээж: "Чи бяцхан хулгана, надад яаж туслах юм бэ?" гэсэн ч түүнийг суллаа.',
      'Удалгүй арслан анчны тороонд баригдлаа. Тэр чангаар архирч байв.',
      'Хулгана дуу чимээг сонсож ирээд олсоо зүсч, арсланг чөлөөлөв.',
      'Арслан: "Баярлалаа. Чи бяцхан ч гэсэн агуу зүрх сэтгэлтэй байна" гэв.',
      'Бага ч гэсэн сайн үйл их утга учиртай.',
    ],
  },
  'shorgooljiin-uliral': {
    title: 'Шоргоолж, царцаа',
    emoji: '🐜',
    pages: [
      'Зуны халуун өдөр царцаа дуулж, тоглож, зугаалж байв.',
      'Шоргоолж өдөр бүр хичээнгүйлэн ажиллаж, өвлийн хоол хүнс бэлдэж байлаа.',
      'Царцаа: "Яагаад чи ийм хичээж байгаа юм бэ? Ир тоглоцгооё!" гэж дуудлаа.',
      'Шоргоолж: "Би өвөл өлсөхгүйн тулд хоол бэлдэж байна" гэж хариулав.',
      'Өвөл болов. Царцаа хоолгүй болж өлсөж эхлэв.',
      'Тэр шоргоолжийн үүдэнд очиж: "Надад хоол өг" гэж гуйлаа.',
      'Шоргоолж: "Зундаа хичээж байсан бол өвөл тохилох байсан. Одоо хожимдсон" гэв.',
      'Цаг тухайдаа бэлдэх нь ухаалаг зүйл.',
    ],
  },
  'sarny-gerel': {
    title: 'Сарны гэрэл',
    emoji: '🌙',
    pages: [
      'Эрт урьд цагт бяцхан хүүхэд гэртээ унтахаас айж байжээ. Харанхуй түүнд аймшигтай санагдаж байв.',
      'Нэгэн шөнө сар цонхоор дотогш гэрлийг асаав. "Битгий ай, би энд байна" гэж сар хэлэв.',
      'Хүүхэд: "Чи хаанаас ирдэг вэ?" гэж асуулаа.',
      'Сар: "Би тэнгэрээс ирдэг. Өдөр бүр шөнө болоход хүүхдүүдийг харж байдаг."',
      'Тэр шөнөөс хойш хүүхэд харанхуйгаас айхаа больжээ.',
      'Сар түүнийг үргэлж харж байдаг гэдгийг мэдэж амар амгалан унтдаг болов.',
    ],
  },
  'oddyn-nuher': {
    title: 'Оддын нүхэр',
    emoji: '⭐',
    pages: [
      'Тэнгэрт хоёр од нөхөр байжээ. Тэд үргэлж хамтдаа гэрэлтэж байдаг байв.',
      'Нэг өдөр салхи тэднийг салгахыг оролдов. Гэвч тэд хүчтэй харилцан түлхүүлэн зогслоо.',
      'Үүл ирж бүрхэхийг оролдов. Гэвч тэдний гэрэл үүлийг нэвтлэн гарав.',
      'Тэр хоёр од өнөөдөр ч хамтдаа гэрэлтэж байна.',
      'Жинхэнэ нөхөрлөл юуг ч даван туулдаг.',
    ],
  },
  'shuvuu-shonyn-ger': {
    title: 'Шувуу шонын гэр',
    emoji: '🦉',
    pages: [
      'Бяцхан бор шувуу үүрээ барихыг хүсч байлаа.',
      'Тэр өдөр бүр салаа, өвс цуглуулж, үүрээ баривчлав.',
      'Шөнө болоход ядарсан байсан ч баяртай байв.',
      'Түүний үүр бүрэн бэлэн болов. Дулаахан, аюулгүй байшин болжээ.',
      'Шувуу амар тайван унтаж, эрүүл саруул сэрэв.',
      'Хичээнгүй хөдөлмөр сайхан амралт авчирдаг.',
    ],
  },
  'huuhduudiin-od': {
    title: 'Хүүхдүүдийн од',
    emoji: '🌟',
    pages: [
      'Дэлхий дээрх хүүхэд бүр тэнгэрт өөрийн гэсэн одтой.',
      'Хүүхэд унтахдаа тэр од илүү гэрэлтдэг.',
      'Хүүхэд сайн зүүд зүүдлэхэд од инээмсэглэдэг.',
      'Хүүхэд өссөн бүр од томорч гэрэлтэдэг.',
      'Чиний од өнөө шөнө ч гэрэлтэж байна. Сайхан амраарай.',
    ],
  },
};

export default function StoryDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { storyId } = (route.params as any) || { storyId: 'aldar-huu' };

  const [currentPage, setCurrentPage] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const { speak, stop, isPlaying } = useSpeech();
  const { speed, setSpeed, speedMultiplier } = useSpeechSpeed();
  const speedRef = useRef(speed);

  // Update ref when speed changes
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const story = STORY_CONTENT[storyId] || STORY_CONTENT['aldar-huu'];
  const totalPages = story.pages.length;

  // Split current page text into words
  const currentPageText = story.pages[currentPage];
  const words = currentPageText.split(/\s+/);

  const handleNext = () => {
    stop();
    setCurrentWordIndex(-1);
    setIsAutoPlaying(false);

    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      // Story finished - go to quiz
      (navigation as any).navigate('StoryQuiz', {
        storyId: storyId,
        storyTitle: story.title,
      });
    }
  };

  const handlePrevious = () => {
    stop();
    setCurrentWordIndex(-1);
    setIsAutoPlaying(false);

    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePlayPause = async () => {
    if (isPlaying) {
      stop();
      setCurrentWordIndex(-1);
      setIsAutoPlaying(false);
    } else {
      setIsAutoPlaying(true);
      await playCurrentPage();
    }
  };

  const playCurrentPage = async () => {
    const text = story.pages[currentPage];
    const words = text.split(/\s+/);

    // Start TTS with current speed
    await speak(text, speedRef.current / 45);

    // Highlight words sequentially
    for (let i = 0; i < words.length; i++) {
      setCurrentWordIndex(i);

      // Calculate delay using current speed (from ref to get latest value)
      const currentSpeedMultiplier = speedRef.current / 45;
      const msPerWord = 400 / currentSpeedMultiplier;

      await new Promise(resolve => setTimeout(resolve, msPerWord));
    }

    setCurrentWordIndex(-1);
    setIsAutoPlaying(false);
  };

  // Reset word highlighting when page changes
  useEffect(() => {
    setCurrentWordIndex(-1);
    setIsAutoPlaying(false);
  }, [currentPage]);

  const progress = ((currentPage + 1) / totalPages) * 100;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        <View style={styles.pageCounter}>
          <Text style={styles.pageCounterText}>
            {currentPage + 1}/{totalPages}
          </Text>
        </View>
      </View>

      {/* Story Title */}
      <View style={styles.titleSection}>
        <Text style={styles.emoji}>{story.emoji}</Text>
        <Text style={styles.title}>{story.title}</Text>
      </View>

      {/* Story Content */}
      <ScrollView style={styles.contentScroll} contentContainerStyle={styles.contentContainer}>
        <View style={styles.storyCard}>
          {/* Play/Pause Button */}
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
            <AppIcon name={isPlaying ? "pause" : "play"} size={24} color="#fff" />
          </TouchableOpacity>

          {/* Story text with word highlighting */}
          <Text style={styles.storyText}>
            {words.map((word, index) => (
              <Text
                key={`${index}-${word}`}
                style={[
                  styles.word,
                  currentWordIndex === index && styles.highlightedWord,
                ]}
              >
                {word}{' '}
              </Text>
            ))}
          </Text>
        </View>

        {/* Speed Control Slider */}
        <View style={styles.speedCard}>
          <Text style={styles.speedLabel}>Хурд</Text>
          <Slider
            style={styles.slider}
            minimumValue={20}
            maximumValue={100}
            value={speed}
            onValueChange={setSpeed}
            minimumTrackTintColor={colors.lavender.dark}
            maximumTrackTintColor="#E0D8CC"
            thumbTintColor={colors.lavender.dark}
          />
          <Text style={styles.speedVal}>{speedMultiplier.toFixed(1)}×</Text>
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.bottomContainer}>
        {currentPage > 0 && (
          <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
            <AppIcon name="arrowBack" size={20} color="#666" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.nextButton, currentPage === 0 && { marginLeft: 'auto' }]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentPage === totalPages - 1 ? 'Дуусгах' : 'Дараах'}
          </Text>
          {currentPage !== totalPages - 1 && <AppIcon name="arrowForward" size={20} color="#fff" />}
        </TouchableOpacity>
      </View>
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
  pageCounter: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  pageCounterText: {
    fontFamily: fonts.lexend.semibold,
    fontSize: 12,
    color: '#666',
  },
  titleSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  title: {
    fontFamily: fonts.fredoka.bold,
    fontSize: 28,
    color: colors.warm.text,
  },
  contentScroll: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  storyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    ...shadows.card,
    position: 'relative',
  },
  playButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#58CC02',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
    zIndex: 10,
  },
  storyText: {
    fontFamily: fonts.lexend.regular,
    fontSize: 18,
    lineHeight: 32,
    color: colors.warm.text,
    paddingRight: 60,
  },
  word: {
    color: colors.warm.text,
  },
  highlightedWord: {
    backgroundColor: '#FFD54F',
    color: '#000000',
    fontFamily: fonts.lexend.bold,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 2,
    overflow: 'hidden',
    shadowColor: '#FFC107',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  speedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    paddingVertical: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...shadows.card,
  },
  speedLabel: {
    fontFamily: fonts.lexend.regular,
    fontSize: 14,
    color: colors.warm.gray,
    width: 45,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  speedVal: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 16,
    color: colors.lavender.dark,
    width: 40,
    textAlign: 'right',
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },
  previousButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButton: {
    flex: 1,
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
});
