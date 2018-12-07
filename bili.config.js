const { name } = require('./package.json')
const vue = require('rollup-plugin-vue').default
const uglify = require('rollup-plugin-uglify')

module.exports = {
  js: 'buble',
  input: 'src/index.js',
  banner: true,
  format: ['umd', 'umd-min', 'cjs', 'es'],
  filename: name + '[suffix].js',
  plugins: [
    vue(),
    uglify
  ]
}