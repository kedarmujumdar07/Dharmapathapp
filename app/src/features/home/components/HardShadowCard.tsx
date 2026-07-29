/**
 * HardShadowCard — Neobrutalist solid hard-shadow wrapper.
 *
 * Recreates the CSS `box-shadow: 0 4px 0 #231F20` effect using a solid
 * View offset 4px down + 4px right behind the card content.
 * React Native's elevation/shadowOffset produce blurred shadows — this does not.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { HomeColors, HARD_SHADOW_OFFSET } from '../constants/homeTheme';

interface HardShadowCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  cardStyle?: ViewStyle;
  shadowColor?: string;
  borderRadius?: number;
}

export const HardShadowCard: React.FC<HardShadowCardProps> = ({
  children,
  style,
  cardStyle,
  shadowColor = HomeColors.borderDark,
  borderRadius = 22,
}) => (
  <View style={[styles.wrapper, style]}>
    {/* Solid shadow layer — positioned behind via zIndex */}
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: shadowColor,
          borderRadius,
          top: HARD_SHADOW_OFFSET,
          left: HARD_SHADOW_OFFSET,
          zIndex: 0,
        },
      ]}
    />
    {/* Foreground card */}
    <View style={[{ borderRadius, zIndex: 1 }, cardStyle]}>{children}</View>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
});
