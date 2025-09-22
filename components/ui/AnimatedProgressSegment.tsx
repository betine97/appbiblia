import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const AnimatedSvgCircle = Animated.createAnimatedComponent(Circle);

interface AnimatedProgressSegmentProps {
  isActive: boolean;
  color: string;
  rotation: number;
  animationDelay: number;
  size: number;
  strokeWidth: number;
  radius: number;
}

const AnimatedProgressSegment: React.FC<AnimatedProgressSegmentProps> = ({
  isActive,
  color,
  rotation,
  animationDelay,
  size,
  strokeWidth,
  radius
}) => {
  const animValue = useRef(new Animated.Value(0)).current;
  
  // Cada segmento tem 85° de arco (com 5° de espaço entre eles)
  const segmentLength = (85 / 360) * (radius * 2 * Math.PI);
  const totalCircumference = radius * 2 * Math.PI;
  
  useEffect(() => {
    Animated.timing(animValue, {
      toValue: isActive ? 1 : 0,
      duration: 500,
      delay: animationDelay,
      useNativeDriver: false,
    }).start();
  }, [isActive, animationDelay, animValue]);

  const animatedStrokeDashoffset = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [segmentLength, 0],
  });

  if (!isActive) return null;

  return (
    <AnimatedSvgCircle
      cx={size / 2}
      cy={size / 2}
      r={radius}
      stroke={color}
      strokeWidth={strokeWidth}
      fill="transparent"
      strokeDasharray={`${segmentLength} ${totalCircumference - segmentLength}`}
      strokeDashoffset={animatedStrokeDashoffset}
      strokeLinecap="round"
      transform={`rotate(${rotation - 90} ${size / 2} ${size / 2})`}
    />
  );
};

export default AnimatedProgressSegment;