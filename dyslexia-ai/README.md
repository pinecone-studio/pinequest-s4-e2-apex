# Lexi AI — Web (Next.js)

`apex/` доторх Expo (React Native) аппын **Next.js 16 + TypeScript** хувилбар.
Бүх дэлгэц, theme, API, дислекси шалгалтын логикийг 1:1 буулгасан.

## Бүтэц

- `src/rn/` — React Native-тэй нийцтэй жижиг primitives (`View`, `Text`, `Pressable`,
  `ScrollView`, `TextInput`, `LinearGradient`, `Slider`, `StyleSheet`, `Alert`, `Share` …).
  Эдгээр нь RN style объектыг вэб CSS рүү хөрвүүлдэг (`style.ts`-ийн `flattenStyle`), тиймээс
  дэлгэцийн кодыг бараг хэвээр нь авч ирсэн.
- `src/components/` — `LexiBot` (SVG mascot), `AppIcon` (react-icons), `BottomNav`, `StatusBarRow`.
- `src/hooks/` — `useChild` (Clerk хэрэглэгчийн профайл), `useSpeech`.
- `src/lib/` — `api.ts` (backend REST), `dyslexia.ts` (ур чадварын мета).
- `src/app/` — App Router дэлгэцүүд:
  - `/` splash, `/sign-in`, `/sign-up`
  - `(tabs)/` доторх `/home /stories /games /parent /profile` — доод navigation-тэй
  - `/reading /practice /phonics /dyslexia-test` — stack дэлгэцүүд
- `src/proxy.ts` — Clerk auth (Next 16-ийн `proxy` convention).

## Эхлүүлэх

```bash
cp .env.local.example .env.local   # дараа нь Clerk түлхүүрээ нэмнэ
npm run dev
```

`.env.local` дотор дор хаяж дараахыг тавина:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_API_URL=http://localhost:4000
```

> Түлхүүр дутуу бол апп унахгүй — тохиргооны санамж харуулна.

## Backend

Профайл, шагнал, статистик зэрэг нь `apex/server` доторх Express + Prisma серверийг
ашиглана. Тусдаа терминалд:

```bash
cd ../../apex && npm run server   # http://localhost:4000
```
