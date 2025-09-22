const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure that we resolve react-native to react-native-web when bundling for web
config.resolver.alias = {
  ...config.resolver.alias,
  'react-native': 'react-native-web',
};

module.exports = config;