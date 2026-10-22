import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { DT, SHADOW } from '../constants/homeTheme';
import type { LessonData } from '@/features/home/types/lesson.types';

const CONTINUE_IMAGE = require('@/../assets/images/path_leela.jpg');

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
  if (!lesson) return null;

  return (
    <View style={[SHADOW.md, styles.wrapper]}>
      <View style={styles.card}>
        {/* Image background */}
        <Image
          source={CONTINUE_IMAGE}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        <LinearGradient
          colors={['rgba(13,10,7,0.3)', 'rgba(13,10,7,0.88)']}
          style={StyleSheet.absoluteFill}
        />

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>▶  IN PROGRESS</Text>
          </View>

          <Text style={styles.title}>{lesson.title}</Text>
          <Text style={styles.subtitle}>{lesson.subtitle}</Text>

          {/* Progress bar */}
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` as any }]} />
          </View>

          <View style={styles.footer}>
            <Text style={styles.progressLabel}>{progressPercent}% complete</Text>
            <TouchableOpacity
              style={styles.resumeBtn}
              onPress={onResume}
              accessibilityLabel={`Resume lesson: ${lesson.title}`}
              accessibilityRole="button"
              activeOpacity={0.85}
            >
              <Text style={styles.resumeText}>RESUME</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: DT.surface,
    justifyContent: 'flex-end',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: 14,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,111,0,0.25)',
    borderWidth: 1,
    borderColor: DT.saffron,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
  },
  badgeText: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 10,
    color: DT.saffron,
    letterSpacing: 0.8,
  },
  title: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 17,
    color: DT.textPrimary,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 12,
    color: DT.textSecondary,
    marginBottom: 10,
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: DT.gold,
    borderRadius: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 11,
    color: DT.textMuted,
  },
  resumeBtn: {
    backgroundColor: DT.saffron,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 5,
  },
  resumeText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 11,
    color: '#FFFFFF',
  },
});
