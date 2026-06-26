'use client';

// Web stand-in for expo-linear-gradient. Renders a flex <div> whose background
// is a CSS linear-gradient built from `colors` + the RN start/end unit points.

import React from 'react';
import { flattenStyle, gradientAngle, type StyleProp, type Vec2 } from './style';

export interface LinearGradientProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  colors: readonly string[];
  start?: Vec2;
  end?: Vec2;
  style?: StyleProp;
  children?: React.ReactNode;
}

export function LinearGradient({
  colors = [],
  start,
  end,
  style,
  children,
  ...rest
}: LinearGradientProps) {
  const deg = gradientAngle(start, end);
  const background = `linear-gradient(${deg}deg, ${colors.join(', ')})`;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        boxSizing: 'border-box',
        minHeight: 0,
        backgroundImage: background,
        ...flattenStyle(style),
      }}
      {...rest}
    >
      {children}
    </div>
  );
}

export default LinearGradient;
