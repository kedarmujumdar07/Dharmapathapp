import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Colors, Spacing } from '@/constants/theme';
import { getDailyPanchang, DEFAULT_LOCATION } from '@/services/panchang/panchang-service';
import { getFestivalsForDay } from '@/services/festivals/festival-rule-engine';

export const PanchangScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const panchang = useMemo(() => {
    return getDailyPanchang(selectedDate, DEFAULT_LOCATION);
  }, [selectedDate]);

  const activeFestivals = useMemo(() => {
    return getFestivalsForDay(panchang);
  }, [panchang]);

  const changeDateByDays = (days: number) => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + days);
    setSelectedDate(next);
  };

  const formattedDateHeader = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.bgCream} />

      {/* Top Header / Date Navigation */}
      <View style={styles.headerBar}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationLabel}>📍 {panchang.location.name}</Text>
        </View>

        <View style={styles.dateSelectorRow}>
          <Pressable
            onPress={() => changeDateByDays(-1)}
            style={styles.dateArrowButton}>
            <Text style={styles.arrowText}>‹</Text>
          </Pressable>

          <View style={styles.dateBox}>
            <Text style={styles.dateHeaderText}>{formattedDateHeader}</Text>
          </View>

          <Pressable
            onPress={() => changeDateByDays(1)}
            style={styles.dateArrowButton}>
            <Text style={styles.arrowText}>›</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Active Festivals Alert Badge */}
        {activeFestivals.length > 0 ? (
          <View style={styles.festivalBanner}>
            <Text style={styles.festivalBannerIcon}>🚩</Text>
            <View style={styles.festivalBannerTextContainer}>
              <Text style={styles.festivalBannerTitle}>Today's Festival / Vrat</Text>
              <Text style={styles.festivalBannerSubtitle}>
                {activeFestivals.map((f) => f.name).join(' • ')}
              </Text>
            </View>
          </View>
        ) : null}

        {/* Primary Card: Tithi & Nakshatra */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeaderRow}>
            <View style={styles.pakshaBadge}>
              <Text style={styles.pakshaText}>{panchang.tithi.paksha} Paksha</Text>
            </View>
            <Text style={styles.samvatHeader}>
              VS {panchang.samvatsara.vikramSamvat} • {panchang.samvatsara.name}
            </Text>
          </View>

          {/* Tithi Detail */}
          <View style={styles.mainElementRow}>
            <View style={styles.elementIconBox}>
              <Text style={styles.elementIcon}>🌘</Text>
            </View>
            <View style={styles.elementTextBox}>
              <Text style={styles.elementLabel}>TITHI</Text>
              <Text style={styles.elementValue}>{panchang.tithi.name}</Text>
              <Text style={styles.elementSubtext}>{panchang.tithi.endTimestamp}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Nakshatra Detail */}
          <View style={styles.mainElementRow}>
            <View style={styles.elementIconBox}>
              <Text style={styles.elementIcon}>✨</Text>
            </View>
            <View style={styles.elementTextBox}>
              <Text style={styles.elementLabel}>NAKSHATRA</Text>
              <Text style={styles.elementValue}>
                {panchang.nakshatra.name} (Pada {panchang.nakshatra.pada})
              </Text>
              <Text style={styles.elementSubtext}>
                Ruler: {panchang.nakshatra.ruler} • {panchang.nakshatra.endTimestamp}
              </Text>
            </View>
          </View>
        </View>

        {/* Secondary Panchang Elements Grid */}
        <View style={styles.gridRow}>
          <View style={styles.gridCard}>
            <Text style={styles.gridLabel}>YOGA</Text>
            <Text style={styles.gridValue}>{panchang.yoga.name}</Text>
            <Text style={styles.gridSubtext}>{panchang.yoga.endTimestamp}</Text>
          </View>

          <View style={styles.gridCard}>
            <Text style={styles.gridLabel}>KARANA</Text>
            <Text style={styles.gridValue}>{panchang.karana.name}</Text>
            <Text style={styles.gridSubtext}>{panchang.karana.type}</Text>
          </View>
        </View>

        <View style={styles.gridRow}>
          <View style={styles.gridCard}>
            <Text style={styles.gridLabel}>RITU (SEASON)</Text>
            <Text style={styles.gridValue}>{panchang.ritu.name}</Text>
            <Text style={styles.gridSubtext}>{panchang.ritu.englishName}</Text>
          </View>

          <View style={styles.gridCard}>
            <Text style={styles.gridLabel}>SOLAR MONTH</Text>
            <Text style={styles.gridValue}>{panchang.sauMasa.name}</Text>
            <Text style={styles.gridSubtext}>{panchang.sauMasa.zodiacSign}</Text>
          </View>
        </View>

        {/* Solar Times Card */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>🌅 Sun & Solar Timing</Text>
          <View style={styles.solarRow}>
            <View style={styles.solarBox}>
              <Text style={styles.solarIcon}>🌅</Text>
              <Text style={styles.solarLabel}>SUNRISE</Text>
              <Text style={styles.solarTime}>{panchang.solarTimes.sunrise}</Text>
            </View>

            <View style={styles.solarBox}>
              <Text style={styles.solarIcon}>☀️</Text>
              <Text style={styles.solarLabel}>NOON</Text>
              <Text style={styles.solarTime}>{panchang.solarTimes.solarNoon}</Text>
            </View>

            <View style={styles.solarBox}>
              <Text style={styles.solarIcon}>🌇</Text>
              <Text style={styles.solarLabel}>SUNSET</Text>
              <Text style={styles.solarTime}>{panchang.solarTimes.sunset}</Text>
            </View>
          </View>
        </View>

        {/* Key Muhurats (Auspicious / Inauspicious) */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>⏱️ Important Muhurats</Text>

          <View style={styles.muhuratRow}>
            <View style={[styles.muhuratBadge, { backgroundColor: '#DCFCE7' }]}>
              <Text style={[styles.muhuratTitle, { color: '#15803D' }]}>Abhijit Muhurat (Auspicious)</Text>
              <Text style={styles.muhuratTime}>
                {panchang.muhurat.abhijit.start} – {panchang.muhurat.abhijit.end}
              </Text>
            </View>
          </View>

          <View style={styles.muhuratRow}>
            <View style={[styles.muhuratBadge, { backgroundColor: '#FEE2E2' }]}>
              <Text style={[styles.muhuratTitle, { color: '#B91C1C' }]}>Rahu Kalam (Inauspicious)</Text>
              <Text style={styles.muhuratTime}>
                {panchang.muhurat.rahuKalam.start} – {panchang.muhurat.rahuKalam.end}
              </Text>
            </View>
          </View>

          <View style={styles.muhuratGrid}>
            <View style={styles.muhuratSmallBox}>
              <Text style={styles.muhuratSmallLabel}>Yamagandam</Text>
              <Text style={styles.muhuratSmallTime}>
                {panchang.muhurat.yamagandam.start} – {panchang.muhurat.yamagandam.end}
              </Text>
            </View>

            <View style={styles.muhuratSmallBox}>
              <Text style={styles.muhuratSmallLabel}>Gulika Kalam</Text>
              <Text style={styles.muhuratSmallTime}>
                {panchang.muhurat.gulikaKalam.start} – {panchang.muhurat.gulikaKalam.end}
              </Text>
            </View>
          </View>
        </View>

        {/* Daytime Choghadiya Timeline */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>⌛ Daytime Choghadiya</Text>
          {panchang.muhurat.choghadiya.map((slot, index) => (
            <View key={index} style={styles.choghadiyaRow}>
              <View
                style={[
                  styles.choghadiyaDot,
                  {
                    backgroundColor:
                      slot.quality === 'Good'
                        ? '#22C55E'
                        : slot.quality === 'Neutral'
                        ? '#F59E0B'
                        : '#EF4444',
                  },
                ]}
              />
              <Text style={styles.choghadiyaName}>{slot.name}</Text>
              <Text style={styles.choghadiyaTime}>
                {slot.start} – {slot.end}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },
  headerBar: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two,
    backgroundColor: '#FFF8F2',
    borderBottomWidth: 1,
    borderBottomColor: '#EDE7DA',
  },
  locationContainer: {
    alignItems: 'center',
    marginBottom: Spacing.one,
  },
  locationLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  dateSelectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateArrowButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EDE7DA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.navyDark,
    marginTop: -2,
  },
  dateBox: {
    alignItems: 'center',
  },
  dateHeaderText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.navyDark,
  },
  scrollContent: {
    padding: Spacing.three,
    paddingBottom: Spacing.six,
  },
  festivalBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF1F2',
    borderWidth: 1,
    borderColor: '#FECDD3',
    padding: Spacing.three,
    borderRadius: 12,
    marginBottom: Spacing.three,
  },
  festivalBannerIcon: {
    fontSize: 24,
    marginRight: Spacing.two,
  },
  festivalBannerTextContainer: {
    flex: 1,
  },
  festivalBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.saffronDark,
  },
  festivalBannerSubtitle: {
    fontSize: 12,
    color: '#9F1239',
    marginTop: 2,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    marginBottom: Spacing.three,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  heroHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  pakshaBadge: {
    backgroundColor: '#FFF7ED',
    borderWidth: 1,
    borderColor: '#FFEDD5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pakshaText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.saffronDark,
  },
  samvatHeader: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  mainElementRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  elementIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFF8F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.three,
  },
  elementIcon: {
    fontSize: 20,
  },
  elementTextBox: {
    flex: 1,
  },
  elementLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.8,
  },
  elementValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.navyDark,
    marginTop: 1,
  },
  elementSubtext: {
    fontSize: 12,
    color: Colors.saffron,
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginVertical: Spacing.two,
  },
  gridRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginBottom: Spacing.two,
  },
  gridCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: Spacing.two,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  gridLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.6,
  },
  gridValue: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.navyDark,
    marginTop: 2,
  },
  gridSubtext: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: Spacing.three,
    marginTop: Spacing.two,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.navyDark,
    marginBottom: Spacing.two,
  },
  solarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  solarBox: {
    alignItems: 'center',
  },
  solarIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  solarLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.textMuted,
  },
  solarTime: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.navyDark,
    marginTop: 2,
  },
  muhuratRow: {
    marginBottom: Spacing.two,
  },
  muhuratBadge: {
    padding: Spacing.two,
    borderRadius: 10,
  },
  muhuratTitle: {
    fontSize: 13,
    fontWeight: '700',
  },
  muhuratTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginTop: 2,
  },
  muhuratGrid: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  muhuratSmallBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: Spacing.two,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  muhuratSmallLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.navyDark,
  },
  muhuratSmallTime: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
  },
  choghadiyaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  choghadiyaDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: Spacing.two,
  },
  choghadiyaName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.navyDark,
    width: 80,
  },
  choghadiyaTime: {
    fontSize: 12,
    color: Colors.textMuted,
  },
});
