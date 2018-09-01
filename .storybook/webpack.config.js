module.exports = (storybookBaseConfig) => {
  const rules = storybookBaseConfig.module.rules.map((rule) => {
    if (rule.test.exec('.jsx')) {
      const { loader, query, ...rest } = rule;
      return {
        ...rest,
        use: [
          {
            loader: require.resolve('babel-loader'),
            query: {
              ...query,
              presets: [
                ...query.presets,
                require.resolve('babel-preset-flow'),
              ],
            },
          },
        ],
      };
    }
    return rule;
  });

  rules.push({
    enforce: 'pre',
    exclude: /node_modules/,
    test: /\.js$/,
    use: 'eslint-loader',
  });

  rules.push({
    exclude: /node_modules/,
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  });

  return {
    ...storybookBaseConfig,
    devServer: {
      ...storybookBaseConfig.devServer,
      stats: {
        colors: true,
        modules: false,
      },
    },
    resolve: {
      ...storybookBaseConfig.resolve,
      mainFields: ['module', 'main']
    },
    module: {
      ...storybookBaseConfig.module,
      rules,
    },
  };
};
