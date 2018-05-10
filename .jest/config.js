const path = require('path');

const resolve = p => path.resolve(__dirname, p);

module.exports = {
  coverageDirectory: resolve('coverage'),
  collectCoverageFrom: [
    '**/src/*.js',
  ],
  rootDir: resolve('../packages'),
  setupFiles: [
    resolve('adapter.js'),
  ],
  transform: {
    '\\.js$': resolve('transformer.js'),
  },
};
