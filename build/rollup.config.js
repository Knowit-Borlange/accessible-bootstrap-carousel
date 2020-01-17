'use strict'

const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('@rollup/plugin-node-resolve')

import { terser } from "rollup-plugin-terser";


const filename = 'accessible-bootstrap-carousel'

const banner = 
`/*
* @preserve This version of ${filename} includes a bundled version of "magnific-popup"
* NOTE! You are required to include boostrap and jQuery yourself.
*/
`;

const rollupConfig = {
    input: './src/' + filename + '.js',
    output: 
    [{
        banner,
        file: 'dist/' + filename + '.bundle.js',
        format: 'iife',
        globals: { 'jquery': '$' },
    },
    {
        banner,
        file: 'dist/' + filename + '.bundle.min.js',
        format: 'iife',
        globals: { 'jquery': '$' },
        plugins: [terser({
            output: {
                comments: function(node, comment) {
                  if (comment.type == "comment2") {
                    // Preserve multiline comments mathing these notations
                    return /@preserve|@license|@cc_on/i.test(comment.value);
                  }
                }
              }
            
          })]
    }],
    external: ['jquery'],
    plugins :  [
        commonjs(),
        // Find node modules to include in bundle
        nodeResolve()    
    ]
}

module.exports = rollupConfig
