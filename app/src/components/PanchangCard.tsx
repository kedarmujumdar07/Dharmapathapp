import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Colors, Spacing } from '@/constants/theme';

export interface PanchangCardProps {
  title: string;
  subtitle?: string;
  badge?: string;
  categoryTag?: string;
  description?: string;
  onPress?: () => void;
  accentColor?: string;
}

export const PanchangCard: React.FC<PanchangCardProps> = ({
  title,
  subtitle,
  badge,
  categoryTag,
  description,
  onPress,
  accentColor = Colors.saffron,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.cardContainer,
        pressed && styles.pressed,
      ]}>
      <View style={[styles.accentLine, { backgroundColor: accentColor }]} />

      <View style={styles.contentBox}>
        <View style={styles.headerRow}>
          {categoryTag ? (
            <View style={[styles.tagBadge, { backgroundColor: `${accentColor}1A` }]}>
              <Text style={[styles.tagText, { color: accentColor }]}>{categoryTag}</Text>
            </View>
          ) : null}

          {badge ? (
            <View style={styles.dateBadge}>
              <Text style={styles.dateBadgeText}>{badge}</Text>
            </View>
          ) : null}
        </View>

        <Text style={styles.titleText}>{title}</Text>

        {subtitle ? <Text style={styles.subtitleText}>{subtitle}</Text> : null}

        {description ? (
          <Text style={styles.descriptionText} numberOfLines={2}>
            {description}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: 260,
    marginRight: Spacing.three,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  accentLine: {
    height: 4,
    width: '100%',
  },
  contentBox: {
    padding: Spacing.three,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dateBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  dateBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.navyDark,
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.saffronDark,
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
  },
});
