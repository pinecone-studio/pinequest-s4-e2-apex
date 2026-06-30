# ⚠️ Mongolian Cursive Path Verification Required

## Current Status: UNVERIFIED

The cursive letter paths in `mongolianCursivePaths.ts` are **approximations** based on general Russian Cyrillic cursive conventions. They have NOT been verified against actual Mongolian primary school handwriting instruction materials.

## Letters Requiring Verification (Priority: First 5)

### А (A)
**Current implementation:**
- Stroke 1: Oval loop (like Latin cursive "a")
- Stroke 2: Tail on right side

**Needs verification:**
- Is the oval the correct size/proportion for Mongolian instruction?
- Does the tail connect at the right point?
- Should it be one stroke or two?

### Б (B)
**Current implementation:**
- Stroke 1: Horizontal bar at top (left to right)
- Stroke 2: Vertical drop + curved loop (like lowercase "б")

**Needs verification:**
- Is the horizontal bar the first stroke in Mongolian schools?
- Correct loop size and position?
- Connection point accuracy?

### В (V)
**Current implementation:**
- Single stroke with two loops (upper and lower)

**Needs verification:**
- Is this one stroke or multiple strokes?
- Loop sizes and positions correct?
- Does it connect differently in cursive vs. my approximation?

### Г (G)
**Current implementation:**
- Stroke 1: Horizontal top bar
- Stroke 2: Descending vertical with tail

**Needs verification:**
- Stroke order correct?
- Tail shape and angle accurate?
- Should the tail curve more?

### Д (D)
**Current implementation:**
- Stroke 1: Left upstroke
- Stroke 2: Top horizontal
- Stroke 3: Right downstroke  
- Stroke 4: Bottom line with tails

**Needs verification:**
- This "house" shape is complex - is the stroke order correct?
- Are the tails at the bottom the right shape?
- Proportions of the triangle correct?

## What I Need

### Reference Materials
1. **Mongolian прописи (handwriting workbook)** scans or photos
2. **School instruction videos** showing stroke order
3. **Teacher-approved examples** of cursive letterforms

### Specific Validation Needed
For each letter, I need to confirm:
- ✓ Stroke count (correct number of pen-lifts)
- ✓ Stroke order (which stroke comes first, second, etc.)
- ✓ Start/end points for each stroke
- ✓ Curve shapes and proportions
- ✓ Connection points between strokes
- ✓ Overall size/spacing relative to baseline

## Why This Matters

**Educational correctness**: Children learning to write must follow the proper stroke order and letter shapes to develop good handwriting habits. Using incorrect forms would:
- Teach wrong muscle memory
- Create confusion with school instruction
- Result in poor handwriting technique

**Cultural accuracy**: Mongolian Cyrillic cursive has specific conventions that may differ from Russian, especially for Mongolian-specific letters (Өө, Үү).

## Remaining 30 Letters

Once the first 5 letters (А, Б, В, Г, Д) are verified and corrected, I will need the same verification process for:

- Е, Ё, Ж, З, И, Й, К, Л, М, Н
- О, Ө, П, Р, С, Т, У, Ү, Х, Ц
- Ч, Ш, Щ, Ъ, Ы, Ь, Э, Ю, Я

Special attention needed for:
- **Өө** - Mongolian-specific, may not have Russian reference
- **Үү** - Mongolian-specific, may not have Russian reference
- **Ъ, Ь** - Rarely used in handwriting, special handling needed

## How to Verify

### Option 1: Manual Review
Send screenshots of the rendered paths to a Mongolian primary school teacher or handwriting instructor for verification.

### Option 2: Reference Comparison
Overlay the SVG paths on scanned handwriting workbook pages to check accuracy.

### Option 3: Video Demonstration
Record the stroke animations and compare to instructional videos.

## Current Risk

**HIGH** - Using these paths in production would teach incorrect handwriting to children. The app should not enable tracing until paths are verified by someone with expertise in Mongolian primary education.

## Next Steps

1. ❌ Do NOT proceed with remaining 30 letters until first 5 are verified
2. ❌ Do NOT ship this feature to production
3. ✅ Get expert review of А, Б, В, Г, Д stroke paths
4. ✅ Correct any errors found
5. ✅ Only then proceed with remaining letters

---

**Last updated:** 2026-06-30  
**Status:** Awaiting verification from Mongolian education expert
