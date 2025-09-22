# 🦉 Instruções para Adicionar a Mascote

## Passo a Passo:

1. **Salve o GIF da corujinha azul** que você enviou como:
   ```
   assets/images/introappshalom.gif
   ```

2. **Substitua o arquivo placeholder** que está em `assets/images/introappshalom.gif`

3. **Certifique-se de que o arquivo é um GIF animado** com o nome exato: `introappshalom.gif`

## Estrutura de Pastas:
```
projeto/
├── assets/
│   └── images/
│       └── introappshalom.gif  ← Coloque o GIF aqui
├── app/
│   └── onboarding.tsx
└── ...
```

## Verificação:
- ✅ O arquivo deve estar em `assets/images/introappshalom.gif`
- ✅ O nome deve ser exatamente `introappshalom.gif`
- ✅ Deve ser um arquivo GIF (não PNG ou JPG)

## Após adicionar o arquivo:
1. Reinicie o servidor Expo (`Ctrl+C` e depois `npx expo start`)
2. A mascote aparecerá automaticamente nas telas de onboarding

## Problema Comum:
Se o GIF não aparecer, verifique:
- O caminho do arquivo está correto
- O arquivo é realmente um GIF
- Reiniciou o servidor após adicionar o arquivo