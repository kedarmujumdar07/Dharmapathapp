/**
 * PanchangBreakdownPanel — Full panchang attribute list panel.
 * Matches .panchang-panel CSS from the mockup with gradient header,
 * location/date meta section, and attribute list.
 *
 * Accepts data from the DailyPanchang engine output shape and
 * reformats it into PanchangAttribute rows using the useTimeFormat hook.
 */

import React, { useMemo } from 'react';
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
import { PanchangAttrRow } from './PanchangAttrRow';
import { FormatToggle } from './FormatToggle';
import type { DailyPanchang } from '@/types/panchang';
import type { PanchangAttribute, TimeFormatMode } from '@/types/festival-screen.types';

interface PanchangBreakdownPanelProps {
  panchang: DailyPanchang;
  timeFormat: TimeFormatMode;
  formatTime: (time: string) => string;
  onSelect12h: () => void;
  onSelect24h: () => void;
}

/** Helpers to extract "upto" time from endTimestamp like "Until 04:15 PM" */
function extractUptoTime(
  endTimestamp: string | undefined,
  formatter: (t: string) => string
): string | undefined {
  if (!endTimestamp || endTimestamp === 'Spans full day') return undefined;
  // endTimestamp format: "Until HH:MM AM/PM"
  const match = endTimestamp.match(/Until\s+(.+)/i);
  if (match) {
    return `upto ${formatter(match[1])}`;
  }
  return endTimestamp;
}

/** Build the weekday name from the date string */
function getWeekdayName(dateStr: string): string {
  const date = new Date(dateStr + 'T12:00:00');
  const weekdays = [
    'Raviwara', 'Somawara', 'Mangalawara', 'Budhawara',
    'Guruwara', 'Shukrawara', 'Shaniwara',
  ];
  return weekdays[date.getDay()] ?? 'Unknown';
}

/** Get Amanta month name from Tithi state */
function getAmantaMonth(panchang: DailyPanchang): string {
  // Derive from the solar month / tithi position. Use sauMasa as proxy.
  // The mockup shows "Ashadha" — this is a simplification.
  // In a full implementation this would come from the panchang engine.
  return panchang.sauMasa.name;
}

export const PanchangBreakdownPanel: React.FC<PanchangBreakdownPanelProps> = ({
  panchang,
  timeFormat,
  formatTime,
  onSelect12h,
  onSelect24h,
}) => {
  const formattedDate = useMemo(() => {
    const d = new Date(panchang.date + 'T12:00:00');
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [panchang.date]);

  const locationName = panchang.location.name ?? 'Unknown Location';

  const attributes: PanchangAttribute[] = useMemo(() => {
    return [
      {
        label: PanchangStrings.attrSunrise,
        value: formatTime(panchang.solarTimes.sunrise),
        isTimeValue: true,
        isHighlighted: false,
      },
      {
        label: PanchangStrings.attrSunset,
        value: formatTime(panchang.solarTimes.sunset),
        isTimeValue: true,
        isHighlighted: false,
      },
      {
        label: PanchangStrings.attrTithi,
        value: panchang.tithi.name,
        uptoTime: extractUptoTime(panchang.tithi.endTimestamp, formatTime),
        isTimeValue: false,
        isHighlighted: true,
      },
      {
        label: PanchangStrings.attrNakshatra,
        value: panchang.nakshatra.name,
        uptoTime: extractUptoTime(panchang.nakshatra.endTimestamp, formatTime),
        isTimeValue: false,
        isHighlighted: true,
      },
      {
        label: PanchangStrings.attrYoga,
        value: panchang.yoga.name,
        uptoTime: extractUptoTime(panchang.yoga.endTimestamp, formatTime),
        isTimeValue: false,
        isHighlighted: true,
      },
      {
        label: PanchangStrings.attrKarana,
        value: panchang.karana.name,
        uptoTime: extractUptoTime(panchang.karana.endTimestamp, formatTime),
        isTimeValue: false,
        isHighlighted: true,
      },
      {
        label: PanchangStrings.attrPaksha,
        value: `${panchang.tithi.paksha} Paksha`,
        isTimeValue: false,
        isHighlighted: true,
      },
      {
        label: PanchangStrings.attrWeekday,
        value: getWeekdayName(panchang.date),
        isTimeValue: false,
        isHighlighted: true,
      },
      {
        label: PanchangStrings.attrAmantaMonth,
        value: getAmantaMonth(panchang),
        isTimeValue: false,
        isHighlighted: true,
      },
      {
        label: PanchangStrings.attrPurnimantaMonth,
        value: getAmantaMonth(panchang),
        isTimeValue: false,
        isHighlighted: true,
      },
      {
        label: PanchangStrings.attrMoonsign,
        value: `${panchang.sauMasa.zodiacSign}`,
        isTimeValue: false,
        isHighlighted: true,
      },
      {
        label: PanchangStrings.attrSunsign,
        value: `${panchang.sauMasa.name} (${panchang.sauMasa.zodiacSign})`,
        isTimeValue: false,
        isHighlighted: true,
      },
      {
        label: PanchangStrings.attrShakaSamvat,
        value: `${panchang.samvatsara.sakaSamvat} ${panchang.samvatsara.name}`,
        isTimeValue: false,
        isHighlighted: true,
      },
      {
        label: PanchangStrings.attrVikramSamvat,
        value: `${panchang.samvatsara.vikramSamvat} ${panchang.samvatsara.name}`,
        isTimeValue: false,
        isHighlighted: true,
      },
    ];
  }, [panchang, formatTime]);

  return (
    <View style={styles.panel}>
      {/* Panel header */}
      <LinearGradient
        colors={[...PanchangGradients.panchangPanelHead]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.panelHead}
      >
        <Text style={styles.panelTitle}>{PanchangStrings.panchangPanelTitle}</Text>
        <FormatToggle
          activeFormat={timeFormat}
          onSelect12h={onSelect12h}
          onSelect24h={onSelect24h}
        />
      </LinearGradient>

      {/* Meta section: location + date */}
      <View style={styles.meta}>
        <Text style={styles.metaLoc}>{locationName}</Text>
        <Text style={styles.metaDate}>{formattedDate}</Text>
      </View>

      {/* Attribute list */}
      <View style={styles.attrList}>
        {attributes.map((attr) => (
          <PanchangAttrRow key={attr.label} attribute={attr} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    backgroundColor: PanchangColors.appAmberLight,
    borderWidth: 1,
    borderColor: PanchangColors.cardBorder,
    borderRadius: PanchangSpacing.panelBorderRadius,
    overflow: 'hidden',
    ...PanchangShadows.panelShadow,
  },
  panelHead: {
    paddingHorizontal: PanchangSpacing.panelHeadPaddingH,
    paddingVertical: PanchangSpacing.panelHeadPaddingV,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#b87223',
  },
  panelTitle: {
    fontFamily: PanchangFonts.baloo700,
    fontSize: 16,
    color: PanchangColors.white,
  },
  meta: {
    paddingHorizontal: PanchangSpacing.panelMetaPaddingH,
    paddingTop: PanchangSpacing.panelMetaPaddingTop,
    paddingBottom: PanchangSpacing.panelMetaPaddingBottom,
    borderBottomWidth: 1,
    borderBottomColor: PanchangColors.panchangMetaDivider,
  },
  metaLoc: {
    fontFamily: PanchangFonts.nunito700,
    fontSize: 14,
    color: PanchangColors.maroonDark,
  },
  metaDate: {
    fontFamily: PanchangFonts.nunito700,
    fontSize: 13,
    color: PanchangColors.textPanchangDate,
  },
  attrList: {
    paddingHorizontal: PanchangSpacing.panelAttrPaddingH,
    paddingTop: PanchangSpacing.panelAttrPaddingTop,
    paddingBottom: PanchangSpacing.panelAttrPaddingBottom,
    gap: PanchangSpacing.panelAttrGap,
  },
});
