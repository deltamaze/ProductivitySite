// module.exports = {
//   entry: ['./src/index.js'],
//   output: {
//     path: __dirname,
//     publicPath: '/',
//     filename: 'bundle.js'
//   },
//   module: {
//     loaders: [
//       {
//         exclude: /node_modules/,
//         loader: 'babel',
//         query: {
//           presets: ['react', 'es2015', 'stage-1']
//         }
//       }
//     ]
//   },
//   resolve: {
//     extensions: ['', '.js', '.jsx']
//   },
//   devServer: {
//     historyApiFallback: true,
//     contentBase: './',
//     watchOptions: {
//       aggregateTimeout: 300,
//       poll: 1000
//     }
//   }
// };

module.exports = {
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};
