import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HardShadowCard } from './HardShadowCard';
import { HomeColors } from '../constants/homeTheme';

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

interface RecentLearningsChecklistProps {
  items: ChecklistItem[];
}

export const RecentLearningsChecklist: React.FC<RecentLearningsChecklistProps> = ({ items }) => {
  return (
    <HardShadowCard style={styles.outerWrapper} cardStyle={styles.card}>
      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No completed lessons yet.</Text>
          <Text style={styles.emptySubText}>Begin a lesson to build your checklist!</Text>
        </View>
      ) : (
        <View style={styles.container}>
          {items.map((item, index) => (
            <View
              key={item.id}
              style={[
                styles.itemRow,
                index === items.length - 1 && styles.lastRow,
              ]}
            >
              <View style={styles.checkBox}>
                <Text style={styles.checkIcon}>✓</Text>
              </View>
              <Text style={styles.itemText} numberOfLines={1}>
                {item.title}
              </Text>
            </View>
          ))}
        </View>
      )}
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
    overflow: 'hidden',
  },
  container: {
    padding: 14,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0E8DC',
    gap: 10,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: HomeColors.emeraldGreen,
    backgroundColor: HomeColors.emeraldLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    fontSize: 12,
    fontFamily: 'Baloo2_800ExtraBold',
    color: HomeColors.emeraldGreen,
    lineHeight: 14,
  },
  itemText: {
    flex: 1,
    fontSize: 11,
    fontFamily: 'Nunito_700Bold',
    color: HomeColors.textMain,
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Baloo2_700Bold',
    fontSize: 13,
    color: HomeColors.textMain,
    marginBottom: 2,
  },
  emptySubText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 11,
    color: HomeColors.textMuted,
  },
});
