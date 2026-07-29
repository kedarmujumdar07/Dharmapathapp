import React from 'react';
import { useRouter } from 'expo-router';
import { HomeScreen } from '@/features/home/screens/HomeScreen';

export default function HomeRoute() {
  const router = useRouter();

  // Adapt Expo Router's push to match the screen's expected navigation signature
  const navigationAdapter = {
    navigate: (screen: string, params?: object) => {
      if (screen === 'learning' || screen === 'profile') {
        router.push(`/(tabs)/${screen}`);
      } else {
        router.push({ pathname: screen as any, params: params as any });
      }
    },
  };

  return <HomeScreen navigation={navigationAdapter} />;
}
