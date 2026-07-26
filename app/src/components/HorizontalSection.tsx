import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';

export interface HorizontalSectionProps {
  title: string;
  subtitle?: string;
  onViewAll?: () => void;
  children: React.ReactNode;
}

export const HorizontalSection: React.FC<HorizontalSectionProps> = ({
  title,
  subtitle,
  onViewAll,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.titleBox}>
          <Text style={styles.titleText}>{title}</Text>
          {subtitle ? <Text style={styles.subtitleText}>{subtitle}</Text> : null}
        </View>

        {onViewAll ? (
          <Pressable onPress={onViewAll} hitSlop={10}>
            <Text style={styles.viewAllText}>View All →</Text>
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.four,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.three,
    marginBottom: Spacing.two,
  },
  titleBox: {
    flex: 1,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.navyDark,
    letterSpacing: -0.3,
  },
  subtitleText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.saffron,
  },
  scrollContent: {
    paddingLeft: Spacing.three,
    paddingRight: Spacing.one,
  },
});
