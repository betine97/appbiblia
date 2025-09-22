import { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Animated, Modal, Dimensions } from 'react-native';
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

// Mapeamento das imagens para evitar require dinâmico
type ImageKey = 'card-genesis-concluido.png' | 'card-exodo-em-progresso.png' | 'card-levidico-bloqueado.png';

const imageMap: Record<ImageKey, any> = {
  'card-genesis-concluido.png': require('../../assets/images/card-genesis-concluido.png'),
  'card-exodo-em-progresso.png': require('../../assets/images/card-exodo-em-progresso.png'),
  'card-levidico-bloqueado.png': require('../../assets/images/card-levidico-bloqueado.png'),
};

const { width } = Dimensions.get('window');

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
          {/* Removed Image component */}
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

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState<number | null>(null);
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageKey | null>(null);

  const gnRef = useRef<TouchableOpacity>(null);
  const exRef = useRef<TouchableOpacity>(null);

  const handleModulePress = (moduleId: number) => {
    if (moduleId === 1) {
      setSelectedImage('card-genesis-concluido.png');
      setShowImage(true);
    } else if (moduleId === 2) {
      setSelectedImage('card-exodo-em-progresso.png');
      setShowImage(true);
    } else if (moduleId === 3) {
      setSelectedImage('card-levidico-bloqueado.png');
      setShowImage(true);
    } else {
      setSelectedModuleId(moduleId);
      setModalVisible(true);
    }
  };

  const moduleInfo: Record<number, { name: string; summary: string; essence: string; color: string }> = {
    1: {
      name: 'Gênesis',
      summary: 'A criação do mundo, a queda do homem, o dilúvio e a formação do povo de Israel',
      essence: 'Mostra como Deus estabelece a base da história humana e do Seu plano de redenção.',
      color: '#10B981', // green
    },
    2: {
      name: 'Êxodo',
      summary: 'Narra a saída dos israelitas do Egito, a liderança de Moisés, a travessia do Mar Vermelho e a entrega da Lei no Sinai.',
      essence: 'Marca a libertação do povo da escravidão e o estabelecimento da aliança com Deus.',
      color: '#F59E0B', // yellow
    },
    3: {
      name: 'Levítico',
      summary: 'Livro centrado nas leis cerimoniais, sacrificiais e de pureza, destacando o sacerdócio levítico.',
      essence: 'Ensina que o povo deveria ser santo, separado para Deus, vivendo em obediência e reverência.',
      color: '#9CA3AF', // gray
    },
    4: {
      name: 'Números',
      summary: 'Conta a jornada dos israelitas pelo deserto, marcada por murmurações, rebeldias e provações.',
      essence: 'Mostra como a falta de fé e desobediência atrasaram a entrada na Terra Prometida, mas também como Deus guiou e sustentou.',
      color: '#9CA3AF', // gray
    },
    5: {
      name: 'Deuteronômio',
      summary: 'Discurso de despedida de Moisés, revisando a Lei e exortando o povo à fidelidade antes de entrarem em Canaã.',
      essence: 'Reafirma a aliança de Deus, chamando Israel a obedecer de coração para prosperar na Terra Prometida.',
      color: '#9CA3AF', // gray
    },
  };

  const selectedInfo = selectedModuleId ? moduleInfo[selectedModuleId] : null;

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
              <Text style={styles.infoCardTitle}>Luz, Livre-arbítrio e Pecado Mortal</Text>
            </View>
            <View style={styles.infoCardIcon}>
              <Ionicons name="book-outline" size={24} color="#ffffff" />
            </View>
          </View>
        </View>
        
        {/* Removed section title */}
        
        {/* New module layout with columns */}
        <View style={styles.columnsContainer}>
          {/* Left column: ex */}
          <View style={styles.leftColumn}>
            <TouchableOpacity ref={exRef} style={[styles.moduleItem, { marginTop: 130, marginLeft: 40 }]} onPress={() => handleModulePress(2)}>
              <Image source={require('../../assets/images/ex-desbloqueado.png')} style={styles.moduleImageLarge} />
            </TouchableOpacity>
          </View>
          
          {/* Middle column: gn, nm, dt */}
          <View style={styles.middleColumn}>
            <TouchableOpacity ref={gnRef} style={[styles.gnItem, { marginTop: 0 }]} onPress={() => handleModulePress(1)}>
              <Image source={require('../../assets/images/gn.png')} style={styles.moduleImageLarge} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.nmItem, { marginTop: 160 }]} onPress={() => handleModulePress(4)}>
              <Image source={require('../../assets/images/nm-bloqueado.png')} style={styles.moduleImageLarge} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dtItem, { marginTop: 50 }]} onPress={() => handleModulePress(5)}>
              <Image source={require('../../assets/images/dt-bloqueado.png')} style={styles.moduleImageLarge} />
            </TouchableOpacity>
          </View>
          
          {/* Right column: lv */}
          <View style={styles.rightColumn}>
            <TouchableOpacity style={[styles.moduleItem, { marginTop: 130, marginRight: 40 }]} onPress={() => handleModulePress(3)}>
              <Image source={require('../../assets/images/lv-bloqueado.png')} style={styles.moduleImageLarge} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Removed old modulesTrail */}
      </ScrollView>

      {/* Backdrop and image for Gênesis and Êxodo */}
      {showImage && selectedImage && (
        <TouchableOpacity style={styles.backdrop} onPress={() => setShowImage(false)} activeOpacity={1}>
          <Image source={imageMap[selectedImage]} style={[styles.cardImage, {
            marginTop: selectedImage === 'card-genesis-concluido.png' ? 125 : (selectedImage === 'card-exodo-em-progresso.png' || selectedImage === 'card-levidico-bloqueado.png') ? 400 : 0
          }]} />
        </TouchableOpacity>
      )}

      {/* Modal for other modules */}
      <Modal
        visible={modalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity style={styles.modalBackdrop} onPress={() => setModalVisible(false)} activeOpacity={1}>
          {selectedInfo ? (
            <TouchableOpacity style={[styles.modalCard, { backgroundColor: selectedInfo.color }]} onPress={() => {}} activeOpacity={1}>
              <Text style={styles.modalTitle}>{selectedInfo.name}</Text>
              <Text style={styles.modalSubtitle}>{selectedInfo.summary}</Text>
              <Text style={styles.modalEssence}>{selectedInfo.essence}</Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>FECHAR</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>
      </Modal>
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
    paddingTop: 20, // Reduced from 100 to 20 to bring the card closer to the header
  },
  columnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  leftColumn: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  middleColumn: {
    flex: 1,
    alignItems: 'center',
  },
  rightColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  gnItem: {
    // Removed marginBottom
  },
  nmItem: {
    // Added marginTop in JSX
  },
  dtItem: {
    // Added marginTop in JSX
  },
  moduleItem: {
    alignItems: 'center',
    overflow: 'visible',
  },
  moduleItemLeft: {
    alignItems: 'center',
    marginRight: 0,
  },
  moduleItemRight: {
    alignItems: 'center',
    marginLeft: 0,
  },
  moduleImageNew: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  moduleImageLarge: {
    width: 121, // Increased by 15% from 105
    height: 121, // Increased by 15% from 105
    marginBottom: -20, // Further reduced to bring text closer
  },
  moduleImagePombo: {
    width: 124, // Increased by 20% from 103
    height: 124, // Increased by 20% from 103
    marginBottom: -20,
  },
  moduleImagePomboCircle: {
    width: 174, // Decreased by 30% from 248
    height: 174, // Decreased by 30% from 248
  },
  moduleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9CA3AF', // Changed to gray
    textAlign: 'center',
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
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: width * 1.44,
    height: (360 / 540) * (width * 1.44),
    resizeMode: 'contain',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: '95%', // Increased from 80% to 95% for almost full width
    minHeight: 200, // Added minHeight to make it taller
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  modalEssence: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
});