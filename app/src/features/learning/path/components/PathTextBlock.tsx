import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import type { NodeState } from '../types/path.types';
import type { LessonData } from '@/features/home/types/lesson.types';
import { PathColors, PathFonts } from '../pathTheme';
import { PATH_LAYOUT_CONFIG } from '../layout/pathLayoutConfig';

interface PathTextBlockProps {
  index: number;
  lesson: LessonData;
  state: NodeState;
  x: number;
  y: number;
  width: number;
  lockedHint?: string;
  onPress: () => void;
  onLockedPress: () => void;
}

export const PathTextBlock: React.FC<PathTextBlockProps> = React.memo(
  ({ index, lesson, state, x, y, width, lockedHint, onPress, onLockedPress }) => {
    const isLocked = state === 'locked';

    const twoDigitIndex = index < 10 ? `0${index}` : `${index}`;

    const titleColor = isLocked ? PathColors.lockedMutedText : PathColors.ink;
    const summaryColor = isLocked ? PathColors.lockedMutedText : PathColors.inkMuted;
    const metaColor = isLocked ? PathColors.lockedMutedText : PathColors.inkSubtle;

    const handlePress = () => {
      if (isLocked) {
        onLockedPress();
      } else {
        onPress();
      }
    };

    const minutes = lesson.minutes ?? 5;
    const questions = lesson.questionCount ?? 4;
    const kindLabel = lesson.kind === 'practice' ? ' · Practice' : lesson.kind === 'milestone' ? ' · Milestone' : '';
    const metaText = `${minutes} min · ${questions} questions${kindLabel}`;

    return (
      <Pressable
        onPress={handlePress}
        style={[
          styles.container,
          {
            left: x,
            top: y,
            width,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel={`${twoDigitIndex} ${lesson.title}. ${metaText}`}
      >
        <View style={styles.content}>
          {/* Two-digit index */}
          <Text
            maxFontSizeMultiplier={PATH_LAYOUT_CONFIG.textMetrics.maxFontSizeMultiplier}
            style={[styles.indexText, { color: titleColor }]}
          >
            {twoDigitIndex}
          </Text>

          {/* Title (max 2 lines) */}
          <Text
            numberOfLines={2}
            maxFontSizeMultiplier={PATH_LAYOUT_CONFIG.textMetrics.maxFontSizeMultiplier}
            style={[styles.titleText, { color: titleColor }]}
          >
            {lesson.title}
          </Text>

          {/* Summary (max 2 lines) */}
          {lesson.summary ? (
            <Text
              numberOfLines={2}
              maxFontSizeMultiplier={PATH_LAYOUT_CONFIG.textMetrics.maxFontSizeMultiplier}
              style={[styles.summaryText, { color: summaryColor }]}
            >
              {lesson.summary}
            </Text>
          ) : null}

          {/* Meta line */}
          <Text
            numberOfLines={1}
            maxFontSizeMultiplier={PATH_LAYOUT_CONFIG.textMetrics.maxFontSizeMultiplier}
            style={[styles.metaText, { color: metaColor }]}
          >
            {metaText}
          </Text>

          {/* Inline hint for locked lesson */}
          {lockedHint ? (
            <View style={styles.hintContainer}>
              <Text
                maxFontSizeMultiplier={PATH_LAYOUT_CONFIG.textMetrics.maxFontSizeMultiplier}
                style={styles.hintText}
              >
                🔒 {lockedHint}
              </Text>
            </View>
          ) : null}
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 6,
  },
  content: {
    paddingVertical: 2,
    gap: 3,
  },
  indexText: {
    fontFamily: PathFonts.displayExtraBold,
    fontSize: PATH_LAYOUT_CONFIG.textMetrics.indexFontSize,
    lineHeight: PATH_LAYOUT_CONFIG.textMetrics.indexLineHeight,
    letterSpacing: -0.5,
  },
  titleText: {
    fontFamily: PathFonts.display,
    fontSize: PATH_LAYOUT_CONFIG.textMetrics.titleFontSize,
    lineHeight: PATH_LAYOUT_CONFIG.textMetrics.titleLineHeight,
    letterSpacing: -0.2,
  },
  summaryText: {
    fontFamily: PathFonts.sans,
    fontSize: PATH_LAYOUT_CONFIG.textMetrics.summaryFontSize,
    lineHeight: PATH_LAYOUT_CONFIG.textMetrics.summaryLineHeight,
  },
  metaText: {
    fontFamily: PathFonts.mono,
    fontSize: PATH_LAYOUT_CONFIG.textMetrics.metaFontSize,
    lineHeight: PATH_LAYOUT_CONFIG.textMetrics.metaLineHeight,
    marginTop: 2,
  },
  hintContainer: {
    marginTop: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFEAEA',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFA5A5',
    alignSelf: 'flex-start',
  },
  hintText: {
    fontFamily: PathFonts.sansSemiBold,
    fontSize: 11,
    lineHeight: 14,
    color: '#B71C1C',
  },
});
