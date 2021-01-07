// Fonts file config.
export default {
  test: /\.(ttf|eot|woff2?)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[path][name].[hash].[ext]'
      }
    }
  ]
};
