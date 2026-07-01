import 'react-native-gesture-handler';
import React from 'react';
import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from '@clerk/clerk-expo';
import {
  useFonts,
  Fredoka_400Regular,
  Fredoka_500Medium,
  Fredoka_600SemiBold,
  Fredoka_700Bold,
} from '@expo-google-fonts/fredoka';
import {
  Lexend_400Regular,
  Lexend_500Medium,
  Lexend_600SemiBold,
  Lexend_700Bold,
} from '@expo-google-fonts/lexend';

import BottomNav from './src/components/BottomNav';
import { colors, fonts } from './src/theme';
import { tokenCache } from './src/lib/tokenCache';
import { ChildProvider } from './src/hooks/useChild';
import { SpeechSpeedProvider } from './src/contexts/SpeechSpeedContext';

import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import ReadingScreen from './src/screens/ReadingScreen';
import StoriesScreen from './src/screens/StoriesScreen';
import GamesScreen from './src/screens/GamesScreen';
import PhonicsScreen from './src/screens/PhonicsScreen';
import PracticeScreen from './src/screens/PracticeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ParentScreen from './src/screens/ParentScreen';
import DyslexiaTestScreen from './src/screens/DyslexiaTestScreen';
import WordBuildScreen from './src/screens/WordBuildScreen';
import DailyScreen from './src/screens/DailyScreen';
import LetterMatchScreen from './src/screens/LetterMatchScreen';
import SoundDetectiveScreen from './src/screens/SoundDetectiveScreen';
import TextScanScreen from './src/screens/TextScanScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AlphabetScreen from './src/screens/AlphabetScreen';
import TraceLetterScreen from './src/screens/TraceLetterScreen';
import StoryDetailScreen from './src/screens/StoryDetailScreen';
import StoryQuizScreen from './src/screens/StoryQuizScreen';

const Stack = createStackNavigator();
const AuthStackNav = createStackNavigator();
const Tab = createBottomTabNavigator();

const PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomNav {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Stories" component={StoriesScreen} />
      <Tab.Screen name="Games" component={GamesScreen} />
      <Tab.Screen name="Parent" component={ParentScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="Reading" component={ReadingScreen} />
      <Stack.Screen name="Practice" component={PracticeScreen} />
      <Stack.Screen name="Phonics" component={PhonicsScreen} />
      <Stack.Screen name="DyslexiaTest" component={DyslexiaTestScreen} />
      <Stack.Screen name="WordBuild" component={WordBuildScreen} />
      <Stack.Screen name="Daily" component={DailyScreen} />
      <Stack.Screen name="LetterMatch" component={LetterMatchScreen} />
      <Stack.Screen name="SoundDetective" component={SoundDetectiveScreen} />
      <Stack.Screen name="TextScan" component={TextScanScreen} />
      <Stack.Screen name="Alphabet" component={AlphabetScreen} />
      <Stack.Screen name="TraceLetter" component={TraceLetterScreen} />
      <Stack.Screen name="StoryDetail" component={StoryDetailScreen} />
      <Stack.Screen name="StoryQuiz" component={StoryQuizScreen} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <AuthStackNav.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackNav.Screen name="SignIn" component={SignInScreen} />
      <AuthStackNav.Screen name="SignUp" component={SignUpScreen} />
    </AuthStackNav.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    Fredoka_400Regular,
    Fredoka_500Medium,
    Fredoka_600SemiBold,
    Fredoka_700Bold,
    Lexend_400Regular,
    Lexend_500Medium,
    Lexend_600SemiBold,
    Lexend_700Bold,
  });

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.warm.beige }} />;
  }

  // Guard: a missing key would crash ClerkProvider with a cryptic error.
  if (!PUBLISHABLE_KEY) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, backgroundColor: colors.warm.beige }}>
        <Text style={{ fontFamily: fonts.fredoka.bold, fontSize: 18, color: colors.warm.text, textAlign: 'center' }}>
          Clerk түлхүүр дутуу байна
        </Text>
        <Text style={{ fontFamily: fonts.lexend.regular, fontSize: 14, color: colors.warm.gray, textAlign: 'center', marginTop: 8 }}>
          .env дотор EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY-ээ нэмж, апп-аа дахин эхлүүлнэ үү.
        </Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} tokenCache={tokenCache}>
        <SafeAreaProvider>
          <StatusBar style="dark" />
          <ClerkLoaded>
            <NavigationContainer>
              <SignedIn>
                <ChildProvider>
                  <SpeechSpeedProvider>
                    <AppStack />
                  </SpeechSpeedProvider>
                </ChildProvider>
              </SignedIn>
              <SignedOut>
                <AuthStack />
              </SignedOut>
            </NavigationContainer>
          </ClerkLoaded>
        </SafeAreaProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
