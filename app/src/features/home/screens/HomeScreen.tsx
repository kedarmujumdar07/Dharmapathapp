import React, { useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { HeroLessonCard } from '../components/HeroLessonCard';
import { PanchangGlanceCard } from '../components/PanchangGlanceCard';
import { ContinueLessonCard } from '../components/ContinueLessonCard';
import { ReviseShlokaCard } from '../components/ReviseShlokaCard';
import { RecentLearningsChecklist } from '../components/RecentLearningsChecklist';
import { useUserProgress } from '../state/useUserProgress';
import { useDailyContent } from '../state/useDailyContent';
import { HomeColors } from '../constants/homeTheme';

interface HomeScreenProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { progress, completeLesson } = useUserProgress();
  const { featuredLesson, continueLesson, dailyShloka, recentLearnings } = useDailyContent(progress);

  const handleBeginFeatured = () => {
    if (featuredLesson) {
      // Simulate completing a lesson for real state verification
      // Tapping this completes it, awards points and logs in console (STUB)
      console.log(`STUB: Starting lesson: ${featuredLesson.title}`);
      completeLesson(featuredLesson.id, featuredLesson.pointsAwarded);
    }
  };

  const handleResumeContinue = () => {
    if (continueLesson) {
      console.log(`STUB: Resuming lesson: ${continueLesson.title}`);
      completeLesson(continueLesson.id, continueLesson.pointsAwarded);
    }
  };

  const handleReviseShloka = () => {
    if (dailyShloka) {
      console.log(`STUB: Revising shloka: BG ${dailyShloka.chapter}.${dailyShloka.verse}`);
      // Award minor revision reward
      completeLesson(`revise_${dailyShloka.id}_${new Date().toDateString()}`, 10);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionLine} />
        <Text style={styles.sectionTitle}>TODAY'S FEATURED LESSON</Text>
        <View style={styles.sectionLine} />
      </View>
      <HeroLessonCard lesson={featuredLesson} onBeginLesson={handleBeginFeatured} />

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionLine} />
        <Text style={styles.sectionTitle}>TODAY'S PANCHANG & MUHURAT</Text>
        <View style={styles.sectionLine} />
      </View>
      <PanchangGlanceCard />

      {/* Section Header */}
      {continueLesson && (
        <>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionLine} />
            <Text style={styles.sectionTitle}>CONTINUE LESSON</Text>
            <View style={styles.sectionLine} />
          </View>
          <ContinueLessonCard
            lesson={continueLesson}
            progressPercent={65} // Placeholder progress state
            onResume={handleResumeContinue}
          />
        </>
      )}

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionLine} />
        <Text style={styles.sectionTitle}>REVISE SHLOKA</Text>
        <View style={styles.sectionLine} />
      </View>
      <ReviseShlokaCard shloka={dailyShloka} onRevise={handleReviseShloka} />

      {/* Section Header */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionLine} />
        <Text style={styles.sectionTitle}>RECENT LEARNINGS CHECKLIST</Text>
        <View style={styles.sectionLine} />
      </View>
      <RecentLearningsChecklist items={recentLearnings} />
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
});
export default HomeScreen;
