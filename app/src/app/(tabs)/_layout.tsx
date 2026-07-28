import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { HomeColors } from '@/features/home/constants/homeTheme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: HomeColors.bgSandalwood,
          borderTopWidth: 2,
          borderTopColor: '#EAE0D0',
        },
        tabBarActiveTintColor: HomeColors.crimsonAccent,
        tabBarInactiveTintColor: HomeColors.textMuted,
        tabBarLabelStyle: {
          fontFamily: 'SpaceGrotesk_700Bold',
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🏠</Text>,
        }}
      />
      <Tabs.Screen
        name="learning"
        options={{
          title: 'LEARNING',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>📖</Text>,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}
