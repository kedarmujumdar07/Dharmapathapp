import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HardShadowCard } from './HardShadowCard';
import { HomeColors } from '../constants/homeTheme';
import type { LessonData } from '@/features/home/types/lesson.types';

interface HeroLessonCardProps {
  lesson: LessonData | null;
  onBeginLesson: () => void;
}

export const HeroLessonCard: React.FC<HeroLessonCardProps> = ({ lesson, onBeginLesson }) => {
  if (!lesson) {
    return (
      <HardShadowCard style={styles.outerWrapper} cardStyle={styles.card}>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>🙏 All lessons completed for today!</Text>
          <Text style={styles.emptySubText}>Check back tomorrow for new content.</Text>
        </View>
      </HardShadowCard>
    );
  }

  return (
    <HardShadowCard style={styles.outerWrapper} cardStyle={styles.card}>
      {/* Banner area with gradient placeholder */}
      <View style={styles.bannerContainer}>
        <LinearGradient
          colors={[HomeColors.saffronPrimary, HomeColors.saffronDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.banner}
        />
        {/* Category chip */}
        <View style={styles.categoryChip} accessibilityLabel="Lesson category">
          <Text style={styles.categoryChipText}>{lesson.categoryLabel}</Text>
        </View>
        {/* Reward chip */}
        <View style={styles.rewardChip} accessibilityLabel={`Rewards ${lesson.pointsAwarded} points`}>
          <Text style={styles.rewardChipText}>+{lesson.pointsAwarded} PTS</Text>
        </View>
      </View>

      {/* Content area */}
      <View style={styles.contentArea}>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        <Text style={styles.lessonSubtitle}>{lesson.subtitle}</Text>
        <TouchableOpacity
          style={styles.ctaButton}
          onPress={onBeginLesson}
          accessibilityLabel="Begin today's daily lesson"
          accessibilityRole="button"
        >
          <Text style={styles.ctaText}>▶  BEGIN DAILY LESSON</Text>
        </TouchableOpacity>
      </View>
    </HardShadowCard>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    marginBottom: 16,
    marginHorizontal: 2,
  },
  card: {
    backgroundColor: HomeColors.cardBg,
    borderWidth: 2.5,
    borderColor: HomeColors.borderDark,
    overflow: 'hidden',
  },
  bannerContainer: {
    height: 160,
    position: 'relative',
  },
  banner: {
    ...StyleSheet.absoluteFillObject,
  },
  categoryChip: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: HomeColors.borderDark,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  categoryChipText: {
    fontSize: 10,
    fontFamily: 'Baloo2_800ExtraBold',
    color: HomeColors.textMain,
    letterSpacing: 0.8,
  },
  rewardChip: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: HomeColors.goldPrimary,
    borderWidth: 2,
    borderColor: HomeColors.borderDark,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  rewardChipText: {
    fontSize: 11,
    fontFamily: 'Baloo2_800ExtraBold',
    color: HomeColors.textMain,
  },
  contentArea: {
    padding: 16,
    backgroundColor: HomeColors.sunburstBg,
    alignItems: 'center',
  },
  lessonTitle: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 18,
    color: HomeColors.crimsonDark,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 4,
  },
  lessonSubtitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 10,
    color: HomeColors.textMuted,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 14,
    textAlign: 'center',
  },
  ctaButton: {
    width: '100%',
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
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Baloo2_700Bold',
    fontSize: 16,
    color: HomeColors.textMain,
    marginBottom: 6,
    textAlign: 'center',
  },
  emptySubText: {
    fontFamily: 'Nunito_400Regular',
    fontSize: 13,
    color: HomeColors.textMuted,
    textAlign: 'center',
  },
});
