import { useState, useCallback, useRef } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

// Chimege API configuration
const CHIMEGE_API_URL = 'https://api.chimege.com/v1.2/synthesize';
const CHIMEGE_TOKEN = process.env.EXPO_PUBLIC_CHIMEGE_TOKEN;

export function useSpeech() {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  const speak = useCallback(async (text: string, speedMultiplier: number = 1.0) => {
    console.log('📖 Speaking:', text);

    try {
      // Stop any currently playing sound
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      setIsPlaying(true);

      // Call Chimege API
      const response = await fetch(CHIMEGE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'token': CHIMEGE_TOKEN || '',
        },
        body: text,
      });

      if (!response.ok) {
        throw new Error(`Chimege API error: ${response.status}`);
      }

      // Get audio data as blob
      const audioBlob = await response.blob();

      // Convert blob to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => {
          const base64 = reader.result as string;
          resolve(base64);
        };
        reader.onerror = reject;
      });
      reader.readAsDataURL(audioBlob);
      const base64Audio = await base64Promise;

      // Save to temporary file
      const tempPath = `${FileSystem.cacheDirectory}temp_audio.mp3`;
      await FileSystem.writeAsStringAsync(tempPath, base64Audio.split(',')[1], {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Load and play audio with speed control
      const { sound } = await Audio.Sound.createAsync(
        { uri: tempPath },
        {
          shouldPlay: true,
          rate: speedMultiplier, // Apply speed multiplier
          pitchCorrectionQuality: Audio.PitchCorrectionQuality.High,
        },
        (status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
            sound.unloadAsync();
          }
        }
      );

      soundRef.current = sound;

    } catch (error) {
      console.error('❌ Speech error:', error);
      setIsPlaying(false);

      // Fallback: simulate speaking for visual feedback
      setTimeout(() => {
        setIsPlaying(false);
      }, text.length * 50); // ~50ms per character
    }
  }, []);

  const stop = useCallback(async () => {
    try {
      if (soundRef.current) {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      setIsPlaying(false);
    } catch (error) {
      console.error('Stop error:', error);
      setIsPlaying(false);
    }
  }, []);

  return { speak, stop, isPlaying };
}
