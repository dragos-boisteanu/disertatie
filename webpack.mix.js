const mix = require('laravel-mix');

var ProgressBarPlugin = require('progress-bar-webpack-plugin');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
*/

new ProgressBarPlugin({
  format: '  build [:bar] ' +':percent' + ' (:elapsed seconds)',
  clear: false
})

mix.webpackConfig({
    module: {
      rules: [
        {
          test: /\.(postcss)$/,
          use: [
            'vue-style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 } },
            'postcss-loader'
          ]
        }
      ],
    },
    plugins: [
      new ProgressBarPlugin()
    ]
})

mix.disableNotifications();

mix.js('resources/js/dashboard/app.js', 'public/js/dashboard').extract(['vue', 'axios'])
    .js('resources/js/client/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
]).vue().version();

