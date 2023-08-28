import type { Meta, StoryObj } from '@storybook/react';
import DownloadButton from './DownloadButton';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Button/DownloadButton',
  component: DownloadButton,
  tags: ['autodocs'],
  render: () => {
    const onClick = () => {
      alert('다운로드 버튼 클릭됨');
    };

    return <DownloadButton onClick={onClick} />;
  },
} satisfies Meta<typeof DownloadButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
