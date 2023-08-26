import type { Preview } from '@storybook/react';
import previewDecorator from './preview-decorator';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [previewDecorator],
};

export default preview;
