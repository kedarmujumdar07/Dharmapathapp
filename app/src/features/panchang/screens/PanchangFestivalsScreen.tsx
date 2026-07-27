/**
 * PanchangFestivalsScreen — Main screen composing all panchang-festivals components.
 *
 * Implements:
 * - Animated tab switching (fade transition between Festivals / Panchang views)
 * - Festival carousel with bottom sheet on card tap
 * - Panchang breakdown with 12h/24h toggle
 * - Location picker via ActionSheet/modal
 * - Font loading with useFonts
 */

import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Modal, Pressable, Text, ActionSheetIOS, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Caveat_700Bold } from '@expo-google-fonts/caveat';
import {
  Baloo2_500Medium,
  Baloo2_600SemiBold,
  Baloo2_700Bold,
  Baloo2_800ExtraBold,
} from '@expo-google-fonts/baloo-2';

import { PanchangColors } from '@/constants/panchang-theme';
import { PanchangStrings } from '@/constants/panchang-strings';
import { ScreenHeader } from '@/components/panchang-festivals/ScreenHeader';
import { FestivalCarousel } from '@/components/panchang-festivals/FestivalCarousel';
import { FeaturedTimingBanner } from '@/components/panchang-festivals/FeaturedTimingBanner';
import { PanchangBreakdownPanel } from '@/components/panchang-festivals/PanchangBreakdownPanel';
import { FestivalSignificanceSheet } from '@/components/panchang-festivals/FestivalSignificanceSheet';
import { useFestivalModal } from '@/hooks/useFestivalModal';
import { useTimeFormat } from '@/hooks/useTimeFormat';
import { getDailyPanchang } from '@/services/panchang/panchang-service';
import { festivalCarouselData } from '@/data/festivalData';
import type { PanchangTab, FestivalCardData, LocationOption } from '@/types/festival-screen.types';
import type { LocationInput } from '@/types/panchang';

const LOCATIONS = PanchangStrings.locationOptions;

export const PanchangFestivalsScreen: React.FC = () => {
  // --- State ---
  const [activeTab, setActiveTab] = useState<PanchangTab>('festival');
  const [selectedLocation, setSelectedLocation] = useState<LocationOption>(LOCATIONS[0]);
  const [locationPickerVisible, setLocationPickerVisible] = useState(false);

  // --- Hooks ---
  const { isOpen, selectedFestival, openSheet, closeSheet } = useFestivalModal();
  const { format, set12h, set24h, formatTime } = useTimeFormat('12h');

  // --- Panchang data (recomputed when location changes) ---
  const locationInput: LocationInput = useMemo(
    () => ({
      latitude: selectedLocation.latitude,
      longitude: selectedLocation.longitude,
      timezoneOffsetMinutes: 330, // IST
      name: selectedLocation.name,
    }),
    [selectedLocation]
  );

  const panchangData = useMemo(
    () => getDailyPanchang(new Date(), locationInput),
    [locationInput]
  );

  // --- Handlers ---
  const handleBackPress = useCallback(() => {
    // In a real app: navigation.goBack()
    // For now, this is a no-op placeholder — we never use alert().
  }, []);

  const handleLocationPress = useCallback(() => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: [...LOCATIONS.map((l) => l.label), 'Cancel'],
          cancelButtonIndex: LOCATIONS.length,
          title: 'Select Location',
        },
        (buttonIndex) => {
          if (buttonIndex < LOCATIONS.length) {
            setSelectedLocation(LOCATIONS[buttonIndex]);
          }
        }
      );
    } else if (Platform.OS === 'web') {
      const optionLabels = LOCATIONS.map((l) => l.label);
      const input = window.prompt(`Select Location:\n${optionLabels.map((lbl, idx) => `${idx + 1}. ${lbl}`).join('\n')}`);
      if (input !== null) {
        const idx = parseInt(input, 10) - 1;
        if (idx >= 0 && idx < LOCATIONS.length) {
          setSelectedLocation(LOCATIONS[idx]);
        }
      }
    } else {
      // Android: show modal picker
      setLocationPickerVisible(true);
    }
  }, []);

  const handleLocationSelect = useCallback((location: LocationOption) => {
    setSelectedLocation(location);
    setLocationPickerVisible(false);
  }, []);

  const handleCardPress = useCallback(
    (festival: FestivalCardData) => {
      openSheet(festival);
    },
    [openSheet]
  );

  const handleLearnPress = useCallback((_festival: FestivalCardData) => {
    // In production: navigate to festival lesson screen
    // No alert() — intentional no-op until lesson screen is built
  }, []);

  const handleTabChange = useCallback((tab: PanchangTab) => {
    setActiveTab(tab);
  }, []);

  return (
    <GestureHandlerRootView style={styles.rootGesture}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <StatusBar style="light" />

        {/* Header */}
        <ScreenHeader
          currentLocation={selectedLocation.label}
          activeTab={activeTab}
          onBackPress={handleBackPress}
          onLocationPress={handleLocationPress}
          onTabChange={handleTabChange}
        />

        {/* Content body with animated tab transition */}
        <View style={styles.body}>
          {activeTab === 'festival' ? (
            <Animated.ScrollView
              key="festival-tab"
              entering={FadeIn.duration(250)}
              exiting={FadeOut.duration(200)}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <FestivalCarousel
                festivals={festivalCarouselData}
                onCardPress={handleCardPress}
              />
              <FeaturedTimingBanner />
            </Animated.ScrollView>
          ) : (
            <Animated.ScrollView
              key="panchang-tab"
              entering={FadeIn.duration(250)}
              exiting={FadeOut.duration(200)}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <PanchangBreakdownPanel
                panchang={panchangData}
                timeFormat={format}
                formatTime={formatTime}
                onSelect12h={set12h}
                onSelect24h={set24h}
              />
            </Animated.ScrollView>
          )}
        </View>

        {/* Bottom sheet */}
        <FestivalSignificanceSheet
          isOpen={isOpen}
          festival={selectedFestival}
          onClose={closeSheet}
          onLearnPress={handleLearnPress}
        />

        {/* Android location picker modal */}
        {Platform.OS === 'android' && (
          <Modal
            visible={locationPickerVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setLocationPickerVisible(false)}
          >
            <Pressable
              style={styles.modalOverlay}
              onPress={() => setLocationPickerVisible(false)}
              accessibilityLabel="Close location picker"
              accessibilityRole="button"
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Location</Text>
                {LOCATIONS.map((loc) => (
                  <Pressable
                    key={loc.name}
                    style={[
                      styles.modalOption,
                      selectedLocation.name === loc.name ? styles.modalOptionActive : null,
                    ]}
                    onPress={() => handleLocationSelect(loc)}
                    accessibilityLabel={`Select ${loc.label}`}
                    accessibilityRole="button"
                  >
                    <Text
                      style={[
                        styles.modalOptionText,
                        selectedLocation.name === loc.name ? styles.modalOptionTextActive : null,
                      ]}
                    >
                      {loc.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </Pressable>
          </Modal>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  rootGesture: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: PanchangColors.maroonGradientTop,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: PanchangColors.appAmber,
  },
  body: {
    flex: 1,
    backgroundColor: PanchangColors.appAmber,
  },
  scrollContent: {
    padding: 12,
    paddingBottom: 30,
    gap: 16,
  },
  // Android location picker modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: PanchangColors.appAmberLight,
    borderRadius: 16,
    padding: 20,
    width: 280,
    gap: 8,
    borderWidth: 2,
    borderColor: PanchangColors.cardBorder,
  },
  modalTitle: {
    fontFamily: 'Baloo2_700Bold',
    fontSize: 18,
    color: PanchangColors.maroonDark,
    textAlign: 'center',
    marginBottom: 8,
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: PanchangColors.white,
    borderWidth: 1,
    borderColor: PanchangColors.cardBorder,
  },
  modalOptionActive: {
    backgroundColor: PanchangColors.maroonDark,
    borderColor: PanchangColors.goldAccent,
  },
  modalOptionText: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 14,
    color: PanchangColors.textDark,
    textAlign: 'center',
  },
  modalOptionTextActive: {
    color: PanchangColors.goldAccent,
    fontFamily: 'Nunito_700Bold',
  },
});
