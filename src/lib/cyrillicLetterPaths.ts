// Mongolian Cyrillic printed block letters (uppercase and lowercase)
// Simple, clear letterforms for tracing practice

export type StrokeData = {
  path: string;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
};

export type LetterTracingData = {
  uppercase: string;
  lowercase: string;
  strokes: StrokeData[];
};

// All letters use simple printed block letter forms, not cursive
export const CYRILLIC_LETTERS: Record<string, LetterTracingData> = {
  'А': {
    uppercase: 'А',
    lowercase: 'а',
    strokes: [
      {
        // Left diagonal
        path: 'M 60 150 L 100 50',
        startPoint: { x: 60, y: 150 },
        endPoint: { x: 100, y: 50 },
      },
      {
        // Right diagonal
        path: 'M 100 50 L 140 150',
        startPoint: { x: 100, y: 50 },
        endPoint: { x: 140, y: 150 },
      },
      {
        // Horizontal bar
        path: 'M 75 110 L 125 110',
        startPoint: { x: 75, y: 110 },
        endPoint: { x: 125, y: 110 },
      },
    ],
  },

  'Б': {
    uppercase: 'Б',
    lowercase: 'б',
    strokes: [
      {
        // Top horizontal bar
        path: 'M 60 50 L 140 50',
        startPoint: { x: 60, y: 50 },
        endPoint: { x: 140, y: 50 },
      },
      {
        // Vertical line
        path: 'M 70 50 L 70 150',
        startPoint: { x: 70, y: 50 },
        endPoint: { x: 70, y: 150 },
      },
      {
        // Bottom curve (bowl)
        path: 'M 70 150 Q 130 150 130 115 Q 130 90 90 90 L 70 90',
        startPoint: { x: 70, y: 150 },
        endPoint: { x: 70, y: 90 },
      },
    ],
  },

  'В': {
    uppercase: 'В',
    lowercase: 'в',
    strokes: [
      {
        // Vertical line
        path: 'M 70 50 L 70 150',
        startPoint: { x: 70, y: 50 },
        endPoint: { x: 70, y: 150 },
      },
      {
        // Top curve
        path: 'M 70 50 Q 120 50 120 75 Q 120 95 85 95',
        startPoint: { x: 70, y: 50 },
        endPoint: { x: 85, y: 95 },
      },
      {
        // Bottom curve
        path: 'M 85 95 Q 130 95 130 122 Q 130 150 70 150',
        startPoint: { x: 85, y: 95 },
        endPoint: { x: 70, y: 150 },
      },
    ],
  },

  'Г': {
    uppercase: 'Г',
    lowercase: 'г',
    strokes: [
      {
        // Vertical line
        path: 'M 70 150 L 70 50',
        startPoint: { x: 70, y: 150 },
        endPoint: { x: 70, y: 50 },
      },
      {
        // Top horizontal
        path: 'M 70 50 L 140 50',
        startPoint: { x: 70, y: 50 },
        endPoint: { x: 140, y: 50 },
      },
    ],
  },

  'Д': {
    uppercase: 'Д',
    lowercase: 'д',
    strokes: [
      {
        // Left vertical with bottom tail
        path: 'M 60 150 L 60 165 M 60 150 L 60 60 L 75 50',
        startPoint: { x: 60, y: 165 },
        endPoint: { x: 75, y: 50 },
      },
      {
        // Top horizontal
        path: 'M 75 50 L 125 50',
        startPoint: { x: 75, y: 50 },
        endPoint: { x: 125, y: 50 },
      },
      {
        // Right vertical with bottom tail
        path: 'M 125 50 L 140 60 L 140 150 L 140 165',
        startPoint: { x: 125, y: 50 },
        endPoint: { x: 140, y: 165 },
      },
    ],
  },

  'Е': {
    uppercase: 'Е',
    lowercase: 'е',
    strokes: [
      {
        // Vertical line
        path: 'M 70 50 L 70 150',
        startPoint: { x: 70, y: 50 },
        endPoint: { x: 70, y: 150 },
      },
      {
        // Top horizontal
        path: 'M 70 50 L 130 50',
        startPoint: { x: 70, y: 50 },
        endPoint: { x: 130, y: 50 },
      },
      {
        // Middle horizontal
        path: 'M 70 100 L 120 100',
        startPoint: { x: 70, y: 100 },
        endPoint: { x: 120, y: 100 },
      },
      {
        // Bottom horizontal
        path: 'M 70 150 L 130 150',
        startPoint: { x: 70, y: 150 },
        endPoint: { x: 130, y: 150 },
      },
    ],
  },

  'О': {
    uppercase: 'О',
    lowercase: 'о',
    strokes: [
      {
        // Full circle/oval
        path: 'M 100 50 Q 140 50 140 100 Q 140 150 100 150 Q 60 150 60 100 Q 60 50 100 50 Z',
        startPoint: { x: 100, y: 50 },
        endPoint: { x: 100, y: 50 },
      },
    ],
  },

  'И': {
    uppercase: 'И',
    lowercase: 'и',
    strokes: [
      {
        // Left vertical
        path: 'M 60 150 L 60 50',
        startPoint: { x: 60, y: 150 },
        endPoint: { x: 60, y: 50 },
      },
      {
        // Diagonal
        path: 'M 60 50 L 140 150',
        startPoint: { x: 60, y: 50 },
        endPoint: { x: 140, y: 150 },
      },
      {
        // Right vertical
        path: 'M 140 150 L 140 50',
        startPoint: { x: 140, y: 150 },
        endPoint: { x: 140, y: 50 },
      },
    ],
  },

  'М': {
    uppercase: 'М',
    lowercase: 'м',
    strokes: [
      {
        // Left vertical
        path: 'M 50 150 L 50 50',
        startPoint: { x: 50, y: 150 },
        endPoint: { x: 50, y: 50 },
      },
      {
        // Left diagonal down
        path: 'M 50 50 L 100 110',
        startPoint: { x: 50, y: 50 },
        endPoint: { x: 100, y: 110 },
      },
      {
        // Right diagonal up
        path: 'M 100 110 L 150 50',
        startPoint: { x: 100, y: 110 },
        endPoint: { x: 150, y: 50 },
      },
      {
        // Right vertical
        path: 'M 150 50 L 150 150',
        startPoint: { x: 150, y: 50 },
        endPoint: { x: 150, y: 150 },
      },
    ],
  },

  'Н': {
    uppercase: 'Н',
    lowercase: 'н',
    strokes: [
      {
        // Left vertical
        path: 'M 60 50 L 60 150',
        startPoint: { x: 60, y: 50 },
        endPoint: { x: 60, y: 150 },
      },
      {
        // Middle horizontal
        path: 'M 60 100 L 140 100',
        startPoint: { x: 60, y: 100 },
        endPoint: { x: 140, y: 100 },
      },
      {
        // Right vertical
        path: 'M 140 50 L 140 150',
        startPoint: { x: 140, y: 50 },
        endPoint: { x: 140, y: 150 },
      },
    ],
  },

  'Т': {
    uppercase: 'Т',
    lowercase: 'т',
    strokes: [
      {
        // Top horizontal
        path: 'M 50 50 L 150 50',
        startPoint: { x: 50, y: 50 },
        endPoint: { x: 150, y: 50 },
      },
      {
        // Center vertical
        path: 'M 100 50 L 100 150',
        startPoint: { x: 100, y: 50 },
        endPoint: { x: 100, y: 150 },
      },
    ],
  },

  'У': {
    uppercase: 'У',
    lowercase: 'у',
    strokes: [
      {
        // Left diagonal down
        path: 'M 60 50 L 100 130',
        startPoint: { x: 60, y: 50 },
        endPoint: { x: 100, y: 130 },
      },
      {
        // Right diagonal to center then curve left
        path: 'M 140 50 L 100 130 Q 90 160 70 160',
        startPoint: { x: 140, y: 50 },
        endPoint: { x: 70, y: 160 },
      },
    ],
  },
};

export function getCyrillicLetter(letter: string): LetterTracingData | null {
  return CYRILLIC_LETTERS[letter] || null;
}

export function getStrokeCount(letter: string): number {
  const letterData = getCyrillicLetter(letter);
  return letterData ? letterData.strokes.length : 0;
}
