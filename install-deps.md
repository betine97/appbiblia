# Comandos para Instalar Dependências - SDK 51

Execute os seguintes comandos na ordem:

```bash
# Limpar cache do npm
npm cache clean --force

# Remover node_modules e package-lock.json se existirem
rm -rf node_modules package-lock.json

# Instalar dependências compatíveis com SDK 51
npm install

# Se houver problemas, tente com --legacy-peer-deps
npm install --legacy-peer-deps

# Ou use yarn se preferir
yarn install
```

## Configuração para SDK 51:

1. Certifique-se de ter Node.js 18+ instalado
2. Instale o Expo CLI globalmente:
   ```bash
   npm install -g @expo/cli@latest
   ```

3. Verifique se o projeto está configurado para SDK 51:
   ```bash
   npx expo install --fix
   ```

4. Execute o projeto:
   ```bash
   npx expo start
   ```

## Dependências principais para SDK 51:
- expo@~51.0.0
- expo-router@~3.5.0
- react-native@0.74.0
- @expo/vector-icons@^14.0.0