import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Colors } from '@/shared/constants/theme';

const pathItihasa = require('@/assets/images/path_itihasa.jpg');
const pathLeela = require('@/assets/images/path_leela.jpg');
const pathUtsav = require('@/assets/images/path_utsav.png');
const pathTirtha = require('@/assets/images/path_tirtha.png');

export interface PathSlide {
  key: string;
  title: string;
  sub: string;
  desc: string;
  tag: string;
  image: any;
}

export const SLIDES: PathSlide[] = [
  {
    key: 'itihasa',
    title: 'ITIHASA',
    sub: 'इतिहास',
    desc: 'The Great Epics, Ramayana and Mahabharata. Walk with Ram, stand with the Pandavas, hear the dharma of the battlefield.',
    tag: 'EPICS',
    image: pathItihasa,
  },
  {
    key: 'leela',
    title: 'LEELA',
    sub: 'लीला',
    desc: 'Divine Play, the stories of Krishna, Shiva, Devi and the Gods. Every story is a window into the infinite.',
    tag: 'MYTHOLOGY',
    image: pathLeela,
  },
  {
    key: 'utsav',
    title: 'UTSAV',
    sub: 'उत्सव',
    desc: 'Sacred Festivals, understand the cosmic significance of every celebration. Live by the rhythm of the sacred calendar.',
    tag: 'FESTIVALS',
    image: pathUtsav,
  },
  {
    key: 'tirtha',
    title: 'TIRTHA',
    sub: 'तीर्थ',
    desc: 'Sacred Pilgrimage, every temple, every river, every mountain has a story. Know the land that birthed civilization.',
    tag: 'PILGRIMAGE',
    image: pathTirtha,
  },
];

function PathSlideshowComponent() {
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SLIDES.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[slideIndex];

  return (
    <View style={styles.container}>
      <Image source={slide.image} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay} />

      <View style={styles.content}>
        <Text style={styles.title}>
          {slide.title} <Text style={styles.subTitle}>{slide.sub}</Text>
        </Text>
        <Text style={styles.desc}>{slide.desc}</Text>
        <View style={styles.tagWrap}>
          <Text style={styles.tagText}>{slide.tag}</Text>
        </View>
      </View>

      {/* Slide Indicators */}
      <View style={styles.indicators}>
        {SLIDES.map((_, idx) => (
          <Pressable
            key={idx}
            onPress={() => setSlideIndex(idx)}
            accessibilityRole="button"
            accessibilityLabel={`Slide ${idx + 1}`}
          >
            <View
              style={[
                styles.dot,
                idx === slideIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export const PathSlideshow = React.memo(PathSlideshowComponent);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 270,
    borderRadius: 28,
    overflow: 'hidden',
    position: 'relative',
    marginVertical: 12,
    backgroundColor: Colors.navyDark,
  },
  image: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(20, 12, 8, 0.55)',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 1.2,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.82)',
  },
  desc: {
    fontSize: 13,
    lineHeight: 18,
    color: 'rgba(255, 255, 255, 0.92)',
    marginBottom: 12,
  },
  tagWrap: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.68)',
    backgroundColor: 'rgba(20, 23, 29, 0.4)',
  },
  tagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1.2,
  },
  indicators: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotInactive: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  dotActive: {
    width: 12,
    backgroundColor: '#FFFFFF',
  },
});
