import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HardShadowCard } from '@/features/home/components/HardShadowCard';
import { HomeColors } from '@/features/home/constants/homeTheme';
import type { PathSubItem } from '@/features/home/types/lesson.types';

interface PathSubItemCardProps {
  item: PathSubItem;
  onPress: () => void;
}

export const PathSubItemCard: React.FC<PathSubItemCardProps> = ({ item, onPress }) => {
  return (
    <HardShadowCard style={styles.outerWrapper} cardStyle={styles.card} borderRadius={18}>
      <View style={styles.container}>
        <View style={styles.iconBox}>
          <Text style={styles.emoji}>{item.emoji}</Text>
        </View>

        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={onPress}
          accessibilityLabel={`${item.actionLabel} ${item.title}`}
          accessibilityRole="button"
        >
          <Text style={styles.actionText}>{item.actionLabel}</Text>
        </TouchableOpacity>
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
  },
  container: {
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: HomeColors.borderDark,
    backgroundColor: '#FFF9F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  title: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 14,
    color: HomeColors.textMain,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 10,
    color: HomeColors.textMuted,
  },
  actionBtn: {
    backgroundColor: HomeColors.saffronPrimary,
    borderWidth: 1.5,
    borderColor: HomeColors.borderDark,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  actionText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
});
export default PathSubItemCard;
