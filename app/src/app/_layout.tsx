import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme, View, ActivityIndicator } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import { PreferencesProvider, usePreferences } from '@/context/preferences-context';
import { OnboardingScreen } from '@/screens/onboarding-screen';
import { PreferencesScreen } from '@/screens/preferences-screen';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const { isOnboarded, hasCompletedPreferences, isLoading } = usePreferences();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF8F2', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#E07B39" />
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
  return (
    <PreferencesProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AnimatedSplashOverlay />
        <AppContent />
      </ThemeProvider>
    </PreferencesProvider>
  );
}
