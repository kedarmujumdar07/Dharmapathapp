import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { UnitHeaderRowData } from '../types/layout.types';
import { PathLineSvg } from './PathLineSvg';
import { PathColors, PathFonts } from '../pathTheme';
import { PATH_LAYOUT_CONFIG } from '../layout/pathLayoutConfig';

interface PathUnitHeaderRowProps {
  row: UnitHeaderRowData;
  width: number;
  accent: string;
  completedLessons: number;
  progressLength: number;
}

export const PathUnitHeaderRow: React.FC<PathUnitHeaderRowProps> = React.memo(
  ({ row, width, accent, completedLessons, progressLength }) => {
    return (
      <View style={[styles.container, { width, height: row.height }]}>
        {/* Continuous snake line */}
        <PathLineSvg
          width={width}
          height={row.height}
          svgPathD={row.svgPathD}
          analyticLength={row.analyticLength}
          cumulativeLengthStart={row.cumulativeLengthStart}
          progressLength={progressLength}
        />

        {/* Header Text Block */}
        <View
          style={[
            styles.textContainer,
            {
              left: row.textBox.x,
              top: row.textBox.y,
              width: row.textBox.width,
            },
          ]}
        >
          <Text
            maxFontSizeMultiplier={PATH_LAYOUT_CONFIG.textMetrics.maxFontSizeMultiplier}
            style={[styles.smallCaps, { color: accent }]}
          >
            UNIT {row.unitIndex + 1}
          </Text>
          <Text
            numberOfLines={2}
            maxFontSizeMultiplier={PATH_LAYOUT_CONFIG.textMetrics.maxFontSizeMultiplier}
            style={styles.title}
          >
            {row.title}
          </Text>
          <Text
            maxFontSizeMultiplier={PATH_LAYOUT_CONFIG.textMetrics.maxFontSizeMultiplier}
            style={styles.counter}
          >
            {completedLessons}/{row.totalLessons} lessons completed
          </Text>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'visible',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    gap: 4,
  },
  smallCaps: {
    fontFamily: PathFonts.displayExtraBold,
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: PathFonts.display,
    fontSize: 18,
    lineHeight: 22,
    color: PathColors.ink,
    letterSpacing: -0.3,
  },
  counter: {
    fontFamily: PathFonts.mono,
    fontSize: 12,
    lineHeight: 16,
    color: PathColors.inkMuted,
  },
});
