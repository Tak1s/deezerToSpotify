// Svg file config. (excluding icons)
export default {
  test: /((?!inline).{6})\.svg$/i,
  use:
    [
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].[hash].[ext]'
        }
      }
    ]
};
