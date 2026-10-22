import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HeroLessonCard } from '../components/HeroLessonCard';
import { PanchangGlanceCard } from '../components/PanchangGlanceCard';
import { ContinueLessonCard } from '../components/ContinueLessonCard';
import { ReviseShlokaCard } from '../components/ReviseShlokaCard';
import { RecentLearningsChecklist } from '../components/RecentLearningsChecklist';
import { DharmaLeagueCard } from '../components/DharmaLeagueCard';
import { useUserProgress } from '../state/useUserProgress';
import { useDailyContent } from '../state/useDailyContent';
import { DT } from '../constants/homeTheme';

interface HomeScreenProps {
  navigation: {
    navigate: (screen: string, params?: object) => void;
  };
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { progress, completeLesson } = useUserProgress();
  const { featuredLesson, continueLesson, dailyShloka, recentLearnings } = useDailyContent(progress);

  const handleBeginFeatured = () => {
    if (featuredLesson) {
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
      completeLesson(`revise_${dailyShloka.id}_${new Date().toDateString()}`, 10);
    }
  };

  const handleViewFullCalendar = () => {
    navigation.navigate('panchang');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 8 }]}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Greeting Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Namaste 🙏</Text>
          <Text style={styles.greetingSub}>Continue your dharmic journey</Text>
        </View>
        <View style={styles.streakBadge}>
          <Text style={styles.streakEmoji}>🔥</Text>
          <Text style={styles.streakText}>{progress.dayStreak}d</Text>
        </View>
      </View>

      {/* ── Today's Lesson — Hero ── */}
      <HeroLessonCard lesson={featuredLesson} onBeginLesson={handleBeginFeatured} />

      {/* ── Panchang Quick Glance ── */}
      <PanchangGlanceCard onViewFullCalendar={handleViewFullCalendar} />

      {/* ── Continue Lesson (conditional) ── */}
      {continueLesson && (
        <ContinueLessonCard
          lesson={continueLesson}
          progressPercent={65}
          onResume={handleResumeContinue}
        />
      )}

      {/* ── Daily Shloka ── */}
      <SectionLabel title="DAILY SHLOKA" />
      <ReviseShlokaCard shloka={dailyShloka} onRevise={handleReviseShloka} />

      {/* ── Dharma League ── */}
      <SectionLabel title="YOUR LEAGUE" />
      <DharmaLeagueCard
        leagueInfo={{
          tier: 'Bronze',
          progressPercent: 62,
          rank: 14,
          totalScholars: 30,
          daysToPromotion: 5,
        }}
      />

      {/* ── Recent Learnings ── */}
      <SectionLabel title="RECENT LEARNINGS" />
      <RecentLearningsChecklist items={recentLearnings} />
    </ScrollView>
  );
};

// ─── Small section label helper ──────────────────────────────────────────────

const SectionLabel: React.FC<{ title: string }> = ({ title }) => (
  <View style={labelStyles.row}>
    <Text style={labelStyles.text}>{title}</Text>
    <View style={labelStyles.line} />
  </View>
);

const labelStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
    marginTop: 6,
  },
  text: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 11,
    letterSpacing: 1.5,
    color: DT.saffron,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: DT.divider,
  },
});

// ─── Screen styles ────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DT.bg,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 24,
    color: DT.textPrimary,
    lineHeight: 30,
  },
  greetingSub: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 13,
    color: DT.textSecondary,
    marginTop: 1,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DT.surfaceRaised,
    borderWidth: 1,
    borderColor: DT.saffron,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 4,
  },
  streakEmoji: {
    fontSize: 16,
  },
  streakText: {
    fontFamily: 'Baloo2_800ExtraBold',
    fontSize: 14,
    color: DT.saffron,
  },
});

export default HomeScreen;
