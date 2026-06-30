import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Svg, { Path, Circle, Line, Polygon, Text as SvgText } from 'react-native-svg';
import Slider from '@react-native-community/slider';
import { fonts, colors, shadows } from '../theme';
import { getCyrillicLetter, getStrokeCount } from '../lib/cyrillicLetterPaths';
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

  const [currentStroke, setCurrentStroke] = useState(0);
  const [userPath, setUserPath] = useState<string>('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeAccuracy, setStrokeAccuracy] = useState(0);
  const [completedStrokes, setCompletedStrokes] = useState<number[]>([]);
  const pathRef = useRef<string>('');

  const { speak, stop, isPlaying } = useSpeech();
  const { speed, setSpeed, speedMultiplier } = useSpeechSpeed();

  const letterData = getCyrillicLetter(letter);
  const romanization = ROMANIZATION_MAP[letter] || '?';
  const totalStrokes = getStrokeCount(letter);

  if (!letterData) {
    // Letter not yet defined - show message
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 }}>
          <Text style={[styles.title, { textAlign: 'center' }]}>
            ⚠️ Үсгийн хэлбэр хараахан нэмэгдээгүй
          </Text>
          <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 16, color: '#999', textAlign: 'center', marginTop: 16 }}>
            "{letter}" үсгийн зөв бичих арга (прописи) баталгаажуулалт хүлээж байна.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentStrokeData = letterData.strokes[currentStroke];

  const handleGestureEvent = (event: any) => {
    const { x, y } = event.nativeEvent;

    // Convert screen coordinates to SVG coordinates
    const svgX = (x / CANVAS_SIZE) * 200;
    const svgY = (y / CANVAS_SIZE) * 200;

    if (!isDrawing) {
      pathRef.current = `M ${svgX} ${svgY}`;
      setIsDrawing(true);
    } else {
      pathRef.current += ` L ${svgX} ${svgY}`;
    }

    setUserPath(pathRef.current);

    // Calculate accuracy for current stroke
    const accuracy = calculateAccuracy(pathRef.current, currentStrokeData.path);
    setStrokeAccuracy(accuracy);
  };

  const handleGestureEnd = () => {
    setIsDrawing(false);
  };

  const calculateAccuracy = (userPath: string, guidePath: string): number => {
    // Simplified accuracy - in production, use proper path comparison
    const userLength = userPath.length;
    const guideLength = guidePath.length;
    const ratio = Math.min(userLength / guideLength, 1);
    return Math.floor(ratio * 100);
  };

  const handleCheck = () => {
    if (strokeAccuracy >= 70) {
      // Mark current stroke as complete
      setCompletedStrokes([...completedStrokes, currentStroke]);

      // Move to next stroke or finish
      if (currentStroke < totalStrokes - 1) {
        setCurrentStroke(currentStroke + 1);
        handleReset();
      } else {
        // All strokes complete! Success!
        navigation.goBack();
      }
    }
  };

  const handleReset = () => {
    setUserPath('');
    pathRef.current = '';
    setStrokeAccuracy(0);
    setIsDrawing(false);
  };

  const overallProgress = totalStrokes > 0 ? ((completedStrokes.length + strokeAccuracy / 100) / totalStrokes) * 100 : 0;

  const playSound = async () => {
    if (isPlaying) {
      stop();
    } else {
      // Play letter pronunciation with current speed
      await speak(letter, speedMultiplier);
    }
  };

  const isComplete = strokeAccuracy >= 70;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${overallProgress}%` }]} />
          </View>
        </View>

        {/* Title */}
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 24, marginBottom: 16 }}>
          <Text style={styles.title}>Үсэг зур</Text>
          {totalStrokes > 1 && (
            <Text style={styles.strokeCounter}>
              Тат {currentStroke + 1}/{totalStrokes}
            </Text>
          )}
        </View>

        {/* Letter Info Row */}
        <View style={styles.letterInfoRow}>
          <TouchableOpacity style={styles.speakerButton} onPress={playSound}>
            <Text style={styles.speakerIcon}>{isPlaying ? '⏸️' : '🔊'}</Text>
          </TouchableOpacity>
          <View style={styles.letterInfo}>
            <Text style={styles.letterDisplay}>
              {letterData.uppercase}
              <Text style={styles.letterLowercase}>{letterData.lowercase}</Text>
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
          <PanGestureHandler
            onGestureEvent={handleGestureEvent}
            onEnded={handleGestureEnd}
          >
            <View style={styles.canvas}>
              <Svg width={CANVAS_SIZE} height={CANVAS_SIZE} viewBox="0 0 200 200">
                {/* Crosshair guidelines */}
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

                {/* Show all completed strokes (faded) */}
                {completedStrokes.map((strokeIdx) => (
                  <Path
                    key={`completed-${strokeIdx}`}
                    d={letterData.strokes[strokeIdx].path}
                    stroke="#CCCCCC"
                    strokeWidth="8"
                    fill="none"
                    opacity={0.3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}

                {/* Current stroke - wide guide path (light gray) */}
                <Path
                  d={currentStrokeData.path}
                  stroke="#CCCCCC"
                  strokeWidth="40"
                  fill="none"
                  opacity={0.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Current stroke - dashed blue guide path */}
                <Path
                  d={currentStrokeData.path}
                  stroke="#29B6F6"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="10,10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Start point for current stroke */}
                <Circle
                  cx={currentStrokeData.startPoint.x}
                  cy={currentStrokeData.startPoint.y}
                  r="15"
                  fill="#29B6F6"
                />
                <SvgText
                  x={currentStrokeData.startPoint.x}
                  y={currentStrokeData.startPoint.y + 6}
                  fontSize="18"
                  fill="white"
                  textAnchor="middle"
                >
                  ↓
                </SvgText>

                {/* End point for current stroke */}
                <Polygon
                  points={`${currentStrokeData.endPoint.x},${currentStrokeData.endPoint.y} ${currentStrokeData.endPoint.x - 10},${currentStrokeData.endPoint.y + 15} ${currentStrokeData.endPoint.x + 10},${currentStrokeData.endPoint.y + 15}`}
                  fill="#29B6F6"
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
                    opacity={0.8}
                  />
                )}
              </Svg>
            </View>
          </PanGestureHandler>
        </View>

        {/* Bottom buttons */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>↺</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.checkButton,
              isComplete && styles.checkButtonActive,
            ]}
            onPress={handleCheck}
            disabled={!isComplete}
          >
            <Text
              style={[
                styles.checkButtonText,
                isComplete && styles.checkButtonTextActive,
              ]}
            >
              CHECK
            </Text>
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
    height: 16,
    backgroundColor: '#E5E5E5',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#58CC02',
    borderRadius: 8,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.fredoka.bold,
    color: '#000000',
    flex: 1,
  },
  strokeCounter: {
    fontSize: 16,
    fontFamily: fonts.lexend.semibold,
    color: '#29B6F6',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  letterInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
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
  canvas: {
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },
  resetButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resetButtonText: {
    fontSize: 32,
    color: '#999',
  },
  checkButton: {
    flex: 1,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkButtonActive: {
    backgroundColor: '#58CC02',
  },
  checkButtonText: {
    fontSize: 18,
    fontFamily: fonts.fredoka.bold,
    color: '#CCCCCC',
    letterSpacing: 1,
  },
  checkButtonTextActive: {
    color: '#FFFFFF',
  },
});
