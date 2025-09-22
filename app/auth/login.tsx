import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../../components/ui/Button';
import { AnimatedMascot } from '../../components/ui/AnimatedMascot';
import { useAuth } from '../../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [mascotOpacity] = useState(new Animated.Value(1));
  const [mascotScale] = useState(new Animated.Value(1));
  const { login } = useAuth();

  useEffect(() => {
    const animateMascot = () => {
      // Animação de respiração
      Animated.sequence([
        Animated.parallel([
          Animated.timing(mascotScale, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(mascotOpacity, {
            toValue: 0.8,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(mascotScale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(mascotOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        // Desaparece por 2 segundos
        Animated.timing(mascotOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Reaparece após 2 segundos e reinicia o ciclo
        setTimeout(() => {
          mascotOpacity.setValue(1);
          animateMascot();
        }, 2000);
      });
    };

    animateMascot();
  }, []);

  const handleQuickLogin = async () => {
    const success = await login('joao@email.com', '123456');
    if (success) {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <View style={styles.container}>
      {/* Mascote Animado */}
      <View style={styles.mascotContainer}>
        <AnimatedMascot size={120} />
      </View>

      {/* Conteúdo Principal */}
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.appName}>shalom</Text>
          <Text style={styles.subtitle}>Aprenda de graça. Para sempre.</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            title="COMEÇAR AGORA"
            onPress={() => router.push('/auth/register')}
            style={styles.startButton}
          />
          
          <Button
            title="JÁ TENHO UMA CONTA"
            variant="outline"
            onPress={handleQuickLogin}
            style={styles.loginButton}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3b82f6',
  },
  mascotContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },

  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 32,
    paddingVertical: 40,
    minHeight: height * 0.4,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#58cc02',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#777777',
    textAlign: 'center',
  },
  buttonsContainer: {
    gap: 16,
  },
  startButton: {
    backgroundColor: '#58cc02',
    borderRadius: 12,
    paddingVertical: 16,
  },
  loginButton: {
    borderColor: '#e5e7eb',
    borderWidth: 2,
    borderRadius: 12,
    paddingVertical: 16,
    backgroundColor: 'white',
  },
});