import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { SymbolView } from 'expo-symbols';
import {
  useFonts,
  SpaceGrotesk_400Regular,
  SpaceGrotesk_500Medium,
  SpaceGrotesk_600SemiBold,
  SpaceGrotesk_700Bold,
} from '@expo-google-fonts/space-grotesk';
import {
  JetBrainsMono_400Regular,
  JetBrainsMono_500Medium,
  JetBrainsMono_700Bold,
} from '@expo-google-fonts/jetbrains-mono';
import { usePreferences } from '@/context/preferences-context';
import { Colors } from '@/constants/theme';
import { ChoiceCard } from '@/components/ui/choice-card';
import { PathSlideshow } from '@/components/ui/path-slideshow';

const mascot1 = require('@/assets/images/mascot.png');
const mascot2 = require('@/assets/images/mascot2.png');

interface ChoiceItem {
  id: string;
  indexStr: string;
  label: string;
  subtitle?: string;
  badge?: string;
}

const AGE_OPTIONS: ChoiceItem[] = [
  { id: '12-18', indexStr: '01', label: '12-18', subtitle: 'Category: Youth / Junior' },
  { id: '18-24', indexStr: '02', label: '18-24', subtitle: 'Category: Young Adult' },
  { id: '24+', indexStr: '03', label: '24+', subtitle: 'Category: General Cohort' },
];

const REFERRAL_OPTIONS: ChoiceItem[] = [
  { id: 'Friends / Family', indexStr: '01', label: 'Friends / Family', subtitle: 'Word of Mouth Referral' },
  { id: 'Instagram / YouTube', indexStr: '02', label: 'Instagram / YouTube', subtitle: 'Social Media Channels' },
  { id: 'Web Search', indexStr: '03', label: 'Web Search', subtitle: 'Organic Search Results' },
  { id: 'App Store / Play Store', indexStr: '04', label: 'App Store / Play Store', subtitle: 'Direct Store Discovery' },
];

const KNOWLEDGE_OPTIONS: ChoiceItem[] = [
  { id: 'Beginner / Curious', indexStr: '01', label: 'Beginner / Curious', subtitle: 'New to Epics & Vedic Wisdom', badge: 'LEVEL 1' },
  { id: 'Intermediate', indexStr: '02', label: 'Intermediate', subtitle: 'Familiar with Ramayana & Gita', badge: 'LEVEL 2' },
  { id: 'Advanced', indexStr: '03', label: 'Advanced', subtitle: 'Deep Explorer of Texts', badge: 'LEVEL 3' },
  { id: 'Scholar / Practitioner', indexStr: '04', label: 'Scholar / Practitioner', subtitle: 'Academic or Spiritual Guide', badge: 'PRO' },
];

const GOAL_OPTIONS: ChoiceItem[] = [
  { id: 'Stories & Epics', indexStr: '01', label: 'Stories & Epics', subtitle: 'Read comic-style epics' },
  { id: 'Daily Practice', indexStr: '02', label: 'Daily Practice', subtitle: 'Mantras, Panchang & Rituals' },
  { id: 'Cultural Connection', indexStr: '03', label: 'Cultural Connection', subtitle: 'Festivals & Heritage' },
  { id: 'Academic Study', indexStr: '04', label: 'Academic Study', subtitle: 'Scriptures & Philosophy' },
  { id: 'Family & Heritage', indexStr: '05', label: 'Family & Heritage', subtitle: 'Pass down wisdom' },
];

function MascotFrame({ imageSource, zoom = false }: { imageSource: any; zoom?: boolean }) {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(-4, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.mascotFrame}>
      <Text style={styles.mascotTag}>DHARMI™</Text>
      <Animated.Image
        source={imageSource}
        style={[styles.mascotImage, animatedStyle]}
        resizeMode="contain"
      />
    </View>
  );
}





// Blueprint circuit-line background SVG
function BlueprintBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 390 844" preserveAspectRatio="none">
        <G stroke="#CBD5E1" strokeWidth="1" fill="none" opacity="0.6">
          <Path d="M0 120 H140 L170 150 V260 L200 290 H390" />
          <Path d="M0 300 H90 L120 330 V420 H260 L300 460 V844" />
          <Path d="M390 60 H300 L270 90 V180 L240 210 H60" />
          <Path d="M0 600 H160 L190 630 V720 H390" />
          <Circle cx="170" cy="150" r="3" />
          <Circle cx="200" cy="290" r="3" />
          <Circle cx="120" cy="330" r="3" />
          <Circle cx="300" cy="460" r="3" />
          <Circle cx="270" cy="90" r="3" />
          <Circle cx="240" cy="210" r="3" />
          <Circle cx="190" cy="630" r="3" />
        </G>
      </Svg>
    </View>
  );
}

export function PreferencesScreen() {
  const {
    name,
    setName,
    ageGroup,
    setAgeGroup,
    referredBy,
    setReferredBy,
    knowledgeLevel,
    setKnowledgeLevel,
    learningGoal,
    setLearningGoal,
    setHasCompletedPreferences,
  } = usePreferences();

  const [currentStep, setCurrentStep] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const insets = useSafeAreaInsets();

  // Load Google Fonts
  const [fontsLoaded] = useFonts({
    SpaceGrotesk_400Regular,
    SpaceGrotesk_500Medium,
    SpaceGrotesk_600SemiBold,
    SpaceGrotesk_700Bold,
    JetBrainsMono_400Regular,
    JetBrainsMono_500Medium,
    JetBrainsMono_700Bold,
  });

  // Floating mascot animation
  const mascotTranslateY = useSharedValue(0);
  useEffect(() => {
    mascotTranslateY.value = withRepeat(
      withTiming(-4, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, [mascotTranslateY]);

  const animatedMascotStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: mascotTranslateY.value }],
    };
  });

  // Animated progress bar width
  const progressPercent = useDerivedValue(() => {
    return withTiming(((currentStep + 1) / 5) * 100, { duration: 400 });
  });

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressPercent.value}%`,
    };
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E2472F" />
      </View>
    );
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setHasCompletedPreferences(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canContinue = () => {
    switch (currentStep) {
      case 0:
        return name.trim().length > 0;
      case 1:
        return ageGroup.length > 0;
      case 2:
        return referredBy.length > 0;
      case 3:
        return knowledgeLevel.length > 0;
      case 4:
        return learningGoal.length > 0;
      default:
        return false;
    }
  };

  const getStepMetadata = () => {
    switch (currentStep) {
      case 0:
        return {
          label: '01 IDENT // ENTRY POINT',
          headline: 'What should we call you?',
          sub: 'INPUT VALUE IN FIELD BELOW',
          tagSub: 'SYS.V1.0',
        };
      case 1:
        return {
          label: '02 PROFILE // TAILOR ACTIVE',
          headline: 'How old are you?',
          sub: 'SELECT AGE COHORT',
          tagSub: 'AGE.V2.4',
        };
      case 2:
        return {
          label: '03 ACQUISITION // ROUTE SOURCE',
          headline: 'How did you hear about us?',
          sub: 'SELECT SOURCE',
          tagSub: 'SRC.V1.0',
        };
      case 3:
        return {
          label: '04 KNOWLEDGE // TENET MAPPING',
          headline: 'How much do you know?',
          sub: 'SELECT PROFILE',
          tagSub: 'TNT.V3.1',
        };
      case 4:
        return {
          label: '05 SCHEDULING // DAILY GOAL',
          headline: (
            <Text style={styles.specHeadline}>
              Excellent! What is your{' '}
              <Text style={{ color: '#E2472F', fontFamily: 'SpaceGrotesk_700Bold' }}>
                daily learning goal
              </Text>
              ?
            </Text>
          ),
          sub: 'SELECT DAILY RUNTIME',
          tagSub: 'SCH.V1.5',
        };
      default:
        return { label: '', headline: '', sub: '', tagSub: '' };
    }
  };

  const meta = getStepMetadata();
  const enabled = canContinue();

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <View style={styles.stepContainer}>
            <View style={styles.slideshowHeaderRow}>
              <Text style={styles.slideshowHeader}>YOUR JOURNEY</Text>
            </View>

            <PathSlideshow />

            <View style={[styles.inputGroup, isFocused && styles.inputGroupFocused]}>
              <TextInput
                value={name}
                onChangeText={setName}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter your name"
                placeholderTextColor="#64748B"
                style={styles.textInput}
              />
            </View>
          </View>
        );

      case 1:
        return (
          <View style={styles.stepContainer}>
            <ScrollView style={styles.optionsList} contentContainerStyle={styles.scrollContent}>
              <ChoiceCard
                indexStr="01"
                label="12-18"
                subtitle="Category: Youth / Junior"
                isSelected={ageGroup === '12-18'}
                onTap={() => setAgeGroup('12-18')}
              />
              <ChoiceCard
                indexStr="02"
                label="18-24"
                subtitle="Category: Young Adult"
                isSelected={ageGroup === '18-24'}
                onTap={() => setAgeGroup('18-24')}
              />
              <ChoiceCard
                indexStr="03"
                label="24+"
                subtitle="Category: General Cohort"
                isSelected={ageGroup === '24+'}
                onTap={() => setAgeGroup('24+')}
              />
            </ScrollView>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <ScrollView style={styles.optionsList} contentContainerStyle={styles.scrollContent}>
              <ChoiceCard
                indexStr="01"
                label="Friends / Family"
                subtitle="Word of Mouth Referral"
                isSelected={referredBy === 'Friends / Family'}
                onTap={() => setReferredBy('Friends / Family')}
              />
              <ChoiceCard
                indexStr="02"
                label="Instagram / YouTube"
                subtitle="Social Media Channels"
                isSelected={referredBy === 'Instagram / YouTube'}
                onTap={() => setReferredBy('Instagram / YouTube')}
              />
              <ChoiceCard
                indexStr="03"
                label="Web Search"
                subtitle="Organic Search Results"
                isSelected={referredBy === 'Web Search'}
                onTap={() => setReferredBy('Web Search')}
              />
              <ChoiceCard
                indexStr="04"
                label="App Store / Play Store"
                subtitle="Direct Store Discovery"
                isSelected={referredBy === 'App Store / Play Store'}
                onTap={() => setReferredBy('App Store / Play Store')}
              />
              <ChoiceCard
                indexStr="05"
                label="Other"
                subtitle="Alternative Discovery Method"
                isSelected={referredBy === 'Other'}
                onTap={() => setReferredBy('Other')}
              />
            </ScrollView>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <ScrollView style={styles.optionsList} contentContainerStyle={styles.scrollContent}>
              <ChoiceCard
                indexStr="01"
                label="I'm new to it"
                subtitle="Start learning basic concepts"
                isSelected={knowledgeLevel === "I'm new to it"}
                onTap={() => setKnowledgeLevel("I'm new to it")}
              />
              <ChoiceCard
                indexStr="02"
                label="I know basic stories"
                subtitle="Familiar with Ramayana or Mahabharata"
                isSelected={knowledgeLevel === 'I know basic stories'}
                onTap={() => setKnowledgeLevel('I know basic stories')}
              />
              <ChoiceCard
                indexStr="03"
                label="I understand core tenets"
                subtitle="Familiar with Dharma, Karma, etc."
                isSelected={knowledgeLevel === 'I understand core tenets'}
                onTap={() => setKnowledgeLevel('I understand core tenets')}
              />
            </ScrollView>
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContainer}>
            <ScrollView style={styles.optionsList} contentContainerStyle={styles.scrollContent}>
              <ChoiceCard
                indexStr="01"
                label="Casual"
                subtitle="Light learning routine"
                badge="3 min/day"
                isSelected={learningGoal === 'Casual'}
                onTap={() => setLearningGoal('Casual')}
              />
              <ChoiceCard
                indexStr="02"
                label="Regular"
                subtitle="Standard daily routine"
                badge="5 min/day"
                isSelected={learningGoal === 'Regular'}
                onTap={() => setLearningGoal('Regular')}
              />
              <ChoiceCard
                indexStr="03"
                label="Serious"
                subtitle="Dedicated daily studies"
                badge="10 min/day"
                isSelected={learningGoal === 'Serious'}
                onTap={() => setLearningGoal('Serious')}
              />
              <ChoiceCard
                indexStr="04"
                label="Sacred"
                subtitle="Maximum deep dive"
                badge="15 min/day"
                isSelected={learningGoal === 'Sacred'}
                onTap={() => setLearningGoal('Sacred')}
              />
            </ScrollView>
          </View>
        );

      default:
        return null;
    }
  };

  const getStepChipStr = () => {
    return `0${currentStep + 1}`;
  };

  return (
    <View style={styles.container}>
      {/* Blueprint background lines and circles */}
      <BlueprintBackground />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          {/* Header */}
          <View style={styles.header}>
            {currentStep > 0 ? (
              <Pressable onPress={handleBack} style={styles.backButton}>
                <SymbolView name="arrow.left" tintColor="#1E293B" size={18} />
              </Pressable>
            ) : (
              <View style={styles.backButtonPlaceholder} />
            )}

            <View style={styles.progressBarWrapper}>
              <Animated.View style={[styles.progressBar, animatedProgressStyle]} />
            </View>

            <Text style={styles.stepChip}>{getStepChipStr()} / 05</Text>
          </View>

          {/* Core Content Layout */}
          <View style={styles.content}>
            {/* Mascot and Spec Card Box */}
            <View style={styles.mascotContainer}>
              <View style={styles.mascotFrame}>
                <Text style={styles.mascotTag}>DHARMI™</Text>
                <Animated.Image
                  source={currentStep === 1 ? mascot2 : mascot1}
                  style={[styles.mascotImage, animatedMascotStyle]}
                />
                <Text style={styles.mascotTagSub}>{meta.tagSub}</Text>
              </View>

              <View style={styles.specCard}>
                <Text style={styles.specLabel}>{meta.label}</Text>
                {typeof meta.headline === 'string' ? (
                  <Text style={styles.specHeadline}>{meta.headline}</Text>
                ) : (
                  meta.headline
                )}
                <Text style={styles.specSub}>{meta.sub}</Text>
              </View>
            </View>

            {/* Step Selection Options / Input */}
            <View style={styles.contentZone}>{renderStepContent()}</View>
          </View>

          {/* Sticky Continue Footer */}
          <View style={styles.footer}>
            <Pressable
              disabled={!enabled}
              onPress={handleNext}
              style={({ pressed }) => [
                styles.continueButton,
                !enabled && styles.continueButtonDisabled,
                pressed && enabled && styles.continueButtonPressed,
              ]}
            >
              <Text
                style={[
                  styles.continueText,
                  { color: enabled ? '#FFFFFF' : '#64748B' },
                ]}
              >
                CONTINUE
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonPlaceholder: {
    width: 36,
  },
  progressBarWrapper: {
    flex: 1,
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#E2472F',
    borderRadius: 3,
  },
  stepChip: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 11,
    color: '#64748B',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  mascotContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 20,
    width: '100%',
  },
  mascotFrame: {
    width: 92,
    height: 92,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  mascotTag: {
    position: 'absolute',
    top: 5,
    left: 6,
    fontFamily: 'JetBrainsMono_700Bold',
    fontSize: 7,
    letterSpacing: 0.5,
    color: '#E2472F',
  },
  mascotTagSub: {
    position: 'absolute',
    bottom: 5,
    right: 6,
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 7,
    letterSpacing: 0.3,
    color: '#64748B',
  },
  mascotImage: {
    width: '82%',
    height: '82%',
    resizeMode: 'contain',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 10,
      },
    }),
  },
  specCard: {
    flex: 1,
    backgroundColor: '#EDE7DA',
    borderRadius: 4,
    borderLeftWidth: 4,
    borderColor: '#E2472F',
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  specLabel: {
    fontFamily: 'JetBrainsMono_700Bold',
    fontSize: 9,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#8A8172',
    marginBottom: 6,
  },
  specHeadline: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 19,
    lineHeight: 23,
    color: '#14171D',
  },
  specSub: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 10,
    color: '#8A8172',
    marginTop: 6,
    letterSpacing: 0.2,
  },
  contentZone: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  stepContainer: {
    width: '100%',
    marginTop: 12,
  },
  inputGroup: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  inputGroupFocused: {
    borderColor: '#E2472F',
  },
  textInput: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 15,
    color: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 17,
  },
  optionsList: {
    maxHeight: 400,
  },
  scrollContent: {
    gap: 10,
    paddingBottom: 20,
  },
  choiceCard: {
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 13,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cardSelected: {
    backgroundColor: '#E2472F',
    borderColor: '#E2472F',
  },
  cardUnselected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
  },
  choiceIndex: {
    width: 26,
    height: 26,
    borderRadius: 3,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indexSelected: {
    borderColor: 'rgba(255,255,255,0.4)',
  },
  indexUnselected: {
    borderColor: '#E2E8F0',
  },
  indexText: {
    fontFamily: 'JetBrainsMono_700Bold',
    fontSize: 11,
  },
  cardTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardLabel: {
    fontFamily: 'SpaceGrotesk_600SemiBold',
    fontSize: 14,
  },
  cardSubtitle: {
    fontFamily: 'JetBrainsMono_500Medium',
    fontSize: 10,
    marginTop: 2,
    letterSpacing: 0.2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 3,
    borderWidth: 1,
  },
  badgeSelected: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderColor: 'rgba(255,255,255,0.3)',
  },
  badgeUnselected: {
    backgroundColor: '#E2E8F0',
    borderColor: '#E2E8F0',
  },
  badgeText: {
    fontFamily: 'JetBrainsMono_700Bold',
    fontSize: 10,
    letterSpacing: 0.3,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: 'transparent',
  },
  continueButton: {
    width: '100%',
    backgroundColor: '#E2472F',
    paddingVertical: 17,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  continueButtonPressed: {
    backgroundColor: '#BF3A24',
    transform: [{ scale: 0.99 }],
  },
  continueText: {
    fontFamily: 'JetBrainsMono_700Bold',
    fontSize: 13,
    letterSpacing: 1.5,
  },

  // Slideshow styles
  slideshowHeaderRow: {
    borderLeftWidth: 3,
    borderLeftColor: '#E2472F',
    paddingLeft: 8,
    marginVertical: 10,
  },
  slideshowHeader: {
    fontFamily: 'JetBrainsMono_700Bold',
    fontSize: 12,
    color: '#64748B',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  slideshowContainer: {
    position: 'relative',
    width: '100%',
    height: 230,
    marginVertical: 12,
    borderRadius: 28,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  pathCard: {
    width: '100%',
    height: '100%',
    position: 'relative',
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: '#1E293B',
  },
  cardContent: {
    height: '100%',
    padding: 24,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardHeaderContainer: {
    marginTop: 0,
  },
  cardTitle: {
    fontFamily: 'SpaceGrotesk_700Bold',
    fontSize: 20,
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  cardSub: {
    fontFamily: 'SpaceGrotesk_400Regular',
    fontSize: 15,
    marginTop: 2,
    color: 'rgba(255, 255, 255, 0.82)',
  },
  cardDesc: {
    fontFamily: 'SpaceGrotesk_500Medium',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.92)',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginBottom: 6,
  },
  tagWrapper: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.68)',
    backgroundColor: 'rgba(20, 23, 29, 0.4)',
  },
  tagText: {
    fontFamily: 'JetBrainsMono_700Bold',
    fontSize: 9,
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  slideIndicators: {
    position: 'absolute',
    bottom: 12,
    left: '50%',
    transform: [{ translateX: -24 }], // 4 dots (width + gap) estimation to center them
    flexDirection: 'row',
    gap: 6,
    zIndex: 10,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 12,
    backgroundColor: '#FFFFFF',
  },
  dotInactive: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});
