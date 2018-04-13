
module.exports = {
  entry: './src/app',
  output: {
    path: `${__dirname}/dist`,
    filename: 'app.js'
  },
  module: {
    rules: [
      { test: /.js$/, loader: 'babel-loader' }
    ]
  }
}
