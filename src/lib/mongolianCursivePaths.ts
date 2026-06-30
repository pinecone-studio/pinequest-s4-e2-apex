// Mongolian Cyrillic cursive/handwritten letterforms (бичмэл үсэг)
// Based on Mongolian primary school handwriting instruction (хэлбэржилт)
// Following Russian-style Cyrillic cursive conventions adapted for Mongolian alphabet

export type StrokeData = {
  path: string;
  startPoint: { x: number; y: number };
  endPoint: { x: number; y: number };
};

export type CursiveLetterData = {
  letter: string;
  strokes: StrokeData[];
};

// WARNING: These paths are INITIAL ATTEMPTS at Cyrillic cursive forms
// They MUST be verified against actual Mongolian handwriting workbooks (прописи)
// before being used in production.

export const MONGOLIAN_CURSIVE: Record<string, CursiveLetterData> = {
  // А (a) - Cyrillic cursive: oval with tail on right
  // Traditional cursive "a" shape, NOT triangle
  'А': {
    letter: 'А',
    strokes: [
      {
        // Oval loop starting from top
        path: 'M 100 70 Q 70 70 70 110 Q 70 150 100 150 Q 130 150 130 110 Q 130 70 100 70',
        startPoint: { x: 100, y: 70 },
        endPoint: { x: 100, y: 70 },
      },
      {
        // Connecting tail/descender on right
        path: 'M 130 110 L 145 145',
        startPoint: { x: 130, y: 110 },
        endPoint: { x: 145, y: 145 },
      },
    ],
  },

  // Б (b) - Two strokes: horizontal bar at top, then curved descender
  'Б': {
    letter: 'Б',
    strokes: [
      {
        // Horizontal top bar
        path: 'M 60 60 L 120 60',
        startPoint: { x: 60, y: 60 },
        endPoint: { x: 120, y: 60 },
      },
      {
        // Curved descender with loop (like lowercase "б")
        path: 'M 90 60 L 90 110 Q 90 150 120 150 Q 145 150 145 125 Q 145 100 120 100 L 90 100',
        startPoint: { x: 90, y: 60 },
        endPoint: { x: 90, y: 100 },
      },
    ],
  },

  // В (v) - Cursive form: one continuous stroke with two loops (like script "B")
  'В': {
    letter: 'В',
    strokes: [
      {
        // Single stroke with upper and lower loops
        path: 'M 70 60 L 70 150 M 70 60 Q 110 60 110 85 Q 110 95 90 95 M 90 95 Q 120 95 120 125 Q 120 150 80 150',
        startPoint: { x: 70, y: 60 },
        endPoint: { x: 80, y: 150 },
      },
    ],
  },

  // Г (g) - Cursive: L-shape with descending tail
  'Г': {
    letter: 'Г',
    strokes: [
      {
        // Top horizontal stroke
        path: 'M 70 60 L 130 60',
        startPoint: { x: 70, y: 60 },
        endPoint: { x: 130, y: 60 },
      },
      {
        // Descending stroke with slight curve/tail
        path: 'M 70 60 L 70 140 Q 70 155 60 160',
        startPoint: { x: 70, y: 60 },
        endPoint: { x: 60, y: 160 },
      },
    ],
  },

  // Д (d) - Complex: cursive form resembles "house" or "Λ" with tails
  // This is one of the most distinctive Cyrillic cursive letters
  'Д': {
    letter: 'Д',
    strokes: [
      {
        // Left upstroke
        path: 'M 50 150 L 70 60',
        startPoint: { x: 50, y: 150 },
        endPoint: { x: 70, y: 60 },
      },
      {
        // Diagonal top
        path: 'M 70 60 L 130 60',
        startPoint: { x: 70, y: 60 },
        endPoint: { x: 130, y: 60 },
      },
      {
        // Right downstroke
        path: 'M 130 60 L 150 150',
        startPoint: { x: 130, y: 60 },
        endPoint: { x: 150, y: 150 },
      },
      {
        // Bottom connecting line with tails
        path: 'M 40 150 L 50 150 L 150 150 L 160 150',
        startPoint: { x: 40, y: 150 },
        endPoint: { x: 160, y: 150 },
      },
    ],
  },
};

// ⚠️ IMPORTANT NOTES:
//
// 1. The above 5 letters (А, Б, В, Г, Д) are APPROXIMATIONS based on general
//    Russian Cyrillic cursive conventions. They MUST be verified against actual
//    Mongolian handwriting workbooks before use.
//
// 2. Key characteristics of Cyrillic cursive that differ from print:
//    - А is written like Latin "a" (oval + tail), not triangle
//    - Б has horizontal bar first, then loop below
//    - В has two loops but may be written differently than Latin B
//    - Г has descending tail (not just L-shape)
//    - Д has distinctive "house" shape with bottom tails
//
// 3. Stroke order matters for educational correctness - children must learn
//    the proper sequence for good handwriting habits.
//
// 4. I am UNCERTAIN about the exact curves, proportions, and connection points
//    for authentic Mongolian school instruction. These need review by someone
//    familiar with Mongolian прописи (handwriting workbooks).
//
// 5. Special Mongolian letters (Өө, Үү) will need their cursive forms defined
//    based on Mongolian-specific instruction, not just Russian sources.

export function getCursiveLetter(letter: string): CursiveLetterData | null {
  return MONGOLIAN_CURSIVE[letter] || null;
}

// Helper to get total stroke count
export function getStrokeCount(letter: string): number {
  const letterData = getCursiveLetter(letter);
  return letterData ? letterData.strokes.length : 0;
}
