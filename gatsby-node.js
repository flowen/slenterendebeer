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
          test: /\.(gltf)$/,
          use: [{ loader: 'gltf-webpack-loader' }],
        },
        {
          test: /gltf.*\.(bin|png|jpe?g|gif)$/, // match only IMAGE and BIN files under the gltf folder
          loader: 'file-loader', // use url-loader to embed images in the source gltf
          options: {
            name: 'gltf/[name].[hash:7].[ext]', // output folder for bin and image files, configure as needed
          },
        },
      ],
    },
  })
}
