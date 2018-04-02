const path = require('path');

const resolve = p => path.resolve(__dirname, p);

module.exports = {
  roots: [
    resolve('../packages'),
  ],
  setupFiles: [
    resolve('adapter.js'),
  ],
  transform: {
    '\\.js$': resolve('transformer.js'),
  },
};
