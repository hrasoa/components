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
    test: /\.js$/,
    use: 'eslint-loader',
    exclude: /node_modules/,
  });

  rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
    exclude: /node_modules/,
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
    module: {
      ...storybookBaseConfig.module,
      rules,
    },
  };
};
