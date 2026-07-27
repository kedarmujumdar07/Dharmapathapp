/**
 * FormatToggle — 12H/24H toggle button pair.
 * Matches .fmt-btn CSS from the mockup.
 */

import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import {
  PanchangColors,
  PanchangFonts,
  PanchangShadows,
} from '@/constants/panchang-theme';
import { PanchangStrings } from '@/constants/panchang-strings';
import type { TimeFormatMode } from '@/types/festival-screen.types';

interface FormatToggleProps {
  activeFormat: TimeFormatMode;
  onSelect12h: () => void;
  onSelect24h: () => void;
}

export const FormatToggle: React.FC<FormatToggleProps> = ({
  activeFormat,
  onSelect12h,
  onSelect24h,
}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.btn, activeFormat === '12h' && styles.btnActive]}
        onPress={onSelect12h}
        accessibilityLabel={PanchangStrings.format12h}
        accessibilityRole="button"
        accessibilityState={{ selected: activeFormat === '12h' }}
      >
        <Text style={[styles.btnText, activeFormat === '12h' && styles.btnTextActive]}>
          {PanchangStrings.format12h}
        </Text>
      </Pressable>

      <Pressable
        style={[styles.btn, activeFormat === '24h' && styles.btnActive]}
        onPress={onSelect24h}
        accessibilityLabel={PanchangStrings.format24h}
        accessibilityRole="button"
        accessibilityState={{ selected: activeFormat === '24h' }}
      >
        <Text style={[styles.btnText, activeFormat === '24h' && styles.btnTextActive]}>
          {PanchangStrings.format24h}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
  },
  btn: {
    backgroundColor: PanchangColors.fmtBtnBg,
    borderWidth: 1,
    borderColor: PanchangColors.fmtBtnBorder,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 4,
  },
  btnActive: {
    backgroundColor: PanchangColors.fmtBtnActiveBg,
    ...PanchangShadows.fmtBtnActiveShadow,
  },
  btnText: {
    fontFamily: PanchangFonts.nunito700,
    fontSize: 11,
    color: PanchangColors.white,
  },
  btnTextActive: {
    color: PanchangColors.maroonDark,
  },
});
