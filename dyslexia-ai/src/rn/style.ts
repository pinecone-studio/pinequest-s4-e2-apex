// Translates React-Native-style style objects (as ported from the Expo app)
// into plain web CSS objects usable as React `style` props.
//
// It handles the few places RN and the DOM disagree:
//  - StyleSheet arrays / nested arrays / falsy entries -> a single merged object
//  - the `fontFamily` sentinels from theme.ts -> next/font CSS var + font-weight
//  - shadow* keys -> a single `boxShadow`
//  - `transform` arrays -> a CSS transform string
//  - numeric `lineHeight` -> px (RN treats it as px, the DOM as a multiplier)
//  - a couple of renamed keys (textDecorationLine, etc.)

import type { CSSProperties } from 'react';

// RN style objects carry many non-CSS keys, so we keep this loose on purpose.
export type RNStyle = Record<string, unknown>;
export type StyleProp = RNStyle | false | null | undefined | StyleProp[];

const FONT_MAP: Record<string, [string, number]> = {
  Fredoka_400Regular: ['var(--font-fredoka)', 400],
  Fredoka_500Medium: ['var(--font-fredoka)', 500],
  Fredoka_600SemiBold: ['var(--font-fredoka)', 600],
  Fredoka_700Bold: ['var(--font-fredoka)', 700],
  Lexend_400Regular: ['var(--font-lexend)', 400],
  Lexend_500Medium: ['var(--font-lexend)', 500],
  Lexend_600SemiBold: ['var(--font-lexend)', 600],
  Lexend_700Bold: ['var(--font-lexend)', 700],
};

function hexToRgba(hex: string, opacity: number): string {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function transformToCss(arr: Array<Record<string, number | string>>): string {
  return arr
    .map((t) => {
      const [key, val] = Object.entries(t)[0];
      if (key === 'translateX' || key === 'translateY') {
        return `${key}(${typeof val === 'number' ? `${val}px` : val})`;
      }
      return `${key}(${val})`;
    })
    .join(' ');
}

function mergeInto(target: Record<string, unknown>, src: StyleProp): void {
  if (!src) return;
  if (Array.isArray(src)) {
    for (const s of src) mergeInto(target, s);
    return;
  }
  Object.assign(target, src);
}

export function flattenStyle(style: StyleProp): CSSProperties {
  const merged: Record<string, unknown> = {};
  mergeInto(merged, style);

  const out: Record<string, unknown> = {};
  let shadowColor: string | undefined;
  let shadowOpacity = 1;
  let shadowRadius = 0;
  let shadowOffset: { width?: number; height?: number } = { width: 0, height: 0 };
  let hasShadow = false;

  for (const [key, value] of Object.entries(merged)) {
    if (value == null) continue;
    switch (key) {
      case 'fontFamily': {
        const mapped = FONT_MAP[value as string];
        if (mapped) {
          out.fontFamily = mapped[0];
          if (out.fontWeight == null) out.fontWeight = mapped[1];
        } else {
          out.fontFamily = value;
        }
        break;
      }
      case 'shadowColor':
        shadowColor = value as string;
        hasShadow = true;
        break;
      case 'shadowOpacity':
        shadowOpacity = value as number;
        hasShadow = true;
        break;
      case 'shadowRadius':
        shadowRadius = value as number;
        hasShadow = true;
        break;
      case 'shadowOffset':
        shadowOffset = value as { width?: number; height?: number };
        hasShadow = true;
        break;
      case 'paddingVertical':
        if (out.paddingTop == null) out.paddingTop = value;
        if (out.paddingBottom == null) out.paddingBottom = value;
        break;
      case 'paddingHorizontal':
        if (out.paddingLeft == null) out.paddingLeft = value;
        if (out.paddingRight == null) out.paddingRight = value;
        break;
      case 'marginVertical':
        if (out.marginTop == null) out.marginTop = value;
        if (out.marginBottom == null) out.marginBottom = value;
        break;
      case 'marginHorizontal':
        if (out.marginLeft == null) out.marginLeft = value;
        if (out.marginRight == null) out.marginRight = value;
        break;
      case 'elevation':
      case 'includeFontPadding':
      case 'textAlignVertical':
        break; // RN-only, no web equivalent we need
      case 'transform':
        out.transform = Array.isArray(value)
          ? transformToCss(value as Array<Record<string, number | string>>)
          : value;
        break;
      case 'lineHeight':
        out.lineHeight = typeof value === 'number' ? `${value}px` : value;
        break;
      case 'textDecorationLine':
        out.textDecoration = value;
        break;
      default:
        out[key] = value;
    }
  }

  if (hasShadow && shadowColor) {
    const { width = 0, height = 0 } = shadowOffset || {};
    out.boxShadow = `${width}px ${height}px ${shadowRadius}px ${hexToRgba(
      shadowColor,
      shadowOpacity
    )}`;
  }

  // RN shows a border from width alone; the DOM also needs a border-style.
  const WIDTH_KEYS = [
    'borderWidth',
    'borderTopWidth',
    'borderBottomWidth',
    'borderLeftWidth',
    'borderRightWidth',
  ];
  if (out.borderStyle == null && WIDTH_KEYS.some((k) => out[k] != null)) {
    out.borderStyle = 'solid';
  }

  return out as CSSProperties;
}

export type Vec2 = { x: number; y: number };

// RN's LinearGradient takes start/end unit points (x,y with y pointing down).
// Convert to a CSS gradient angle (clockwise from "to top"). Default vertical.
export function gradientAngle(start?: Vec2, end?: Vec2): number {
  if (!start || !end) return 180;
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  return Math.round((Math.atan2(dx, -dy) * 180) / Math.PI);
}
