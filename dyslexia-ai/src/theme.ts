// Lexi AI — design tokens (ported 1:1 from the Expo app's src/theme.ts).

export const colors = {
  warm: {
    beige: '#F5EFE6',
    secondary: '#FAF6F0',
    card: '#FFFDF8',
    text: '#2D2D2D',
    gray: '#8A7F78',
    lightgray: '#B0A89E',
    dark: '#3D3530',
  },
  sage: {
    light: '#D8E8D4',
    DEFAULT: '#B8C9B0',
    mid: '#8FB487',
    dark: '#7A9E74',
    text: '#6A9062',
  },
  lavender: {
    lightest: '#EDE8F5',
    light: '#E8E3F5',
    DEFAULT: '#CFC7E8',
    mid: '#A090C8',
    dark: '#8B7AB8',
    darker: '#7A6AA8',
  },
  peach: {
    lightest: '#F5DDD5',
    light: '#F2D6C9',
    DEFAULT: '#D8A48F',
    dark: '#C4876A',
    darker: '#B87060',
  },
  sand: {
    lightest: '#F0E8D8',
    light: '#F0E4D4',
    DEFAULT: '#E8D8C3',
    mid: '#D8C4A8',
    dark: '#D7C8BE',
  },
  slate: {
    light: '#D8E6EC',
    DEFAULT: '#A8C4CE',
    mid: '#7AAEC0',
    dark: '#6094A8',
    text: '#5A98B0',
  },
} as const;

// Font sentinels kept identical to the Expo app. The style flattener maps these
// to the next/font CSS variables + the matching font-weight (see src/rn/style.ts).
export const fonts = {
  fredoka: {
    regular: 'Fredoka_400Regular',
    medium: 'Fredoka_500Medium',
    semibold: 'Fredoka_600SemiBold',
    bold: 'Fredoka_700Bold',
  },
  lexend: {
    regular: 'Lexend_400Regular',
    medium: 'Lexend_500Medium',
    semibold: 'Lexend_600SemiBold',
    bold: 'Lexend_700Bold',
  },
} as const;

// Soft shadows mirrored from the RN/Tailwind tokens. The flattener turns these
// shadow* keys into a CSS box-shadow.
export const shadows = {
  card: {
    shadowColor: '#2D231E',
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  cardSm: {
    shadowColor: '#2D231E',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  lavender: {
    shadowColor: '#504178',
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  peach: {
    shadowColor: '#8C5A46',
    shadowOpacity: 0.12,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  sand: {
    shadowColor: '#8C6E46',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  sage: {
    shadowColor: '#508C5A',
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
} as const;

export const SCREEN_MAX_WIDTH = 430;
