// Svg inline config.
export default {
  test: /\.inline\.svg$/i,
  use: [
    {
      loader: 'raw-loader'
    }
  ]
};
