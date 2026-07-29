import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HardShadowCard } from '@/features/home/components/HardShadowCard';
import { HomeColors } from '@/features/home/constants/homeTheme';
import type { PathData } from '@/features/home/types/lesson.types';

interface MainPathCardProps {
  path: PathData;
  onPress: () => void;
}

export const MainPathCard: React.FC<MainPathCardProps> = ({ path, onPress }) => {
  return (
    <HardShadowCard style={styles.outerWrapper} cardStyle={styles.card} borderRadius={20}>
      <TouchableOpacity
        style={styles.innerCard}
        onPress={onPress}
        accessibilityLabel={`${path.title}: ${path.subtitle}`}
        accessibilityRole="button"
      >
        <View style={styles.leftSide}>
          <View style={styles.iconCircle}>
            <Text style={styles.emoji}>{path.emoji}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>{path.title}</Text>
            <Text style={styles.subtitle}>{path.subtitle}</Text>
          </View>
        </View>

        <View style={styles.arrowBadge}>
          <Text style={styles.arrowText}>➔</Text>
        </View>
      </TouchableOpacity>
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
  },
  innerCard: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: HomeColors.borderDark,
    backgroundColor: '#FFF9F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 22,
  },
  info: {
    flex: 1,
  },
  title: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 16,
    color: HomeColors.crimsonDark,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 10,
    color: HomeColors.textMuted,
  },
  arrowBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: HomeColors.borderDark,
    backgroundColor: HomeColors.saffronPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Baloo2_800ExtraBold',
  },
});
export default MainPathCard;
