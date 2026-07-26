import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Platform,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Caveat_700Bold } from '@expo-google-fonts/caveat';
import { Baloo2_700Bold, Baloo2_800ExtraBold } from '@expo-google-fonts/baloo-2';
import { usePreferences } from '@/context/preferences-context';
const CARD_HEIGHT = 180;
const GAP = 8;
const REPEAT_COUNT = 6;

// Column images
const col1Images = [
  require('@/assets/images/photo1.webp'),
  require('@/assets/images/photo2.webp'),
  require('@/assets/images/photo3.webp'),
];

const col2Images = [
  require('@/assets/images/photo4.webp'),
  require('@/assets/images/photo5.webp'),
  require('@/assets/images/photo6.webp'),
];

const col3Images = [
  require('@/assets/images/photo7.webp'),
  require('@/assets/images/photo8.webp'),
  require('@/assets/images/photo9.webp'),
];

interface ScrollingColumnProps {
  images: any[];
  direction: 'up' | 'down';
  duration: number;
}

function ScrollingColumn({ images, direction, duration }: ScrollingColumnProps) {
  const singleLoopHeight = images.length * (CARD_HEIGHT + GAP);
  const translateY = useSharedValue(direction === 'up' ? 0 : -singleLoopHeight);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(direction === 'up' ? -singleLoopHeight : 0, {
        duration: duration,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [direction, duration, singleLoopHeight, translateY]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const repeatedImages = [];
  for (let i = 0; i < REPEAT_COUNT; i++) {
    repeatedImages.push(...images);
  }

  return (
    <View style={styles.columnContainer}>
      <Animated.View style={[styles.columnList, animatedStyle]}>
        {repeatedImages.map((img, idx) => (
          <Image
            key={idx}
            source={img}
            style={styles.imageCard}
            resizeMode="cover"
          />
        ))}
      </Animated.View>
    </View>
  );
}

function GoogleIcon() {
  return (
    <Svg viewBox="0 0 48 48" width={22} height={22}>
      <Path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <Path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <Path
        fill="#4CAF50"
        d="M24 44c5.5 0 10.4-1.9 14.3-5.1l-6.6-5.6C29.6 34.9 26.9 36 24 36c-5.3 0-9.7-3.1-11.3-7.6l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />
      <Path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.3 5.6l6.6 5.6C41.4 36 44 30.5 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </Svg>
  );
}

// Simulated dotted texture using a small grid of SVG dots
function DottedOverlay() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%">
        <defs>
          <pattern id="dotPattern" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="rgba(193, 88, 75, 0.25)" />
          </pattern>
        </defs>
        <Path d="M 0 0 H 2000 V 2000 H 0 Z" fill="url(#dotPattern)" />
      </Svg>
    </View>
  );
}

export function LoginScreen() {
  const { setIsOnboarded } = usePreferences();
  const insets = useSafeAreaInsets();
  
  const [fontsLoaded] = useFonts({
    Caveat_700Bold,
    Baloo2_700Bold,
    Baloo2_800ExtraBold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#c1584b" />
      </View>
    );
  }

  const handleLogin = () => {
    // Set isOnboarded to true, which triggers transition to preferences screen
    setIsOnboarded(true);
  };

  return (
    <View style={styles.container}>
      {/* 3-Column Scrolling Grid Background */}
      <View style={styles.gridBg}>
        <ScrollingColumn images={col1Images} direction="up" duration={34000} />
        <ScrollingColumn images={col2Images} direction="down" duration={46000} />
        <ScrollingColumn images={col3Images} direction="up" duration={40000} />
      </View>

      {/* Dark Overlay for Readability */}
      <LinearGradient
        colors={[
          'rgba(12, 11, 13, 0.55)',
          'rgba(12, 11, 13, 0.35)',
          'rgba(12, 11, 13, 0.65)',
          'rgba(12, 11, 13, 0.95)',
        ]}
        locations={[0, 0.3, 0.62, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Center Branding Content */}
      <View style={styles.content}>
        <Text style={styles.logo}>DharmaPath</Text>
        <Text style={styles.tagline}>All in one Hinduism app</Text>
      </View>

      {/* Bottom Sheet */}
      <View style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, 24) }]}>
        <DottedOverlay />
        
        <View style={styles.grabber} />
        <Text style={styles.sheetTitle}>Sign in to begin your journey</Text>
        
        <Pressable
          onPress={handleLogin}
          style={({ pressed }) => [
            styles.googleBtnContainer,
            pressed && styles.pressed,
            styles.googleShadow,
          ]}
        >
          <LinearGradient
            colors={['#c1584b', '#a8473c']}
            style={styles.googleBtn}
          >
            <GoogleIcon />
            <Text style={styles.googleBtnText}>Sign in with Google</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0c0b0d',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#0c0b0d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridBg: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'row',
    gap: 6,
    padding: 6,
  },
  columnContainer: {
    flex: 1,
    height: '100%',
    overflow: 'hidden',
  },
  columnList: {
    flexDirection: 'column',
    gap: GAP,
  },
  imageCard: {
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: 12,
    backgroundColor: '#222',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 210, // Avoid overlapping with bottom sheet
  },
  logo: {
    fontFamily: 'Caveat_700Bold',
    fontSize: 64,
    color: '#E8500A',
    textShadowColor: 'rgba(0, 0, 0, 0.55)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 18,
    transform: [{ rotate: '-2deg' }],
  },
  tagline: {
    marginTop: 10,
    fontFamily: 'Caveat_700Bold',
    fontSize: 22,
    color: '#f2ece3',
    opacity: 0.95,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f7f2ea',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 18,
    paddingHorizontal: 22,
    alignItems: 'center',
    overflow: 'hidden',
  },
  grabber: {
    width: 42,
    height: 5,
    borderRadius: 4,
    backgroundColor: '#d8cfc2',
    marginBottom: 18,
  },
  sheetTitle: {
    fontFamily: 'Baloo2_700Bold',
    fontSize: 14,
    letterSpacing: 0.8,
    color: '#6b6560',
    textTransform: 'uppercase',
    marginBottom: 16,
    textAlign: 'center',
  },
  googleBtnContainer: {
    width: '100%',
    borderRadius: 999,
    overflow: 'hidden',
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  googleBtnText: {
    fontFamily: 'Baloo2_800ExtraBold',
    color: '#ffffff',
    fontSize: 16,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  googleShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#a14437',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.45,
        shadowRadius: 20,
      },
      android: {
        elevation: 6,
      },
      web: {
        boxShadow: '0 8px 20px rgba(161,68,55,0.45)',
      },
    }),
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.95,
  },
});
