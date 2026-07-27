/**
 * FeaturedTimingBanner — "Featured: Guru Purnima Timings" banner.
 * Matches .featured-banner CSS from the mockup with olive badge label.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  PanchangColors,
  PanchangGradients,
  PanchangSpacing,
  PanchangFonts,
  PanchangShadows,
} from '@/constants/panchang-theme';
import { PanchangStrings } from '@/constants/panchang-strings';

interface FeaturedTimingBannerProps {
  /** Override defaults with custom timing data if needed */
  badgeLabel?: string;
  heading?: string;
  tithiBeginsLabel?: string;
  tithiBeginsTime?: string;
  tithiBeginsDate?: string;
  tithiEndsLabel?: string;
  tithiEndsTime?: string;
  tithiEndsDate?: string;
}

export const FeaturedTimingBanner: React.FC<FeaturedTimingBannerProps> = ({
  badgeLabel = PanchangStrings.featuredLabel,
  heading = PanchangStrings.featuredHeading,
  tithiBeginsLabel = PanchangStrings.featuredTithiBegins,
  tithiBeginsTime = PanchangStrings.featuredBeginTime,
  tithiBeginsDate = PanchangStrings.featuredBeginDate,
  tithiEndsLabel = PanchangStrings.featuredTithiEnds,
  tithiEndsTime = PanchangStrings.featuredEndTime,
  tithiEndsDate = PanchangStrings.featuredEndDate,
}) => {
  return (
    <View style={styles.banner}>
      {/* Floating badge label */}
      <LinearGradient
        colors={[...PanchangGradients.featuredBadge]}
        start={{ x: 0.15, y: 0 }}
        end={{ x: 0.85, y: 1 }}
        style={styles.badgeLabel}
      >
        <Text style={styles.badgeLabelText}>{badgeLabel}</Text>
      </LinearGradient>

      {/* Timing content */}
      <View style={styles.timingContent}>
        <Text style={styles.timingHead}>{heading}</Text>

        <Text style={styles.timingDetail}>
          {tithiBeginsLabel}{' '}
          <Text style={styles.timingStrong}>{tithiBeginsTime}</Text>{' '}
          {tithiBeginsDate}
        </Text>

        <Text style={styles.timingDetail}>
          {tithiEndsLabel}{' '}
          <Text style={styles.timingStrong}>{tithiEndsTime}</Text>{' '}
          {tithiEndsDate}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: PanchangColors.appAmberLight,
    borderWidth: 1.5,
    borderColor: PanchangColors.cardBorder,
    borderRadius: PanchangSpacing.bannerBorderRadius,
    padding: PanchangSpacing.bannerPadding,
    position: 'relative',
    ...PanchangShadows.bannerShadow,
    marginTop: 12, // Extra space for the floating badge
  },
  badgeLabel: {
    position: 'absolute',
    top: -12,
    left: 14,
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: PanchangColors.oliveBorder,
  },
  badgeLabelText: {
    fontFamily: PanchangFonts.baloo700,
    fontSize: 12,
    color: PanchangColors.white,
  },
  timingContent: {
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  timingHead: {
    fontFamily: PanchangFonts.nunito700,
    fontSize: 13,
    color: PanchangColors.maroonDark,
  },
  timingDetail: {
    fontFamily: PanchangFonts.nunito600,
    fontSize: 12,
    color: PanchangColors.textBrown,
  },
  timingStrong: {
    color: PanchangColors.textTimingStrong,
    fontFamily: PanchangFonts.nunito700,
  },
});
