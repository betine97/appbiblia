import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface AnimatedMascotProps {
  size?: number;
  style?: any;
}

export function AnimatedMascot({ size = 120, style }: AnimatedMascotProps) {
  const [bounceAnim] = useState(new Animated.Value(1));
  const [rotateAnim] = useState(new Animated.Value(0));
  const [opacityAnim] = useState(new Animated.Value(1));
  const [blinkAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const createAnimation = () => {
      // Animação de respiração/bounce
      const breathe = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1.1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      );

      // Animação de piscar
      const blink = Animated.loop(
        Animated.sequence([
          Animated.delay(3000),
          Animated.timing(blinkAnim, {
            toValue: 0.1,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ])
      );

      // Animação de rotação sutil
      const rotate = Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: -1,
            duration: 4000,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      );

      // Animação de desaparecer e reaparecer
      const disappear = Animated.loop(
        Animated.sequence([
          Animated.delay(8000), // Fica visível por 8 segundos
          Animated.timing(opacityAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.delay(2000), // Fica invisível por 2 segundos
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );

      // Inicia todas as animações
      breathe.start();
      blink.start();
      rotate.start();
      disappear.start();

      return () => {
        breathe.stop();
        blink.stop();
        rotate.stop();
        disappear.stop();
      };
    };

    const cleanup = createAnimation();
    return cleanup;
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-5deg', '5deg'],
  });

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Animated.View
        style={[
          styles.mascot,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            opacity: opacityAnim,
            transform: [
              { scale: bounceAnim },
              { rotate: rotateInterpolate }
            ],
          },
        ]}
      >
        {/* Corpo da pomba */}
        <View style={styles.body}>
          {/* Olhos com animação de piscar */}
          <Animated.View style={[styles.eyes, { opacity: blinkAnim }]}>
            <View style={styles.eye}>
              <View style={styles.eyeball} />
            </View>
            <View style={styles.eye}>
              <View style={styles.eyeball} />
            </View>
          </Animated.View>
          
          {/* Bico */}
          <View style={styles.beak} />
          
          {/* Asas */}
          <View style={styles.wings}>
            <View style={styles.wing} />
            <View style={styles.wing} />
          </View>
        </View>
        
        {/* Emoji como fallback */}
        <View style={styles.emojiContainer}>
          <Animated.Text 
            style={[
              styles.emoji, 
              { 
                fontSize: size * 0.5,
                opacity: blinkAnim 
              }
            ]}
          >
            🕊️
          </Animated.Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascot: {
    backgroundColor: 'rgba(88, 204, 2, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#58cc02',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  body: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyes: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 4,
  },
  eye: {
    width: 12,
    height: 12,
    backgroundColor: 'white',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  eyeball: {
    width: 6,
    height: 6,
    backgroundColor: '#1e40af',
    borderRadius: 3,
  },
  beak: {
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#f59e0b',
    marginBottom: 8,
  },
  wings: {
    flexDirection: 'row',
    gap: 4,
  },
  wing: {
    width: 8,
    height: 12,
    backgroundColor: '#e0f2fe',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#0ea5e9',
  },
  emojiContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    textAlign: 'center',
  },
});