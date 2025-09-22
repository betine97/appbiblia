# Design Document

## Overview

Este documento detalha o design técnico para implementar as melhorias na barra de progresso circular dos módulos na tela de jornada. O design foca em criar uma experiência visual mais rica através de segmentação da barra de progresso, animações pulsantes e melhor organização visual dos elementos.

## Architecture

### Component Structure
- **ModuleCircle**: Componente principal que renderiza cada módulo
- **SegmentedProgressRing**: Novo componente para renderizar a barra segmentada
- **AnimatedProgressSegment**: Componente individual para cada segmento da barra

### Animation System
- Utilização do sistema de animação nativo do React Native (Animated API)
- Animações independentes para cada segmento de progresso
- Sistema de pulsação contínua para módulos ativos

## Components and Interfaces

### SegmentedProgressRing Component

```typescript
interface SegmentedProgressRingProps {
  progress: number; // 0-100
  size: number;
  strokeWidth: number;
  activeColor: string;
  inactiveColor: string;
  isActive: boolean;
  segments: number; // Sempre 4
}
```

**Responsabilidades:**
- Renderizar 4 segmentos de progresso com espaçamento
- Controlar animações de preenchimento
- Gerenciar efeito pulsante para módulos ativos

### AnimatedProgressSegment Component

```typescript
interface AnimatedProgressSegmentProps {
  isActive: boolean;
  color: string;
  rotation: number; // Rotação em graus para posicionamento
  animationDelay: number;
  size: number;
  strokeWidth: number;
}
```

**Responsabilidades:**
- Renderizar um segmento individual da barra
- Controlar animação de preenchimento do segmento
- Aplicar rotação para posicionamento correto

## Data Models

### Progress Calculation Model

```typescript
interface ProgressSegments {
  segment1: boolean; // Superior direita (0-25%)
  segment2: boolean; // Inferior direita (25-50%)
  segment3: boolean; // Inferior esquerda (50-75%)
  segment4: boolean; // Superior esquerda (75-100%)
}

const calculateSegments = (progress: number): ProgressSegments => {
  return {
    segment1: progress >= 25,
    segment2: progress >= 50,
    segment3: progress >= 75,
    segment4: progress >= 100
  };
};
```

### Module Image Configuration

```typescript
interface ModuleImageConfig {
  [moduleId: number]: string;
}

const moduleImages: ModuleImageConfig = {
  1: 'm1.png', // Gênesis
  // Todos os outros módulos usam m2.png por padrão
};
```

## Error Handling

### Animation Error Handling
- Fallback para progresso estático se animações falharem
- Verificação de disponibilidade de recursos de imagem
- Tratamento gracioso de valores de progresso inválidos

### Image Loading Error Handling
- Fallback para imagem padrão se imagem específica não carregar
- Placeholder durante carregamento de imagens
- Tratamento de diferentes resoluções de tela

## Testing Strategy

### Unit Tests
- Teste de cálculo de segmentos baseado em porcentagem de progresso
- Teste de seleção correta de imagens por módulo
- Teste de valores de animação em diferentes estados

### Integration Tests
- Teste de interação entre componentes de progresso e módulo
- Teste de animações em diferentes dispositivos
- Teste de responsividade em diferentes tamanhos de tela

### Visual Regression Tests
- Comparação de screenshots dos módulos em diferentes estados de progresso
- Verificação de alinhamento e espaçamento dos elementos
- Validação de animações pulsantes

## Implementation Details

### Segment Positioning
Os 4 segmentos serão posicionados usando rotação SVG:
- Segmento 1 (Superior direita): 0° - 90°
- Segmento 2 (Inferior direita): 90° - 180°
- Segmento 3 (Inferior esquerda): 180° - 270°
- Segmento 4 (Superior esquerda): 270° - 360°

### Spacing Between Segments
- Cada segmento terá 85° de arco ativo
- 5° de espaço entre cada segmento
- Total: 4 × 85° + 4 × 5° = 360°

### Pulsation Animation
```typescript
const pulseAnimation = Animated.loop(
  Animated.sequence([
    Animated.timing(scaleValue, {
      toValue: 1.15,
      duration: 600,
      useNativeDriver: true,
    }),
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }),
  ])
);
```

### Layout Adjustments
- Aumentar `paddingTop` do container de módulos de 30 para 60
- Manter `marginBottom` entre módulos em 40
- Ajustar `moduleWrapper` para acomodar novo posicionamento

### Image Management
- Criar função utilitária `getModuleImage(moduleId: number)`
- Implementar lazy loading para imagens não utilizadas
- Otimizar tamanho das imagens para performance

## Performance Considerations

### Animation Performance
- Usar `useNativeDriver: true` sempre que possível
- Limitar animações simultâneas a elementos visíveis
- Implementar `shouldComponentUpdate` para evitar re-renders desnecessários

### Memory Management
- Cleanup de animações quando componente é desmontado
- Otimização de imagens para diferentes densidades de tela
- Cache de cálculos de segmentos para evitar recálculos

### Accessibility
- Manter labels adequados para leitores de tela
- Garantir que animações não causem problemas de acessibilidade
- Fornecer alternativas para usuários com sensibilidade a movimento