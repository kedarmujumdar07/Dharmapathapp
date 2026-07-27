/**
 * FestivalSignificanceSheet — Bottom sheet modal with festival details.
 * Uses @gorhom/bottom-sheet for a proper gesture-driven sheet.
 * Matches .modal-overlay / .sheet-modal CSS from the mockup.
 */

import React, { useCallback, useMemo, useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import {
  PanchangColors,
  PanchangGradients,
  PanchangSpacing,
  PanchangFonts,
  PanchangShadows,
} from '@/constants/panchang-theme';
import { PanchangStrings } from '@/constants/panchang-strings';
import type { FestivalCardData } from '@/types/festival-screen.types';

interface FestivalSignificanceSheetProps {
  isOpen: boolean;
  festival: FestivalCardData | null;
  onClose: () => void;
  onLearnPress: (festival: FestivalCardData) => void;
}

export const FestivalSignificanceSheet: React.FC<FestivalSignificanceSheetProps> = ({
  isOpen,
  festival,
  onClose,
  onLearnPress,
}) => {
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['65%', '80%'], []);

  useEffect(() => {
    if (isOpen) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [isOpen]);

  const handleSheetChange = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose();
      }
    },
    [onClose]
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.7}
        pressBehavior="close"
      />
    ),
    []
  );

  if (!festival) return null;

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChange}
      enablePanDownToClose
      backgroundStyle={styles.sheetBackground}
      handleIndicatorStyle={styles.grabber}
      backdropComponent={renderBackdrop}
      style={styles.sheetShadow}
    >
      <BottomSheetView style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title}>{festival.shortName}</Text>
            <Text style={styles.subtitle}>{festival.sheetSubtitle}</Text>
          </View>
          <Pressable
            style={styles.closeBtn}
            onPress={onClose}
            accessibilityLabel="Close festival details"
            accessibilityRole="button"
          >
            <Text style={styles.closeBtnText}>✕</Text>
          </Pressable>
        </View>

        {/* Significance section */}
        <View style={styles.significanceSection}>
          <Text style={styles.significanceTitle}>
            {PanchangStrings.sheetSignificanceTitle}
          </Text>
          <View style={styles.significanceBody}>
            <Text style={styles.significanceText}>{festival.significance}</Text>
          </View>
        </View>

        {/* Lesson action button */}
        {festival.hasLesson ? (
          <Pressable
            onPress={() => onLearnPress(festival)}
            accessibilityLabel={`${PanchangStrings.sheetLearnButton} - ${festival.shortName}`}
            accessibilityRole="button"
          >
            <LinearGradient
              colors={[...PanchangGradients.lessonAction]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.lessonBtn}
            >
              <Text style={styles.lessonBtnText}>
                {PanchangStrings.sheetLearnButton}
              </Text>
            </LinearGradient>
          </Pressable>
        ) : (
          <View style={[styles.lessonBtn, styles.lessonBtnDisabled]}>
            <Text style={styles.lessonBtnDisabledText}>
              {PanchangStrings.lessonComingSoon}
            </Text>
          </View>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  sheetBackground: {
    backgroundColor: PanchangColors.appAmberLight,
    borderTopLeftRadius: PanchangSpacing.sheetBorderRadius,
    borderTopRightRadius: PanchangSpacing.sheetBorderRadius,
    borderTopWidth: 3,
    borderTopColor: PanchangColors.goldAccent,
  },
  sheetShadow: {
    shadowColor: PanchangColors.black,
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 20,
  },
  grabber: {
    backgroundColor: PanchangColors.sheetGrabber,
    width: PanchangSpacing.grabberWidth,
    height: PanchangSpacing.grabberHeight,
    borderRadius: PanchangSpacing.grabberHeight,
  },
  content: {
    paddingHorizontal: PanchangSpacing.sheetPaddingH,
    paddingBottom: PanchangSpacing.sheetPaddingBottom,
    gap: PanchangSpacing.sheetGap,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: PanchangColors.sheetDivider,
    paddingBottom: 8,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontFamily: PanchangFonts.baloo700,
    fontSize: 20,
    color: PanchangColors.maroonDark,
    lineHeight: 22,
  },
  subtitle: {
    fontFamily: PanchangFonts.nunito700,
    fontSize: 11,
    color: PanchangColors.maroonMid,
  },
  closeBtn: {
    backgroundColor: PanchangColors.closeBtnBg,
    width: 26,
    height: 26,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: {
    fontFamily: PanchangFonts.nunito700,
    fontSize: 14,
    color: PanchangColors.maroonDark,
  },
  significanceSection: {
    gap: 6,
  },
  significanceTitle: {
    fontFamily: PanchangFonts.nunito800,
    fontSize: 12,
    color: PanchangColors.maroonDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  significanceBody: {
    backgroundColor: PanchangColors.significanceBg,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: PanchangColors.cardBorder,
  },
  significanceText: {
    fontFamily: PanchangFonts.nunito400,
    fontSize: 12,
    lineHeight: 18, // 12 * 1.5
    color: PanchangColors.textBrown,
  },
  lessonBtn: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
    borderWidth: 1,
    borderColor: PanchangColors.goldAccent,
    ...PanchangShadows.lessonActionShadow,
  },
  lessonBtnText: {
    fontFamily: PanchangFonts.baloo800,
    fontSize: 15,
    color: PanchangColors.goldAccent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  lessonBtnDisabled: {
    backgroundColor: PanchangColors.lessonComingSoonBg,
    borderColor: PanchangColors.cardBorder,
    opacity: 0.7,
  },
  lessonBtnDisabledText: {
    fontFamily: PanchangFonts.baloo800,
    fontSize: 15,
    color: PanchangColors.textDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
