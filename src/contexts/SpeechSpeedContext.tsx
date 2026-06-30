import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SPEED_KEY = '@speech_speed';
const DEFAULT_SPEED = 45; // 1x speed (20-100 range)

interface SpeechSpeedContextType {
  speed: number;
  setSpeed: (speed: number) => void;
  speedMultiplier: number;
}

const SpeechSpeedContext = createContext<SpeechSpeedContextType | undefined>(undefined);

export function SpeechSpeedProvider({ children }: { children: ReactNode }) {
  const [speed, setSpeedState] = useState(DEFAULT_SPEED);

  // Load saved speed on mount
  useEffect(() => {
    AsyncStorage.getItem(SPEED_KEY)
      .then((value) => {
        if (value) {
          setSpeedState(parseInt(value, 10));
        }
      })
      .catch((error) => {
        console.warn('Error loading speech speed:', error);
      });
  }, []);

  // Save speed when it changes
  const setSpeed = (newSpeed: number) => {
    setSpeedState(newSpeed);
    AsyncStorage.setItem(SPEED_KEY, newSpeed.toString()).catch((error) => {
      console.warn('Error saving speech speed:', error);
    });
  };

  const speedMultiplier = speed / 45; // Convert to multiplier (1x at 45)

  return (
    <SpeechSpeedContext.Provider value={{ speed, setSpeed, speedMultiplier }}>
      {children}
    </SpeechSpeedContext.Provider>
  );
}

export function useSpeechSpeed() {
  const context = useContext(SpeechSpeedContext);
  if (!context) {
    throw new Error('useSpeechSpeed must be used within SpeechSpeedProvider');
  }
  return context;
}
