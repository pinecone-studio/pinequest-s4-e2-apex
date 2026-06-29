// SVG path data for tracing Mongolian Cyrillic letters
// Paths are centered in a 200x200 viewBox

export type LetterPathData = {
  path: string;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
};

export const LETTER_PATHS: Record<string, LetterPathData> = {
  'А': {
    path: 'M 60 180 L 100 40 L 140 180 M 75 120 L 125 120',
    startPoint: { x: 60, y: 180 },
    endPoint: { x: 140, y: 180 },
  },
  'Б': {
    path: 'M 60 40 L 60 180 L 130 180 Q 150 180 150 150 Q 150 120 130 120 L 60 120 M 60 40 L 140 40',
    startPoint: { x: 60, y: 40 },
    endPoint: { x: 150, y: 150 },
  },
  'В': {
    path: 'M 60 40 L 60 180 M 60 40 L 120 40 Q 140 40 140 70 Q 140 100 120 100 L 60 100 M 60 100 L 130 100 Q 150 100 150 140 Q 150 180 130 180 L 60 180',
    startPoint: { x: 60, y: 40 },
    endPoint: { x: 60, y: 180 },
  },
  'Г': {
    path: 'M 60 180 L 60 40 L 140 40',
    startPoint: { x: 60, y: 180 },
    endPoint: { x: 140, y: 40 },
  },
  'Д': {
    path: 'M 50 180 L 50 160 L 70 40 L 130 40 L 150 160 L 150 180',
    startPoint: { x: 50, y: 180 },
    endPoint: { x: 150, y: 180 },
  },
  'Е': {
    path: 'M 140 40 L 60 40 L 60 110 L 120 110 M 60 110 L 60 180 L 140 180',
    startPoint: { x: 140, y: 40 },
    endPoint: { x: 140, y: 180 },
  },
  'О': {
    path: 'M 100 40 Q 140 40 160 80 Q 180 120 160 160 Q 140 180 100 180 Q 60 180 40 160 Q 20 120 40 80 Q 60 40 100 40',
    startPoint: { x: 100, y: 40 },
    endPoint: { x: 100, y: 40 },
  },
  'И': {
    path: 'M 60 180 L 60 40 L 140 180 L 140 40',
    startPoint: { x: 60, y: 180 },
    endPoint: { x: 140, y: 40 },
  },
  'М': {
    path: 'M 40 180 L 40 40 L 100 120 L 160 40 L 160 180',
    startPoint: { x: 40, y: 180 },
    endPoint: { x: 160, y: 180 },
  },
  'Н': {
    path: 'M 60 180 L 60 40 M 60 110 L 140 110 M 140 40 L 140 180',
    startPoint: { x: 60, y: 180 },
    endPoint: { x: 140, y: 180 },
  },
  'Т': {
    path: 'M 50 40 L 150 40 M 100 40 L 100 180',
    startPoint: { x: 50, y: 40 },
    endPoint: { x: 100, y: 180 },
  },
  'У': {
    path: 'M 60 40 L 100 140 L 140 40 M 100 140 Q 90 180 60 200',
    startPoint: { x: 60, y: 40 },
    endPoint: { x: 60, y: 200 },
  },
};

// Fallback for letters without defined paths
export function getLetterPath(letter: string): LetterPathData {
  return LETTER_PATHS[letter] || {
    path: 'M 60 110 L 140 110',
    startPoint: { x: 60, y: 110 },
    endPoint: { x: 140, y: 110 },
  };
}
