import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HardShadowCard } from './HardShadowCard';
import { HomeColors } from '../constants/homeTheme';
import type { LeagueInfo } from '@/features/home/types/progress.types';

interface DharmaLeagueCardProps {
  leagueInfo: LeagueInfo;
}

export const DharmaLeagueCard: React.FC<DharmaLeagueCardProps> = ({ leagueInfo }) => {
  return (
    <HardShadowCard style={styles.outerWrapper} cardStyle={styles.card}>
      <LinearGradient
        colors={[HomeColors.saffronPrimary, HomeColors.saffronDark]}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>🛡️ {leagueInfo.tier} SADHAKA DIVISION</Text>
          <Text style={styles.badgeText}>TOP 5%</Text>
        </View>

        <View style={styles.progressBarBg}>
          <LinearGradient
            colors={[HomeColors.goldLight, HomeColors.goldPrimary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${leagueInfo.progressPercent}%` }]}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            RANK {leagueInfo.rank} OF {leagueInfo.totalScholars} SCHOLARS
          </Text>
          <Text style={styles.footerText}>
            PROMOTION IN {leagueInfo.daysToPromotion} DAYS
          </Text>
        </View>
      </LinearGradient>
    </HardShadowCard>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    marginBottom: 16,
    marginHorizontal: 2,
  },
  card: {
    borderWidth: 2.5,
    borderColor: HomeColors.borderDark,
    borderRadius: 22,
    overflow: 'hidden',
  },
  container: {
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
  badgeText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 11,
    color: '#FFF8E1',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    fontSize: 10,
    color: '#FFF8E1',
  },
});
