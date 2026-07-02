import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Svg, { Path, Line } from 'react-native-svg';
import Slider from '@react-native-community/slider';
import { fonts, colors, shadows } from '../theme';
import { useSpeech } from '../hooks/useSpeech';
import { useSpeechSpeed } from '../contexts/SpeechSpeedContext';

const WINDOW_WIDTH = Dimensions.get('window').width;
const CANVAS_SIZE = WINDOW_WIDTH - 40;

const ROMANIZATION_MAP: Record<string, string> = {
  'А': 'a', 'Б': 'b', 'В': 'v', 'Г': 'g', 'Д': 'd', 'Е': 'ye', 'Ё': 'yo',
  'Ж': 'j', 'З': 'z', 'И': 'i', 'Й': 'y', 'К': 'k', 'Л': 'l', 'М': 'm',
  'Н': 'n', 'О': 'o', 'Ө': 'ö', 'П': 'p', 'Р': 'r', 'С': 's', 'Т': 't',
  'У': 'u', 'Ү': 'ü', 'Х': 'kh', 'Ц': 'ts', 'Ч': 'ch', 'Ш': 'sh',
  'Щ': 'shch', 'Ъ': '"', 'Ы': 'y', 'Ь': "'", 'Э': 'e', 'Ю': 'yu', 'Я': 'ya',
};

export default function TraceLetterScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { letter } = (route.params as any) || { letter: 'А' };

  const [userPath, setUserPath] = useState<string>('');
  const [isDrawing, setIsDrawing] = useState(false);
  const pathRef = useRef<string>('');

  const { speak, stop, isPlaying } = useSpeech();
  const { speed, setSpeed, speedMultiplier } = useSpeechSpeed();

  const romanization = ROMANIZATION_MAP[letter] || '?';

  const handleGestureEvent = (event: any) => {
    const { x, y } = event.nativeEvent;
    const svgX = (x / CANVAS_SIZE) * 200;
    const svgY = (y / CANVAS_SIZE) * 200;

    if (!isDrawing) {
      pathRef.current = `M ${svgX} ${svgY}`;
      setIsDrawing(true);
    } else {
      pathRef.current += ` L ${svgX} ${svgY}`;
    }

    setUserPath(pathRef.current);
  };

  const handleGestureEnd = () => {
    setIsDrawing(false);
  };

  const handleReset = () => {
    setUserPath('');
    pathRef.current = '';
    setIsDrawing(false);
  };

  const playSound = async () => {
    if (isPlaying) {
      stop();
    } else {
      await speak(letter, speedMultiplier);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Үсэг зур</Text>
        </View>

        {/* Letter Info */}
        <View style={styles.letterInfoRow}>
          <TouchableOpacity style={styles.speakerButton} onPress={playSound}>
            <Text style={styles.speakerIcon}>{isPlaying ? '⏸️' : '🔊'}</Text>
          </TouchableOpacity>
          <View style={styles.letterInfo}>
            <Text style={styles.letterDisplay}>
              {letter}
              <Text style={styles.letterLowercase}>{letter.toLowerCase()}</Text>
            </Text>
            <Text style={styles.letterRomanization}>{romanization}</Text>
          </View>
        </View>

        {/* Speed Control */}
        <View style={styles.speedCard}>
          <Text style={styles.speedLabel}>Хурд</Text>
          <Slider
            style={styles.slider}
            minimumValue={20}
            maximumValue={100}
            value={speed}
            onValueChange={setSpeed}
            minimumTrackTintColor="#29B6F6"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#29B6F6"
          />
          <Text style={styles.speedVal}>{speedMultiplier.toFixed(1)}×</Text>
        </View>

        {/* Canvas */}
        <View style={styles.canvasContainer}>
          <View style={styles.canvasWrapper}>
            {/* Background cursive letter guide */}
            <View style={styles.backgroundLetterContainer}>
              <Text style={styles.backgroundLetter}>{letter.toLowerCase()}</Text>
            </View>

            {/* Drawing canvas overlay */}
            <PanGestureHandler
              onGestureEvent={handleGestureEvent}
              onEnded={handleGestureEnd}
            >
              <View style={styles.canvas}>
                <Svg width={CANVAS_SIZE} height={CANVAS_SIZE} viewBox="0 0 200 200">
                  {/* Guidelines */}
                  <Line
                    x1="0"
                    y1="100"
                    x2="200"
                    y2="100"
                    stroke="#E5E5E5"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                  <Line
                    x1="100"
                    y1="0"
                    x2="100"
                    y2="200"
                    stroke="#E5E5E5"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />

                  {/* User's drawn path */}
                  {userPath && (
                    <Path
                      d={userPath}
                      stroke="#29B6F6"
                      strokeWidth="8"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                </Svg>
              </View>
            </PanGestureHandler>
          </View>
        </View>

        {/* Reset Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>↺ Дахин</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
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
  titleSection: {
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.fredoka.bold,
    color: '#000000',
  },
  letterInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 16,
  },
  speakerButton: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#1CB0F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speakerIcon: {
    fontSize: 28,
  },
  letterInfo: {
    alignItems: 'flex-start',
  },
  letterDisplay: {
    fontSize: 32,
    fontFamily: fonts.fredoka.bold,
    color: '#000000',
  },
  letterLowercase: {
    fontSize: 24,
    color: '#666666',
  },
  letterRomanization: {
    fontSize: 16,
    fontFamily: fonts.lexend.regular,
    color: '#999999',
  },
  speedCard: {
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    padding: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...shadows.cardSm,
  },
  speedLabel: {
    fontFamily: fonts.lexend.regular,
    fontSize: 13,
    color: '#666',
    width: 45,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  speedVal: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 15,
    color: '#29B6F6',
    width: 40,
    textAlign: 'right',
  },
  canvasContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  canvasWrapper: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    position: 'relative',
  },
  backgroundLetterContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    backgroundColor: '#FFFFFF',
  },
  backgroundLetter: {
    fontFamily: 'BadScript_400Regular',
    fontSize: CANVAS_SIZE * 0.6,
    color: '#E0E0E0',
    opacity: 0.5,
  },
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  resetButton: {
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    fontSize: 18,
    fontFamily: fonts.fredoka.bold,
    color: '#666',
  },
});
