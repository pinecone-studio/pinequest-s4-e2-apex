# TraceLetterScreen - Duolingo-Style Letter Tracing

## Overview
Interactive letter tracing screen with real-time drawing feedback, matching Duolingo's clean, minimal design aesthetic.

## Layout Components

### Header
- **X button** (top left, gray circle) - navigate back
- **Progress bar** (green fill, thin rounded bar) - shows completion %

### Title
- **"Үсэг зур"** - bold, large, left-aligned, black text

### Letter Info Row
- **Blue speaker button** (🔊) - calls Chimege TTS on tap
- **Letter display** - shows current letter (e.g., "Б")
- **Romanization** - shows pronunciation below (e.g., "b")

### Canvas (Main Tracing Area)
**Background**: Pure white (#FFFFFF)

**Guide Elements**:
1. **Crosshair guidelines** - light gray (#E5E5E5), dashed lines
   - Horizontal center line
   - Vertical center line

2. **Wide guide path** - light gray (#CCCCCC, 40px stroke, 0.2 opacity)
   - Shows the letter shape to trace

3. **Dashed direction path** - light blue (#29B6F6, 6px stroke, dashed)
   - Animated stroke showing trace direction

4. **Start indicator** - blue circle with ↓ arrow
   - Circle: #29B6F6, radius 15
   - Arrow: white text

5. **End indicator** - blue triangle arrow (◀)
   - Filled triangle pointing to end direction

6. **User ink** - light blue (#29B6F6, 8px stroke, 0.8 opacity)
   - Real-time path drawn by user

### Bottom Controls
- **Reset button** (↺) - gray circle, left side
- **CHECK button** - large rounded button
  - Disabled: gray (#F0F0F0), light text
  - Active (≥70%): green (#58CC02), white text

## Color Palette

```
Primary Colors:
- Canvas background: #FFFFFF
- Progress green: #58CC02
- Trace blue: #29B6F6
- Speaker blue: #1CB0F6

Neutrals:
- Crosshair: #E5E5E5
- Guide path: #CCCCCC
- Button gray: #F0F0F0
- Text gray: #999999
- Black text: #000000
```

## Gesture Handling

### PanGestureHandler
- Tracks finger/pointer movement
- Converts screen coordinates → SVG coordinates (200x200 viewBox)
- Builds path string: `M x y L x y L x y...`
- Updates in real-time as user draws

### Accuracy Calculation
Simple path length comparison:
```typescript
accuracy = (userPathLength / guidePathLength) * 100
```

Production version should use:
- Point-to-path distance algorithm
- Stroke direction validation
- Start/end point proximity check

## Letter Path Data

Stored in `src/lib/letterPaths.ts`:

```typescript
type LetterPathData = {
  path: string;           // SVG path commands
  startPoint: { x, y };   // Where to begin
  endPoint: { x, y };     // Where to end
};
```

Currently defined for: А, Б, В, Г, Д, Е, О, И, М, Н, Т, У

Fallback: horizontal line for undefined letters

## User Flow

1. User taps letter card in AlphabetScreen
2. TraceLetterScreen loads with letter param
3. Optional: tap 🔊 to hear letter pronunciation
4. User traces letter with finger following blue guide
5. Progress bar fills as accuracy increases
6. CHECK button turns green at ≥70% accuracy
7. Tap CHECK → success animation (future) → return to alphabet

## State Management

```typescript
const [userPath, setUserPath] = useState<string>('');
const [isDrawing, setIsDrawing] = useState(false);
const [accuracy, setAccuracy] = useState(0);
```

Path ref stores current drawing without re-renders:
```typescript
const pathRef = useRef<string>('');
```

## SVG ViewBox System

Canvas uses 200x200 viewBox mapped to screen size:
```typescript
const CANVAS_SIZE = WINDOW_WIDTH - 40;
```

Coordinate conversion:
```typescript
svgX = (screenX / CANVAS_SIZE) * 200
svgY = (screenY / CANVAS_SIZE) * 200
```

## Responsive Design

- Canvas size: screen width - 40px padding
- Maintains square aspect ratio
- SVG viewBox scales proportionally
- Touch targets: 56px+ for all buttons

## Future Enhancements

- [ ] Implement proper path matching algorithm
- [ ] Add success animation (green checkmark, confetti)
- [ ] Integrate Chimege TTS for speaker button
- [ ] Animated stroke direction (moving dashed line)
- [ ] Haptic feedback on correct strokes
- [ ] Save progress to AsyncStorage
- [ ] Multi-stroke letter support
- [ ] Handwriting recognition validation
- [ ] Practice history and statistics
- [ ] Difficulty levels (with/without guide)

## Files

### Created
- `src/screens/TraceLetterScreen.tsx` - Main tracing UI
- `src/lib/letterPaths.ts` - SVG path definitions

### Dependencies
- `react-native-svg` - SVG rendering
- `react-native-gesture-handler` - Touch handling
- `@react-navigation/native` - Navigation

## Styling Notes

### Flat Design
- No shadows or gradients
- Clean borders (#E5E5E5)
- Minimal decoration
- Focus on content

### Typography
- Title: Fredoka Bold, 28px
- Letter: Fredoka Bold, 32px
- Romanization: Lexend Regular, 16px
- Button: Fredoka Bold, 18px, uppercase

### Spacing
- Screen padding: 20px
- Component gaps: 12-16px
- Canvas margin: 20px sides

## Accessibility

- Large touch targets (56px buttons)
- High contrast guides
- Visual feedback on all interactions
- Audio option for pronunciation
- Color-coded success states

## Performance

- SVG paths pre-defined (no runtime calculation)
- Gesture ref prevents excessive re-renders
- Accuracy calc throttled (can be optimized)
- Lightweight path storage

## Testing Tips

1. Test with different screen sizes
2. Verify touch accuracy at canvas edges
3. Check coordinate conversion accuracy
4. Test rapid drawing gestures
5. Validate progress bar updates
6. Confirm CHECK button state transitions

## Known Limitations

1. **Simplified accuracy** - needs proper algorithm
2. **Single stroke only** - multi-stroke letters need segments
3. **No stroke direction validation** - can trace backwards
4. **Limited letter library** - only 11 letters defined
5. **No persistence** - progress not saved between sessions
