// Image file config.
export default {
  test: /\.(png|gif|jpe?g)$/i,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[path][name].[hash].[ext]'
      }
    },
    {
      loader: 'image-webpack-loader',
      options: {
        gifsicle: {
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        }
      }
    }
  ]
};
