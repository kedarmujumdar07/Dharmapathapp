import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HardShadowCard } from '@/features/home/components/HardShadowCard';
import { HomeColors } from '@/features/home/constants/homeTheme';

interface WeeklyStreakTrackerProps {
  weeklyStreakDays: boolean[];
  todayIndex: number;
}

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const WeeklyStreakTracker: React.FC<WeeklyStreakTrackerProps> = ({
  weeklyStreakDays,
  todayIndex,
}) => {
  return (
    <HardShadowCard style={styles.outerWrapper} cardStyle={styles.card} borderRadius={18}>
      <Text style={styles.title}>WEEKLY SCRIPTURE STREAK</Text>
      <View style={styles.grid}>
        {WEEKDAYS.map((day, idx) => {
          const isActive = weeklyStreakDays[idx];
          const isToday = idx === todayIndex;

          return (
            <View
              key={idx}
              style={[
                styles.dayBox,
                isActive && styles.activeBox,
                isToday && !isActive && styles.todayPendingBox,
              ]}
            >
              <Text
                style={[
                  styles.dayText,
                  isActive && styles.activeText,
                  isToday && !isActive && styles.todayPendingText,
                ]}
              >
                {day}
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
    padding: 12,
  },
  title: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 14,
    color: HomeColors.textMain,
    marginBottom: 4,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    gap: 5,
  },
  dayBox: {
    flex: 1,
    height: 32,
    borderWidth: 1.5,
    borderColor: '#E0D5C5',
    borderRadius: 8,
    backgroundColor: '#FFF9F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBox: {
    backgroundColor: '#FFE082',
    borderColor: HomeColors.saffronDark,
  },
  todayPendingBox: {
    borderColor: HomeColors.crimsonAccent,
    borderStyle: 'dashed',
  },
  dayText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 11,
    color: HomeColors.textMuted,
  },
  activeText: {
    color: HomeColors.saffronDark,
  },
  todayPendingText: {
    color: HomeColors.crimsonAccent,
  },
});
export default WeeklyStreakTracker;
