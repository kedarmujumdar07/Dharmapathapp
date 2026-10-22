import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DT, SHADOW } from '../constants/homeTheme';

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
    <View style={[SHADOW.sm, styles.wrapper]}>
      <View style={styles.card}>
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No completed lessons yet.</Text>
            <Text style={styles.emptySubText}>Begin a lesson to build your checklist!</Text>
          </View>
        ) : (
          <View>
            {items.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.itemRow,
                  index === items.length - 1 && styles.lastRow,
                ]}
              >
                <View style={[styles.checkBox, item.completed && styles.checkBoxDone]}>
                  <Text style={styles.checkIcon}>{item.completed ? '✓' : ' '}</Text>
                </View>
                <Text style={styles.itemText} numberOfLines={1}>
                  {item.title}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    marginBottom: 16,
  },
  card: {
    borderRadius: 20,
    backgroundColor: DT.surface,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: DT.border,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: DT.divider,
    gap: 12,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  checkBox: {
    width: 22,
    height: 22,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: DT.border,
    backgroundColor: DT.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxDone: {
    backgroundColor: DT.emeraldBg,
    borderColor: DT.emerald,
  },
  checkIcon: {
    fontSize: 12,
    fontFamily: 'Baloo2_800ExtraBold',
    color: DT.emerald,
    lineHeight: 14,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'SpaceGrotesk_400Regular',
    color: DT.textPrimary,
  },
  emptyState: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Baloo2_700Bold',
    fontSize: 14,
    color: DT.textPrimary,
    marginBottom: 4,
  },
  emptySubText: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 13,
    color: DT.textMuted,
    textAlign: 'center',
  },
});
