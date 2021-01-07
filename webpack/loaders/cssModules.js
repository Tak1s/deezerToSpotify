// eslint-disable-next-line import/no-extraneous-dependencies
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const isProduction = process.env.NODE_ENV === 'production';

// Export SCSS/SASS/CSS modules files to a file in the output directory
export default {
  test: /\.(s(a|c)ss|css)$/,
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
        modules: {
          localIdentName: isProduction ? '[hash:base64]' : '[path][name]_[local]'
        }
      }
    },
    'postcss-loader',
    'sass-loader'
  ]
};
