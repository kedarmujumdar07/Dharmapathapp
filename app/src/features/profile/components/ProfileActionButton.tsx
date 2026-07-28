import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { HardShadowCard } from '@/features/home/components/HardShadowCard';
import { HomeColors } from '@/features/home/constants/homeTheme';

interface ProfileActionButtonProps {
  label: string;
  emoji: string;
  variant?: 'default' | 'danger';
  onPress: () => void;
  accessibilityLabel: string;
}

export const ProfileActionButton: React.FC<ProfileActionButtonProps> = ({
  label,
  emoji,
  variant = 'default',
  onPress,
  accessibilityLabel,
}) => {
  const isDanger = variant === 'danger';

  return (
    <HardShadowCard style={styles.outerWrapper} cardStyle={isDanger ? styles.dangerCard : styles.card} borderRadius={14}>
      <TouchableOpacity
        style={styles.container}
        onPress={onPress}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
      >
        <Text style={[styles.labelText, isDanger && styles.dangerText]}>
          {emoji}  {label}
        </Text>
        <Text style={[styles.arrow, isDanger && styles.dangerText]}>➔</Text>
      </TouchableOpacity>
    </HardShadowCard>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    marginBottom: 10,
    marginHorizontal: 2,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2.5,
    borderColor: HomeColors.borderDark,
  },
  dangerCard: {
    backgroundColor: '#FFEBEE',
    borderWidth: 2.5,
    borderColor: HomeColors.borderDark,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  labelText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 12,
    color: HomeColors.textMain,
    letterSpacing: 0.8,
  },
  dangerText: {
    color: HomeColors.crimsonAccent,
  },
  arrow: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 12,
    color: HomeColors.textMain,
  },
});
export default ProfileActionButton;
