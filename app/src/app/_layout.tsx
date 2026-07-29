import { DarkTheme, DefaultTheme, ThemeProvider, Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme, View, ActivityIndicator } from 'react-native';
import {
  useFonts,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
  JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';
import { Caveat_700Bold } from '@expo-google-fonts/caveat';
import {
  Baloo2_500Medium,
  Baloo2_600SemiBold,
  Baloo2_700Bold,
  Baloo2_800ExtraBold,
} from '@expo-google-fonts/baloo-2';

import { AnimatedSplashOverlay } from '@/shared/components/AnimatedIcon';
import AppTabs from '@/shared/components/AppTabs';
import { PreferencesProvider, usePreferences } from '@/features/onboarding/context/PreferencesContext';
import { OnboardingScreen } from '@/features/onboarding/screens/OnboardingScreen';
import { PreferencesScreen } from '@/features/onboarding/screens/PreferencesScreen';
import { PanchangFestivalsScreen } from '@/features/panchang/screens/PanchangFestivalsScreen';
import { Colors } from '@/shared/constants/theme';

import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  return <Slot />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
    JetBrainsMono_700Bold,
    Caveat_700Bold,
    Baloo2_500Medium,
    Baloo2_600SemiBold,
    Baloo2_700Bold,
    Baloo2_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.bgCream, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.saffron} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PreferencesProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AnimatedSplashOverlay />
          <AppContent />
        </ThemeProvider>
      </PreferencesProvider>
    </GestureHandlerRootView>
  );
}

