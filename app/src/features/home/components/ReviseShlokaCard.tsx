import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HardShadowCard } from './HardShadowCard';
import { HomeColors } from '../constants/homeTheme';
import type { ShlokaItem } from '@/features/scriptures/types/scripture.types';

interface ReviseShlokaCardProps {
  shloka: ShlokaItem | null;
  onRevise: () => void;
}

export const ReviseShlokaCard: React.FC<ReviseShlokaCardProps> = ({ shloka, onRevise }) => {
  if (!shloka) return null;

  // Extract English translation safely
  const englishTranslation = shloka.translations.find((t) => t.language === 'en')?.text || '';

  return (
    <HardShadowCard style={styles.outerWrapper} cardStyle={styles.card}>
      <LinearGradient
        colors={['#FFF8EC', '#FFF3E0']}
        style={styles.container}
      >
        <View style={styles.header}>
          <View style={styles.revisionTag}>
            <Text style={styles.tagText}>DAILY SHLOKA REVISION</Text>
          </View>
          <Text style={styles.label}>
            BG {shloka.chapter}.{shloka.verse}
          </Text>
        </View>

        <View style={styles.sanskritBox}>
          <Text style={styles.sanskritText}>{shloka.sanskrit_text}</Text>
        </View>

        <Text style={styles.meaningText}>
          "{englishTranslation}"
        </Text>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={onRevise}
          accessibilityLabel="Recite and revise now"
          accessibilityRole="button"
        >
          <Text style={styles.ctaText}>🔊  RECITE & REVISE NOW</Text>
        </TouchableOpacity>
      </LinearGradient>
    </HardShadowCard>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    marginBottom: 16,
    marginHorizontal: 2,
  },
  card: {
    borderWidth: 2.5,
    borderColor: HomeColors.borderDark,
    borderRadius: 22,
    overflow: 'hidden',
  },
  container: {
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  revisionTag: {
    backgroundColor: HomeColors.goldLight,
    borderWidth: 1.5,
    borderColor: HomeColors.borderDark,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  tagText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 10,
    color: HomeColors.saffronDark,
  },
  label: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 10,
    color: HomeColors.saffronDark,
  },
  sanskritBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EFE7DA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  sanskritText: {
    fontFamily: 'Baloo2_700Bold',
    fontSize: 14,
    color: HomeColors.crimsonDark,
    textAlign: 'center',
    lineHeight: 22,
  },
  meaningText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 11,
    color: HomeColors.textMuted,
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  ctaButton: {
    backgroundColor: HomeColors.saffronPrimary,
    borderWidth: 2.5,
    borderColor: HomeColors.borderDark,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 13,
    color: '#FFFFFF',
    letterSpacing: 0.8,
  },
});
