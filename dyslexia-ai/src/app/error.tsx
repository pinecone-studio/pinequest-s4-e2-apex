'use client';

import { colors } from '../theme';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div
      style={{
        flex: 1,
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        padding: 32,
        textAlign: 'center',
        backgroundColor: colors.warm.beige,
      }}
    >
      <span style={{ fontSize: 56 }}>🙈</span>
      <span style={{ fontFamily: 'var(--font-fredoka)', fontWeight: 700, fontSize: 20, color: colors.warm.text }}>
        Өө, жаахан асуудал гарлаа
      </span>
      <span style={{ fontFamily: 'var(--font-lexend)', fontSize: 14, color: colors.warm.gray }}>
        Дахин оролдоод үзье.
      </span>
      <button
        onClick={reset}
        style={{
          marginTop: 8,
          padding: '12px 28px',
          borderRadius: 9999,
          border: 'none',
          backgroundColor: colors.warm.text,
          color: '#fff',
          fontFamily: 'var(--font-fredoka)',
          fontWeight: 600,
          fontSize: 16,
          cursor: 'pointer',
        }}
      >
        Дахин оролдох
      </button>
    </div>
  );
}
