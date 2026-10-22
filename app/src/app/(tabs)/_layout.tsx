import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { DT } from '@/features/home/constants/homeTheme';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

interface TabIconProps {
  name: IoniconsName;
  focused: boolean;
}

function TabIcon({ name, focused }: TabIconProps) {
  return (
    <Ionicons
      name={name}
      size={22}
      color={focused ? DT.saffron : DT.textMuted}
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: DT.surface,
          borderTopWidth: 1,
          borderTopColor: DT.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: DT.saffron,
        tabBarInactiveTintColor: DT.textMuted,
        tabBarLabelStyle: {
          fontFamily: 'SpaceGrotesk_600SemiBold',
          fontSize: 10,
          letterSpacing: 0.5,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="learning"
        options={{
          title: 'Learn',
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'book' : 'book-outline'} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="panchang"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="scriptures"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
