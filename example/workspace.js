const path = require('path');
const fs = require('fs');

const root = path.resolve(__dirname, '..');
const packages = path.resolve(root, 'packages');

const workspaces = fs
  .readdirSync(packages)
  .map(p => {
    const { name, peerDependencies } = JSON.parse(
      fs.readFileSync(path.resolve(packages, p, 'package.json'), 'utf8')
    );
    return {
      [name]: {
        path: path.resolve(packages, p),
        peerDependencies: Object.keys(peerDependencies),
      },
    };
  })
  .reduce((result, current) => {
    result = { ...result, ...current };
    return result;
  }, {});

module.exports = workspaces;
