import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { DT, SHADOW } from '../constants/homeTheme';
import type { LeagueInfo } from '@/features/home/types/progress.types';

interface DharmaLeagueCardProps {
  leagueInfo: LeagueInfo;
}

export const DharmaLeagueCard: React.FC<DharmaLeagueCardProps> = ({ leagueInfo }) => {
  return (
    <View style={[SHADOW.saffron, styles.wrapper]}>
      <LinearGradient
        colors={['#1A0E05', DT.surfaceRaised]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Saffron accent stripe */}
        <View style={styles.accentStripe} />

        <View style={styles.header}>
          <View>
            <Text style={styles.tierLabel}>🛡️  {leagueInfo.tier.toUpperCase()} LEAGUE</Text>
            <Text style={styles.divisionText}>SADHAKA DIVISION</Text>
          </View>
          <View style={styles.rankBadge}>
            <Text style={styles.rankNum}>#{leagueInfo.rank}</Text>
            <Text style={styles.rankSub}>of {leagueInfo.totalScholars}</Text>
          </View>
        </View>

        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${leagueInfo.progressPercent}%` as any }]} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>TOP 5% THIS WEEK</Text>
          <Text style={styles.footerText}>PROMOTION IN {leagueInfo.daysToPromotion}d</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    marginBottom: 14,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: DT.border,
  },
  accentStripe: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: DT.saffron,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
    paddingLeft: 8,
  },
  tierLabel: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 15,
    color: DT.saffron,
    marginBottom: 2,
  },
  divisionText: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 11,
    color: DT.textMuted,
    letterSpacing: 0.8,
  },
  rankBadge: {
    alignItems: 'center',
    backgroundColor: DT.glass,
    borderWidth: 1,
    borderColor: DT.glassBorder,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  rankNum: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 18,
    color: DT.gold,
    lineHeight: 22,
  },
  rankSub: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 10,
    color: DT.textMuted,
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 10,
    marginLeft: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: DT.gold,
    borderRadius: 3,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  footerText: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 10,
    color: DT.textMuted,
    letterSpacing: 0.5,
  },
});
