import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
  withSpring,
  interpolateColor,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useVideoPlayer, VideoView } from 'expo-video';
import { SymbolView } from 'expo-symbols';
import { LoginScreen } from './login-screen';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const slidesData = [
  {
    title: 'Epics\nCome\nAlive.',
    subtitle: 'Ramayana, Mahabharata and more —\ntold through stunning comic stories.',
    video: require('@/assets/videos/onboarding_epics_come_alive.mp4'),
    videoWidth: 324,
    videoHeight: 182,
    showXp: false,
  },
  {
    title: 'Ancient\nWisdom,\nDaily.',
    subtitle: 'Mantras, Panchang and festival stories —\nevery single day.',
    video: require('@/assets/videos/onboarding_ancient_wisdom_daily.mp4'),
    videoWidth: 232,
    videoHeight: 290,
    showXp: false,
  },
  {
    title: 'Play.\nLearn.\nGrow.',
    subtitle: 'Earn XP, build streaks and climb the\nleagues — learning feels like a game.',
    video: require('@/assets/videos/onboarding_play_learn_grow.mp4'),
    videoWidth: 324,
    videoHeight: 240,
    showXp: true,
  },
];

interface OnboardingVideoProps {
  source: any;
  isActive: boolean;
  width: number;
  height: number;
}

function OnboardingVideo({ source, isActive, width, height }: OnboardingVideoProps) {
  const player = useVideoPlayer(source, (p) => {
    p.loop = true;
    p.muted = true;
    if (isActive) {
      p.play();
    }
  });

  useEffect(() => {
    if (isActive) {
      player.play();
    } else {
      player.pause();
    }
  }, [isActive, player]);

  return (
    <VideoView
      player={player}
      style={{ width, height, borderRadius: 16 }}
      nativeControls={false}
      contentFit="cover"
    />
  );
}

export function OnboardingScreen() {
  const [currentPage, setCurrentPage] = useState(0);

  // Background color animation interpolation using Reanimated
  const progress = useDerivedValue(() => {
    return withTiming(currentPage, { duration: 460 });
  });

  const animatedBgStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1, 2, 3],
      ['#EE9B48', '#550303', '#151627', '#FFF8F2']
    );
    return { backgroundColor };
  });

  // Scale animation for +10 XP badge
  const badgeScale = useDerivedValue(() => {
    return currentPage === 2
      ? withSpring(1, { damping: 10, stiffness: 100 })
      : withSpring(0);
  });

  const animatedBadgeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: badgeScale.value }],
    };
  });

  // Auto skip timer
  useEffect(() => {
    if (currentPage >= 3) return;

    const timer = setTimeout(() => {
      setCurrentPage((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 7000);

    return () => clearTimeout(timer);
  }, [currentPage]);

  const handleNext = () => {
    if (currentPage < 3) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (currentPage === 3) {
    return <LoginScreen />;
  }

  const slide = slidesData[currentPage];

  return (
    <Animated.View style={[styles.container, animatedBgStyle]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          {/* Video / Illustration Container */}
          <View style={styles.videoWrapper}>
            <View style={styles.videoInner}>
              <OnboardingVideo
                source={slide.video}
                isActive={true}
                width={slide.videoWidth}
                height={slide.videoHeight}
              />
            </View>

            {/* +10 XP Badge */}
            {slide.showXp && (
              <Animated.View style={[styles.xpBadge, animatedBadgeStyle]}>
                <View style={styles.xpBadgeContent}>
                  <SymbolView name="star.fill" tintColor="#D84B16" size={14} />
                  <Text style={styles.xpText}>+10 XP Earned!</Text>
                </View>
              </Animated.View>
            )}
          </View>

          {/* Typography */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.subtitle}>{slide.subtitle}</Text>
          </View>
        </View>

        {/* Bottom Navigation Controls */}
        <View style={styles.bottomControls}>
          {/* Pagination Dots */}
          <View style={styles.dotsContainer}>
            {slidesData.map((_, index) => {
              const active = currentPage === index;
              return (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    active && styles.activeDot,
                    {
                      backgroundColor: active
                        ? '#ffffff'
                        : 'rgba(255, 255, 255, 0.35)',
                    },
                  ]}
                />
              );
            })}
          </View>

          {/* Next Button */}
          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [
              styles.nextBtn,
              pressed && styles.pressed,
            ]}
          >
            {currentPage === 2 ? (
              <Text style={[styles.nextBtnText, { color: '#151627' }]}>
                Let's Begin!
              </Text>
            ) : (
              <View style={styles.nextBtnContent}>
                <Text
                  style={[
                    styles.nextBtnText,
                    { color: currentPage === 0 ? '#EE9B48' : '#550303' },
                  ]}
                >
                  Next
                </Text>
                <SymbolView
                  name="arrow.right"
                  tintColor={currentPage === 0 ? '#EE9B48' : '#550303'}
                  size={16}
                />
              </View>
            )}
          </Pressable>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  videoWrapper: {
    width: '100%',
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  videoInner: {
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  xpBadge: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: '#FFE066',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  xpBadgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  xpText: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    color: '#D84B16',
    fontWeight: '700',
    fontSize: 12,
  },
  textContainer: {
    marginTop: 20,
    gap: 16,
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '800',
    lineHeight: 40,
  },
  subtitle: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 24,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    width: 6,
  },
  activeDot: {
    width: 16,
  },
  nextBtn: {
    backgroundColor: '#ffffff',
    borderRadius: 26,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  nextBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  nextBtnText: {
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    fontWeight: '600',
    fontSize: 16,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
});
