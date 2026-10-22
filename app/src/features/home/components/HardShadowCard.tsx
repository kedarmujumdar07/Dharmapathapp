/**
 * DharmaCard — Modern soft-shadow card wrapper.
 *
 * Replaces the neobrutalist hard-border HardShadowCard with depth achieved
 * via iOS shadowColor/shadowRadius and Android elevation.
 * Props interface is kept identical so all existing usages continue to work.
 */

import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { DT, SHADOW } from '../constants/homeTheme';

interface HardShadowCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  cardStyle?: ViewStyle;
  /** @deprecated shadow color override — ignored in new design system */
  shadowColor?: string;
  borderRadius?: number;
}

export const HardShadowCard: React.FC<HardShadowCardProps> = ({
  children,
  style,
  cardStyle,
  borderRadius = 20,
}) => (
  <View
    style={[
      SHADOW.md,
      { borderRadius },
      style,
    ]}
  >
    <View
      style={[
        {
          borderRadius,
          overflow: 'hidden',
          backgroundColor: DT.surface,
        },
        cardStyle,
      ]}
    >
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({});

