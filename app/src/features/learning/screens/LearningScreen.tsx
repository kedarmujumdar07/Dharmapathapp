import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { SubTabSwitcher, type LearningTabType } from '../components/SubTabSwitcher';
import { MainPathCard } from '../components/MainPathCard';
import { ScriptureCard } from '../components/ScriptureCard';
import { PracticeCenter } from '../components/PracticeCenter';
import { ShlokaRecitationModal } from '@/features/home/components/ShlokaRecitationModal';
import { useLearnerState } from '../state/useLearnerState';
import { findWeakConcepts } from '../engine/mastery';
import { useUserProgress } from '@/features/home/state/useUserProgress';
import { PATHS_DATA } from '@/features/home/data/pathsData';
import { SCRIPTURES_DATA } from '@/features/home/data/scripturesData';
import { getAllScriptures } from '@/features/scriptures/services/scripture-service';
import type { ShlokaItem } from '@/features/scriptures/types/scripture.types';
import { HomeColors } from '@/features/home/constants/homeTheme';
import { routes } from '@/shared/navigation/routes';

export const LearningScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LearningTabType>('paths');
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { learnerState } = useLearnerState();
  const { progress, completeLesson } = useUserProgress();

  const weakConcepts = findWeakConcepts(learnerState.mastery);
  const [selectedScripture, setSelectedScripture] = useState<ShlokaItem | null>(null);

  const handlePathPress = (pathId: string) => {
    router.push(routes.pathDetail(pathId));
  };

  const handleScripturePress = (scriptureId: string) => {
    const all = getAllScriptures();
    const match = all.find((item) =>
      item.id.toLowerCase().includes(scriptureId.toLowerCase()) ||
      scriptureId.toLowerCase().includes(item.id.toLowerCase())
    ) || all[0];
    setSelectedScripture(match);
  };

  const handleRecitationComplete = (earnedXp: number) => {
    if (selectedScripture) {
      completeLesson(`recite_${selectedScripture.id}_${new Date().toDateString()}`, earnedXp);
    }
  };

  const handleStartReview = () => {
    router.push(routes.lessonRunner('lesson_ramayana_ayodhya_12'));
  };

  const handleQuickDrill = () => {
    router.push(routes.lessonRunner('lesson_krishna_leela_kalia'));
  };

  const handleWeakConceptsDrill = () => {
    router.push(routes.lessonRunner('lesson_gita_sankhya_yoga'));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.content, { paddingTop: insets.top + 14 }]}>
      <SubTabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'paths' && (
        <View style={styles.list}>
          {PATHS_DATA.map((path) => (
            <MainPathCard
              key={path.id}
              path={path}
              onPress={() => handlePathPress(path.id)}
            />
          ))}
        </View>
      )}

      {activeTab === 'practice' && (
        <PracticeCenter
          reviews={learnerState.reviews}
          streakDays={progress.dayStreak}
          weakConceptsCount={weakConcepts.length}
          onStartReview={handleStartReview}
          onQuickDrill={handleQuickDrill}
          onWeakConceptsDrill={handleWeakConceptsDrill}
        />
      )}

      {activeTab === 'shlokas' && (
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

      {/* Interactive Scripture Recitation Modal */}
      <ShlokaRecitationModal
        visible={!!selectedScripture}
        shloka={selectedScripture}
        onClose={() => setSelectedScripture(null)}
        onComplete={handleRecitationComplete}
      />
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
