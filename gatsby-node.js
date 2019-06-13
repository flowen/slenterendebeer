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
          use: [
            {
              loader: 'gltf-webpack-loader',
            },
          ],
        },
      ],
    },
  })
}
