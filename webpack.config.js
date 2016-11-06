'use strict';

module.exports = require('ng2-webpack-config').webpack.dev({
  src: 'demo',
  dist: 'demo-build',
  htmlIndexes: ['index.html'],
  entry: {
    polyfills: './demo/polyfills.ts',
    vendor: './demo/vendor.ts',
    main: './demo/index.ts'
  },

  commonChunks: {
    name: ['polyfills', 'vendor'].reverse()
  },
  alias: {},
  baseUrl: '/'
});
