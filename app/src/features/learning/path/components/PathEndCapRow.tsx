import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import type { EndCapRowData } from '../types/layout.types';
import { PathLineSvg } from './PathLineSvg';
import { PathColors, PathFonts } from '../pathTheme';
import { PATH_LAYOUT_CONFIG } from '../layout/pathLayoutConfig';

interface PathEndCapRowProps {
  row: EndCapRowData;
  width: number;
  isPathComplete: boolean;
  progressLength: number;
}

export const PathEndCapRow: React.FC<PathEndCapRowProps> = React.memo(
  ({ row, width, isPathComplete, progressLength }) => {
    const dotColor = isPathComplete ? PathColors.lineProgress : PathColors.line;
    const titleText = isPathComplete ? 'PATH COMPLETED' : 'MORE TO COME';
    const descText = isPathComplete
      ? 'You have completed all chapters on this sacred path.'
      : 'New discourses and wisdom units are coming soon.';

    return (
      <View style={[styles.container, { width, height: row.height }]}>
        {/* Continuous vertical line segment down to the dot */}
        <PathLineSvg
          width={width}
          height={row.height}
          svgPathD={row.svgPathD}
          analyticLength={row.analyticLength}
          cumulativeLengthStart={row.cumulativeLengthStart}
          progressLength={progressLength}
        />

        {/* Terminal Dot */}
        <View pointerEvents="none" style={styles.dotContainer}>
          <Svg width={width} height={row.height} style={styles.svg}>
            <Circle
              cx={row.dot.cx}
              cy={row.dot.cy}
              r={row.dot.r}
              fill={dotColor}
            />
          </Svg>
        </View>

        {/* Data-driven End Cap Text */}
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
            style={styles.label}
          >
            {titleText}
          </Text>
          <Text
            numberOfLines={2}
            maxFontSizeMultiplier={PATH_LAYOUT_CONFIG.textMetrics.maxFontSizeMultiplier}
            style={styles.description}
          >
            {descText}
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
  dotContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  svg: {
    overflow: 'visible',
  },
  textContainer: {
    position: 'absolute',
    justifyContent: 'center',
    gap: 3,
  },
  label: {
    fontFamily: PathFonts.displayExtraBold,
    fontSize: 12,
    letterSpacing: 1.2,
    color: PathColors.ink,
  },
  description: {
    fontFamily: PathFonts.sans,
    fontSize: 12,
    lineHeight: 16,
    color: PathColors.inkMuted,
  },
});
