import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StatsWidgetProps {
  visible?: boolean;
}

export function StatsWidget({ visible = true }: StatsWidgetProps) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Seus resultados</Text>
      </View>

      {/* Level Info */}
      <View style={styles.levelSection}>
        <Text style={styles.levelTitle}>Nível 5</Text>
        <Text style={styles.levelSubtitle}>Discípulo</Text>
        <Text style={styles.levelProgress}>1 dia até o próximo • Qualquer Plano</Text>
      </View>

      {/* Streak */}
      <View style={styles.streakSection}>
        <View style={styles.streakIcon}>
          <Ionicons name="flame" size={20} color="#f59e0b" />
        </View>
        <View style={styles.streakInfo}>
          <Text style={styles.streakNumber}>7 dias</Text>
          <Text style={styles.streakLabel}>Ofensiva</Text>
        </View>
      </View>

      <Text style={styles.streakSubtext}>300 XP para proteger nível</Text>

      {/* Weekly Missions */}
      <View style={styles.missionsSection}>
        <View style={styles.missionHeader}>
          <Ionicons name="calendar" size={16} color="#f59e0b" />
          <Text style={styles.missionTitle}>Missões da semana</Text>
        </View>
        <Text style={styles.missionSubtitle}>Ver todas</Text>

        <View style={styles.missionItem}>
          <Text style={styles.missionText}>Leia 3 versículos de Provérbios</Text>
          <Text style={styles.missionProgress}>2/3 versículos • +25 XP</Text>
        </View>

        <View style={styles.missionItem}>
          <Text style={styles.missionText}>Complete a lição "Fé em Ação"</Text>
          <Text style={styles.missionProgress}>0/1 lição • +40 XP</Text>
        </View>
      </View>

      {/* Extreme Challenge */}
      <View style={styles.challengeSection}>
        <View style={styles.challengeHeader}>
          <Ionicons name="flash" size={16} color="#ef4444" />
          <Text style={styles.challengeTitle}>DESAFIO EXTREMO</Text>
        </View>
        <Text style={styles.challengeText}>
          "Aprenda 21 dias de ofensiva se conseguir"
        </Text>
        <Text style={styles.challengeSubtext}>Apenas 26 concluções</Text>
        
        <TouchableOpacity style={styles.challengeButton}>
          <Text style={styles.challengeButtonText}>ACEITAR DESAFIO</Text>
        </TouchableOpacity>
      </View>

      {/* Divisão Prata */}
      <View style={styles.divisionSection}>
        <View style={styles.divisionHeader}>
          <View style={styles.divisionIcon}>
            <Ionicons name="trophy" size={16} color="#6b7280" />
          </View>
          <Text style={styles.divisionTitle}>Divisão Prata</Text>
        </View>
        <Text style={styles.divisionXP}>+500 XP</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0ea5e9',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    minWidth: 280,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  levelSection: {
    marginBottom: 16,
  },
  levelTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  levelSubtitle: {
    color: 'white',
    fontSize: 16,
    opacity: 0.9,
  },
  levelProgress: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
  },
  streakSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  streakIcon: {
    marginRight: 12,
  },
  streakInfo: {
    flex: 1,
  },
  streakNumber: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  streakLabel: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  streakSubtext: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 16,
  },
  missionsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  missionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  missionTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  missionSubtitle: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 12,
  },
  missionItem: {
    marginBottom: 8,
  },
  missionText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
  },
  missionProgress: {
    color: 'white',
    fontSize: 11,
    opacity: 0.8,
    marginTop: 2,
  },
  challengeSection: {
    backgroundColor: '#ef4444',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  challengeTitle: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  challengeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 4,
  },
  challengeSubtext: {
    color: 'white',
    fontSize: 11,
    opacity: 0.8,
    marginBottom: 12,
  },
  challengeButton: {
    backgroundColor: 'white',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  challengeButtonText: {
    color: '#ef4444',
    fontSize: 12,
    fontWeight: 'bold',
  },
  divisionSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    padding: 12,
  },
  divisionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divisionIcon: {
    marginRight: 8,
  },
  divisionTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  divisionXP: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});