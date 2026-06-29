import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, fonts, shadows } from '../theme';

const OPENAI_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY ?? '';

async function callOpenAIVision(base64: string, mimeType: string): Promise<{ original: string; simplified: string }> {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64}` } },
            {
              type: 'text',
              text: 'Энэ зурган дээрх текстийг уншаад хариулт өг.\n\nОРИГИНАЛ: гэж бичээд зурагнаас оролцоосон бүх текстийг бич.\nХЯЛБАРЧИЛСАН: гэж бичээд дислекси хүүхдэд ойлгомжтой, богино өгүүлбэртэй, энгийн үгтэй хувилбарыг монгол хэлээр бич.\n\nХэрэв зурганд текст байхгүй бол "Текст олдсонгүй" гэж хариулна уу.',
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => '');
    throw new Error(`OpenAI ${res.status}: ${err}`);
  }

  const json = (await res.json()) as { choices: { message: { content: string } }[] };
  const content = json.choices[0]?.message?.content ?? '';

  const originalMatch = content.match(/ОРИГИНАЛ:\s*([\s\S]*?)(?=\nХЯЛБАРЧИЛСАН:|$)/);
  const simplifiedMatch = content.match(/ХЯЛБАРЧИЛСАН:\s*([\s\S]*?)$/);

  return {
    original: originalMatch?.[1]?.trim() ?? content,
    simplified: simplifiedMatch?.[1]?.trim() ?? content,
  };
}

export default function TextScanScreen({ navigation }: { navigation: any }) {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing] = useState<CameraType>('back');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ original: string; simplified: string } | null>(null);

  async function handleCapture() {
    if (!cameraRef.current) return;
    try {
      setLoading(true);
      const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.7 });
      if (photo?.base64) {
        await processImage(photo.base64, 'image/jpeg');
      }
    } catch {
      Alert.alert('Алдаа', 'Зураг авах үед алдаа гарлаа.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGallery() {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.7,
    });
    if (!res.canceled && res.assets[0]?.base64) {
      try {
        setLoading(true);
        await processImage(res.assets[0].base64, 'image/jpeg');
      } catch {
        Alert.alert('Алдаа', 'Зураг боловсруулах үед алдаа гарлаа.');
      } finally {
        setLoading(false);
      }
    }
  }

  async function processImage(base64: string, mimeType: string) {
    const data = await callOpenAIVision(base64, mimeType);
    setResult(data);
  }

  if (!permission) {
    return <View style={styles.root} />;
  }

  if (!permission.granted) {
    return (
      <View style={[styles.root, styles.permCenter]}>
        <MaterialCommunityIcons name="camera-off" size={64} color={colors.warm.lightgray} />
        <Text style={styles.permTitle}>Камерын зөвшөөрөл хэрэгтэй</Text>
        <Text style={styles.permSub}>Текст уншихад камер ашиглана</Text>
        <Pressable style={styles.permBtn} onPress={requestPermission}>
          <Text style={styles.permBtnText}>Зөвшөөрөх</Text>
        </Pressable>
        <Pressable style={styles.permBack} onPress={() => navigation.goBack()}>
          <Text style={styles.permBackText}>Буцах</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {/* Camera */}
      <CameraView ref={cameraRef} style={StyleSheet.absoluteFill} facing={facing} />

      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.topBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.topTitle}>Текст унших</Text>
        <View style={{ width: 44 }} />
      </View>

      {/* Scan guide frame */}
      <View style={styles.frameWrapper} pointerEvents="none">
        <View style={styles.frame}>
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
        </View>
        <Text style={styles.frameHint}>Текстийг хүрээн дотор байрлуул</Text>
      </View>

      {/* Bottom controls */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.bottomBar}
      >
        {/* Gallery */}
        <Pressable style={styles.galleryBtn} onPress={handleGallery} disabled={loading}>
          <Ionicons name="images" size={28} color="#fff" />
          <Text style={styles.galleryLabel}>Галерей</Text>
        </Pressable>

        {/* Capture */}
        <Pressable style={styles.captureBtn} onPress={handleCapture} disabled={loading}>
          {loading ? (
            <ActivityIndicator color={colors.sage.dark} size="small" />
          ) : (
            <View style={styles.captureInner} />
          )}
        </Pressable>

        <View style={{ width: 72 }} />
      </LinearGradient>

      {/* Result modal */}
      <Modal visible={!!result} animationType="slide" transparent>
        <View style={styles.modalBg}>
          <View style={styles.modalSheet}>
            {/* Handle */}
            <View style={styles.handle} />

            <View style={styles.modalHeader}>
              <MaterialCommunityIcons name="text-recognition" size={22} color={colors.sage.dark} />
              <Text style={styles.modalTitle}>AI хялбарчилсан текст</Text>
              <Pressable onPress={() => setResult(null)}>
                <Ionicons name="close" size={22} color={colors.warm.gray} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
              {/* Simplified */}
              <View style={styles.simplCard}>
                <Text style={styles.simplLabel}>Хялбарчилсан</Text>
                <Text style={styles.simplText}>{result?.simplified}</Text>
              </View>

              {/* Original */}
              <View style={styles.origCard}>
                <Text style={styles.origLabel}>Оригинал текст</Text>
                <Text style={styles.origText}>{result?.original}</Text>
              </View>
            </ScrollView>

            <Pressable style={styles.doneBtn} onPress={() => setResult(null)}>
              <Text style={styles.doneBtnText}>Камер руу буцах</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Loading overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color={colors.sage.dark} />
            <Text style={styles.loadingText}>AI уншиж байна...</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const CORNER = 24;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#000' },
  permCenter: {
    backgroundColor: colors.warm.beige,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  permTitle: { fontFamily: fonts.fredoka.semibold, fontSize: 20, color: colors.warm.text, marginTop: 16 },
  permSub: { fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.warm.gray, marginTop: 6, textAlign: 'center' },
  permBtn: {
    marginTop: 24,
    backgroundColor: colors.sage.mid,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
  },
  permBtnText: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: '#fff' },
  permBack: { marginTop: 12 },
  permBackText: { fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.warm.gray },

  topBar: {
    position: 'absolute',
    top: 56,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  topBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTitle: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 18,
    color: '#fff',
  },

  frameWrapper: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  frame: {
    width: 280,
    height: 180,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: CORNER,
    height: CORNER,
    borderColor: '#fff',
    borderWidth: 3,
  },
  cornerTL: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 6 },
  cornerTR: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 6 },
  cornerBL: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 6 },
  cornerBR: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 6 },
  frameHint: {
    marginTop: 14,
    fontFamily: fonts.lexend.regular,
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 48,
    paddingTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  galleryBtn: { alignItems: 'center', width: 72 },
  galleryLabel: {
    fontFamily: fonts.lexend.regular,
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  captureBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 3,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#fff',
  },

  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 16,
    color: colors.warm.text,
  },

  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: colors.warm.beige,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    maxHeight: '80%',
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: colors.warm.lightgray,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  modalTitle: {
    flex: 1,
    fontFamily: fonts.fredoka.semibold,
    fontSize: 18,
    color: colors.warm.text,
  },

  simplCard: {
    backgroundColor: colors.sage.light,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    ...shadows.sage,
  },
  simplLabel: {
    fontFamily: fonts.lexend.semibold,
    fontSize: 11,
    color: colors.sage.text,
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  simplText: {
    fontFamily: fonts.lexend.regular,
    fontSize: 17,
    lineHeight: 28,
    color: colors.warm.text,
    letterSpacing: 0.3,
  },

  origCard: {
    backgroundColor: colors.warm.card,
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    ...shadows.card,
  },
  origLabel: {
    fontFamily: fonts.lexend.semibold,
    fontSize: 11,
    color: colors.warm.gray,
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  origText: {
    fontFamily: fonts.lexend.regular,
    fontSize: 14,
    lineHeight: 22,
    color: colors.warm.gray,
  },

  doneBtn: {
    marginTop: 8,
    backgroundColor: colors.sage.mid,
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
  },
  doneBtnText: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 16,
    color: '#fff',
  },
});
