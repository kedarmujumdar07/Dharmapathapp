import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PathSubItemCard } from '../components/PathSubItemCard';
import { PATHS_DATA } from '@/features/home/data/pathsData';
import { HardShadowCard } from '@/features/home/components/HardShadowCard';
import { HomeColors } from '@/features/home/constants/homeTheme';

export const PathDetailScreen: React.FC = () => {
  const { pathId } = useLocalSearchParams<{ pathId: string }>();
  const router = useRouter();

  const path = PATHS_DATA.find((p) => p.id === pathId);

  if (!path) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Path not found</Text>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>GO BACK</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleSubItemPress = (itemId: string) => {
    console.log(`STUB: Exploring sub-item: ${itemId}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>◀  BACK TO ALL PATHS</Text>
      </TouchableOpacity>

      {/* Path header card */}
      <HardShadowCard style={styles.headerWrapper} cardStyle={styles.headerCard} borderRadius={18}>
        <Text style={styles.headerTitle}>{path.title}</Text>
        <Text style={styles.headerDesc}>{path.description}</Text>
      </HardShadowCard>

      {/* List of sub items */}
      <View style={styles.list}>
        {path.subItems.map((item) => (
          <PathSubItemCard
            key={item.id}
            item={item}
            onPress={() => handleSubItemPress(item.id)}
          />
        ))}
      </View>
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
    paddingTop: 14,
    paddingBottom: 24,
  },
  backBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: HomeColors.borderDark,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },
  backBtnText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 11,
    color: HomeColors.crimsonDark,
  },
  headerWrapper: {
    marginBottom: 14,
    marginHorizontal: 2,
  },
  headerCard: {
    backgroundColor: '#FFF9F2',
    borderWidth: 2.5,
    borderColor: HomeColors.borderDark,
    padding: 14,
  },
  headerTitle: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 18,
    color: HomeColors.crimsonDark,
    marginBottom: 2,
  },
  headerDesc: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 11,
    color: HomeColors.textMuted,
  },
  list: {
    gap: 4,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: HomeColors.bgSandalwood,
  },
  errorText: {
    fontFamily: 'Baloo2_700Bold',
    fontSize: 16,
    color: HomeColors.textMain,
    marginBottom: 14,
  },
});
export default PathDetailScreen;
