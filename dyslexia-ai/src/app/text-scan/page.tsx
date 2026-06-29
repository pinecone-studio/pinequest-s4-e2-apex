'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator } from '../../rn/primitives';
import StatusBarRow from '../../components/StatusBarRow';
import AppIcon from '../../components/AppIcon';
import { colors, fonts, shadows } from '../../theme';

async function scanImage(file: File): Promise<{ original: string; simplified: string }> {
  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = (reader.result as string).split(',')[1];
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const res = await fetch('/api/scan-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64: base64, mimeType: file.type || 'image/jpeg' }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => '');
    throw new Error(err || `HTTP ${res.status}`);
  }
  return res.json();
}

export default function TextScanPage() {
  const router = useRouter();
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ original: string; simplified: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setError(null);
    setResult(null);
    setPreview(URL.createObjectURL(file));
    setLoading(true);
    try {
      const data = await scanImage(file);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith('image/')) handleFile(file);
  }

  function reset() {
    setPreview(null);
    setResult(null);
    setError(null);
  }

  return (
    <View style={styles.root}>
      <StatusBarRow />

      {/* Header */}
      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <AppIcon name="arrowBack" size={20} color={colors.warm.text} />
        </Pressable>
        <Text style={styles.headerTitle}>Текст уншуулах</Text>
        {result || preview ? (
          <Pressable style={styles.resetBtn} onPress={reset}>
            <AppIcon name="close" size={20} color={colors.warm.gray} />
          </Pressable>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {!result && (
          <>
            {/* Upload zone */}
            <View
              style={[styles.dropZone, preview ? styles.dropZoneWithPreview : null]}
              onDragOver={(e: React.DragEvent) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview} alt="preview" style={{ width: '100%', borderRadius: 16, objectFit: 'contain', maxHeight: 280 }} />
              ) : (
                <View style={styles.dropHint}>
                  <AppIcon name="scan" size={48} color={colors.sage.mid} />
                  <Text style={styles.dropTitle}>Зураг оруулах</Text>
                  <Text style={styles.dropSub}>Зургийг энд чирж тавих эсвэл товч дарна уу</Text>
                </View>
              )}
            </View>

            {/* Buttons */}
            <View style={styles.btnRow}>
              {/* Camera — mobile browsers open camera directly */}
              <Pressable style={styles.actionBtn} onPress={() => cameraInputRef.current?.click()} disabled={loading}>
                <AppIcon name="camera" size={22} color={colors.sage.dark} />
                <Text style={styles.actionBtnText}>Камер</Text>
              </Pressable>

              {/* Gallery */}
              <Pressable style={[styles.actionBtn, styles.actionBtnPrimary]} onPress={() => galleryInputRef.current?.click()} disabled={loading}>
                <AppIcon name="images" size={22} color="#fff" />
                <Text style={[styles.actionBtnText, { color: '#fff' }]}>Галерей</Text>
              </Pressable>
            </View>

            {loading && (
              <View style={styles.loadingRow}>
                <ActivityIndicator color={colors.sage.dark} />
                <Text style={styles.loadingText}>AI уншиж байна...</Text>
              </View>
            )}

            {error && (
              <View style={styles.errorCard}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
          </>
        )}

        {result && (
          <>
            {preview && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="preview" style={{ width: '100%', borderRadius: 16, objectFit: 'contain', maxHeight: 200, marginBottom: 16 }} />
            )}

            {/* Simplified */}
            <View style={styles.simplCard}>
              <Text style={styles.simplLabel}>Хялбарчилсан</Text>
              <Text style={styles.simplText}>{result.simplified}</Text>
            </View>

            {/* Original */}
            <View style={styles.origCard}>
              <Text style={styles.origLabel}>Оригинал текст</Text>
              <Text style={styles.origText}>{result.original}</Text>
            </View>

            <Pressable style={styles.scanAgainBtn} onPress={reset}>
              <AppIcon name="camera" size={18} color={colors.sage.dark} />
              <Text style={styles.scanAgainText}>Дахин скан хийх</Text>
            </Pressable>
          </>
        )}
      </ScrollView>

      {/* Hidden file inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onFileChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.warm.beige },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.warm.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  headerTitle: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 20,
    color: colors.warm.text,
  },
  resetBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: colors.warm.card,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },

  content: { paddingHorizontal: 20, paddingBottom: 40, gap: 14 },

  dropZone: {
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.sage.DEFAULT,
    borderStyle: 'dashed' as any,
    backgroundColor: colors.warm.card,
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    ...shadows.card,
  },
  dropZoneWithPreview: {
    borderStyle: 'solid' as any,
    borderColor: colors.sage.mid,
    padding: 8,
  },
  dropHint: { alignItems: 'center', gap: 10, padding: 32 },
  dropTitle: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 20,
    color: colors.warm.text,
  },
  dropSub: {
    fontFamily: fonts.lexend.regular,
    fontSize: 13,
    color: colors.warm.gray,
    textAlign: 'center' as any,
  },

  btnRow: { flexDirection: 'row', gap: 12 },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: colors.warm.card,
    ...shadows.card,
  },
  actionBtnPrimary: { backgroundColor: colors.sage.mid },
  actionBtnText: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 15,
    color: colors.sage.dark,
  },

  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  loadingText: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 15,
    color: colors.sage.dark,
  },

  errorCard: {
    backgroundColor: '#FEE2E2',
    borderRadius: 16,
    padding: 14,
  },
  errorText: {
    fontFamily: fonts.lexend.regular,
    fontSize: 13,
    color: '#DC2626',
  },

  simplCard: {
    backgroundColor: colors.sage.light,
    borderRadius: 20,
    padding: 18,
    ...shadows.sage,
  },
  simplLabel: {
    fontFamily: fonts.lexend.semibold,
    fontSize: 11,
    color: colors.sage.text,
    letterSpacing: 0.5,
    marginBottom: 10,
    textTransform: 'uppercase' as any,
  },
  simplText: {
    fontFamily: fonts.lexend.regular,
    fontSize: 18,
    lineHeight: 30,
    color: colors.warm.text,
    letterSpacing: 0.3,
  },

  origCard: {
    backgroundColor: colors.warm.card,
    borderRadius: 20,
    padding: 18,
    ...shadows.card,
  },
  origLabel: {
    fontFamily: fonts.lexend.semibold,
    fontSize: 11,
    color: colors.warm.gray,
    letterSpacing: 0.5,
    marginBottom: 10,
    textTransform: 'uppercase' as any,
  },
  origText: {
    fontFamily: fonts.lexend.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.warm.gray,
  },

  scanAgainBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 20,
    backgroundColor: colors.warm.card,
    ...shadows.card,
  },
  scanAgainText: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 15,
    color: colors.sage.dark,
  },
});
