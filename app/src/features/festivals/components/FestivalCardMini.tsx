/**
 * FestivalCardMini — Single festival card for the carousel.
 * Matches .fest-card-mini CSS from the mockup with gradient header,
 * olive date badge, info box, and lesson status pill.
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
} from '@/constants/panchang-theme';
import { PanchangStrings } from '@/constants/panchang-strings';
import type { FestivalCardData } from '@/types/festival-screen.types';

interface FestivalCardMiniProps {
  festival: FestivalCardData;
  onPress: (festival: FestivalCardData) => void;
}

export const FestivalCardMini: React.FC<FestivalCardMiniProps> = ({ festival, onPress }) => {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={() => onPress(festival)}
      accessibilityLabel={`${festival.shortName}, ${festival.dateFormatted}. Tap to read significance.`}
      accessibilityRole="button"
    >
      {/* Card header */}
      <LinearGradient
        colors={[...PanchangGradients.cardHead]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.head}
      >
        <Text style={styles.headDate}>{festival.dateFormatted}</Text>
        <Text style={styles.headName}>{festival.shortName}</Text>
      </LinearGradient>

      {/* Card body: date badge + info */}
      <View style={styles.body}>
        {/* Date badge */}
        <LinearGradient
          colors={[...PanchangGradients.dateBadge]}
          start={{ x: 0.15, y: 0 }}
          end={{ x: 0.85, y: 1 }}
          style={styles.dateBadge}
        >
          <Text style={styles.badgeNum}>
            {festival.dayNumber}
            <Text style={styles.badgeSup}>{festival.daySuffix}</Text>
          </Text>
          <Text style={styles.badgeMonth}>{festival.monthYear}</Text>
          <View style={styles.badgeTag}>
            <Text style={styles.badgeTagText}>{festival.weekday}</Text>
          </View>
        </LinearGradient>

        {/* Info box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTithi}>{festival.tithiLabel}</Text>
          <Text style={styles.infoDesc}>{festival.shortDescription}</Text>

          {/* Lesson status pill */}
          <LinearGradient
            colors={[...PanchangGradients.lessonPill]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.lessonPill}
          >
            <Text style={styles.lessonPillText}>
              {festival.hasLesson
                ? PanchangStrings.lessonAvailable
                : PanchangStrings.lessonComingSoon}
            </Text>
          </LinearGradient>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    minWidth: PanchangSpacing.cardMinWidth,
    maxWidth: PanchangSpacing.cardMinWidth,
    backgroundColor: PanchangColors.maroonDark,
    borderWidth: 2,
    borderColor: PanchangColors.maroonMid,
    borderRadius: PanchangSpacing.cardBorderRadius,
    overflow: 'hidden',
    ...PanchangShadows.cardShadow,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  head: {
    paddingHorizontal: PanchangSpacing.cardHeadPaddingH,
    paddingVertical: PanchangSpacing.cardHeadPaddingV,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: PanchangColors.cardHeadBorder,
  },
  headDate: {
    fontFamily: PanchangFonts.nunito700,
    fontSize: 11,
    color: PanchangColors.white,
  },
  headName: {
    fontFamily: PanchangFonts.nunito700,
    fontSize: 11,
    color: PanchangColors.white,
  },
  body: {
    flexDirection: 'row',
    padding: PanchangSpacing.cardBodyPadding,
    gap: PanchangSpacing.cardBodyGap,
  },
  dateBadge: {
    flex: 0.45,
    borderWidth: 1,
    borderColor: PanchangColors.oliveBorder,
    borderRadius: PanchangSpacing.badgeBorderRadius,
    paddingTop: PanchangSpacing.badgePaddingTop,
    paddingHorizontal: PanchangSpacing.badgePaddingH,
    paddingBottom: 0,
    alignItems: 'center',
    overflow: 'hidden',
  },
  badgeNum: {
    fontFamily: PanchangFonts.nunito800,
    fontSize: 32,
    lineHeight: 34,
    color: PanchangColors.white,
    marginVertical: 2,
  },
  badgeSup: {
    fontSize: 14,
  },
  badgeMonth: {
    fontFamily: PanchangFonts.nunito700,
    fontSize: 11,
    color: PanchangColors.goldAccent,
  },
  badgeTag: {
    marginTop: 6,
    backgroundColor: PanchangColors.badgeTagBg,
    width: '112%', // Slightly wider than parent like the CSS calc(100% + 8px)
    paddingVertical: 3,
    borderTopWidth: 1,
    borderTopColor: PanchangColors.badgeTagBorder,
    alignItems: 'center',
  },
  badgeTagText: {
    fontFamily: PanchangFonts.nunito700,
    fontSize: 10,
    color: PanchangColors.white,
  },
  infoBox: {
    flex: 0.55,
    justifyContent: 'space-between',
    gap: 4,
  },
  infoTithi: {
    fontFamily: PanchangFonts.baloo700,
    fontSize: 13,
    color: PanchangColors.goldAccent,
    lineHeight: 16,
  },
  infoDesc: {
    fontFamily: PanchangFonts.nunito600,
    fontSize: 10,
    color: PanchangColors.textInfoDesc,
    lineHeight: 13,
  },
  lessonPill: {
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: PanchangColors.goldAccent,
    alignItems: 'center',
    marginTop: 4,
    ...PanchangShadows.lessonPillShadow,
  },
  lessonPillText: {
    fontFamily: PanchangFonts.nunito800,
    fontSize: 10,
    color: PanchangColors.goldAccent,
    textAlign: 'center',
  },
});
