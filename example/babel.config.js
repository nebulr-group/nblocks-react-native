const path = require('path');
const pak = require('../package.json');
module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            // For development, we want to alias the library to the source
            [pak.name.replace(/^(@nebulr-group\/)/,'')]: path.join(__dirname, '..', pak.source),
          },
        },
      ],
    ],
  };
};
