const { override, addBabelPreset, addWebpackModuleRule } = require('customize-cra');
const path = require('path');

module.exports = override(
  addBabelPreset('@babel/preset-env'),
  addWebpackModuleRule({
    test: /\.m?js$/,
    include: [
      path.resolve(__dirname, 'node_modules/chart.js'),
      path.resolve(__dirname, 'node_modules/react-chartjs-2')
    ],
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react'],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    }
  })
);
