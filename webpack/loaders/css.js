import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isProduction = process.env.NODE_ENV === 'production';

// Export legacy SCSS/SASS/CSS files to a file in the output directory
export default {
  test: /((?!m).)\.(s(a|c)ss|css)$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '/',
        hmr: !isProduction
      }
    },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        modules: false
      }
    },
    'postcss-loader',
    'sass-loader'
  ]
};
