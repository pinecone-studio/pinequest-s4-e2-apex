'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSignUp } from '@clerk/nextjs/legacy';
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

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => {
    if (!isLoaded || loading) return;
    if (!username || !password) {
      Alert.alert('Дутуу', 'Бүх талбарыг бөглөнө үү.');
      return;
    }
    setLoading(true);
    try {
      await signUp.create({ username: username.trim(), password });

      if (signUp.status === 'complete') {
        await setActive({ session: signUp.createdSessionId });
        router.replace('/');
      } else {
        // Clerk still needs something — show exactly what so it can be turned
        // off in the dashboard (e.g. email/phone marked "Required").
        const missing = signUp.missingFields?.join(', ') || signUp.status || 'тодорхойгүй';
        Alert.alert(
          'Бараг боллоо',
          `Clerk дараах шаардлагыг хүсэж байна: ${missing}.\n\nClerk dashboard → User & authentication дээр эдгээрийг "Required биш" болгоно уу.`
        );
      }
    } catch (err: unknown) {
      const e = (err as { errors?: { longMessage?: string; message?: string }[] })?.errors?.[0];
      const msg = e?.longMessage ?? e?.message ?? 'Бүртгэл үүсгэж чадсангүй.';
      Alert.alert('Бүртгүүлэх амжилтгүй', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#EDE8F5', '#F5EFE6']} style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: 'center', marginTop: 16 }}>
            <LexiBot size="md" animate="bob" />
            <Text style={styles.title}>Бүртгэл үүсгэх</Text>
            <Text style={styles.subtitle}>Лекситэй унших аялалаа эхлүүл</Text>
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

            <Pressable style={[styles.button, loading && { opacity: 0.6 }]} onPress={onSignUp} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Түр хүлээнэ үү…' : 'Бүртгүүлэх'}</Text>
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Бүртгэлтэй юу? </Text>
              <Pressable onPress={() => router.push('/sign-in')}>
                <Text style={styles.footerLink}>Нэвтрэх</Text>
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
  title: { fontFamily: fonts.fredoka.bold, fontSize: 26, color: colors.warm.text, marginTop: 10 },
  subtitle: { fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.warm.gray, marginTop: 4 },
  form: { marginTop: 20 },
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
    backgroundColor: colors.peach.dark,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    ...shadows.peach,
  },
  buttonText: { fontFamily: fonts.fredoka.semibold, fontSize: 16, color: '#fff' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 20 },
  footerText: { fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.warm.gray },
  footerLink: { fontFamily: fonts.lexend.semibold, fontSize: 14, color: colors.peach.dark },
});
