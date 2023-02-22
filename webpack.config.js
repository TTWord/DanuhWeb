const path = require('path');
const dotEnv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function webpackConfig(env, args) {
  const mode = args.mode;
  return {
    plugins: [
      new dotEnv({
        path: mode === 'development' ? `./.env` : `./.env.${mode}`,
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'public/index.html',
      }),
    ],
    entry: path.join(__dirname, 'src/index.tsx'),
    output: {
      filename: 'main.js',
      path: path.join(__dirname, 'dist'),
      publicPath: '/',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          loader: require.resolve('babel-loader'),
          // See .babelrc for further babel config
        },
      ],
    },
    optimization: {
      minimizer: [
        // Omit creation of .txt files
        new (require('terser-webpack-plugin'))({ extractComments: false }),
      ],
    },
    devServer: {
      hot: true,
      open: true,
      static: { directory: path.join(__dirname, 'public') },
      port: 3000,
      historyApiFallback: true,
    },
  };
};
