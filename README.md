# BibleLearn - Aplicativo Mobile

Aplicativo de educação bíblica gamificado inspirado no Duolingo, desenvolvido com React Native e Expo.

## 🚀 Tecnologias Utilizadas

- **React Native** - Framework para desenvolvimento mobile
- **Expo** - Plataforma para desenvolvimento React Native
- **TypeScript** - Linguagem de programação
- **NativeWind** - Tailwind CSS para React Native
- **Expo Router** - Navegação baseada em arquivos
- **Ionicons** - Biblioteca de ícones

## 📱 Funcionalidades

- **Página Inicial**: Landing page com apresentação do app
- **Jornada**: Sistema de progressão gamificado com 9 níveis
- **Eu Cristão**: Módulos de desenvolvimento pessoal cristão
- **Correlacionar**: Conexões entre diferentes partes da Bíblia
- **Perfil**: Estatísticas do usuário e conquistas

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para executar

1. **Instale as dependências**
   ```bash
   npm install
   ```
   
   Se houver problemas, tente:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Execute o projeto**
   ```bash
   npx expo start
   ```

3. **Execute em dispositivos**
   - **iOS**: Pressione `i` no terminal (requer macOS e Xcode)
   - **Android**: Pressione `a` no terminal (requer Android Studio)
   - **Web**: Pressione `w` no terminal

## 📱 Testando no Dispositivo

1. Instale o app **Expo Go** no seu celular
2. Execute `npm start` no terminal
3. Escaneie o QR code que aparece no terminal com o Expo Go

## 🏗️ Estrutura do Projeto

```
├── app/                    # Páginas da aplicação (Expo Router)
│   ├── (tabs)/            # Navegação por abas
│   │   ├── index.tsx      # Página inicial
│   │   ├── jornada.tsx    # Página da jornada
│   │   ├── eu-cristao.tsx # Página Eu Cristão
│   │   ├── correlate.tsx  # Página Correlacionar
│   │   └── profile.tsx    # Página do perfil
│   └── _layout.tsx        # Layout raiz
├── components/            # Componentes reutilizáveis
│   ├── ui/               # Componentes de interface
│   └── layout/           # Componentes de layout
├── assets/               # Imagens e recursos
└── global.css           # Estilos globais
```

## 🎨 Design System

O app utiliza um design system baseado em:
- **Cores primárias**: Azul (#3b82f6) e Roxo (#8b5cf6)
- **Tipografia**: System fonts (iOS/Android)
- **Componentes**: Cards, Buttons, Progress bars
- **Ícones**: Ionicons

## 📦 Build para Produção

### Android (APK/AAB)
```bash
npm run build:android
```

### iOS (IPA)
```bash
npm run build:ios
```

### Publicação nas Lojas
```bash
# Android Play Store
npm run submit:android

# iOS App Store
npm run submit:ios
```

## 🔧 Configurações Adicionais

- **EAS Build**: Configurado para builds de produção
- **Expo Router**: Navegação baseada em arquivos
- **NativeWind**: Tailwind CSS para estilização
- **TypeScript**: Tipagem estática

## 📝 Próximos Passos

1. **Implementar autenticação** (Firebase Auth)
2. **Adicionar banco de dados** (Firebase Firestore)
3. **Sistema de notificações** (Expo Notifications)
4. **Modo offline** (AsyncStorage)
5. **Animações** (React Native Reanimated)
6. **Testes** (Jest + React Native Testing Library)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.