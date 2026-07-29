import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { G, Path, Circle } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/shared/constants/theme';

function BlueprintBackgroundComponent() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <LinearGradient
        colors={[Colors.bgDark, Colors.bgDark2]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      <Svg
        style={styles.blueprintSvg}
        viewBox="0 0 390 844"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <G stroke="#94A3B8" strokeWidth="0.75" strokeDasharray="3 3">
          <Path d="M 0 120 L 390 120" />
          <Path d="M 0 340 L 390 340" />
          <Path d="M 0 680 L 390 680" />
          <Path d="M 60 0 L 60 844" />
          <Path d="M 330 0 L 330 844" />
        </G>
        <G stroke="#CBD5E1" strokeWidth="1">
          <Circle cx="60" cy="120" r="4" fill="#F4F6F8" />
          <Circle cx="330" cy="120" r="4" fill="#F4F6F8" />
          <Circle cx="60" cy="680" r="4" fill="#F4F6F8" />
          <Circle cx="330" cy="680" r="4" fill="#F4F6F8" />
        </G>
        <G stroke="#E2472F" strokeWidth="0.5" opacity="0.4">
          <Path d="M 40 120 L 60 140 L 60 200" />
          <Path d="M 350 340 L 330 360 L 330 420" />
        </G>
      </Svg>
    </View>
  );
}

export const BlueprintBackground = React.memo(BlueprintBackgroundComponent);

const styles = StyleSheet.create({
  blueprintSvg: {
    ...StyleSheet.absoluteFill,
    opacity: 0.5,
  },
});
