exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  actions.setWebpackConfig({
    module: {
      rules: [
        {
          test: /\.gltf$/,
          use: ['file-loader', '@vxna/gltf-loader'],
        },
        {
          test: /\.(bin|jpe?g|png)$/,
          loader: 'file-loader',
        },
      ],
    },
  })
}
