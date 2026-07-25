import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
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

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { PreferencesProvider, usePreferences } from '@/context/preferences-context';
import { OnboardingScreen } from '@/screens/onboarding-screen';
import { PreferencesScreen } from '@/screens/preferences-screen';
import { Colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { isOnboarded, hasCompletedPreferences, isLoading } = usePreferences();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.bgCream, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.saffron} />
      </View>
    );
  }

  if (!isOnboarded) {
    return <OnboardingScreen />;
  }

  if (!hasCompletedPreferences) {
    return <PreferencesScreen />;
  }

  return <AppTabs />;
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
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.bgCream, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.saffron} />
      </View>
    );
  }

  return (
    <PreferencesProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <AppContent />
      </ThemeProvider>
    </PreferencesProvider>
  );
}

