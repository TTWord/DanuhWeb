import type { StorybookConfig } from '@storybook/react-webpack5';

const TsConfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async config => {
    if (!config.resolve) {
      return config;
    }
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsConfigPathsPlugin({
        configFile: './tsconfig.json',
      }),
    ];
    return config;
  },
};
export default config;
