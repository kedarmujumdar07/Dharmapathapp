import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HardShadowCard } from './HardShadowCard';
import { HomeColors } from '../constants/homeTheme';
import { getDailyPanchang, DEFAULT_LOCATION } from '@/features/panchang/engine/panchang-service';

export const PanchangGlanceCard: React.FC = () => {
  const panchang = useMemo(() => getDailyPanchang(new Date(), DEFAULT_LOCATION), []);

  const formattedDate = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString('en-IN', { month: 'long', day: 'numeric' }).toUpperCase();
  }, []);

  // Determine paksha from tithi name
  const paksha = panchang.tithi.name.toLowerCase().includes('krishna') ? 'KRISHNA PAKSHA' : 'SHUKLA PAKSHA';

  const { muhurat, solarTimes, nakshatra, yoga } = panchang;

  // Format sun timings: "HH:MM AM • HH:MM PM"
  const sunTimings = `${solarTimes.sunrise.slice(0, 8).trim()} • ${solarTimes.sunset.slice(0, 8).trim()}`;
  const rahuKalam = `${muhurat.rahuKalam.start.slice(0, 8)} – ${muhurat.rahuKalam.end.slice(0, 8)}`;
  const abhijitTime = `${muhurat.abhijit.start.slice(0, 8)} – ${muhurat.abhijit.end.slice(0, 8)}`;

  return (
    <HardShadowCard style={styles.outerWrapper} cardStyle={styles.card}>
      {/* Top row */}
      <View style={styles.topRow}>
        <View style={styles.pakshaTag}>
          <Text style={styles.pakshaTagText}>{paksha}</Text>
        </View>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>

      {/* Tithi */}
      <Text style={styles.tithiTitle}>{panchang.tithi.name.toUpperCase()}</Text>

      {/* 2x2 info grid */}
      <View style={styles.grid}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>SUN TIMINGS</Text>
          <Text style={styles.infoValue}>{sunTimings}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>NAKSHATRA</Text>
          <Text style={styles.infoValue}>{nakshatra.name}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>YOGA</Text>
          <Text style={styles.infoValue}>{yoga.name}</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>RAHU KALAM</Text>
          <Text style={styles.infoValue}>{rahuKalam}</Text>
        </View>

        {/* Abhijit Muhurat banner — full width */}
        <View style={styles.abhijitBanner}>
          <View>
            <Text style={styles.abhijitLabel}>ABHIJIT MUHURAT (AUSPICIOUS)</Text>
            <Text style={styles.abhijitTime}>{abhijitTime}</Text>
          </View>
          <Text style={styles.abhijitBadge}>AUSPICIOUS</Text>
        </View>
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={styles.darkBtn}
        accessibilityLabel="View full calendar and Choghadiya"
        accessibilityRole="button"
      >
        <Text style={styles.darkBtnText}>VIEW FULL CALENDAR & CHOGHADIYA</Text>
      </TouchableOpacity>
    </HardShadowCard>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    marginBottom: 16,
    marginHorizontal: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2.5,
    borderColor: HomeColors.borderDark,
    borderRadius: 22,
    padding: 14,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  pakshaTag: {
    backgroundColor: HomeColors.goldLight,
    borderWidth: 1.5,
    borderColor: HomeColors.borderDark,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  pakshaTagText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 10,
    color: HomeColors.saffronDark,
  },
  dateText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 11,
    color: HomeColors.textMuted,
  },
  tithiTitle: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 18,
    color: HomeColors.crimsonDark,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  infoBox: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EFE7DA',
    borderRadius: 12,
    padding: 8,
  },
  infoLabel: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 9,
    color: HomeColors.textMuted,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 11,
    color: HomeColors.textMain,
  },
  abhijitBanner: {
    width: '100%',
    backgroundColor: HomeColors.emeraldLight,
    borderWidth: 1.5,
    borderColor: HomeColors.emeraldGreen,
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  abhijitLabel: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 9,
    color: HomeColors.emeraldGreen,
    textTransform: 'uppercase',
  },
  abhijitTime: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 12,
    color: '#1B5E20',
  },
  abhijitBadge: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 11,
    color: HomeColors.emeraldGreen,
  },
  darkBtn: {
    backgroundColor: HomeColors.darkCard,
    borderWidth: 2.5,
    borderColor: HomeColors.borderDark,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
  },
  darkBtnText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 11,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
