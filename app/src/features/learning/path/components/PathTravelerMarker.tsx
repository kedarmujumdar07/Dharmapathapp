import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path as SvgPath, Polygon } from 'react-native-svg';
import { PathColors } from '../pathTheme';

interface PathTravelerMarkerProps {
  x: number;
  y: number;
}

/**
 * Traveler silhouette standing on the path line with a long cast shadow,
 * sampled and adapted from the reference design.
 * Position (x, y) represents the exact contact point where the traveler's feet touch the line.
 */
export const PathTravelerMarker: React.FC<PathTravelerMarkerProps> = ({ x, y }) => {
  return (
    <View
      pointerEvents="none"
      style={[
        styles.container,
        {
          left: x - 48,
          top: y - 36,
        },
      ]}
    >
      <Svg width={72} height={48} viewBox="0 0 72 48" style={styles.svg}>
        {/* Cast shadow stretching diagonally leftwards from feet at (48, 36) */}
        <Polygon
          points="48,36 6,46 5,44 47,35"
          fill="rgba(26, 25, 20, 0.28)"
        />

        {/* Head */}
        <SvgPath
          d="M 47.5 12 A 2.2 2.2 0 1 0 47.5 7.6 A 2.2 2.2 0 1 0 47.5 12 Z"
          fill={PathColors.ink}
        />

        {/* Torso & Walking Silhouette */}
        <SvgPath
          d="M 46.5 12.5 C 45.8 13.5 45.5 15.5 45.5 18 L 45 25 L 43.5 35.5 L 45.2 35.8 L 47 26.5 L 48.5 35.2 L 50.2 35 L 48.2 24.5 L 48.5 18 C 48.5 15.5 48 13.5 47.5 12.5 Z"
          fill={PathColors.ink}
        />

        {/* Walking Stick / Arm subtle contour */}
        <SvgPath
          d="M 46 16 L 43.5 22 L 44.5 22.5 L 47 17 Z"
          fill={PathColors.ink}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 72,
    height: 48,
    zIndex: 10,
  },
  svg: {
    overflow: 'visible',
  },
});
