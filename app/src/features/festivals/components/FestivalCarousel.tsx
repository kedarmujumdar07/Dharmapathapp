/**
 * FestivalCarousel — Horizontal FlatList of FestivalCardMini items.
 * Uses FlatList (not ScrollView + map) for virtualization with real data volume.
 */

import React, { useCallback } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import type { ListRenderItemInfo } from 'react-native';
import { PanchangColors, PanchangSpacing, PanchangFonts } from '@/constants/panchang-theme';
import { PanchangStrings } from '@/constants/panchang-strings';
import { FestivalCardMini } from './FestivalCardMini';
import type { FestivalCardData } from '@/types/festival-screen.types';

interface FestivalCarouselProps {
  festivals: FestivalCardData[];
  onCardPress: (festival: FestivalCardData) => void;
}

export const FestivalCarousel: React.FC<FestivalCarouselProps> = ({ festivals, onCardPress }) => {
  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<FestivalCardData>) => (
      <FestivalCardMini festival={item} onPress={onCardPress} />
    ),
    [onCardPress]
  );

  const keyExtractor = useCallback(
    (item: FestivalCardData) => `festival-${item.index}`,
    []
  );

  return (
    <View style={styles.wrapper}>
      {/* Section label */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>{PanchangStrings.sectionTitle}</Text>
        <Text style={styles.sublabel}>{PanchangStrings.sectionSubtitle}</Text>
      </View>

      {/* Horizontal carousel */}
      <FlatList
        data={festivals}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={Separator}
        accessibilityRole="list"
      />
    </View>
  );
};

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontFamily: PanchangFonts.baloo700,
    fontSize: 18,
    color: PanchangColors.maroonDark,
  },
  sublabel: {
    fontFamily: PanchangFonts.nunito600,
    fontSize: 11,
    color: PanchangColors.textSublabel,
  },
  listContent: {
    paddingBottom: 8,
  },
  separator: {
    width: PanchangSpacing.carouselGap,
  },
});
