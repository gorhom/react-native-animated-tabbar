const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');
const workspace = require('./workspace');

const node_modules = path.resolve(__dirname, '..', 'node_modules');

// extract peer dependencies of workspace packages
const peerDependencies = Object.keys(workspace).reduce(
  (result, packageName) => {
    workspace[packageName].peerDependencies
      .filter(
        peerDependency =>
          peerDependency !== 'react-native' || peerDependency !== 'react'
      )
      .map(peerDependency => {
        result[peerDependency] = path.join(node_modules, peerDependency);
      });
    return result;
  },
  {}
);

// extract workspaces packages
const workspacePackages = Object.keys(workspace).reduce(
  (result, packageName) => {
    result[packageName] = path.resolve(workspace[packageName].path, 'src');
    return result;
  },
  {}
);

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  config.module.rules.push({
    test: /\.(js|ts|tsx)$/,
    include: /(packages|example)\/.+/,
    exclude: /node_modules/,
    use: 'babel-loader',
  });

  Object.assign(config.resolve.alias, {
    ...peerDependencies,
    ...workspacePackages,
    react: path.resolve(node_modules, 'react'),
    'react-native': path.resolve(node_modules, 'react-native-web'),
    'react-native-web': path.resolve(node_modules, 'react-native-web'),
  });

  return config;
};
