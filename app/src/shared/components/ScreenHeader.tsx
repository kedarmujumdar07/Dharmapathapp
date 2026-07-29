/**
 * ScreenHeader — App header with back button, brand logo, location pill, and tab switcher.
 * Matches .app-header CSS from the mockup with gradient background.
 */

import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  PanchangColors,
  PanchangGradients,
  PanchangSpacing,
  PanchangFonts,
  PanchangShadows,
} from '@/shared/constants/panchang-theme';
import { PanchangStrings } from '@/shared/constants/panchang-strings';
import { LocationPill } from './LocationPill';
import { TabSwitcher } from './TabSwitcher';
import type { PanchangTab } from '@/features/panchang/types/panchang-screen.types';

interface ScreenHeaderProps {
  currentLocation: string;
  activeTab: PanchangTab;
  onBackPress: () => void;
  onLocationPress: () => void;
  onTabChange: (tab: PanchangTab) => void;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  currentLocation,
  activeTab,
  onBackPress,
  onLocationPress,
  onTabChange,
}) => {
  return (
    <LinearGradient
      colors={PanchangGradients.header}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradient}
    >
      {/* Top row: Back | Brand | Location */}
      <View style={styles.topRow}>
        <Pressable
          style={styles.backBtn}
          onPress={onBackPress}
          accessibilityLabel={PanchangStrings.backButton}
          accessibilityRole="button"
        >
          <Text style={styles.backBtnText}>{PanchangStrings.backButton}</Text>
        </Pressable>

        <Text style={styles.brandLogo}>{PanchangStrings.brandName}</Text>

        <LocationPill currentLocation={currentLocation} onPress={onLocationPress} />
      </View>

      {/* Tab switcher */}
      <TabSwitcher activeTab={activeTab} onTabChange={onTabChange} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingTop: PanchangSpacing.headerPaddingTop,
    paddingHorizontal: PanchangSpacing.headerPaddingH,
    paddingBottom: PanchangSpacing.headerPaddingBottom,
    gap: PanchangSpacing.headerGap,
    borderBottomWidth: 2,
    borderBottomColor: PanchangColors.goldAccent,
    ...PanchangShadows.headerShadow,
    zIndex: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    backgroundColor: PanchangColors.pillBg,
    borderWidth: 1,
    borderColor: PanchangColors.pillBorder,
    borderRadius: PanchangSpacing.pillBorderRadius,
    paddingHorizontal: PanchangSpacing.pillPaddingH,
    paddingVertical: PanchangSpacing.pillPaddingV,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  backBtnText: {
    fontFamily: PanchangFonts.nunito700,
    fontSize: 12,
    color: PanchangColors.white,
  },
  brandLogo: {
    fontFamily: PanchangFonts.caveat700,
    fontSize: 28, // 1.8rem ≈ 28.8px
    color: PanchangColors.brandOrange,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
});
