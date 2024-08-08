module.exports = {
  presets: ['module:@react-native/babel-preset', '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx'],
        root: ['.'],
        alias: {
          '@api': './src/storage/services',
          '@navigation': './src/navigation',
          '@components': './src/components',
          '@services': './src/services',
          '@screens': './src/screens',
          '@theme': './src/theme',
          '@utils': './src/utils',
          '@storage': './src/storage',
          '@type': './src/types/index',
        },
      },
    ],
  ],
};
