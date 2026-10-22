import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DT, SHADOW } from '../constants/homeTheme';
import type { ShlokaItem } from '@/features/scriptures/types/scripture.types';

interface ReviseShlokaCardProps {
  shloka: ShlokaItem | null;
  onRevise: () => void;
}

export const ReviseShlokaCard: React.FC<ReviseShlokaCardProps> = ({ shloka, onRevise }) => {
  if (!shloka) return null;

  const englishTranslation = shloka.translations.find((t) => t.language === 'en')?.text || '';

  return (
    <View style={[SHADOW.md, styles.wrapper]}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.refText}>
            Bhagavad Gita {shloka.chapter}.{shloka.verse}
          </Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>REVISION</Text>
          </View>
        </View>

        {/* Sanskrit */}
        <View style={styles.sanskritBox}>
          <Text style={styles.sanskritText}>{shloka.sanskrit_text}</Text>
        </View>

        {/* Translation */}
        <Text style={styles.translationText} numberOfLines={3}>
          "{englishTranslation}"
        </Text>

        {/* CTA */}
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={onRevise}
          accessibilityLabel="Recite and revise this shloka"
          accessibilityRole="button"
          activeOpacity={0.85}
        >
          <Text style={styles.ctaText}>🔊  RECITE & REVISE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    marginBottom: 14,
  },
  card: {
    borderRadius: 20,
    backgroundColor: DT.surface,
    padding: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: DT.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  refText: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 12,
    color: DT.textSecondary,
  },
  tag: {
    backgroundColor: DT.saffronGlow,
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: DT.saffron,
  },
  tagText: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 10,
    color: DT.saffron,
    letterSpacing: 0.8,
  },
  sanskritBox: {
    backgroundColor: DT.surfaceRaised,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: DT.divider,
  },
  sanskritText: {
    fontFamily: 'Baloo2_700Bold',
    fontSize: 15,
    color: DT.gold,
    textAlign: 'center',
    lineHeight: 24,
  },
  translationText: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 13,
    color: DT.textSecondary,
    marginBottom: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  ctaButton: {
    backgroundColor: DT.saffron,
    borderRadius: 14,
    paddingVertical: 13,
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
