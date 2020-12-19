/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs');

dotenv.config();

const envList = {};

try {
  const envFile = fs.readFileSync('.env');
  const envConfig = dotenv.parse(envFile);
  for (const i in envConfig) {
    envList[i] = `${process.env[i]}`;
  }
} catch (error) {
  console.error(
    '.env file not found. You must have a .env file in root directory.',
    error,
  );
  return;
}

const appName = process.env.APP_NAME;

// dynamic-custom-theme --start
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');

console.log(
  'variables.less file path: ',
  path.join(__dirname, `../../${appName}/styles/variables.less`),
);
const optionsAntdTheme = {
  antDir: path.join(__dirname, '../../node_modules/antd'),
  stylesDir: path.join(__dirname, `../../${appName}/styles`),
  varFile: path.join(__dirname, `../../${appName}/styles/variables.less`),
  mainLessFile: path.join(__dirname, `../../${appName}/styles/index.less`),
  themeVariables: ['@primary-color'],
  indexFileName: 'index.html',
};

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
    },
    options.output,
  ), // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess our own .less files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        // Preprocess 3rd party .less files located in node_modules
        test: /\.less$/,
        include: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      // {
      //   test: /\.svg$/,
      //   use: [
      //     {
      //       loader: "svg-url-loader",
      //       options: {
      //         // Inline files smaller than 10 kB
      //         limit: 10 * 1024,
      //         noquotes: true,
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
              },
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /ru/), // eslint-disable-line no-useless-escape
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      ...envList,
    }),
    new AntDesignThemePlugin(optionsAntdTheme),
  ]),
  resolve: {
    modules: ['node_modules', 'common', appName],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
    alias: {
      moment$: 'moment/moment.js',
      common: path.resolve(__dirname, `../../common`),
      '@ant-design/icons/lib/dist$': path.resolve(
        __dirname,
        `../../${appName}/icons.js`,
      ),
    },
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
