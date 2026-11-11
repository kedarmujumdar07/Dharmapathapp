import React, { useEffect } from 'react';
import { StyleSheet, Pressable, AccessibilityInfo } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withTiming,
  Easing,
  useReducedMotion,
} from 'react-native-reanimated';
import Svg, { Path as SvgPath, Rect } from 'react-native-svg';
import type { NodeState } from '../types/path.types';
import { withAlpha, PathColors } from '../pathTheme';

interface PathCircleNodeProps {
  cx: number;
  cy: number;
  r: number;
  accent: string;
  state: NodeState;
  accessibilityLabel: string;
  onPress: () => void;
  onLockedPress: () => void;
}

export const PathCircleNode: React.FC<PathCircleNodeProps> = React.memo(
  ({ cx, cy, r, accent, state, accessibilityLabel, onPress, onLockedPress }) => {
    const diameter = 2 * r;
    const isCurrent = state === 'current';
    const isCompleted = state === 'completed';
    const isLocked = state === 'locked';

    const prefersReducedMotion = useReducedMotion();

    // Press scale animation
    const pressScale = useSharedValue(1);

    // Current node pulsing ring animation
    const pulseScale = useSharedValue(1);
    const pulseOpacity = useSharedValue(0.6);

    useEffect(() => {
      if (isCurrent && !prefersReducedMotion) {
        pulseScale.value = withRepeat(
          withTiming(1.24, { duration: 1600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
          -1,
          true,
        );
        pulseOpacity.value = withRepeat(
          withTiming(0.12, { duration: 1600, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
          -1,
          true,
        );
      } else {
        pulseScale.value = 1;
        pulseOpacity.value = 0;
      }
    }, [isCurrent, prefersReducedMotion, pulseScale, pulseOpacity]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: prefersReducedMotion ? 1 : pressScale.value }],
      };
    });

    const pulseRingStyle = useAnimatedStyle(() => {
      return {
        transform: [{ scale: pulseScale.value }],
        opacity: pulseOpacity.value,
      };
    });

    const handlePressIn = () => {
      if (!prefersReducedMotion) {
        pressScale.value = withSpring(0.93, { damping: 14, stiffness: 220 });
      }
    };

    const handlePressOut = () => {
      if (!prefersReducedMotion) {
        pressScale.value = withSpring(1.0, { damping: 14, stiffness: 220 });
      }
    };

    const handlePress = () => {
      if (isLocked) {
        onLockedPress();
      } else {
        onPress();
      }
    };

    // Colors per state
    const circleBgColor = isLocked ? withAlpha(accent, 0.18) : accent;

    // Minimum 48dp tap target hit slop
    const hitSlop = Math.max(0, (48 - diameter) / 2);

    return (
      <Animated.View
        style={[
          styles.container,
          {
            left: cx - r,
            top: cy - r,
            width: diameter,
            height: diameter,
          },
          animatedStyle,
        ]}
      >
        {/* Soft pulsing ring for current active node */}
        {isCurrent && (
          <Animated.View
            pointerEvents="none"
            style={[
              styles.pulseRing,
              {
                width: diameter + 16,
                height: diameter + 16,
                borderRadius: (diameter + 16) / 2,
                borderColor: accent,
                left: -8,
                top: -8,
              },
              pulseRingStyle,
            ]}
          />
        )}

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={accessibilityLabel}
          accessibilityState={{ disabled: false }}
          hitSlop={hitSlop}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          style={[
            styles.circle,
            {
              width: diameter,
              height: diameter,
              borderRadius: r,
              backgroundColor: circleBgColor,
            },
          ]}
        >
          {isCompleted && (
            <Svg width={diameter * 0.36} height={diameter * 0.36} viewBox="0 0 24 24">
              <SvgPath
                d="M 5 12 L 10 17 L 19 8"
                stroke={PathColors.white}
                strokeWidth={3.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          )}

          {isCurrent && (
            <Svg width={diameter * 0.34} height={diameter * 0.34} viewBox="0 0 24 24">
              <SvgPath
                d="M 7 5 L 19 12 L 7 19 Z"
                fill={PathColors.white}
              />
            </Svg>
          )}

          {isLocked && (
            <Svg width={diameter * 0.34} height={diameter * 0.34} viewBox="0 0 24 24">
              {/* Lock body */}
              <Rect
                x="5"
                y="11"
                width="14"
                height="10"
                rx="2.5"
                fill={PathColors.lockedMutedText}
              />
              {/* Shackle */}
              <SvgPath
                d="M 8 11 L 8 7 C 8 4.8 9.8 3 12 3 C 14.2 3 16 4.8 16 7 L 16 11"
                stroke={PathColors.lockedMutedText}
                strokeWidth={2.4}
                strokeLinecap="round"
                fill="none"
              />
            </Svg>
          )}
        </Pressable>
      </Animated.View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  pulseRing: {
    position: 'absolute',
    borderWidth: 2.5,
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
