import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { HomeColors } from '@/features/home/constants/homeTheme';
import { HardShadowCard } from '@/features/home/components/HardShadowCard';

interface SubTabSwitcherProps {
  activeTab: 'paths' | 'shlokas';
  onTabChange: (tab: 'paths' | 'shlokas') => void;
}

export const SubTabSwitcher: React.FC<SubTabSwitcherProps> = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.tabSwitcher}>
      {activeTab === 'paths' ? (
        <HardShadowCard style={styles.tabShadowWrapper} cardStyle={styles.activePill} borderRadius={10}>
          <Text style={styles.activeText}>PATHS</Text>
        </HardShadowCard>
      ) : (
        <TouchableOpacity style={styles.inactivePill} onPress={() => onTabChange('paths')}>
          <Text style={styles.inactiveText}>PATHS</Text>
        </TouchableOpacity>
      )}

      {activeTab === 'shlokas' ? (
        <HardShadowCard style={styles.tabShadowWrapper} cardStyle={styles.activePill} borderRadius={10}>
          <Text style={styles.activeText}>SHLOKAS & MANTRAS</Text>
        </HardShadowCard>
      ) : (
        <TouchableOpacity style={styles.inactivePill} onPress={() => onTabChange('shlokas')}>
          <Text style={styles.inactiveText}>SHLOKAS & MANTRAS</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#EFE7DA',
    padding: 4,
    borderRadius: 14,
    borderWidth: 2.5,
    borderColor: HomeColors.borderDark,
    marginBottom: 14,
    gap: 4,
  },
  tabShadowWrapper: {
    flex: 1,
    marginHorizontal: 0,
  },
  activePill: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: HomeColors.borderDark,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 11,
    color: HomeColors.crimsonDark,
  },
  inactivePill: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inactiveText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 11,
    color: HomeColors.textMuted,
  },
});
