# ⏳ Instruções para Adicionar o GIF de Loading

## Passo a Passo:

1. **Salve o GIF de loading** como: `assets/images/loading.gif`
2. **Características do GIF ideal**:
   - Mascote em movimento/animação
   - Indicando carregamento ou preparação
   - Tamanho: 200x200 pixels
   - Fundo transparente (preferível)

## Estrutura de Pastas:
```
projeto/
├── assets/
│   └── images/
│       ├── introappshalom.gif  ← GIF para tela inicial
│       ├── duvidas.png         ← Imagem para tela de intenções
│       └── loading.gif         ← GIF para tela de loading
├── app/
│   └── onboarding.tsx
└── ...
```

## Funcionalidade:
- A tela aparece após clicar em "CONTINUAR" na tela de intenções
- Mostra por 3 segundos
- Depois redireciona automaticamente para `/auth/register`
- Barra de progresso em 50%

## Texto da tela:
- **Título**: "CURSO QUASE PRONTO..."
- **Descrição**: "Agora você vai fazer parte dos milhares de pessoas que estudam a Bíblia no Shalom!"

## Após adicionar o arquivo:
1. Reinicie o servidor Expo
2. Teste o fluxo completo: Tela inicial → Intenções → Loading → Registro