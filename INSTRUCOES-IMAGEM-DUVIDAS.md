# 🤔 Instruções para Adicionar a Imagem de Dúvidas

## Passo a Passo:

1. **Crie ou encontre uma imagem PNG** da mascote com expressão de dúvida/pergunta
2. **Salve como**: `assets/images/duvidas.png`
3. **Tamanho recomendado**: 80x80 pixels
4. **Formato**: PNG com fundo transparente (preferível)

## Estrutura de Pastas:
```
projeto/
├── assets/
│   └── images/
│       ├── introappshalom.gif  ← GIF animado para tela inicial
│       └── duvidas.png         ← Imagem estática para tela de intenções
├── app/
│   └── onboarding.tsx
└── ...
```

## Para usar a imagem de dúvidas:

Após adicionar o arquivo `duvidas.png`, substitua esta linha no código:

**De:**
```tsx
source={require('../assets/images/introappshalom.gif')}
```

**Para:**
```tsx
source={require('../assets/images/duvidas.png')}
```

## Características da imagem ideal:
- ✅ Mascote com expressão pensativa/curiosa
- ✅ Fundo transparente
- ✅ Tamanho 80x80 pixels
- ✅ Formato PNG
- ✅ Boa qualidade e nítida

## Após adicionar:
1. Reinicie o servidor Expo
2. A imagem aparecerá na tela de intenções ao lado do balão de fala