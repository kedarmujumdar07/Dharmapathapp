import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, View, Modal, Text, TouchableOpacity } from 'react-native';
import { ProfileStatsCard } from '../components/ProfileStatsCard';
import { DharmaLeagueCard } from '@/features/home/components/DharmaLeagueCard';
import { BadgesGrid } from '../components/BadgesGrid';
import { WeeklyStreakTracker } from '../components/WeeklyStreakTracker';
import { ProfileActionButton } from '../components/ProfileActionButton';
import { useUserProgress } from '@/features/home/state/useUserProgress';
import { useDailyContent } from '@/features/home/state/useDailyContent';
import { HomeColors } from '@/features/home/constants/homeTheme';

export const ProfileScreen: React.FC = () => {
  const { progress } = useUserProgress();
  const { leagueInfo } = useDailyContent(progress);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  const todayIndex = useMemo(() => {
    // Mon=0 … Sun=6 index
    return (new Date().getDay() + 6) % 7;
  }, []);

  const handleSettingsPress = () => {
    console.log('STUB: Settings screen not yet built');
  };

  const handleLogoutPress = () => {
    setLogoutModalVisible(true);
  };

  const confirmLogout = () => {
    setLogoutModalVisible(false);
    console.log('STUB: Logging user out');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <ProfileStatsCard punyaPoints={progress.punyaPoints} dayStreak={progress.dayStreak} />

      {/* DHARMA LEAGUE SECTION */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionLine} />
        <Text style={styles.sectionTitle}>DHARMA LEAGUE</Text>
        <View style={styles.sectionLine} />
      </View>
      <DharmaLeagueCard leagueInfo={leagueInfo} />

      {/* BADGES & TROPHIES */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionLine} />
        <Text style={styles.sectionTitle}>BADGES & TROPHIES</Text>
        <View style={styles.sectionLine} />
      </View>
      <BadgesGrid unlockedBadgeIds={progress.badges} />

      {/* WEEKLY STREAK */}
      <WeeklyStreakTracker weeklyStreakDays={progress.weeklyStreakDays} todayIndex={todayIndex} />

      {/* ACCOUNT ACTIONS */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionLine} />
        <Text style={styles.sectionTitle}>ACCOUNT ACTIONS</Text>
        <View style={styles.sectionLine} />
      </View>

      <ProfileActionButton
        emoji="⚙️"
        label="SETTINGS"
        onPress={handleSettingsPress}
        accessibilityLabel="Open settings screen"
      />
      <ProfileActionButton
        emoji="🚪"
        label="LOG OUT"
        variant="danger"
        onPress={handleLogoutPress}
        accessibilityLabel="Log out from account"
      />

      {/* Custom Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Confirm Log Out</Text>
            <Text style={styles.modalText}>Are you sure you want to log out from DharmaPath?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setLogoutModalVisible(false)}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn} onPress={confirmLogout}>
                <Text style={styles.confirmText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HomeColors.bgSandalwood,
  },
  content: {
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 14,
  },
  sectionLine: {
    flex: 1,
    height: 2,
    backgroundColor: HomeColors.sectionLine,
  },
  sectionTitle: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 12,
    letterSpacing: 1.2,
    color: HomeColors.saffronDark,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2.5,
    borderColor: HomeColors.borderDark,
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
  modalTitle: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 18,
    color: HomeColors.textMain,
    marginBottom: 8,
  },
  modalText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 14,
    color: HomeColors.textMuted,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: HomeColors.borderDark,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  cancelText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 13,
    color: HomeColors.textMain,
  },
  confirmBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: HomeColors.borderDark,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: HomeColors.crimsonAccent,
  },
  confirmText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 13,
    color: '#FFFFFF',
  },
});
export default ProfileScreen;
