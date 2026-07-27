/**
 * TabSwitcher — Segmented control for "Upcoming Festivals" / "Panchang Today".
 * Matches .header-sub-tabs and .tab-pill CSS from the mockup.
 */

import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import {
  PanchangColors,
  PanchangSpacing,
  PanchangFonts,
  PanchangShadows,
} from '@/constants/panchang-theme';
import type { PanchangTab } from '@/types/festival-screen.types';
import { PanchangStrings } from '@/constants/panchang-strings';

interface TabSwitcherProps {
  activeTab: PanchangTab;
  onTabChange: (tab: PanchangTab) => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.pill, activeTab === 'festival' && styles.pillActive]}
        onPress={() => onTabChange('festival')}
        accessibilityLabel={PanchangStrings.tabFestivals}
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === 'festival' }}
      >
        <Text style={[styles.text, activeTab === 'festival' && styles.textActive]}>
          {PanchangStrings.tabFestivals}
        </Text>
      </Pressable>

      <Pressable
        style={[styles.pill, activeTab === 'panchang' && styles.pillActive]}
        onPress={() => onTabChange('panchang')}
        accessibilityLabel={PanchangStrings.tabPanchang}
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === 'panchang' }}
      >
        <Text style={[styles.text, activeTab === 'panchang' && styles.textActive]}>
          {PanchangStrings.tabPanchang}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: PanchangColors.tabBarBg,
    padding: PanchangSpacing.tabBarPadding,
    borderRadius: PanchangSpacing.tabBarBorderRadius,
  },
  pill: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: PanchangSpacing.tabPillPaddingV,
    borderRadius: PanchangSpacing.tabPillBorderRadius,
  },
  pillActive: {
    backgroundColor: PanchangColors.maroonMid,
    borderWidth: 1,
    borderColor: PanchangColors.goldAccent,
    ...PanchangShadows.tabActiveShadow,
  },
  text: {
    fontFamily: PanchangFonts.baloo700,
    fontSize: 13,
    color: PanchangColors.tabInactiveText,
  },
  textActive: {
    color: PanchangColors.white,
  },
});
