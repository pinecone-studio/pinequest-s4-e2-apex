import { useState, useCallback } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

// Chimege STT API configuration
const CHIMEGE_STT_URL = 'https://api.chimege.com/v1.2/transcribe';
const CHIMEGE_TOKEN = process.env.EXPO_PUBLIC_CHIMEGE_TOKEN;

export function useVoiceRecognition() {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  const startRecording = useCallback(async () => {
    try {
      console.log('🎤 Requesting permissions...');
      const permission = await Audio.requestPermissionsAsync();

      if (!permission.granted) {
        console.error('❌ Permission to access microphone denied');
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('🎤 Starting recording...');
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );

      setRecording(newRecording);
      setIsRecording(true);
      console.log('🎤 Recording started');
    } catch (error) {
      console.error('❌ Failed to start recording:', error);
      setIsRecording(false);
    }
  }, []);

  const stopRecording = useCallback(async (): Promise<string> => {
    try {
      if (!recording) {
        console.error('❌ No recording in progress');
        return '';
      }

      console.log('🎤 Stopping recording...');
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });

      const uri = recording.getURI();
      setRecording(null);
      setIsRecording(false);
      console.log('🎤 Recording stopped:', uri);

      if (!uri) {
        console.error('❌ No recording URI');
        return '';
      }

      // Read audio file as base64
      const audioBase64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Call Chimege STT API
      console.log('🎤 Sending to Chimege STT...');
      const response = await fetch(CHIMEGE_STT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'audio/wav',
          'token': CHIMEGE_TOKEN || '',
        },
        body: audioBase64,
      });

      if (!response.ok) {
        throw new Error(`Chimege STT error: ${response.status}`);
      }

      const result = await response.json();
      const transcription = result.transcription || result.text || '';
      console.log('🎤 Transcription:', transcription);

      return transcription;

    } catch (error) {
      console.error('❌ Failed to process recording:', error);
      setIsRecording(false);
      setRecording(null);

      // Fallback for testing: return empty string
      return '';
    }
  }, [recording]);

  const cancelRecording = useCallback(async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
        });
        setRecording(null);
      }
      setIsRecording(false);
    } catch (error) {
      console.error('❌ Failed to cancel recording:', error);
    }
  }, [recording]);

  return {
    isRecording,
    startRecording,
    stopRecording,
    cancelRecording,
  };
}
