import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { Colors } from '@/shared/constants/theme';

export interface DotIndicatorsProps {
  total: number;
  active: number;
  onSelect?: (index: number) => void;
  activeColor?: string;
  inactiveColor?: string;
}

interface SingleDotProps {
  index: number;
  isActive: boolean;
  onSelect?: (index: number) => void;
  activeColor: string;
  inactiveColor: string;
}

function SingleDot({
  index,
  isActive,
  onSelect,
  activeColor,
  inactiveColor,
}: SingleDotProps) {
  const widthAnim = useAnimatedStyle(() => {
    return {
      width: withTiming(isActive ? 24 : 7, { duration: 300 }),
      backgroundColor: withTiming(isActive ? activeColor : inactiveColor, {
        duration: 300,
      }),
    };
  });

  return (
    <Pressable
      onPress={() => onSelect?.(index)}
      disabled={!onSelect}
      accessibilityRole="button"
      accessibilityLabel={`Go to slide ${index + 1}`}
      accessibilityState={{ selected: isActive }}
      hitSlop={{ top: 10, bottom: 10, left: 6, right: 6 }}
    >
      <Animated.View style={[styles.dot, widthAnim]} />
    </Pressable>
  );
}

export function DotIndicatorsComponent({
  total,
  active,
  onSelect,
  activeColor = Colors.saffron,
  inactiveColor = 'rgba(0,0,0,0.14)',
}: DotIndicatorsProps) {
  return (
    <View style={styles.container} accessible={true} accessibilityLabel="Page indicators">
      {Array.from({ length: total }).map((_, i) => (
        <SingleDot
          key={i}
          index={i}
          isActive={i === active}
          onSelect={onSelect}
          activeColor={activeColor}
          inactiveColor={inactiveColor}
        />
      ))}
    </View>
  );
}

export const DotIndicators = React.memo(DotIndicatorsComponent);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    height: 7,
    borderRadius: 4,
  },
});
