import React, { useEffect } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useReducedMotion,
} from 'react-native-reanimated';
import { PathColors, PathFonts } from '../pathTheme';

interface PathJumpPillProps {
  visible: boolean;
  direction: 'up' | 'down';
  onPress: () => void;
}

export const PathJumpPill: React.FC<PathJumpPillProps> = ({ visible, direction, onPress }) => {
  const prefersReducedMotion = useReducedMotion();
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      opacity.value = visible ? 1 : 0;
    } else {
      opacity.value = withTiming(visible ? 1 : 0, { duration: 250 });
    }
  }, [visible, prefersReducedMotion, opacity]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        {
          translateY: prefersReducedMotion ? 0 : withTiming(visible ? 0 : 8, { duration: 250 }),
        },
      ],
    };
  });

  if (!visible && opacity.value === 0) {
    return null;
  }

  const arrow = direction === 'up' ? '↑' : '↓';

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Jump to current lesson ${direction}`}
        style={styles.pill}
        onPress={onPress}
      >
        <Text style={styles.text}>{arrow} Jump to current</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    zIndex: 100,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PathColors.ink,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  text: {
    fontFamily: PathFonts.displayExtraBold,
    fontSize: 12,
    letterSpacing: 0.5,
    color: PathColors.white,
  },
});
