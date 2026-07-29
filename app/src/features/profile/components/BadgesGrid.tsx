import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HardShadowCard } from '@/features/home/components/HardShadowCard';
import { HomeColors } from '@/features/home/constants/homeTheme';

interface Badge {
  id: string;
  emoji: string;
  label: string;
}

interface BadgesGridProps {
  unlockedBadgeIds: string[];
}

const ALL_BADGES: Badge[] = [
  { id: 'first_lesson', emoji: '🏆', label: 'Gita Master' },
  { id: 'streak_7', emoji: '🔥', label: '7-Day Streak' },
  { id: 'punya_100', emoji: '🪔', label: 'Punya Scholar' },
  { id: 'scholar', emoji: '📜', label: 'Upanishad Sage' },
];

export const BadgesGrid: React.FC<BadgesGridProps> = ({ unlockedBadgeIds }) => {
  return (
    <HardShadowCard style={styles.outerWrapper} cardStyle={styles.card} borderRadius={22}>
      <View style={styles.row}>
        {ALL_BADGES.map((badge) => {
          const isUnlocked = unlockedBadgeIds.includes(badge.id);
          return (
            <View key={badge.id} style={styles.badgeItem}>
              <View
                style={[
                  styles.iconCircle,
                  !isUnlocked && styles.lockedCircle,
                ]}
              >
                <Text style={[styles.emoji, !isUnlocked && styles.lockedEmoji]}>
                  {isUnlocked ? badge.emoji : '🔒'}
                </Text>
              </View>
              <Text
                style={[
                  styles.label,
                  !isUnlocked && styles.lockedLabel,
                ]}
              >
                {badge.label}
              </Text>
            </View>
          );
        })}
      </View>
    </HardShadowCard>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    marginBottom: 14,
    marginHorizontal: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2.5,
    borderColor: HomeColors.borderDark,
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 8,
  },
  badgeItem: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: HomeColors.borderDark,
    backgroundColor: HomeColors.goldLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockedCircle: {
    backgroundColor: '#EAEAEA',
    borderColor: '#CCCCCC',
    opacity: 0.4,
  },
  emoji: {
    fontSize: 18,
  },
  lockedEmoji: {
    fontSize: 14,
  },
  label: {
    fontSize: 9,
    fontFamily: 'Baloo2_800ExtraBold',
    color: HomeColors.textMain,
    textAlign: 'center',
  },
  lockedLabel: {
    color: '#888888',
  },
});
export default BadgesGrid;
