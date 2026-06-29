import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Svg, { Path, Circle, Line, Polygon, Text as SvgText } from 'react-native-svg';
import { fonts } from '../theme';
import { getLetterPath } from '../lib/letterPaths';

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
  const [accuracy, setAccuracy] = useState(0);
  const pathRef = useRef<string>('');

  const letterData = getLetterPath(letter);
  const romanization = ROMANIZATION_MAP[letter] || '?';

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

    // Simple accuracy calculation (can be improved)
    const accuracy = calculateAccuracy(pathRef.current, letterData.path);
    setAccuracy(accuracy);
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
    if (accuracy >= 70) {
      // Success! Navigate back or to next letter
      navigation.goBack();
    }
  };

  const handleReset = () => {
    setUserPath('');
    pathRef.current = '';
    setAccuracy(0);
    setIsDrawing(false);
  };

  const playSound = () => {
    // TODO: Integrate Chimege TTS
    console.log('Playing sound for:', letter);
  };

  const isComplete = accuracy >= 70;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${accuracy}%` }]} />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Үсэг зур</Text>

        {/* Letter Info Row */}
        <View style={styles.letterInfoRow}>
          <TouchableOpacity style={styles.speakerButton} onPress={playSound}>
            <Text style={styles.speakerIcon}>🔊</Text>
          </TouchableOpacity>
          <View style={styles.letterInfo}>
            <Text style={styles.letterDisplay}>{letter}</Text>
            <Text style={styles.letterRomanization}>{romanization}</Text>
          </View>
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

                {/* Wide guide path (light gray) */}
                <Path
                  d={letterData.path}
                  stroke="#CCCCCC"
                  strokeWidth="40"
                  fill="none"
                  opacity={0.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Dashed blue guide path (direction indicator) */}
                <Path
                  d={letterData.path}
                  stroke="#29B6F6"
                  strokeWidth="6"
                  fill="none"
                  strokeDasharray="10,10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Start point - blue circle with down arrow */}
                <Circle
                  cx={letterData.startPoint.x}
                  cy={letterData.startPoint.y}
                  r="15"
                  fill="#29B6F6"
                />
                <SvgText
                  x={letterData.startPoint.x}
                  y={letterData.startPoint.y + 6}
                  fontSize="18"
                  fill="white"
                  textAnchor="middle"
                >
                  ↓
                </SvgText>

                {/* End point - blue triangle arrow */}
                <Polygon
                  points={`${letterData.endPoint.x},${letterData.endPoint.y} ${letterData.endPoint.x - 10},${letterData.endPoint.y + 15} ${letterData.endPoint.x + 10},${letterData.endPoint.y + 15}`}
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
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 16,
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
  letterRomanization: {
    fontSize: 16,
    fontFamily: fonts.lexend.regular,
    color: '#999999',
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
