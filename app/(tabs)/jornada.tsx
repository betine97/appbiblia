import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import SegmentedProgressRing from '../../components/ui/SegmentedProgressRing';
import { getModuleImage } from '../../utils/moduleUtils';

interface ModuleData {
  id: number;
  name: string;
  progress: number;
  color: string;
}

const ModuleCircle = ({ module, onPress }: { module: ModuleData; onPress: () => void }) => {
  const size = 112;
  const strokeWidth = 10;
  const isActive = module.id === 1; // Apenas Gênesis é ativo
  const isLocked = !isActive;
  
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (!isActive) return;
    
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    
    onPress();
  };

  return (
    <TouchableOpacity 
      style={[styles.moduleContainer, isLocked && styles.moduleContainerLocked]} 
      onPress={handlePress}
      disabled={isLocked}
    >
      <Animated.View style={[styles.circleContainer, { transform: [{ scale: scaleAnim }] }]}>
        {/* Segmented Progress Ring */}
        <View style={styles.progressRingContainer}>
          <SegmentedProgressRing
            progress={module.progress}
            size={size}
            strokeWidth={strokeWidth}
            activeColor="#fac440"
            inactiveColor="#E5E7EB"
            isActive={isActive}
          />
        </View>
        
        {/* Inner circle with blue background and image */}
        <View style={[styles.moduleCircle, isLocked && styles.moduleCircleLocked]}>
          <View style={[
            styles.blueBackground, 
            { backgroundColor: isActive ? '#1CB0F6' : '#F3F4F6' }
          ]} />
          <Image 
            source={getModuleImage(module.id)} 
            style={[styles.moduleImage, isLocked && styles.moduleImageLocked]}
            resizeMode="contain"
          />
          {isLocked && (
            <View style={styles.lockOverlay}>
              <Ionicons name="lock-closed" size={24} color="#9CA3AF" />
            </View>
          )}
        </View>
      </Animated.View>
      
      <Text style={[styles.moduleName, isLocked && styles.moduleNameLocked]}>
        {module.name}
      </Text>
    </TouchableOpacity>
  );
};

export default function JornadaScreen() {
  const [modules, setModules] = useState<ModuleData[]>([
    { id: 1, name: 'Gênesis', progress: 50, color: '#1CB0F6' }, // Ativo
    { id: 2, name: 'Êxodo', progress: 0, color: '#9CA3AF' }, // Bloqueado
    { id: 3, name: 'Levítico', progress: 0, color: '#9CA3AF' }, // Bloqueado
    { id: 4, name: 'Números', progress: 0, color: '#9CA3AF' }, // Bloqueado
    { id: 5, name: 'Deuteronômio', progress: 0, color: '#9CA3AF' }, // Bloqueado
  ]);

  const handleModulePress = (moduleId: number) => {
    if (moduleId === 1) { // Apenas Gênesis
      setModules(prevModules => 
        prevModules.map(module => 
          module.id === 1 
            ? { ...module, progress: Math.min(module.progress + 25, 100) }
            : module
        )
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <Ionicons name="menu" size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.title}>Estudo Bíblico</Text>
        </View>
        
        <View style={styles.headerRight}>
          <View style={styles.streakContainer}>
            <Ionicons name="flame" size={20} color="#F97316" />
            <Text style={styles.streakNumber}>3</Text>
          </View>
          
          <View style={styles.crownHeaderContainer}>
            <Ionicons name="trophy" size={20} color="#F59E0B" />
            <Text style={styles.crownHeaderNumber}>12</Text>
          </View>
          
          <TouchableOpacity>
            <Ionicons name="ellipsis-vertical" size={24} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card informativo */}
        <View style={styles.infoCard}>
          <View style={styles.infoCardContent}>
            <View style={styles.infoCardText}>
              <Text style={styles.infoCardSubtitle}>SEÇÃO 1, UNIDADE 1</Text>
              <Text style={styles.infoCardTitle}>Aprenda sobre os pilares da fé</Text>
            </View>
            <View style={styles.infoCardIcon}>
              <Ionicons name="book-outline" size={24} color="#ffffff" />
            </View>
          </View>
        </View>
        
        <View style={styles.modulesTrail}>
          {modules.map((module, index) => (
            <View key={module.id} style={[
              styles.moduleWrapper,
              index % 2 === 0 ? styles.moduleLeft : styles.moduleRight
            ]}>
              <ModuleCircle 
                module={module} 
                onPress={() => handleModulePress(module.id)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  streakNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F97316',
  },
  crownHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  crownHeaderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F59E0B',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 100, // Aumentado de 60 para 100 para mover módulos mais para baixo
  },
  modulesTrail: {
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  moduleWrapper: {
    marginBottom: 60,
    alignItems: 'center',
  },
  moduleLeft: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  moduleRight: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  moduleContainer: {
    alignItems: 'center',
  },
  circleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 112,
    height: 112,
  },
  progressSvg: {
    position: 'absolute',
  },
  moduleCircle: {
    width: 80, // Reduzido ainda mais para dar maior margem de proteção
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  segmentsContainer: {
    position: 'absolute',
    width: 112,
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressSegment: {
    position: 'absolute',
    width: 12,
    height: 30,
    borderRadius: 6,
    top: 8,
  },
  blueBackground: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  progressRingContainer: {
    position: 'absolute',
    width: 112,
    height: 112,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleImage: {
    width: 85, // Aumentado ainda mais
    height: 85,
    zIndex: 1,
  },
  moduleImageLocked: {
    opacity: 0.4,
  },
  lockOverlay: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  moduleContainerLocked: {
    opacity: 0.6,
  },
  moduleCircleLocked: {
    opacity: 0.7,
  },
  moduleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginTop: 12,
    textAlign: 'center',
  },
  moduleNameLocked: {
    color: '#9CA3AF',
  },
  infoCard: {
    backgroundColor: '#1CB0F6',
    borderRadius: 16,
    marginBottom: 32,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  infoCardText: {
    flex: 1,
  },
  infoCardSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    lineHeight: 24,
  },
  infoCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
  },
});