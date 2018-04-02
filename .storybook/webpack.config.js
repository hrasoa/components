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
    include: /packages/,
    loader: 'eslint-loader',
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
