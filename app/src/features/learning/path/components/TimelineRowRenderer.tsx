import React, { useState, useCallback } from 'react';
import { View, StyleSheet, AccessibilityInfo } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  useReducedMotion,
} from 'react-native-reanimated';
import type { TimelineRow, NodeRowData, UnitHeaderRowData, EndCapRowData } from '../types/layout.types';
import type { NodeState } from '../types/path.types';
import type { LessonData } from '@/features/home/types/lesson.types';
import { PathLineSvg } from './PathLineSvg';
import { PathCircleNode } from './PathCircleNode';
import { PathTextBlock } from './PathTextBlock';
import { PathTravelerMarker } from './PathTravelerMarker';
import { PathUnitHeaderRow } from './PathUnitHeaderRow';
import { PathEndCapRow } from './PathEndCapRow';

interface TimelineRowRendererProps {
  row: TimelineRow;
  width: number;
  lesson?: LessonData;
  previousLessonTitle?: string;
  state?: NodeState;
  accent: string;
  completedCountInUnit: number;
  isPathComplete: boolean;
  progressLength: number;
  onLessonPress: (lessonId: string) => void;
}

export const TimelineRowRenderer: React.FC<TimelineRowRendererProps> = React.memo(
  ({
    row,
    width,
    lesson,
    previousLessonTitle,
    state = 'locked',
    accent,
    completedCountInUnit,
    isPathComplete,
    progressLength,
    onLessonPress,
  }) => {
    const prefersReducedMotion = useReducedMotion();
    const shakeOffset = useSharedValue(0);
    const [lockedHint, setLockedHint] = useState<string | null>(null);

    const triggerLockedShake = useCallback(() => {
      const hint = previousLessonTitle
        ? `Finish "${previousLessonTitle}" first`
        : 'Finish previous lessons first';
      setLockedHint(hint);
      AccessibilityInfo.announceForAccessibility(hint);

      if (!prefersReducedMotion) {
        shakeOffset.value = withSequence(
          withTiming(-8, { duration: 50 }),
          withTiming(8, { duration: 50 }),
          withTiming(-6, { duration: 50 }),
          withTiming(6, { duration: 50 }),
          withTiming(-3, { duration: 50 }),
          withTiming(0, { duration: 50 }),
        );
      }
    }, [previousLessonTitle, prefersReducedMotion, shakeOffset]);

    const shakeAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: shakeOffset.value }],
      };
    });

    if (row.type === 'unit-header') {
      const headerRow = row as UnitHeaderRowData;
      return (
        <PathUnitHeaderRow
          row={headerRow}
          width={width}
          accent={accent}
          completedLessons={completedCountInUnit}
          progressLength={progressLength}
        />
      );
    }

    if (row.type === 'end-cap') {
      const endCapRow = row as EndCapRowData;
      return (
        <PathEndCapRow
          row={endCapRow}
          width={width}
          isPathComplete={isPathComplete}
          progressLength={progressLength}
        />
      );
    }

    // Node row
    const nodeRow = row as NodeRowData;
    if (!lesson) return null;

    const isCurrent = state === 'current';
    const displayIndex = nodeRow.globalIndex + 1;
    const a11yLabel = `Lesson ${displayIndex}, ${lesson.title}, ${state}. ${lesson.summary || ''}`;

    return (
      <Animated.View style={[styles.nodeContainer, { width, height: nodeRow.height }, shakeAnimatedStyle]}>
        {/* Continuous Snake Line */}
        <PathLineSvg
          width={width}
          height={nodeRow.height}
          svgPathD={nodeRow.svgPathD}
          analyticLength={nodeRow.analyticLength}
          cumulativeLengthStart={nodeRow.cumulativeLengthStart}
          progressLength={progressLength}
        />

        {/* Traveler Silhouette on Current Node */}
        {isCurrent && nodeRow.travelerAnchor && (
          <PathTravelerMarker x={nodeRow.travelerAnchor.x} y={nodeRow.travelerAnchor.y} />
        )}

        {/* Circle Button */}
        <PathCircleNode
          cx={nodeRow.circle.cx}
          cy={nodeRow.circle.cy}
          r={nodeRow.circle.r}
          accent={accent}
          state={state}
          accessibilityLabel={a11yLabel}
          onPress={() => onLessonPress(nodeRow.lessonId)}
          onLockedPress={triggerLockedShake}
        />

        {/* Text Block */}
        <PathTextBlock
          index={displayIndex}
          lesson={lesson}
          state={state}
          x={nodeRow.textBox.x}
          y={nodeRow.textBox.y}
          width={nodeRow.textBox.width}
          lockedHint={lockedHint ?? undefined}
          onPress={() => onLessonPress(nodeRow.lessonId)}
          onLockedPress={triggerLockedShake}
        />
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  nodeContainer: {
    position: 'relative',
    overflow: 'visible',
  },
});
