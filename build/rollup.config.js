'use strict'

const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve')

const filename = 'accessible-bootstrap-carousel'

const plugins = [
    commonjs(),
    // Find node modules to include in bundle
    nodeResolve()
  ]

const rollupConfig = {
    input: './src/' + filename + '.js',
    output: {
    //   banner,
      file: 'dist/' + filename + '.bundle.js',
      format: 'iife',
      globals:{'jquery':'$'},
    },
    external: ['jquery'],
    plugins
  }

  module.exports = rollupConfig
  