import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing } from '@/constants/theme';
import { getDailyPanchang, DEFAULT_LOCATION } from '@/services/panchang/panchang-service';
import { getAllFestivals } from '@/services/festivals/festival-rule-engine';
import { getAllScriptures } from '@/services/scriptures/scripture-service';
import { HorizontalSection } from '@/components/HorizontalSection';
import { PanchangCard } from '@/components/PanchangCard';

export default function HomeScreen() {
  const router = useRouter();
  const today = useMemo(() => new Date(), []);

  const panchang = useMemo(() => {
    return getDailyPanchang(today, DEFAULT_LOCATION);
  }, [today]);

  const festivals = useMemo(() => {
    return getAllFestivals().slice(0, 6);
  }, []);

  const scriptures = useMemo(() => {
    return getAllScriptures();
  }, []);

  const dailyShloka = scriptures.find((s) => s.id === 'gita_2_47') || scriptures[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8F2" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* App Title & Greeting Header */}
        <View style={styles.headerBox}>
          <Text style={styles.appTitle}> धर्मपथ • DharmaPath</Text>
          <Text style={styles.greetingText}>Daily Hindu Calendar & Spiritual Companion</Text>
        </View>

        {/* Daily Panchang Hero Widget */}
        <Pressable onPress={() => router.push('/panchang' as any)} style={styles.heroWidget}>
          <View style={styles.heroHeaderRow}>
            <Text style={styles.heroBadge}>TODAY'S PANCHANG</Text>
            <Text style={styles.heroLocation}>📍 {panchang.location.name}</Text>
          </View>

          <View style={styles.heroMainRow}>
            <View style={styles.heroMainLeft}>
              <Text style={styles.heroTithi}>{panchang.tithi.name} Tithi</Text>
              <Text style={styles.heroSubText}>{panchang.tithi.paksha} Paksha • {panchang.tithi.endTimestamp}</Text>

              <View style={styles.heroPillRow}>
                <View style={styles.heroPill}>
                  <Text style={styles.heroPillText}>✨ {panchang.nakshatra.name}</Text>
                </View>
                <View style={styles.heroPill}>
                  <Text style={styles.heroPillText}>🧘 {panchang.yoga.name}</Text>
                </View>
              </View>
            </View>

            <View style={styles.heroMainRight}>
              <Text style={styles.heroSunIcon}>🌅</Text>
              <Text style={styles.heroSunTime}>{panchang.solarTimes.sunrise}</Text>
              <Text style={styles.heroSunLabel}>Sunrise</Text>
            </View>
          </View>

          <View style={styles.heroFooterRow}>
            <Text style={styles.heroFooterText}>
              Abhijit: {panchang.muhurat.abhijit.start} • Rahu Kalam: {panchang.muhurat.rahuKalam.start}
            </Text>
            <Text style={styles.heroViewMore}>Details →</Text>
          </View>
        </Pressable>

        {/* Festival Calendar Carousel */}
        <HorizontalSection
          title="🎉 Major Festivals & Monthly Vrats"
          subtitle="Rule-based calendar & upcoming auspicious occasions"
          onViewAll={() => router.push('/panchang' as any)}>
          {festivals.map((fest) => (
            <PanchangCard
              key={fest.id}
              title={fest.name}
              subtitle={fest.iastName}
              categoryTag={fest.category.replace('_', ' ')}
              badge={fest.fixedDate2026 || 'Lunar Rule'}
              description={fest.description}
              onPress={() => router.push('/panchang' as any)}
            />
          ))}
        </HorizontalSection>

        {/* Daily Shloka Widget */}
        <View style={styles.shlokaWidget}>
          <View style={styles.shlokaHeaderRow}>
            <Text style={styles.shlokaBadge}>SHLOKA OF THE DAY</Text>
            <Text style={styles.shlokaSource}>{dailyShloka.source}</Text>
          </View>

          <Text style={styles.shlokaTitle}>{dailyShloka.title.english}</Text>
          <Text style={styles.shlokaSanskrit}>{dailyShloka.sanskrit_text}</Text>
          <Text style={styles.shlokaTranslation}>"{dailyShloka.translations[0].text}"</Text>

          <Pressable onPress={() => router.push('/library' as any)} style={styles.shlokaReadButton}>
            <Text style={styles.shlokaReadButtonText}>Explore Scripture Library →</Text>
          </Pressable>
        </View>

        {/* Scripture Categories Carousel */}
        <HorizontalSection
          title="📚 Scripture & Mantra Collections"
          subtitle="Bhagavad Gita, Stotras, and Veda Mantras"
          onViewAll={() => router.push('/library' as any)}>
          {scriptures.map((scrip) => (
            <PanchangCard
              key={scrip.id}
              title={scrip.title.english}
              subtitle={scrip.title.iast}
              categoryTag={scrip.category}
              description={scrip.sanskrit_text}
              accentColor={Colors.navyDark}
              onPress={() => router.push('/library' as any)}
            />
          ))}
        </HorizontalSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },
  scrollContent: {
    paddingBottom: Spacing.six,
  },
  headerBox: {
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.three,
    paddingBottom: Spacing.two,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.navyDark,
    letterSpacing: -0.5,
  },
  greetingText: {
    fontSize: 13,
    color: Colors.textMuted,
    marginTop: 2,
  },
  heroWidget: {
    backgroundColor: Colors.navyDark,
    marginHorizontal: Spacing.three,
    borderRadius: 20,
    padding: Spacing.three,
    marginBottom: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  heroBadge: {
    backgroundColor: '#E07B39',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    letterSpacing: 0.8,
  },
  heroLocation: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  heroMainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Spacing.one,
  },
  heroMainLeft: {
    flex: 1,
  },
  heroTithi: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroSubText: {
    fontSize: 12,
    color: '#CBD5E1',
    marginTop: 2,
  },
  heroPillRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.two,
  },
  heroPill: {
    backgroundColor: '#334155',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  heroPillText: {
    fontSize: 11,
    color: '#F8FAFC',
    fontWeight: '600',
  },
  heroMainRight: {
    alignItems: 'center',
    backgroundColor: '#1E293B',
    padding: Spacing.two,
    borderRadius: 14,
    minWidth: 72,
  },
  heroSunIcon: {
    fontSize: 22,
  },
  heroSunTime: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 2,
  },
  heroSunLabel: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '600',
  },
  heroFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: Spacing.two,
    marginTop: Spacing.two,
  },
  heroFooterText: {
    fontSize: 11,
    color: '#94A3B8',
  },
  heroViewMore: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.saffron,
  },
  shlokaWidget: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: Spacing.three,
    borderRadius: 20,
    padding: Spacing.three,
    marginBottom: Spacing.four,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  shlokaHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.two,
  },
  shlokaBadge: {
    backgroundColor: '#FFF7ED',
    color: Colors.saffronDark,
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    letterSpacing: 0.8,
  },
  shlokaSource: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  shlokaTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.navyDark,
    marginBottom: Spacing.one,
  },
  shlokaSanskrit: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1917',
    backgroundColor: '#FFF8F2',
    padding: Spacing.two,
    borderRadius: 10,
    marginVertical: Spacing.one,
    lineHeight: 24,
  },
  shlokaTranslation: {
    fontSize: 13,
    color: '#475569',
    fontStyle: 'italic',
    lineHeight: 19,
    marginVertical: Spacing.one,
  },
  shlokaReadButton: {
    alignSelf: 'flex-start',
    marginTop: Spacing.one,
  },
  shlokaReadButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.saffron,
  },
});
