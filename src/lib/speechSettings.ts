import AsyncStorage from '@react-native-async-storage/async-storage';

const SPEED_KEY = '@speech_speed';
const DEFAULT_SPEED = 45; // 1x speed (20-100 range)

export async function getSpeechSpeed(): Promise<number> {
  try {
    const value = await AsyncStorage.getItem(SPEED_KEY);
    return value ? parseInt(value, 10) : DEFAULT_SPEED;
  } catch (error) {
    console.error('Error reading speech speed:', error);
    return DEFAULT_SPEED;
  }
}

export async function setSpeechSpeed(speed: number): Promise<void> {
  try {
    await AsyncStorage.setItem(SPEED_KEY, speed.toString());
  } catch (error) {
    console.error('Error saving speech speed:', error);
  }
}

export function speedToMultiplier(speed: number): number {
  return speed / 45; // Convert to multiplier (1x at 45)
}
