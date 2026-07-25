import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Colors } from '@/constants/theme';

export interface ChoiceCardProps {
  indexStr: string;
  label: string;
  subtitle?: string;
  badge?: string;
  isSelected: boolean;
  onTap: () => void;
}

function ChoiceCardComponent({
  indexStr,
  label,
  subtitle,
  badge,
  isSelected,
  onTap,
}: ChoiceCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, { damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  return (
    <Pressable
      onPress={onTap}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${label}${subtitle ? `, ${subtitle}` : ''}`}
      accessibilityState={{ selected: isSelected }}
    >
      <Animated.View
        style={[
          styles.card,
          isSelected ? styles.cardSelected : styles.cardDefault,
          animatedStyle,
        ]}
      >
        <View style={[styles.indexBox, isSelected && styles.indexBoxSelected]}>
          <Text style={[styles.indexText, isSelected && styles.textSelected]}>
            {indexStr}
          </Text>
        </View>

        <View style={styles.textWrap}>
          <Text style={[styles.label, isSelected && styles.textSelected]}>
            {label}
          </Text>
          {subtitle ? (
            <Text style={[styles.sub, isSelected && styles.subSelected]}>
              {subtitle}
            </Text>
          ) : null}
        </View>

        {badge ? (
          <View style={[styles.badge, isSelected && styles.badgeSelected]}>
            <Text style={[styles.badgeText, isSelected && styles.textSelected]}>
              {badge}
            </Text>
          </View>
        ) : null}
      </Animated.View>
    </Pressable>
  );
}

export const ChoiceCard = React.memo(ChoiceCardComponent);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderRadius: 4,
    borderWidth: 1,
    gap: 12,
    marginVertical: 4,
  },
  cardDefault: {
    backgroundColor: Colors.cardDark,
    borderColor: Colors.cardDarkBorder,
  },
  cardSelected: {
    backgroundColor: Colors.accentRed,
    borderColor: Colors.accentRed,
  },
  indexBox: {
    width: 26,
    height: 26,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.cardDarkBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexBoxSelected: {
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  indexText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  textWrap: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textLight,
  },
  sub: {
    fontSize: 10,
    fontWeight: '500',
    color: Colors.textMuted,
    marginTop: 2,
  },
  subSelected: {
    color: 'rgba(255, 255, 255, 0.75)',
  },
  textSelected: {
    color: '#FFFFFF',
  },
  badge: {
    backgroundColor: Colors.bgDark2,
    borderColor: Colors.cardDarkBorder,
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeSelected: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: 0.3,
  },
});
