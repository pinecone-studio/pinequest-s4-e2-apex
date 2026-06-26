'use client';

import { useState, useCallback } from 'react';

// Visual-feedback speech stub (ported from the Expo app). Browser SpeechSynthesis
// is used when available so the instruction is actually read aloud; otherwise it
// falls back to a 2s "playing" indicator like the mobile build.
export function useSpeech() {
  const [isPlaying, setIsPlaying] = useState(false);

  const speak = useCallback((text: string) => {
    setIsPlaying(true);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'mn-MN';
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);
        window.speechSynthesis.speak(utterance);
        return;
      } catch {
        // fall through to the timed indicator
      }
    }

    setTimeout(() => setIsPlaying(false), 2000);
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
  }, []);

  return { speak, stop, isPlaying };
}
