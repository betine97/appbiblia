import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
} from 'react-native-reanimated';

interface SegmentedProgressRingProps {
  progress: number; // 0 to 100
  size: number;
  strokeWidth?: number;
  activeColor?: string;
  inactiveColor?: string;
  isActive?: boolean;
}

const SegmentedProgressRing: React.FC<SegmentedProgressRingProps> = ({
  progress,
  size,
  strokeWidth = 14,
  activeColor = '#fac440',
  inactiveColor = '#E5E7EB',
  isActive = true,
}) => {
  const center = size / 2;
  const innerRadius = 40; // Fixed inner radius for distance from center
  const outerRadius = innerRadius + strokeWidth; // Outer radius based on stroke width
  
  // Animation for pulsing effect
  const pulseAnimation = useSharedValue(1);
  
  useEffect(() => {
    if (isActive && progress > 0) {
      pulseAnimation.value = withRepeat(
        withTiming(1.15, { duration: 800 }),
        -1,
        true
      );
    } else {
      pulseAnimation.value = 1;
    }
  }, [isActive, progress]);

  // Create 4 segments with gaps - clockwise starting from top right
  const segmentAngle = 75; // 75 degrees per segment (90 - 15 for gap)
  const gapAngle = 15; // 15 degrees gap between segments for better separation
  
  const segments = [
    { start: -37.5, angle: segmentAngle }, // Top right (adjusted for new gap)
    { start: 52.5, angle: segmentAngle },  // Bottom right (adjusted for new gap)
    { start: 142.5, angle: segmentAngle }, // Bottom left (adjusted for new gap)
    { start: 232.5, angle: segmentAngle }, // Top left (adjusted for new gap)
  ];

  const getSegmentPath = (startAngle: number, sweepAngle: number) => {
    const startAngleRad = (startAngle) * (Math.PI / 180);
    const endAngleRad = (startAngle + sweepAngle) * (Math.PI / 180);
    
    const x1 = center + outerRadius * Math.cos(startAngleRad);
    const y1 = center + outerRadius * Math.sin(startAngleRad);
    const x2 = center + outerRadius * Math.cos(endAngleRad);
    const y2 = center + outerRadius * Math.sin(endAngleRad);
    
    const largeArcFlag = sweepAngle > 180 ? 1 : 0;
    
    return `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  const getActiveSegments = (progress: number) => {
    return Math.floor(progress / 25); // Each segment is 25%
  };

  const getPartialSegmentAngle = (progress: number, segmentIndex: number) => {
    const segmentProgress = progress - (segmentIndex * 25);
    return (segmentProgress / 25) * segmentAngle;
  };

  const activeSegments = getActiveSegments(progress);
  const hasPartialSegment = progress % 25 > 0 && activeSegments < 4;

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(pulseAnimation.value, [1, 1.15], [0.85, 1]);
    return {
      transform: [{ scale }],
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <Svg width={size} height={size}>
          {/* Background segments */}
          {segments.map((segment, index) => (
            <Path
              key={`bg-${index}`}
              d={getSegmentPath(segment.start, segment.angle)}
              stroke={inactiveColor}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          ))}
          
          {/* Active complete segments */}
          {segments.slice(0, activeSegments).map((segment, index) => (
            <Path
              key={`progress-${index}`}
              d={getSegmentPath(segment.start, segment.angle)}
              stroke={activeColor}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          ))}
          
          {/* Partial segment for current progress */}
          {hasPartialSegment && (
            <Path
              d={getSegmentPath(
                segments[activeSegments].start,
                getPartialSegmentAngle(progress, activeSegments)
              )}
              stroke={activeColor}
              strokeWidth={strokeWidth}
              fill="none"
              strokeLinecap="round"
            />
          )}
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SegmentedProgressRing;