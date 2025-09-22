export interface ProgressSegments {
  segment1: boolean; // Superior direita (0-25%)
  segment2: boolean; // Inferior direita (25-50%)
  segment3: boolean; // Inferior esquerda (50-75%)
  segment4: boolean; // Superior esquerda (75-100%)
}

export const calculateProgressSegments = (progress: number): ProgressSegments => {
  return {
    segment1: progress >= 25,
    segment2: progress >= 50,
    segment3: progress >= 75,
    segment4: progress >= 100
  };
};

export const getModuleImage = (moduleId: number): any => {
  try {
    if (moduleId === 1) {
      return require('../assets/images/m1.png');
    }
    return require('../assets/images/m2.png');
  } catch (error) {
    console.warn(`Failed to load image for module ${moduleId}:`, error);
    // Fallback para m1.png se m2.png não existir
    return require('../assets/images/m1.png');
  }
};

export const getSegmentRotation = (segmentIndex: number): number => {
  const rotations = [0, 90, 180, 270]; // Superior direita, inferior direita, inferior esquerda, superior esquerda
  return rotations[segmentIndex] || 0;
};