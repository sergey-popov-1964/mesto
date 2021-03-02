const path = require('path');

module.exports = {
  entry: { main: './src/index.js' }
  output: {
    path: './dist/',
    filename: 'main.js',
    publicPath: ''
  }

}
