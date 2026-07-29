import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HardShadowCard } from './HardShadowCard';
import { HomeColors } from '../constants/homeTheme';
import type { LessonData } from '@/features/home/types/lesson.types';

interface ContinueLessonCardProps {
  lesson: LessonData | null;
  progressPercent: number;
  onResume: () => void;
}

export const ContinueLessonCard: React.FC<ContinueLessonCardProps> = ({
  lesson,
  progressPercent,
  onResume,
}) => {
  // If no lesson is in progress, hide the card (graceful handling)
  if (!lesson) return null;

  return (
    <HardShadowCard style={styles.outerWrapper} cardStyle={styles.card}>
      <View style={styles.bannerContainer}>
        {/* Placeholder gradient banner instead of missing image */}
        <LinearGradient
          colors={['#2A2A2A', HomeColors.darkCard]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.bannerPlaceholder}
        />
        <View style={styles.darkOverlay} />
        
        <View style={styles.badgeContainer}>
          <View style={styles.inProgressBadge}>
            <Text style={styles.badgeText}>IN PROGRESS</Text>
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.lessonSubtitle}>{lesson.subtitle}</Text>
        </View>
      </View>

      <View style={styles.bottomBar}>
        <Text style={styles.progressText}>PROGRESS: {progressPercent}%</Text>
        <TouchableOpacity
          style={styles.resumeButton}
          onPress={onResume}
          accessibilityLabel={`Resume lesson: ${lesson.title}`}
          accessibilityRole="button"
        >
          <Text style={styles.resumeText}>▶ RESUME</Text>
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
    backgroundColor: HomeColors.darkCard,
    borderWidth: 2.5,
    borderColor: HomeColors.borderDark,
    overflow: 'hidden',
  },
  bannerContainer: {
    height: 150,
    position: 'relative',
    justifyContent: 'space-between',
    padding: 10,
  },
  bannerPlaceholder: {
    ...StyleSheet.absoluteFill,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  badgeContainer: {
    flexDirection: 'row',
    zIndex: 2,
  },
  inProgressBadge: {
    backgroundColor: HomeColors.saffronPrimary,
    borderWidth: 1.5,
    borderColor: HomeColors.borderDark,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontFamily: 'Baloo2_800ExtraBold',
  },
  textContainer: {
    zIndex: 2,
  },
  lessonTitle: {
    fontFamily: 'Baloo2_700Bold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 2,
  },
  lessonSubtitle: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 9,
    color: HomeColors.goldPrimary,
    letterSpacing: 0.8,
  },
  bottomBar: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#262220',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1.5,
    borderColor: '#38322E',
  },
  progressText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 10,
    color: '#BBBBBB',
  },
  resumeButton: {
    backgroundColor: HomeColors.goldPrimary,
    borderWidth: 1.5,
    borderColor: HomeColors.borderDark,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  resumeText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 11,
    color: HomeColors.textMain,
  },
});
