'use client';

// Tiny React-Native-compatible primitives so the ported screens can keep their
// original JSX (View/Text/Pressable/ScrollView/TextInput/...) almost verbatim.
// Each one is a thin <div>/<span>/<input> that applies RN's flexbox defaults and
// runs the style through flattenStyle().

import React from 'react';
import { flattenStyle, type StyleProp } from './style';

const boxBase: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  boxSizing: 'border-box',
  minHeight: 0,
};

type DivProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'style'>;

export interface ViewProps extends DivProps {
  style?: StyleProp;
  children?: React.ReactNode;
}

export function View({ style, children, ...rest }: ViewProps) {
  return (
    <div style={{ ...boxBase, ...flattenStyle(style) }} {...rest}>
      {children}
    </div>
  );
}

export const SafeAreaView = View;
export const KeyboardAvoidingView = View;
export const Animated = { View };

export interface TextProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'> {
  style?: StyleProp;
  numberOfLines?: number;
  children?: React.ReactNode;
}

export function Text({ style, children, numberOfLines, ...rest }: TextProps) {
  const s = flattenStyle(style);
  const clamp: React.CSSProperties | null = numberOfLines
    ? {
        display: '-webkit-box',
        WebkitLineClamp: numberOfLines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }
    : null;
  return (
    <span style={{ boxSizing: 'border-box', ...s, ...clamp }} {...rest}>
      {children}
    </span>
  );
}

export interface PressableProps extends DivProps {
  style?: StyleProp | ((state: { pressed: boolean }) => StyleProp);
  onPress?: (e?: unknown) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function Pressable({ style, children, onPress, disabled, ...rest }: PressableProps) {
  const resolved = typeof style === 'function' ? style({ pressed: false }) : style;
  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : () => onPress?.()}
      onKeyDown={
        disabled
          ? undefined
          : (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPress?.();
              }
            }
      }
      style={{
        ...boxBase,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        userSelect: 'none',
        ...flattenStyle(resolved),
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export const TouchableOpacity = Pressable;

export interface ScrollViewProps extends DivProps {
  style?: StyleProp;
  contentContainerStyle?: StyleProp;
  horizontal?: boolean;
  showsVerticalScrollIndicator?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  keyboardShouldPersistTaps?: string;
  children?: React.ReactNode;
}

export function ScrollView({
  style,
  contentContainerStyle,
  horizontal,
  children,
  showsVerticalScrollIndicator,
  showsHorizontalScrollIndicator,
  keyboardShouldPersistTaps,
  ...rest
}: ScrollViewProps) {
  const outer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    flex: 1,
    minHeight: 0,
    overflowY: horizontal ? 'hidden' : 'auto',
    overflowX: horizontal ? 'auto' : 'hidden',
    ...flattenStyle(style),
  };
  const inner: React.CSSProperties = {
    display: 'flex',
    flexDirection: horizontal ? 'row' : 'column',
    boxSizing: 'border-box',
    ...(horizontal ? {} : { width: '100%' }),
    ...flattenStyle(contentContainerStyle),
  };
  return (
    <div style={outer} {...rest}>
      <div style={inner}>{children}</div>
    </div>
  );
}

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style' | 'value'> {
  style?: StyleProp;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
}

export function TextInput({
  style,
  value,
  onChangeText,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  autoCapitalize,
  ...rest
}: TextInputProps) {
  return (
    <input
      type={secureTextEntry ? 'password' : 'text'}
      value={value}
      placeholder={placeholder}
      autoCapitalize={autoCapitalize}
      onChange={(e) => onChangeText?.(e.target.value)}
      style={
        {
          boxSizing: 'border-box',
          border: 'none',
          outline: 'none',
          width: '100%',
          '--placeholder-color': placeholderTextColor,
          ...flattenStyle(style),
        } as React.CSSProperties
      }
      {...rest}
    />
  );
}

export interface ActivityIndicatorProps {
  color?: string;
  size?: number;
  style?: StyleProp;
}

export function ActivityIndicator({ color = '#888', size = 24, style }: ActivityIndicatorProps) {
  return (
    <div style={{ ...flattenStyle(style), alignItems: 'center', justifyContent: 'center' }}>
      <span
        className="lexi-spinner"
        style={{ width: size, height: size, borderColor: color, borderTopColor: 'transparent' }}
      />
    </div>
  );
}

// --- RN API shims so ported screens keep their original calls ---

// No-op StyleSheet.create — styles are plain objects flattened at render time.
export const StyleSheet = {
  create: <T extends Record<string, unknown>>(styles: T): T => styles,
};

export const Platform = { OS: 'web' as const, select: <T,>(o: { web?: T; default?: T }) => o.web ?? o.default };

export const Alert = {
  alert(title: string, message?: string) {
    if (typeof window !== 'undefined') {
      window.alert(message ? `${title}\n\n${message}` : title);
    }
  },
};

export const Share = {
  async share({ message }: { message: string; title?: string; url?: string }) {
    try {
      if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ text: message });
      } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(message);
        Alert.alert('Хуулагдлаа', 'Явцыг тань clipboard-д хууллаа.');
      }
    } catch {
      // user cancelled or unsupported — ignore
    }
  },
};

export interface SliderProps {
  style?: StyleProp;
  minimumValue?: number;
  maximumValue?: number;
  value?: number;
  onValueChange?: (v: number) => void;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
  step?: number;
}

export function Slider({
  style,
  minimumValue = 0,
  maximumValue = 1,
  value = 0,
  onValueChange,
  minimumTrackTintColor,
  maximumTrackTintColor,
  thumbTintColor,
  step,
}: SliderProps) {
  const pct = ((value - minimumValue) / (maximumValue - minimumValue)) * 100;
  const track = `linear-gradient(90deg, ${minimumTrackTintColor ?? '#888'} ${pct}%, ${
    maximumTrackTintColor ?? '#ddd'
  } ${pct}%)`;
  return (
    <input
      type="range"
      min={minimumValue}
      max={maximumValue}
      step={step ?? 'any'}
      value={value}
      onChange={(e) => onValueChange?.(Number(e.target.value))}
      style={
        {
          appearance: 'none',
          WebkitAppearance: 'none',
          height: 6,
          borderRadius: 999,
          background: track,
          outline: 'none',
          cursor: 'pointer',
          accentColor: thumbTintColor,
          ...flattenStyle(style),
        } as React.CSSProperties
      }
    />
  );
}
