const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const fs = require('fs');
const path = require('path');
const modulePaths = require('./packager/modulePaths');

const config = {
  transformer: {
    getTransformOptions: () => {
      const moduleMap = {};
      modulePaths.forEach(modulePath => {
        if (fs.existsSync(modulePath)) {
          moduleMap[path.resolve(modulePath)] = true;
        }
      });
      return {
        preloadedModules: moduleMap,
        transform: {inlineRequires: {blockList: moduleMap}},
      };
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);