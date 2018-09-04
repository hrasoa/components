const path = require('path');

const resolve = p => path.resolve(__dirname, p);

module.exports = {
  coverageDirectory: resolve('../coverage/jest'),
  collectCoverageFrom: [
    '**/src/*.js',
    '!**/src/index.js',
  ],
  rootDir: resolve('../packages'),
  setupFiles: [
    resolve('adapter.js'),
  ],
  transform: {
    '\\.js$': resolve('transformer.js'),
  },
  moduleNameMapper: {
    '^@hrasoa\/components\-(.*)$': '<rootDir>/$1/src/index.js'
  }
};
