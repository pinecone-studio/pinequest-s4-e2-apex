import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import opentype from 'opentype.js';

let cachedFont: opentype.Font | null = null;
const pathCache = new Map<string, string>();

/**
 * Load Caveat font (supports Cyrillic cursive)
 */
async function loadFont(): Promise<opentype.Font> {
  if (cachedFont) {
    return cachedFont;
  }

  try {
    // Load font asset
    const fontAsset = Asset.fromModule(require('../../assets/fonts/Caveat-Regular.ttf'));
    await fontAsset.downloadAsync();

    if (!fontAsset.localUri) {
      throw new Error('Font localUri is null');
    }

    // Read font file as base64
    const fontData = await FileSystem.readAsStringAsync(fontAsset.localUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Convert base64 to ArrayBuffer
    const binaryString = atob(fontData);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Parse font with opentype.js
    cachedFont = opentype.parse(bytes.buffer);
    return cachedFont;

  } catch (error) {
    console.error('Error loading font:', error);
    throw error;
  }
}

/**
 * Generate SVG path for a letter using Caveat font
 * Returns path string centered in 200x200 viewBox
 */
export async function generateLetterPath(letter: string): Promise<string> {
  // Check cache first
  if (pathCache.has(letter)) {
    return pathCache.get(letter)!;
  }

  try {
    const font = await loadFont();

    // Get glyph path for the letter
    // Position: x=50, y=150 (accounting for baseline)
    // Font size: 130 (fills most of 200x200 viewBox)
    const path = font.getPath(letter, 50, 150, 130);

    // Convert to SVG path string
    const svgPath = path.toPathData(2); // 2 decimal places for precision

    // Cache the result
    pathCache.set(letter, svgPath);

    return svgPath;

  } catch (error) {
    console.error(`Error generating path for letter "${letter}":`, error);
    // Return a fallback empty path
    return '';
  }
}

/**
 * Generate paths for all Mongolian Cyrillic letters
 */
export async function preloadAllLetters(): Promise<void> {
  const letters = [
    'А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З',
    'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'Ө', 'П',
    'Р', 'С', 'Т', 'У', 'Ү', 'Ф', 'Х', 'Ц', 'Ч',
    'Ш', 'Щ', 'Ъ', 'Ы', 'Ь', 'Э', 'Ю', 'Я',
  ];

  await Promise.all(letters.map(letter => generateLetterPath(letter)));
}

/**
 * Clear the path cache
 */
export function clearPathCache(): void {
  pathCache.clear();
}
