'use client';

import { flattenStyle, type StyleProp } from '../rn/style';

type Size = 'sm' | 'md' | 'lg';
type Anim = 'float' | 'bob' | 'none';

interface LexiBotProps {
  size?: Size;
  animate?: Anim;
  style?: StyleProp;
}

const sizes: Record<Size, number> = { sm: 72, md: 92, lg: 150 };

/** Mascot robot — ported 1:1 from the Expo SVG; motion via CSS animations. */
export default function LexiBot({ size = 'md', animate = 'float', style }: LexiBotProps) {
  const px = sizes[size];
  const height = Math.round(px * 1.18);
  const animClass =
    animate === 'float' ? 'lexi-anim-float' : animate === 'bob' ? 'lexi-anim-bob' : '';

  return (
    <div
      className={animClass}
      style={{ width: px, height, flexShrink: 0, ...flattenStyle(style) }}
    >
      <svg viewBox="0 0 110 130" width={px} height={height}>
        {/* Antenna */}
        <line x1="55" y1="8" x2="55" y2="24" stroke="#9B8BC4" strokeWidth="5" strokeLinecap="round" />
        <circle cx="55" cy="8" r="6" fill="#D8A48F" />
        {/* Head */}
        <rect x="14" y="22" width="82" height="68" rx="26" fill="#E8D8C3" />
        <rect x="14" y="22" width="82" height="68" rx="26" fill="none" stroke="#9B8BC4" strokeWidth="5" />
        {/* Screen */}
        <rect x="25" y="34" width="60" height="40" rx="17" fill="#3D3530" />
        {/* Eyes */}
        <circle cx="44" cy="54" r="8.5" fill="#A8C4CE" />
        <circle cx="66" cy="54" r="8.5" fill="#A8C4CE" />
        <circle cx="46" cy="52" r="3" fill="#FFFDF8" />
        <circle cx="68" cy="52" r="3" fill="#FFFDF8" />
        {/* Smile */}
        <path d="M48 80 Q55 87 62 80" stroke="#9B8BC4" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* Cheeks */}
        <circle cx="26" cy="70" r="4" fill="#D8A48F" opacity={0.55} />
        <circle cx="84" cy="70" r="4" fill="#D8A48F" opacity={0.55} />
        {/* Body */}
        <rect x="32" y="92" width="46" height="30" rx="15" fill="#9B8BC4" />
        {/* Wave arm */}
        {size !== 'sm' && (
          <g>
            <rect
              x="6"
              y="98"
              width="16"
              height="9"
              rx="4.5"
              fill="#E8D8C3"
              transform="rotate(30 14 102)"
            />
            <circle cx="9" cy="92" r="5" fill="#E8D8C3" />
          </g>
        )}
      </svg>
    </div>
  );
}
