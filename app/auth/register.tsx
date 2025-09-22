import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/ui/Button';
import { AnimatedMascot } from '../../components/ui/AnimatedMascot';
import { useAuth } from '../../contexts/AuthContext';

const { width, height } = Dimensions.get('window');

const questions = [
  {
    id: 1,
    question: "Qual é sua principal intenção ao usar o Shalom?",
    options: [
      "Conhecer mais a Palavra de Deus",
      "Me sentir mais próximo de Deus", 
      "Crescer espiritualmente",
      "Estudar a Bíblia de forma divertida",
      "Compartilhar conhecimento com outros"
    ]
  },
  {
    id: 2,
    question: "Qual é seu nível de conhecimento bíblico?",
    options: [
      "Iniciante - Estou começando agora",
      "Básico - Conheço algumas histórias",
      "Intermediário - Leio regularmente",
      "Avançado - Estudo há anos",
      "Expert - Ensino outros"
    ]
  },
  {
    id: 3,
    question: "Quanto tempo você gostaria de dedicar por dia?",
    options: [
      "5-10 minutos",
      "10-20 minutos",
      "20-30 minutos", 
      "30-60 minutos",
      "Mais de 1 hora"
    ]
  }
];

export default function RegisterScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [progressWidth] = useState(new Animated.Value(0));
  const { register } = useAuth();

  useEffect(() => {
    // Anima a barra de progresso
    Animated.timing(progressWidth, {
      toValue: (currentStep / 4) * 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [currentStep]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    setCurrentStep(4);
    setTimeout(async () => {
      const success = await register('João Silva', 'joao@email.com', '123456');
      if (success) {
        router.replace('/(tabs)/home');
      }
    }, 2000);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setAnswers(answers.slice(0, -1));
    } else {
      router.back();
    }
  };

  // Tela de introdução
  if (currentStep === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="#777" />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[
                styles.progressFill, 
                { width: progressWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%']
                })}
              ]} 
            />
          </View>
        </View>

        <View style={styles.mascotContainer}>
          <AnimatedMascot size={120} />
          
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>O que você quer aprender?</Text>
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.questionTitle}>Para quem fala português</Text>
          <TouchableOpacity 
            style={styles.languageOption}
            onPress={() => setCurrentStep(1)}
          >
            <Text style={styles.flagEmoji}>🇧🇷</Text>
            <Text style={styles.languageText}>Português</Text>
          </TouchableOpacity>
          
          <Button
            title="CONTINUAR"
            onPress={() => setCurrentStep(1)}
            style={styles.continueButton}
          />
        </View>
      </View>
    );
  }

  // Perguntas do questionário
  if (currentStep >= 1 && currentStep <= 3) {
    const currentQuestion = questions[currentStep - 1];
    
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="#777" />
        </TouchableOpacity>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[
                styles.progressFill, 
                { width: progressWidth.interpolate({
                  inputRange: [0, 100],
                  outputRange: ['0%', '100%']
                })}
              ]} 
            />
          </View>
        </View>

        <View style={styles.mascotContainer}>
          <AnimatedMascot size={120} />
          
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>{currentQuestion.question}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => handleAnswer(option)}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    );
  }

  // Tela de boas-vindas final
  if (currentStep === 4) {
    return (
      <View style={styles.container}>
        <View style={styles.mascotContainer}>
          <AnimatedMascot size={120} />
          
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>Oi, eu sou o Shalom!</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.appName}>shalom</Text>
            <Text style={styles.welcomeSubtitle}>Aprenda de graça. Para sempre.</Text>
          </View>
          
          <Button
            title="CONTINUAR"
            onPress={() => router.replace('/(tabs)/home')}
            style={styles.continueButton}
          />
        </View>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 100,
    paddingBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#58cc02',
    borderRadius: 4,
  },
  mascotContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  speechBubble: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxWidth: width * 0.8,
    marginTop: 20,
  },
  speechText: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
    fontWeight: '500',
  },
  content: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 32,
    paddingVertical: 40,
    minHeight: height * 0.35,
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 20,
    textAlign: 'center',
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  flagEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  languageText: {
    fontSize: 18,
    color: '#374151',
    fontWeight: '500',
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: '#e5e7eb',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: '#58cc02',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 20,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#58cc02',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#777777',
    textAlign: 'center',
  },
});