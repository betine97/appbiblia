import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput, PanResponder, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIntentions, setSelectedIntentions] = useState<string[]>([]);
  const [knowledgeLevel, setKnowledgeLevel] = useState('');
  const [studyHabits, setStudyHabits] = useState('');
  const [closenessToGod, setClosenessToGod] = useState(5);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState('');
  const [firstName, setFirstName] = useState('');
  const [learningFrequency, setLearningFrequency] = useState('');
  const [devotionalTime, setDevotionalTime] = useState('');
  const [additionalReminders, setAdditionalReminders] = useState<string[]>([]);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  // PanResponder para o slider de proximidade com Deus
  const screenWidth = Dimensions.get('window').width;
  const sliderWidth = screenWidth - 80; // 40px de padding em cada lado

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt) => {
      const { locationX } = evt.nativeEvent;
      const percentage = Math.max(0, Math.min(1, locationX / sliderWidth));
      const value = Math.round(percentage * 9) + 1; // 1 a 10
      setClosenessToGod(value);
    },
  });

  const intentions = [
    'Me sentir mais próximo de Deus',
    'Conhecer mais a palavra do senhor',
    'Discipular amigos e família',
    'Crescer em virtudes cristãs',
    'Vencer maus hábitos e fortalecer minhas bases'
  ];

  const knowledgeLevels = [
    'Iniciante',
    'Ocasional',
    'Intermediário',
    'Avançado',
    'Pastoral'
  ];

  const studyHabitsOptions = [
    'Leio diariamente',
    'Leio algumas vezes na semana',
    'Leio ocasionalmente',
    'Estou planejando a começar a ler'
  ];

  const spiritualChallenges = [
    'Encontrar tempo para reflexão e oração',
    'Conectar-me com Deus em um nível mais profundo',
    'Dificuldade de foco',
    'Compreender os ensinamentos bíblicos',
    'Não aplicar os ensinamentos',
    'Me sinto sozinho na jornada'
  ];

  const ageRanges = [
    'Menor que 18 anos',
    'Entre 18 e 24',
    'Entre 25 e 34',
    'Entre 35 e 44',
    '45 ou mais'
  ];

  const learningFrequencies = [
    'Todos os dias',
    '4 dias na semana',
    'Desejo seguir o meu ritmo'
  ];

  const devotionalTimes = [
    'Manhã',
    'Tarde',
    'Noite'
  ];

  const additionalReminderOptions = [
    'Reflexão rápida à tarde',
    'Orações guiadas à noite'
  ];

  const closenessStatusTexts = [
    'Muito distante',      // 1-2
    'Sinto um pouco',      // 3-4
    'Sinto um pouco',      // 3-4
    'Sinto sua presença',  // 5-7
    'Sinto sua presença',  // 5-7
    'Sinto sua presença',  // 5-7
    'Sinto muito a presença', // 8-10
    'Sinto muito a presença', // 8-10
    'Sinto muito a presença', // 8-10
    'Sinto muito a presença'  // 8-10
  ];

  const toggleIntention = (intention: string) => {
    setSelectedIntentions(prev =>
      prev.includes(intention)
        ? prev.filter(i => i !== intention)
        : [...prev, intention]
    );
  };

  const toggleChallenge = (challenge: string) => {
    setSelectedChallenges(prev =>
      prev.includes(challenge)
        ? prev.filter(c => c !== challenge)
        : [...prev, challenge]
    );
  };

  const toggleAdditionalReminder = (reminder: string) => {
    setAdditionalReminders(prev =>
      prev.includes(reminder)
        ? prev.filter(r => r !== reminder)
        : [...prev, reminder]
    );
  };

  // Controlar animação de carregamento com porcentagem
  useEffect(() => {
    if (currentStep === 10) { // Tela de carregamento
      const interval = setInterval(() => {
        setLoadingPercentage(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => router.push('/(tabs)'), 500);
            return 100;
          }
          return prev + 2; // Incrementa 2% a cada 100ms
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [currentStep, router]);

  if (currentStep === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {/* Mascote */}
          <View style={styles.mascotContainer}>
            <Image
              source={require('../assets/images/introappshalom.gif')}
              style={styles.mascot}
              resizeMode="contain"
            />
          </View>

          {/* Título */}
          <Text style={styles.title}>Shalom</Text>
          <Text style={styles.subtitle}>
            Conecte-se com Deus através da Palavra
          </Text>

          {/* Botões */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => setCurrentStep(1)}
            >
              <Text style={styles.primaryButtonText}>COMEÇAR AGORA</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => router.push('/auth/login')}
            >
              <Text style={styles.secondaryButtonText}>JÁ TENHO UMA CONTA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  // Tela de Nível de Conhecimento (Step 2)
  if (currentStep === 2) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header com botão voltar e barra de progresso */}
          <View style={styles.headerWithProgress}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep(1)}
            >
              <Ionicons name="arrow-back" size={32} color="#AFAFAF" />
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '22%' }]} />
              </View>
            </View>
          </View>

          <View style={styles.intentionsContent}>
            {/* Mascote com balão de fala */}
            <View style={styles.mascotWithBalloon}>
              <View style={styles.mascotImageContainer}>
                <Image
                  source={require('../assets/images/duvidas.png')}
                  style={styles.mascotImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.speechBalloon}>
                <Text style={styles.speechText}>
                  Qual é o seu nível de conhecimento bíblico?
                </Text>
                <View style={styles.balloonTail} />
              </View>
            </View>

            {/* Instrução */}
            <Text style={styles.instructionText}>Selecione uma opção</Text>

            {/* Opções de nível de conhecimento */}
            <View style={styles.intentionsContainer}>
              {knowledgeLevels.map((level, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.intentionButton,
                    knowledgeLevel === level && styles.intentionButtonSelected
                  ]}
                  onPress={() => setKnowledgeLevel(level)}
                >
                  <Text style={[
                    styles.intentionText,
                    knowledgeLevel === level && styles.intentionTextSelected
                  ]}>
                    {level}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Botão continuar fixo na parte inferior */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !knowledgeLevel && styles.continueButtonDisabled
            ]}
            onPress={() => setCurrentStep(3)}
            disabled={!knowledgeLevel}
          >
            <Text style={[
              styles.continueButtonText,
              !knowledgeLevel && styles.continueButtonTextDisabled
            ]}>
              CONTINUAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Tela de Hábitos de Estudo (Step 3)
  if (currentStep === 3) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header com botão voltar e barra de progresso */}
          <View style={styles.headerWithProgress}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep(2)}
            >
              <Ionicons name="arrow-back" size={32} color="#AFAFAF" />
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '33%' }]} />
              </View>
            </View>
          </View>

          <View style={styles.intentionsContent}>
            {/* Mascote com balão de fala */}
            <View style={styles.mascotWithBalloon}>
              <View style={styles.mascotImageContainer}>
                <Image
                  source={require('../assets/images/duvidas.png')}
                  style={styles.mascotImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.speechBalloon}>
                <Text style={styles.speechText}>
                  Como são seus hábitos de leitura da Bíblia?
                </Text>
                <View style={styles.balloonTail} />
              </View>
            </View>

            {/* Instrução */}
            <Text style={styles.instructionText}>Selecione uma opção</Text>

            {/* Opções de hábitos de estudo */}
            <View style={styles.intentionsContainer}>
              {studyHabitsOptions.map((habit, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.intentionButton,
                    studyHabits === habit && styles.intentionButtonSelected
                  ]}
                  onPress={() => setStudyHabits(habit)}
                >
                  <Text style={[
                    styles.intentionText,
                    studyHabits === habit && styles.intentionTextSelected
                  ]}>
                    {habit}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Botão continuar fixo na parte inferior */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !studyHabits && styles.continueButtonDisabled
            ]}
            onPress={() => setCurrentStep(4)}
            disabled={!studyHabits}
          >
            <Text style={[
              styles.continueButtonText,
              !studyHabits && styles.continueButtonTextDisabled
            ]}>
              CONTINUAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Tela de Proximidade com Deus (Step 4)
  if (currentStep === 4) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header com botão voltar e barra de progresso */}
          <View style={styles.headerWithProgress}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep(3)}
            >
              <Ionicons name="arrow-back" size={32} color="#AFAFAF" />
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '44%' }]} />
              </View>
            </View>
          </View>

          <View style={styles.intentionsContent}>
            {/* Mascote com balão de fala */}
            <View style={styles.mascotWithBalloon}>
              <View style={styles.mascotImageContainer}>
                <Image
                  source={require('../assets/images/duvidas.png')}
                  style={styles.mascotImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.speechBalloon}>
                <Text style={styles.speechText}>
                  Em uma escala de 1 a 10, o quanto você se sente próximo de Deus?
                </Text>
                <View style={styles.balloonTail} />
              </View>
            </View>

            {/* Slider de proximidade */}
            <View style={styles.sliderContainer}>
              <View style={styles.sliderWrapper} {...panResponder.panHandlers}>
                <View style={styles.sliderTrack}>
                  <View style={[styles.sliderFill, { width: `${((closenessToGod - 1) / 9) * 100}%` }]} />
                  <View style={[styles.sliderThumb, { left: `${((closenessToGod - 1) / 9) * 100}%` }]} />
                </View>
                <View style={styles.sliderLabels}>
                  <Text style={styles.sliderLabel}>1</Text>
                  <Text style={styles.sliderLabel}>10</Text>
                </View>
              </View>

              {/* Status text baseado no valor */}
              <Text style={styles.sliderStatusText}>
                {closenessStatusTexts[closenessToGod - 1]}
              </Text>
            </View>
          </View>
        </ScrollView>

        {/* Botão continuar fixo na parte inferior */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={() => setCurrentStep(5)}
          >
            <Text style={styles.continueButtonText}>
              CONTINUAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Tela de Desafios Espirituais (Step 5)
  if (currentStep === 5) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header com botão voltar e barra de progresso */}
          <View style={styles.headerWithProgress}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep(4)}
            >
              <Ionicons name="arrow-back" size={32} color="#AFAFAF" />
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '55%' }]} />
              </View>
            </View>
          </View>

          <View style={styles.intentionsContent}>
            {/* Mascote com balão de fala */}
            <View style={styles.mascotWithBalloon}>
              <View style={styles.mascotImageContainer}>
                <Image
                  source={require('../assets/images/duvidas.png')}
                  style={styles.mascotImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.speechBalloon}>
                <Text style={styles.speechText}>
                  Quais são seus principais desafios espirituais?
                </Text>
                <View style={styles.balloonTail} />
              </View>
            </View>

            {/* Instrução */}
            <Text style={styles.instructionText}>Selecione um ou mais</Text>

            {/* Opções de desafios */}
            <View style={styles.intentionsContainer}>
              {spiritualChallenges.map((challenge, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.intentionButton,
                    selectedChallenges.includes(challenge) && styles.intentionButtonSelected
                  ]}
                  onPress={() => toggleChallenge(challenge)}
                >
                  <Text style={[
                    styles.intentionText,
                    selectedChallenges.includes(challenge) && styles.intentionTextSelected
                  ]}>
                    {challenge}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Botão continuar fixo na parte inferior */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              selectedChallenges.length === 0 && styles.continueButtonDisabled
            ]}
            onPress={() => setCurrentStep(6)}
            disabled={selectedChallenges.length === 0}
          >
            <Text style={[
              styles.continueButtonText,
              selectedChallenges.length === 0 && styles.continueButtonTextDisabled
            ]}>
              CONTINUAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Tela de Faixa Etária (Step 6)
  if (currentStep === 6) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header com botão voltar e barra de progresso */}
          <View style={styles.headerWithProgress}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep(5)}
            >
              <Ionicons name="arrow-back" size={32} color="#AFAFAF" />
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '66%' }]} />
              </View>
            </View>
          </View>

          <View style={styles.intentionsContent}>
            {/* Mascote com balão de fala */}
            <View style={styles.mascotWithBalloon}>
              <View style={styles.mascotImageContainer}>
                <Image
                  source={require('../assets/images/duvidas.png')}
                  style={styles.mascotImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.speechBalloon}>
                <Text style={styles.speechText}>
                  Qual é a sua faixa etária?
                </Text>
                <View style={styles.balloonTail} />
              </View>
            </View>

            {/* Instrução */}
            <Text style={styles.instructionText}>Selecione uma opção</Text>

            {/* Opções de faixa etária */}
            <View style={styles.intentionsContainer}>
              {ageRanges.map((range, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.intentionButton,
                    ageRange === range && styles.intentionButtonSelected
                  ]}
                  onPress={() => setAgeRange(range)}
                >
                  <Text style={[
                    styles.intentionText,
                    ageRange === range && styles.intentionTextSelected
                  ]}>
                    {range}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Botão continuar fixo na parte inferior */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !ageRange && styles.continueButtonDisabled
            ]}
            onPress={() => setCurrentStep(7)}
            disabled={!ageRange}
          >
            <Text style={[
              styles.continueButtonText,
              !ageRange && styles.continueButtonTextDisabled
            ]}>
              CONTINUAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Tela de Nome (Step 7)
  if (currentStep === 7) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header com botão voltar e barra de progresso */}
          <View style={styles.headerWithProgress}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep(6)}
            >
              <Ionicons name="arrow-back" size={32} color="#AFAFAF" />
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '77%' }]} />
              </View>
            </View>
          </View>

          <View style={styles.intentionsContent}>
            {/* Mascote com balão de fala */}
            <View style={styles.mascotWithBalloon}>
              <View style={styles.mascotImageContainer}>
                <Image
                  source={require('../assets/images/duvidas.png')}
                  style={styles.mascotImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.speechBalloon}>
                <Text style={styles.speechText}>
                  Como você gostaria de ser chamado?
                </Text>
                <View style={styles.balloonTail} />
              </View>
            </View>

            {/* Campo de entrada de nome */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.nameInput}
                placeholder="Digite seu primeiro nome"
                placeholderTextColor="#AFAFAF"
                value={firstName}
                onChangeText={setFirstName}
                autoCapitalize="words"
                autoCorrect={false}
              />
            </View>
          </View>
        </ScrollView>

        {/* Botão continuar fixo na parte inferior */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !firstName.trim() && styles.continueButtonDisabled
            ]}
            onPress={() => setCurrentStep(8)}
            disabled={!firstName.trim()}
          >
            <Text style={[
              styles.continueButtonText,
              !firstName.trim() && styles.continueButtonTextDisabled
            ]}>
              CONTINUAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Tela de Frequência de Aprendizado (Step 8)
  if (currentStep === 8) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header com botão voltar e barra de progresso */}
          <View style={styles.headerWithProgress}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep(7)}
            >
              <Ionicons name="arrow-back" size={32} color="#AFAFAF" />
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '88%' }]} />
              </View>
            </View>
          </View>

          <View style={styles.intentionsContent}>
            {/* Mascote com balão de fala */}
            <View style={styles.mascotWithBalloon}>
              <View style={styles.mascotImageContainer}>
                <Image
                  source={require('../assets/images/duvidas.png')}
                  style={styles.mascotImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.speechBalloon}>
                <Text style={styles.speechText}>
                  Com que frequência você gostaria de aprender?
                </Text>
                <View style={styles.balloonTail} />
              </View>
            </View>

            {/* Instrução */}
            <Text style={styles.instructionText}>Selecione uma opção</Text>

            {/* Opções de frequência */}
            <View style={styles.intentionsContainer}>
              {learningFrequencies.map((frequency, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.intentionButton,
                    learningFrequency === frequency && styles.intentionButtonSelected
                  ]}
                  onPress={() => setLearningFrequency(frequency)}
                >
                  <Text style={[
                    styles.intentionText,
                    learningFrequency === frequency && styles.intentionTextSelected
                  ]}>
                    {frequency}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Botão continuar fixo na parte inferior */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !learningFrequency && styles.continueButtonDisabled
            ]}
            onPress={() => setCurrentStep(9)}
            disabled={!learningFrequency}
          >
            <Text style={[
              styles.continueButtonText,
              !learningFrequency && styles.continueButtonTextDisabled
            ]}>
              CONTINUAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Tela de Horário Devocional (Step 9)
  if (currentStep === 9) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header com botão voltar e barra de progresso */}
          <View style={styles.headerWithProgress}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep(8)}
            >
              <Ionicons name="arrow-back" size={32} color="#AFAFAF" />
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '99%' }]} />
              </View>
            </View>
          </View>

          <View style={styles.intentionsContent}>
            {/* Mascote com balão de fala */}
            <View style={styles.mascotWithBalloon}>
              <View style={styles.mascotImageContainer}>
                <Image
                  source={require('../assets/images/duvidas.png')}
                  style={styles.mascotImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.speechBalloon}>
                <Text style={styles.speechText}>
                  Qual é o melhor período do dia para seu devocional?
                </Text>
                <View style={styles.balloonTail} />
              </View>
            </View>

            {/* Instrução */}
            <Text style={styles.instructionText}>Selecione uma opção</Text>

            {/* Opções de horário devocional */}
            <View style={styles.intentionsContainer}>
              {devotionalTimes.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.intentionButton,
                    devotionalTime === time && styles.intentionButtonSelected
                  ]}
                  onPress={() => setDevotionalTime(time)}
                >
                  <Text style={[
                    styles.intentionText,
                    devotionalTime === time && styles.intentionTextSelected
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Lembretes adicionais */}
            <Text style={[styles.instructionText, { marginTop: 40, marginBottom: 16 }]}>
              Lembretes adicionais (opcional)
            </Text>

            <View style={styles.intentionsContainer}>
              {additionalReminderOptions.map((reminder, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.intentionButton,
                    additionalReminders.includes(reminder) && styles.intentionButtonSelected
                  ]}
                  onPress={() => toggleAdditionalReminder(reminder)}
                >
                  <Text style={[
                    styles.intentionText,
                    additionalReminders.includes(reminder) && styles.intentionTextSelected
                  ]}>
                    {reminder}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Botão continuar fixo na parte inferior */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              !devotionalTime && styles.continueButtonDisabled
            ]}
            onPress={() => setCurrentStep(10)}
            disabled={!devotionalTime}
          >
            <Text style={[
              styles.continueButtonText,
              !devotionalTime && styles.continueButtonTextDisabled
            ]}>
              FINALIZAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Tela de Loading (Step 10)
  if (currentStep === 10) {
    return (
      <View style={styles.container}>
        {/* Header com barra de progresso */}
        <View style={styles.headerWithProgress}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '100%' }]} />
            </View>
          </View>
        </View>

        <View style={styles.loadingContent}>
          {/* GIF de Loading */}
          <View style={styles.loadingImageContainer}>
            <Image
              source={require('../assets/images/loading.gif')}
              style={styles.loadingImage}
              resizeMode="contain"
            />

            {/* Porcentagem de carregamento */}
            <Text style={styles.loadingPercentage}>{loadingPercentage}%</Text>
          </View>

          {/* Título */}
          <Text style={styles.loadingTitle}>CURSO QUASE PRONTO...</Text>

          {/* Descrição */}
          <Text style={styles.loadingDescription}>
            Agora você vai fazer parte dos milhares de pessoas que{'\n'}
            estudam a Bíblia no Shalom!
          </Text>
        </View>
      </View>
    );
  }

  // Tela de Intenções (Step 1)
  if (currentStep === 1) {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header com botão voltar e barra de progresso */}
          <View style={styles.headerWithProgress}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentStep(0)}
            >
              <Ionicons name="arrow-back" size={32} color="#AFAFAF" />
            </TouchableOpacity>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '11%' }]} />
              </View>
            </View>
          </View>

          <View style={styles.intentionsContent}>
            {/* Mascote com balão de fala */}
            <View style={styles.mascotWithBalloon}>
              <View style={styles.mascotImageContainer}>
                <Image
                  source={require('../assets/images/duvidas.png')}
                  style={styles.mascotImage}
                  resizeMode="contain"
                />
              </View>

              <View style={styles.speechBalloon}>
                <Text style={styles.speechText}>
                  Quais são seus objetivos aqui?
                </Text>
                <View style={styles.balloonTail} />
              </View>
            </View>

            {/* Instrução */}
            <Text style={styles.instructionText}>Selecione um ou mais</Text>

            {/* Opções de intenção */}
            <View style={styles.intentionsContainer}>
              {intentions.map((intention, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.intentionButton,
                    selectedIntentions.includes(intention) && styles.intentionButtonSelected
                  ]}
                  onPress={() => toggleIntention(intention)}
                >
                  <Text style={[
                    styles.intentionText,
                    selectedIntentions.includes(intention) && styles.intentionTextSelected
                  ]}>
                    {intention}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        {/* Botão continuar fixo na parte inferior */}
        <View style={styles.fixedButtonContainer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              selectedIntentions.length === 0 && styles.continueButtonDisabled
            ]}
            onPress={() => setCurrentStep(2)}
            disabled={selectedIntentions.length === 0}
          >
            <Text style={[
              styles.continueButtonText,
              selectedIntentions.length === 0 && styles.continueButtonTextDisabled
            ]}>
              CONTINUAR
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Fallback - não deveria chegar aqui
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  headerWithProgress: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1CB0F6',
    borderRadius: 2,
  },
  intentionsContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mascotWithBalloon: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 40,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  mascotImageContainer: {
    marginRight: 20,
    marginTop: 16,
  },
  mascotImage: {
    width: 120,
    height: 120,
  },
  speechBalloon: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 20,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    minHeight: 80,
  },
  speechText: {
    fontSize: 18,
    color: '#4B4B4B',
    fontWeight: '500',
    lineHeight: 26,
  },
  balloonTail: {
    position: 'absolute',
    left: -8,
    top: 20,
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderTopColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: 'transparent',
    borderRightWidth: 12,
    borderRightColor: '#FFFFFF',
  },
  instructionText: {
    fontSize: 16,
    color: '#AFAFAF',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '500',
  },
  mascotContainer: {
    marginBottom: 48,
  },
  mascot: {
    width: 180,
    height: 180,
  },


  intentionsContainer: {
    width: '100%',
    gap: 16,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  intentionButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  intentionButtonSelected: {
    borderColor: '#1CB0F6',
    backgroundColor: '#E3F2FD',
  },
  intentionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  intentionTextSelected: {
    color: '#1976D2',
  },
  fixedButtonContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  continueButton: {
    backgroundColor: '#1CB0F6',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 48,
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  continueButtonTextDisabled: {
    color: '#999',
  },
  title: {
    fontSize: 42,
    fontWeight: '700',
    color: '#1CB0F6',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'System',
  },
  subtitle: {
    fontSize: 15,
    color: '#AFAFAF',
    textAlign: 'center',
    marginBottom: 120,
    fontWeight: '400',
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
    paddingHorizontal: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    minHeight: 56,
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#1CB0F6',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#E5E5E5',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  secondaryButtonText: {
    color: '#1CB0F6',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  loadingContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  loadingImageContainer: {
    marginBottom: 60,
    alignItems: 'center',
  },
  loadingPercentage: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1CB0F6',
    marginTop: 16,
  },
  loadingImage: {
    width: 200,
    height: 200,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#AFAFAF',
    textAlign: 'center',
    marginBottom: 40,
    letterSpacing: 1,
  },
  loadingDescription: {
    fontSize: 18,
    color: '#AFAFAF',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '400',
  },
  sliderContainer: {
    paddingHorizontal: 20,
    marginVertical: 40,
    alignItems: 'center',
  },
  sliderWrapper: {
    width: '100%',
    marginBottom: 20,
  },
  sliderTrack: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    position: 'relative',
    marginBottom: 16,
  },
  sliderFill: {
    height: '100%',
    backgroundColor: '#1CB0F6',
    borderRadius: 4,
  },
  sliderThumb: {
    position: 'absolute',
    top: -8,
    width: 24,
    height: 24,
    backgroundColor: '#1CB0F6',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginLeft: -12, // Centraliza o thumb
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderLabel: {
    fontSize: 14,
    color: '#AFAFAF',
    fontWeight: '500',
  },
  sliderStatusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1CB0F6',
    textAlign: 'center',
    marginTop: 16,
  },

  inputContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  nameInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});