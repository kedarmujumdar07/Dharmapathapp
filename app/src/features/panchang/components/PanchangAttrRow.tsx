/**
 * PanchangAttrRow — Single label/value row in the panchang breakdown panel.
 * Matches .attr-item, .attr-lbl, .attr-val-txt CSS from the mockup.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PanchangColors, PanchangSpacing, PanchangFonts } from '@/shared/constants/panchang-theme';
import type { PanchangAttribute } from '@/features/panchang/types/panchang-screen.types';

interface PanchangAttrRowProps {
  attribute: PanchangAttribute;
}

export const PanchangAttrRow: React.FC<PanchangAttrRowProps> = ({ attribute }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{attribute.label}</Text>
      <Text style={styles.value}>
        {attribute.isHighlighted ? (
          <Text style={styles.highlighted}>{attribute.value}</Text>
        ) : (
          attribute.value
        )}
        {attribute.uptoTime ? (
          <Text style={styles.upto}> {attribute.uptoTime}</Text>
        ) : null}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    // font-size: 12px, line-height: 1.4 from CSS
  },
  label: {
    fontFamily: PanchangFonts.nunito700,
    fontSize: 12,
    lineHeight: 16.8, // 12 * 1.4
    color: PanchangColors.maroonDark,
    width: PanchangSpacing.attrLabelWidth,
    flexShrink: 0,
  },
  value: {
    fontFamily: PanchangFonts.nunito600,
    fontSize: 12,
    lineHeight: 16.8,
    color: PanchangColors.textAttrValue,
    flex: 1,
  },
  highlighted: {
    color: PanchangColors.maroonLight,
    fontFamily: PanchangFonts.nunito700,
  },
  upto: {
    color: PanchangColors.textUptoTime,
    fontSize: 11,
  },
});
