import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MainLayout } from '../../components/layout/MainLayout';
import { Sidebar } from '../../components/layout/Sidebar';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/Card';
import { Progress } from '../../components/ui/Progress';
import { useAuth } from '../../contexts/AuthContext';

// Dados mock das lições
const lessonsData = [
  {
    id: 1,
    title: "Gênesis - Criação",
    subtitle: "Vela do conhecer",
    daysAgo: 30,
    status: "review_soon", // review_soon, review_urgent, well_maintained
    progress: 85,
    icon: "🌱"
  },
  {
    id: 2,
    title: "Êxodo - Libertação",
    subtitle: "Vela do conhecer", 
    daysAgo: 45,
    status: "review_urgent",
    progress: 92,
    icon: "🔥"
  },
  {
    id: 3,
    title: "Salmos - Adoração",
    subtitle: "Vela do conhecer",
    daysAgo: 20,
    status: "well_maintained",
    progress: 78,
    icon: "🎵"
  },
  {
    id: 4,
    title: "João - Amor Divino",
    subtitle: "Vela do conhecer",
    daysAgo: 35,
    status: "review_soon",
    progress: 65,
    icon: "❤️"
  },
  {
    id: 5,
    title: "Mateus - Sermão",
    subtitle: "Vela do conhecer",
    daysAgo: 25,
    status: "review_soon",
    progress: 88,
    icon: "⛰️"
  },
  {
    id: 6,
    title: "Provérbios - Sabedoria",
    subtitle: "Vela do conhecer",
    daysAgo: 50,
    status: "review_urgent",
    progress: 95,
    icon: "💡"
  }
];

const currentLessons = [
  {
    id: 1,
    title: "Os Milagres de Jesus",
    subtitle: "Novo Testamento",
    progress: 75,
    status: "intermediate"
  },
  {
    id: 2,
    title: "Reis de Israel", 
    subtitle: "Antigo Testamento",
    progress: 100,
    status: "advanced"
  }
];

export default function HomePage() {
  const { user } = useAuth();
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'review_urgent': return '#ef4444';
      case 'review_soon': return '#f59e0b';
      case 'well_maintained': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'review_urgent': return 'Revisar Urgente';
      case 'review_soon': return 'Revisar em Breve';
      case 'well_maintained': return 'Bem Conservado';
      default: return 'Revisar';
    }
  };

  return (
    <MainLayout scrollable={false}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        {/* Header com saudação */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => setSidebarVisible(true)}
          >
            <Ionicons name="menu" size={24} color="#1f2937" />
          </TouchableOpacity>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Olá, {user?.name || 'João Silva'}!</Text>
            <Text style={styles.subGreeting}>Continue sua jornada de aprendizado bíblico</Text>
          </View>
          <View style={styles.mascotContainer}>
            <Text style={styles.mascotEmoji}>🕊️</Text>
          </View>
        </View>

        {/* Seção de Qualidades em Desenvolvimento */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Qualidades em Desenvolvimento</Text>
          <View style={styles.qualitiesContainer}>
            {['Bondade', 'Amor ao Próximo', 'Saber Perdoar', 'Paciência', 'Sabedoria'].map((quality, index) => (
              <View key={quality} style={styles.qualityItem}>
                <View style={[styles.qualityCircle, { backgroundColor: index < 3 ? '#3b82f6' : '#e5e7eb' }]}>
                  <Text style={[styles.qualityNumber, { color: index < 3 ? 'white' : '#9ca3af' }]}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={styles.qualityLabel}>{quality}</Text>
                <Text style={styles.qualityProgress}>{Math.max(0, 75 - index * 15)}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Continue de onde parou */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Continue de onde parou</Text>
            <View style={styles.xpBadge}>
              <Text style={styles.xpText}>+120 XP</Text>
              <Text style={styles.xpSubtext}>ao completar</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.continueCard}>
            <View style={styles.continueContent}>
              <View style={styles.playButton}>
                <Ionicons name="play" size={24} color="white" />
              </View>
              <View style={styles.continueInfo}>
                <Text style={styles.continueTitle}>Continue de onde parou</Text>
                <Text style={styles.continueSubtitle}>Parábolas do Reino • Lição 3</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Aprendizado Resumido */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Aprendizado Resumido</Text>
            <View style={styles.xpBadge}>
              <Text style={styles.xpText}>+120 XP</Text>
              <Text style={styles.xpSubtext}>ao melhorar</Text>
            </View>
          </View>

          <View style={styles.currentLessonsContainer}>
            {currentLessons.map((lesson) => (
              <Card key={lesson.id} style={styles.currentLessonCard}>
                <CardContent style={styles.currentLessonContent}>
                  <View style={styles.currentLessonInfo}>
                    <Text style={styles.currentLessonTitle}>{lesson.title}</Text>
                    <Text style={styles.currentLessonSubtitle}>{lesson.subtitle}</Text>
                    <Progress value={lesson.progress} style={styles.currentLessonProgress} />
                  </View>
                  <View style={styles.currentLessonActions}>
                    <View style={[styles.statusBadge, { backgroundColor: lesson.status === 'advanced' ? '#8b5cf6' : '#3b82f6' }]}>
                      <Text style={styles.statusBadgeText}>
                        {lesson.status === 'advanced' ? 'Avançado' : 'Intermediário'}
                      </Text>
                    </View>
                    <Button title="Continuar" size="sm" />
                  </View>
                </CardContent>
              </Card>
            ))}
          </View>
        </View>

        {/* Sempre bom revisar */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sempre bom revisar</Text>
            <View style={styles.xpBadge}>
              <Text style={styles.xpText}>+50 XP</Text>
              <Text style={styles.xpSubtext}>ao melhorar</Text>
            </View>
          </View>

          <Card style={styles.reviewCard}>
            <CardContent style={styles.reviewContent}>
              <View style={styles.reviewScore}>
                <Text style={styles.scoreNumber}>7.5</Text>
                <Text style={styles.scoreLabel}>Pontuação anterior</Text>
                <Button title="Tentar 10.0" variant="outline" size="sm" />
              </View>
              <View style={styles.reviewInfo}>
                <Text style={styles.reviewTitle}>Parábolas do Reino</Text>
                <Text style={styles.reviewSubtitle}>🙏 Mãos Protegendo o Mundo</Text>
              </View>
              <View style={styles.rewardBadge}>
                <Ionicons name="flame" size={16} color="#f59e0b" />
                <Text style={styles.rewardText}>Recompensa</Text>
                <Text style={styles.rewardSubtext}>Recupere um dia de ofensiva</Text>
              </View>
            </CardContent>
          </Card>
        </View>

        {/* Não deixe a chama apagar */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Não deixe a chama apagar</Text>
          
          <View style={styles.lessonsGrid}>
            {lessonsData.map((lesson) => (
              <Card key={lesson.id} style={styles.lessonCard}>
                <CardContent style={styles.lessonContent}>
                  <View style={styles.lessonHeader}>
                    <Text style={styles.lessonTitle}>{lesson.title}</Text>
                    <Text style={styles.lessonIcon}>{lesson.icon}</Text>
                  </View>
                  <Text style={styles.lessonSubtitle}>{lesson.subtitle}</Text>
                  <Text style={styles.lessonDays}>{lesson.daysAgo} dias se passaram</Text>
                  
                  <View style={[styles.statusButton, { backgroundColor: getStatusColor(lesson.status) }]}>
                    <Text style={styles.statusButtonText}>{getStatusText(lesson.status)}</Text>
                  </View>
                </CardContent>
              </Card>
            ))}
            
            {/* Botão Ver mais */}
            <TouchableOpacity style={styles.seeMoreCard}>
              <Text style={styles.seeMoreText}>Ver mais</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      
      <Sidebar 
        visible={sidebarVisible} 
        onClose={() => setSidebarVisible(false)} 
      />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  menuButton: {
    padding: 8,
    marginRight: 16,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: '#6b7280',
  },
  mascotContainer: {
    alignItems: 'center',
  },
  mascot: {
    width: 60,
    height: 60,
    backgroundColor: '#e0f2fe',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotEmoji: {
    fontSize: 32,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  xpBadge: {
    backgroundColor: '#10b981',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
  },
  xpText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  xpSubtext: {
    color: 'white',
    fontSize: 12,
    opacity: 0.9,
  },
  qualitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  qualityItem: {
    alignItems: 'center',
    flex: 1,
  },
  qualityCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  qualityNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  qualityLabel: {
    fontSize: 12,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 4,
  },
  qualityProgress: {
    fontSize: 12,
    color: '#6b7280',
  },
  continueCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playButton: {
    width: 60,
    height: 60,
    backgroundColor: '#3b82f6',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  continueInfo: {
    flex: 1,
  },
  continueTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  continueSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  currentLessonsContainer: {
    gap: 12,
  },
  currentLessonCard: {
    backgroundColor: 'white',
  },
  currentLessonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  currentLessonInfo: {
    flex: 1,
    marginRight: 16,
  },
  currentLessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  currentLessonSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  currentLessonProgress: {
    height: 6,
  },
  currentLessonActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  reviewCard: {
    backgroundColor: 'white',
  },
  reviewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  reviewScore: {
    alignItems: 'center',
  },
  scoreNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  reviewSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  rewardBadge: {
    backgroundColor: '#fef3c7',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 100,
  },
  rewardText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#92400e',
    marginTop: 4,
  },
  rewardSubtext: {
    fontSize: 10,
    color: '#92400e',
    textAlign: 'center',
    marginTop: 2,
  },
  lessonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  lessonCard: {
    width: '48%',
    backgroundColor: 'white',
  },
  lessonContent: {
    padding: 16,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  lessonIcon: {
    fontSize: 20,
  },
  lessonSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  lessonDays: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 12,
  },
  statusButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  statusButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  seeMoreCard: {
    width: '48%',
    height: 120,
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
  },
  seeMoreText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
});