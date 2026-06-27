import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { API_BASE_URL } from './api';

// ArrayBuffer → base64 (RN-д Buffer/btoa найдваргүй тул гараар).
const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let result = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b1 = bytes[i];
    const b2 = i + 1 < bytes.length ? bytes[i + 1] : 0;
    const b3 = i + 2 < bytes.length ? bytes[i + 2] : 0;
    result += B64[b1 >> 2];
    result += B64[((b1 & 3) << 4) | (b2 >> 4)];
    result += i + 1 < bytes.length ? B64[((b2 & 15) << 2) | (b3 >> 6)] : '=';
    result += i + 2 < bytes.length ? B64[b3 & 63] : '=';
  }
  return result;
}

let current: Audio.Sound | null = null;

// Web app-ийн /api/tts (Chimege)-ээс аудио татаж, expo-av-аар тоглуулна.
export async function playTts(text: string): Promise<void> {
  if (current) {
    try {
      await current.unloadAsync();
    } catch {
      // ignore
    }
    current = null;
  }

  const res = await fetch(`${API_BASE_URL}/api/tts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: text.toLowerCase() }),
  });
  if (!res.ok) throw new Error(`tts ${res.status}`);

  const buf = await res.arrayBuffer();
  const base64 = arrayBufferToBase64(buf);
  const uri = `${FileSystem.cacheDirectory}lexi-tts.wav`;
  await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });

  await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  const { sound } = await Audio.Sound.createAsync({ uri }, { shouldPlay: true });
  current = sound;
  sound.setOnPlaybackStatusUpdate((status) => {
    if (status.isLoaded && status.didJustFinish) {
      sound.unloadAsync().catch(() => {});
      if (current === sound) current = null;
    }
  });
}
