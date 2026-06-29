# AlphabetScreen - Mongolian Cyrillic Alphabet Learning

## Overview
Duolingo-style alphabet learning screen for mastering all 35 Mongolian Cyrillic letters with progress tracking.

## Features

### 📚 Complete Alphabet Coverage
- **35 letters** in Mongolian Cyrillic: А through Я
- Each card shows: Uppercase + lowercase (e.g., "Аа")
- Romanization below (based on standard Mongolian pronunciation)
- 4-column responsive grid layout

### 🎯 Progress Tracking
- **0-3 lesson levels** per letter stored in AsyncStorage
- Yellow progress bar at bottom of each card (0-100% fill)
- Visual feedback:
  - Not started: white background, gray border
  - In progress: white background, yellow border
  - Selected: soft yellow background tint

### 🔤 Vowels Section
Dedicated section below main grid with header "Эгшиг үсгүүд" showing:
А, Э, И, О, У, Ү, Е, Ё, Ю, Я

### 🎨 Design System Match
- Colors: PineQuest warm.beige background, slate.DEFAULT header
- Fonts: Fredoka (headers/letters), Lexend (romanization)
- Shadows: card and cardSm from theme
- Border radius: 12px cards, 24px header button

## Files Created

### Core Files
- `src/screens/AlphabetScreen.tsx` - Main alphabet grid with progress
- `src/screens/TraceLetterScreen.tsx` - Placeholder letter tracing screen

### Navigation
- Added to `App.tsx` Stack Navigator
- Entry card added to `HomeScreen.tsx`

## Romanization Map

```
А=a   Б=b   В=v   Г=g   Д=d   Е=ye  Ё=yo
Ж=j   З=z   И=i   Й=y   К=k   Л=l   М=m
Н=n   О=o   Ө=ö   П=p   Р=r   С=s   Т=t
У=u   Ү=ü   Х=kh  Ц=ts  Ч=ch  Ш=sh  Щ=shch
Ъ="   Ы=y   Ь='   Э=e   Ю=yu  Я=ya
```

## Data Structure

### Progress Storage
```typescript
{
  "А": 2,  // 0-3 lessons completed
  "Б": 1,
  "В": 0,
  ...
}
```

Stored in AsyncStorage with key: `@alphabet_progress`

### Letter Data Type
```typescript
type LetterData = {
  upper: string;      // "А"
  lower: string;      // "а"
  romanization: string; // "a"
};
```

## User Flow

1. Open Home screen → tap "Үсэг сурах" card
2. See all 35 letters in 4-column grid
3. Tap any letter card → navigate to TraceLetterScreen
4. (Future) Complete tracing lessons → progress updates
5. Progress bar fills yellow (0% → 33% → 67% → 100%)
6. Card border changes from gray → yellow when started

## Navigation

### To Alphabet Screen
```typescript
navigation.navigate('Alphabet')
```

### To Trace Screen
```typescript
navigation.navigate('TraceLetter', { letter: 'А' })
```

## Dependencies

### New
- `@react-native-async-storage/async-storage` - Progress persistence

### Existing
- `@react-navigation/native` - Navigation
- `react-native-safe-area-context` - Safe areas
- Design system from `../theme`

## Card Layout

```
┌──────────────┐
│              │
│     Аа       │  ← Upper + lower
│              │
│     a        │  ← Romanization
│              │
│  ▓▓▓▓░░░░░   │  ← Progress bar (67% here)
└──────────────┘
```

## Responsive Behavior

- **Card width**: Auto-calculated for 4 columns
- **Gap**: 12px between cards
- **Padding**: 16px screen edges
- **Min height**: 100px per card
- Wraps to new row after every 4 cards

## Color Coding

### Progress States
- **0 lessons**: Gray border (#B0A89E)
- **1-2 lessons**: Yellow border (#E8D8C3)
- **3 lessons**: Full yellow progress bar

### Card States
- **Default**: white (#FFFDF8) + gray border
- **Started**: white + yellow border
- **Selected**: yellow tint (#F0E8D8) + yellow border

## Header Button
Blue/slate rounded button at top:
- Background: `colors.slate.DEFAULT` (#A8C4CE)
- Text: "ҮСЭГ СУРАХ" in white, bold, uppercase
- Border radius: 24px
- Padding: 12px vertical, 32px horizontal

## Section Divider
Vowels section has decorative divider:
- Text: "Эгшиг үсгүүд"
- Lines on both sides (gray #B0A89E)
- Margin: 32px top, 20px bottom

## Future Enhancements

- [ ] Implement actual tracing in TraceLetterScreen
- [ ] Add sound playback for each letter
- [ ] Animate progress bar fills
- [ ] Add achievement badges (all vowels, all consonants, etc.)
- [ ] Sync progress to backend API
- [ ] Add letter pronunciation audio with TTS
- [ ] Letter stroke order animation
- [ ] Handwriting recognition for tracing validation

## Testing Tips

1. **Progress Testing**: Manually edit AsyncStorage to test different states
2. **Layout Testing**: Test on different screen widths
3. **Navigation**: Ensure back button works from TraceLetter
4. **Touch Targets**: All cards should be easily tappable (100px height)

## Code Quality

- TypeScript strict mode compatible
- All 35 letters defined in constant array
- Reusable renderLetterCard function
- AsyncStorage error handling
- Navigation type safety with route params

## Accessibility

- Large touch targets (100px minimum)
- High contrast text
- Progress visually represented with color + bar
- Clear romanization for pronunciation guidance

## Performance

- AsyncStorage read once on mount
- Efficient grid layout with flexWrap
- No unnecessary re-renders
- Memoization opportunities for renderLetterCard
