'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator } from '../../rn/primitives';
import StatusBarRow from '../../components/StatusBarRow';
import AppIcon from '../../components/AppIcon';
import { colors, fonts, shadows } from '../../theme';

async function scanBase64(base64: string, mimeType: string): Promise<{ original: string; simplified: string }> {
  const res = await fetch('/api/scan-text', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ imageBase64: base64, mimeType }),
  });
  if (!res.ok) throw new Error((await res.text().catch(() => '')) || `HTTP ${res.status}`);
  return res.json();
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Camera modal ──────────────────────────────────────────────────────────────
function CameraModal({ onCapture, onClose }: { onCapture: (base64: string) => void; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [ready, setReady] = useState(false);
  const [camError, setCamError] = useState<string | null>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' }, audio: false })
      .then((stream) => {
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => setCamError('Камерт хандах зөвшөөрөл олгоно уу.'));

    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')!.drawImage(video, 0, 0);
    const base64 = canvas.toDataURL('image/jpeg', 0.85).split(',')[1];
    streamRef.current?.getTracks().forEach((t) => t.stop());
    onCapture(base64);
  }, [onCapture]);

  return (
    <div style={camStyles.overlay}>
      <div style={camStyles.modal}>
        {/* Close */}
        <button style={camStyles.closeBtn} onClick={onClose}>✕</button>

        {camError ? (
          <div style={camStyles.errorBox}>
            <p style={camStyles.errorText}>{camError}</p>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              style={camStyles.video}
              autoPlay
              playsInline
              muted
              onCanPlay={() => setReady(true)}
            />
            {/* Corner guides */}
            <div style={camStyles.frameOverlay}>
              <div style={{ ...camStyles.corner, top: 12, left: 12, borderRight: 'none', borderBottom: 'none' }} />
              <div style={{ ...camStyles.corner, top: 12, right: 12, borderLeft: 'none', borderBottom: 'none' }} />
              <div style={{ ...camStyles.corner, bottom: 12, left: 12, borderRight: 'none', borderTop: 'none' }} />
              <div style={{ ...camStyles.corner, bottom: 12, right: 12, borderLeft: 'none', borderTop: 'none' }} />
            </div>
          </>
        )}

        {/* Capture button */}
        {ready && !camError && (
          <button style={camStyles.captureBtn} onClick={capture}>
            <div style={camStyles.captureInner} />
          </button>
        )}
      </div>
    </div>
  );
}

const camStyles: Record<string, React.CSSProperties> = {
  overlay: {
    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
  },
  modal: {
    position: 'relative', width: '100%', maxWidth: 520,
    backgroundColor: '#000', borderRadius: 24, overflow: 'hidden',
  },
  video: { width: '100%', display: 'block', maxHeight: '70vh', objectFit: 'cover' },
  frameOverlay: { position: 'absolute', inset: 0, pointerEvents: 'none' },
  corner: {
    position: 'absolute', width: 28, height: 28,
    borderWidth: 3, borderStyle: 'solid', borderColor: '#fff', borderRadius: 4,
  },
  closeBtn: {
    position: 'absolute', top: 12, right: 12, zIndex: 10,
    background: 'rgba(0,0,0,0.5)', color: '#fff', border: 'none',
    borderRadius: '50%', width: 36, height: 36, fontSize: 16, cursor: 'pointer',
  },
  captureBtn: {
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    width: 68, height: 68, borderRadius: '50%',
    border: '3px solid #fff', background: 'rgba(255,255,255,0.2)',
    cursor: 'pointer', margin: '16px auto',
  },
  captureInner: { width: 50, height: 50, borderRadius: '50%', background: '#fff' },
  errorBox: { padding: 32, textAlign: 'center' },
  errorText: { color: '#fff', fontFamily: 'sans-serif', fontSize: 15 },
};

// ── Main page ─────────────────────────────────────────────────────────────────
export default function TextScanPage() {
  const router = useRouter();
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [showCamera, setShowCamera] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ original: string; simplified: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function processBase64(base64: string, mimeType = 'image/jpeg') {
    setError(null);
    setResult(null);
    setPreview(`data:${mimeType};base64,${base64}`);
    setLoading(true);
    try {
      const data = await scanBase64(base64, mimeType);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  }

  async function handleFile(file: File) {
    const base64 = await fileToBase64(file);
    await processBase64(base64, file.type || 'image/jpeg');
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

  function handleCameraCapture(base64: string) {
    setShowCamera(false);
    processBase64(base64, 'image/jpeg');
  }

  return (
    <>
      {showCamera && (
        <CameraModal onCapture={handleCameraCapture} onClose={() => setShowCamera(false)} />
      )}

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
              {/* Drop zone / preview */}
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
                    <Text style={styles.dropSub}>Зургийг энд чирж тавих эсвэл доорх товч дарна уу</Text>
                  </View>
                )}
              </View>

              {/* Buttons */}
              <View style={styles.btnRow}>
                <Pressable style={styles.actionBtn} onPress={() => setShowCamera(true)} disabled={loading}>
                  <AppIcon name="camera" size={22} color={colors.sage.dark} />
                  <Text style={styles.actionBtnText}>Камер</Text>
                </Pressable>
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
              <View style={styles.simplCard}>
                <Text style={styles.simplLabel}>Хялбарчилсан</Text>
                <Text style={styles.simplText}>{result.simplified}</Text>
              </View>
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

        <input ref={galleryInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFileChange} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.warm.beige },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 12,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 14,
    backgroundColor: colors.warm.card, alignItems: 'center', justifyContent: 'center', ...shadows.card,
  },
  headerTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 20, color: colors.warm.text },
  resetBtn: {
    width: 40, height: 40, borderRadius: 14,
    backgroundColor: colors.warm.card, alignItems: 'center', justifyContent: 'center', ...shadows.card,
  },
  content: { paddingHorizontal: 20, paddingBottom: 40, gap: 14 },
  dropZone: {
    borderRadius: 24, borderWidth: 2, borderColor: colors.sage.DEFAULT,
    borderStyle: 'dashed' as any, backgroundColor: colors.warm.card,
    minHeight: 200, alignItems: 'center', justifyContent: 'center', overflow: 'hidden', ...shadows.card,
  },
  dropZoneWithPreview: { borderStyle: 'solid' as any, borderColor: colors.sage.mid, padding: 8 },
  dropHint: { alignItems: 'center', gap: 10, padding: 32 },
  dropTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 20, color: colors.warm.text },
  dropSub: { fontFamily: fonts.lexend.regular, fontSize: 13, color: colors.warm.gray, textAlign: 'center' as any },
  btnRow: { flexDirection: 'row', gap: 12 },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14, borderRadius: 20, backgroundColor: colors.warm.card, ...shadows.card,
  },
  actionBtnPrimary: { backgroundColor: colors.sage.mid },
  actionBtnText: { fontFamily: fonts.fredoka.semibold, fontSize: 15, color: colors.sage.dark },
  loadingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 8 },
  loadingText: { fontFamily: fonts.fredoka.semibold, fontSize: 15, color: colors.sage.dark },
  errorCard: { backgroundColor: '#FEE2E2', borderRadius: 16, padding: 14 },
  errorText: { fontFamily: fonts.lexend.regular, fontSize: 13, color: '#DC2626' },
  simplCard: { backgroundColor: colors.sage.light, borderRadius: 20, padding: 18, ...shadows.sage },
  simplLabel: {
    fontFamily: fonts.lexend.semibold, fontSize: 11, color: colors.sage.text,
    letterSpacing: 0.5, marginBottom: 10, textTransform: 'uppercase' as any,
  },
  simplText: { fontFamily: fonts.lexend.regular, fontSize: 18, lineHeight: 30, color: colors.warm.text, letterSpacing: 0.3 },
  origCard: { backgroundColor: colors.warm.card, borderRadius: 20, padding: 18, ...shadows.card },
  origLabel: {
    fontFamily: fonts.lexend.semibold, fontSize: 11, color: colors.warm.gray,
    letterSpacing: 0.5, marginBottom: 10, textTransform: 'uppercase' as any,
  },
  origText: { fontFamily: fonts.lexend.regular, fontSize: 14, lineHeight: 22, color: colors.warm.gray },
  scanAgainBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, paddingVertical: 14, borderRadius: 20, backgroundColor: colors.warm.card, ...shadows.card,
  },
  scanAgainText: { fontFamily: fonts.fredoka.semibold, fontSize: 15, color: colors.sage.dark },
});
