import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

let pkg = require('./package.json')
let external = Object.keys(pkg.dependencies)


let plugins = [
  nodeResolve({
    // use "jsnext:main" if possible
    // see https://github.com/rollup/rollup/wiki/jsnext:main
    jsnext: true
  }),
  commonjs(),
  babel({
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            "node": "0.12"
          }
        }
      ]
    ]
  }),
]

export default [
  {
    input: 'index.js',
    output: [
      {
        name: 'rollupExample',
        file: pkg.browser,
        format: 'umd'
      },
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' }
    ],
    plugins
  }
]