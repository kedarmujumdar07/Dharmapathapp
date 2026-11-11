import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Path as SvgPath } from 'react-native-svg';
import { PathColors } from '../pathTheme';

interface PathLineSvgProps {
  width: number;
  height: number;
  svgPathD: string;
  analyticLength: number;
  cumulativeLengthStart: number;
  progressLength: number;
}

/**
 * Draws the continuous snake line for a single row.
 * Includes both the base path and the progress overlay path.
 *
 * Seam mitigation:
 * - Uses overflow="visible"
 * - strokeLinecap="round" and strokeLinejoin="round" with strokeWidth 3dp ensure
 *   abutting row segments overlap seamlessly across integer/subpixel boundaries.
 */
export const PathLineSvg: React.FC<PathLineSvgProps> = React.memo(
  ({ width, height, svgPathD, analyticLength, cumulativeLengthStart, progressLength }) => {
    if (!svgPathD) return null;

    const progressInRow = Math.max(
      0,
      Math.min(analyticLength, progressLength - cumulativeLengthStart),
    );

    return (
      <View pointerEvents="none" style={[styles.container, { width, height }]}>
        <Svg width={width} height={height} style={styles.svg}>
          {/* Base continuous line */}
          <SvgPath
            d={svgPathD}
            stroke={PathColors.line}
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Travelled progress overlay line */}
          {progressInRow > 0.05 && (
            <SvgPath
              d={svgPathD}
              stroke={PathColors.lineProgress}
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray={`${progressInRow}, ${analyticLength + 40}`}
              strokeDashoffset={0}
            />
          )}
        </Svg>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  svg: {
    overflow: 'visible',
  },
});
