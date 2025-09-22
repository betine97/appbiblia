import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ProgressProps {
  value: number; // 0-100
  style?: ViewStyle;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
}

export function Progress({ 
  value, 
  style, 
  height = 8, 
  backgroundColor = '#e5e7eb',
  progressColor = '#3b82f6'
}: ProgressProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <View style={[styles.container, { height, backgroundColor }, style]}>
      <View 
        style={[
          styles.progress, 
          { 
            width: `${clampedValue}%`, 
            backgroundColor: progressColor,
            height: height - 2
          }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: 1,
  },
  progress: {
    borderRadius: 3,
  },
});