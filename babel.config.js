module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
        },
      ],
      // ⚠️ O plugin do Reanimated precisa ser o último SEMPRE!
      'react-native-reanimated/plugin',
    ],
  };
};
