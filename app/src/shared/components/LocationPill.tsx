/**
 * LocationPill — Tappable location selector pill.
 * Shows the current location name with a dropdown indicator.
 * Matches .location-pill CSS from the mockup.
 */

import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { PanchangColors, PanchangSpacing, PanchangFonts } from '@/constants/panchang-theme';

interface LocationPillProps {
  currentLocation: string;
  onPress: () => void;
}

export const LocationPill: React.FC<LocationPillProps> = ({ currentLocation, onPress }) => {
  return (
    <Pressable
      style={styles.pill}
      onPress={onPress}
      accessibilityLabel={`Current location: ${currentLocation}. Tap to change.`}
      accessibilityRole="button"
    >
      <Text style={styles.text}>{currentLocation}</Text>
      <Text style={styles.chevron}> ▾</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pill: {
    backgroundColor: PanchangColors.pillBg,
    borderWidth: 1,
    borderColor: PanchangColors.pillBorder,
    borderRadius: PanchangSpacing.pillBorderRadius,
    paddingHorizontal: PanchangSpacing.pillPaddingH,
    paddingVertical: PanchangSpacing.pillPaddingV,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontFamily: PanchangFonts.nunito700,
    fontSize: 11,
    color: PanchangColors.white,
  },
  chevron: {
    fontFamily: PanchangFonts.nunito700,
    fontSize: 11,
    color: PanchangColors.white,
  },
});
