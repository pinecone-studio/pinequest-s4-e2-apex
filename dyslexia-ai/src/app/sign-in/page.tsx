'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignIn } from '@clerk/nextjs/legacy';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Alert,
  ScrollView,
} from '../../rn/primitives';
import { LinearGradient } from '../../rn/LinearGradient';
import LexiBot from '../../components/LexiBot';
import { colors, fonts, shadows } from '../../theme';

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, setActive, isLoaded } = useSignIn();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignIn = async () => {
    if (!isLoaded || loading) return;
    if (!username || !password) {
      Alert.alert('Дутуу', 'Нэвтрэх нэр болон нууц үгээ оруулна уу.');
      return;
    }
    setLoading(true);
    try {
      const res = await signIn.create({ identifier: username.trim(), password });
      if (res.status === 'complete') {
        await setActive({ session: res.createdSessionId });
        router.replace('/');
      } else {
        Alert.alert('Алдаа', 'Нэвтрэлт дуусаагүй. Дахин оролдоно уу.');
      }
    } catch (err: unknown) {
      const e = (err as { errors?: { longMessage?: string; message?: string }[] })?.errors?.[0];
      const msg = e?.longMessage ?? e?.message ?? 'Нэвтрэх нэр эсвэл нууц үг буруу байна.';
      Alert.alert('Нэвтрэх амжилтгүй', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#EDE8F5', '#F5EFE6']} style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: 'center', marginTop: 24 }}>
            <LexiBot size="lg" animate="float" />
            <Text style={styles.title}>Тавтай морил!</Text>
            <Text style={styles.subtitle}>Үргэлжлүүлэхийн тулд нэвтэрнэ үү</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Нэвтрэх нэр</Text>
            <TextInput
              style={styles.input}
              placeholder="emma123"
              placeholderTextColor={colors.warm.lightgray}
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />

            <Text style={styles.label}>Нууц үг</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={colors.warm.lightgray}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Pressable style={[styles.button, loading && { opacity: 0.6 }]} onPress={onSignIn} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Түр хүлээнэ үү…' : 'Нэвтрэх'}</Text>
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Бүртгэлгүй юу? </Text>
              <Pressable onPress={() => router.push('/sign-up')}>
                <Text style={styles.footerLink}>Бүртгүүлэх</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 24, paddingBottom: 40, flexGrow: 1, justifyContent: 'center' },
  title: { fontFamily: fonts.fredoka.bold, fontSize: 28, color: colors.warm.text, marginTop: 12 },
  subtitle: { fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.warm.gray, marginTop: 4 },
  form: { marginTop: 28 },
  label: { fontFamily: fonts.lexend.semibold, fontSize: 13, color: colors.warm.text, marginBottom: 6, marginTop: 14 },
  input: {
    backgroundColor: colors.warm.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontFamily: fonts.lexend.regular,
    fontSize: 16,
    color: colors.warm.text,
    ...shadows.cardSm,
  },
  button: {
    backgroundColor: colors.lavender.dark,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
    ...shadows.lavender,
  },
  buttonText: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: '#fff' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  footerText: { fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.warm.gray },
  footerLink: { fontFamily: fonts.lexend.semibold, fontSize: 14, color: colors.lavender.dark },
});
