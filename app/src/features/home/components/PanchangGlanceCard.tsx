import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { DT, SHADOW } from '../constants/homeTheme';
import { getDailyPanchang, DEFAULT_LOCATION } from '@/features/panchang/engine/panchang-service';

interface PanchangGlanceCardProps {
  onViewFullCalendar?: () => void;
}

export const PanchangGlanceCard: React.FC<PanchangGlanceCardProps> = ({ onViewFullCalendar }) => {
  const panchang = useMemo(() => getDailyPanchang(new Date(), DEFAULT_LOCATION), []);

  const formattedDate = useMemo(() => {
    const d = new Date();
    return d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
  }, []);

  const paksha = panchang.tithi.name.toLowerCase().includes('krishna') ? '🌑 Krishna' : '🌕 Shukla';
  const { muhurat, solarTimes, nakshatra } = panchang;
  const sunrise = solarTimes.sunrise.slice(0, 8).trim();
  const sunset = solarTimes.sunset.slice(0, 8).trim();

  return (
    <View style={[SHADOW.sm, styles.wrapper]}>
      <BlurView intensity={18} tint="dark" style={styles.blurCard}>
        {/* Border overlay for glass effect */}
        <View style={styles.border} />

        <View style={styles.innerRow}>
          {/* Left — Tithi block */}
          <View style={styles.tithiBlock}>
            <Text style={styles.dateLabel}>{formattedDate}</Text>
            <Text style={styles.tithiName} numberOfLines={1}>
              {panchang.tithi.name}
            </Text>
            <Text style={styles.pakshaText}>{paksha} Paksha</Text>
          </View>

          {/* Divider */}
          <View style={styles.vDivider} />

          {/* Right — Quick stats */}
          <View style={styles.statsBlock}>
            <QuickStat icon="☀️" label="Rise / Set" value={`${sunrise} · ${sunset}`} />
            <QuickStat icon="⭐" label="Nakshatra" value={nakshatra.name} />
          </View>
        </View>

        {/* CTA row */}
        <TouchableOpacity
          style={styles.ctaRow}
          onPress={onViewFullCalendar}
          accessibilityLabel="View full Panchang calendar"
          accessibilityRole="button"
          activeOpacity={0.75}
        >
          <Text style={styles.ctaText}>VIEW FULL PANCHANG & CHOGHADIYA</Text>
          <Text style={styles.ctaArrow}>→</Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
};

const QuickStat: React.FC<{ icon: string; label: string; value: string }> = ({ icon, label, value }) => (
  <View style={statStyles.row}>
    <Text style={statStyles.icon}>{icon}</Text>
    <View>
      <Text style={statStyles.label}>{label}</Text>
      <Text style={statStyles.value} numberOfLines={1}>{value}</Text>
    </View>
  </View>
);

const statStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  icon: { fontSize: 14 },
  label: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 10,
    color: DT.textMuted,
    letterSpacing: 0.5,
  },
  value: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 12,
    color: DT.textPrimary,
  },
});

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 18,
    marginBottom: 14,
    overflow: 'hidden',
  },
  blurCard: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: DT.glass,
  },
  border: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: DT.glassBorder,
  },
  innerRow: {
    flexDirection: 'row',
    padding: 14,
    paddingBottom: 10,
    alignItems: 'center',
    gap: 14,
  },
  tithiBlock: {
    flex: 1,
  },
  dateLabel: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 11,
    color: DT.textMuted,
    marginBottom: 2,
  },
  tithiName: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 17,
    color: DT.textPrimary,
    lineHeight: 22,
  },
  pakshaText: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 12,
    color: DT.textSecondary,
    marginTop: 2,
  },
  vDivider: {
    width: 1,
    height: 52,
    backgroundColor: DT.divider,
  },
  statsBlock: {
    flex: 1,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: DT.divider,
  },
  ctaText: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 10,
    color: DT.saffron,
    letterSpacing: 0.8,
  },
  ctaArrow: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 14,
    color: DT.saffron,
  },
});
