const { defaults } = require('jest-config');

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'tsx'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
};
