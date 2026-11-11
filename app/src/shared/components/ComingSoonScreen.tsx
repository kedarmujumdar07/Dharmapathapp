import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeColors } from '@/features/home/constants/homeTheme';

interface ComingSoonScreenProps {
  /** Screen title displayed prominently */
  title: string;
  /** The ticket number that will deliver this screen (e.g. "2.1") */
  ticketNumber: string;
}

/**
 * A shared screen rendered by routes whose real screens have not been built yet.
 * Each route passes its own title and owning ticket number so the screen is
 * self-documenting and easy to trace back to the backlog.
 */
export const ComingSoonScreen: React.FC<ComingSoonScreenProps> = ({ title, ticketNumber }) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 24 }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>◀  BACK</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.emoji}>🚧</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Ticket {ticketNumber}</Text>
        </View>
        <Text style={styles.subtitle}>This screen is on its way.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HomeColors.bgSandalwood,
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: HomeColors.borderDark,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  backButtonText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 11,
    color: HomeColors.crimsonDark,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 22,
    color: HomeColors.crimsonDark,
    textAlign: 'center',
    marginBottom: 12,
  },
  badge: {
    backgroundColor: HomeColors.crimsonAccent,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 16,
  },
  badgeText: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 12,
    color: '#FFFFFF',
  },
  subtitle: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 14,
    color: HomeColors.textMuted,
    textAlign: 'center',
  },
});
