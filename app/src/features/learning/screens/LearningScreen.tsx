import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SubTabSwitcher } from '../components/SubTabSwitcher';
import { MainPathCard } from '../components/MainPathCard';
import { ScriptureCard } from '../components/ScriptureCard';
import { PATHS_DATA } from '@/features/home/data/pathsData';
import { SCRIPTURES_DATA } from '@/features/home/data/scripturesData';
import { HomeColors } from '@/features/home/constants/homeTheme';

export const LearningScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'paths' | 'shlokas'>('paths');
  const router = useRouter();

  const handlePathPress = (pathId: string) => {
    // Real navigation routing using Expo Router push
    router.push({
      pathname: '/learning/path-detail',
      params: { pathId },
    });
  };

  const handleScripturePress = (scriptureId: string) => {
    console.log(`STUB: Practicing scripture: ${scriptureId}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SubTabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'paths' ? (
        <View style={styles.list}>
          {PATHS_DATA.map((path) => (
            <MainPathCard
              key={path.id}
              path={path}
              onPress={() => handlePathPress(path.id)}
            />
          ))}
        </View>
      ) : (
        <View style={styles.list}>
          {SCRIPTURES_DATA.map((scripture) => (
            <ScriptureCard
              key={scripture.id}
              item={scripture}
              onPress={() => handleScripturePress(scripture.id)}
            />
          ))}
        </View>
      )}
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
  list: {
    gap: 4,
  },
});
export default LearningScreen;
