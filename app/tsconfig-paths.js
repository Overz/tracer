/* eslint-disable @typescript-eslint/no-var-requires */
const tsConfigPaths = require('tsconfig-paths');
const {
  compilerOptions: { paths },
} = require('./tsconfig.json');

tsConfigPaths.register({ baseUrl: './', paths });
