import { colors, fonts } from '../theme';

// Shown when NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing so the app gives a
// friendly setup hint instead of crashing inside ClerkProvider.
export default function SetupNotice() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        padding: 32,
        textAlign: 'center',
        backgroundColor: colors.warm.beige,
      }}
    >
      <span style={{ fontFamily: `var(--font-fredoka)`, fontWeight: 700, fontSize: 20, color: colors.warm.text }}>
        Clerk түлхүүр дутуу байна
      </span>
      <span style={{ fontFamily: `var(--font-lexend)`, fontSize: 14, color: colors.warm.gray, lineHeight: '22px' }}>
        <code>.env.local</code> дотор <code>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code>-ээ
        нэмж, dev серверээ дахин эхлүүлнэ үү.
      </span>
    </div>
  );
}
