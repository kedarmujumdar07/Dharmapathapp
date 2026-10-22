import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { DT, SHADOW } from '../constants/homeTheme';
import type { LessonData } from '@/features/home/types/lesson.types';

// Default hero background — the path image from assets
const HERO_IMAGE = require('@/../assets/images/path_itihasa.jpg');

interface HeroLessonCardProps {
  lesson: LessonData | null;
  onBeginLesson: () => void;
}

export const HeroLessonCard: React.FC<HeroLessonCardProps> = ({ lesson, onBeginLesson }) => {
  if (!lesson) {
    return (
      <View style={[styles.card, styles.emptyCard]}>
        <Text style={styles.emptyText}>🙏 All lessons completed for today!</Text>
        <Text style={styles.emptySubText}>Check back tomorrow for new content.</Text>
      </View>
    );
  }

  return (
    <View style={[SHADOW.saffron, styles.wrapper]}>
      <View style={styles.card}>
        {/* Full-bleed image */}
        <Image
          source={HERO_IMAGE}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />

        {/* Dark gradient overlay from bottom */}
        <LinearGradient
          colors={['transparent', 'rgba(13,10,7,0.55)', 'rgba(13,10,7,0.92)']}
          locations={[0, 0.45, 1]}
          style={StyleSheet.absoluteFill}
        />

        {/* Top chips */}
        <View style={styles.topRow}>
          <View style={styles.categoryChip}>
            <Text style={styles.categoryChipText}>{lesson.categoryLabel}</Text>
          </View>
          <View style={styles.rewardChip}>
            <Text style={styles.rewardChipText}>+{lesson.pointsAwarded} PTS</Text>
          </View>
        </View>

        {/* Bottom content */}
        <View style={styles.bottomContent}>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.lessonSubtitle}>{lesson.subtitle}</Text>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={onBeginLesson}
            accessibilityLabel="Begin today's daily lesson"
            accessibilityRole="button"
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>▶  BEGIN DAILY LESSON</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 24,
    marginBottom: 14,
  },
  card: {
    height: 260,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: DT.surface,
    justifyContent: 'space-between',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 14,
  },
  categoryChip: {
    backgroundColor: 'rgba(13,10,7,0.55)',
    borderWidth: 1,
    borderColor: DT.glassBorder,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  categoryChipText: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 11,
    color: DT.textPrimary,
    letterSpacing: 0.8,
  },
  rewardChip: {
    backgroundColor: DT.saffron,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  rewardChipText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 11,
    color: '#FFFFFF',
  },
  bottomContent: {
    padding: 16,
    paddingBottom: 18,
  },
  lessonTitle: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 22,
    color: DT.textPrimary,
    lineHeight: 28,
    marginBottom: 4,
  },
  lessonSubtitle: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 13,
    color: DT.textSecondary,
    marginBottom: 14,
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
  emptyCard: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontFamily: 'Baloo2_700Bold',
    fontSize: 16,
    color: DT.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  emptySubText: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 13,
    color: DT.textMuted,
    textAlign: 'center',
  },
});
