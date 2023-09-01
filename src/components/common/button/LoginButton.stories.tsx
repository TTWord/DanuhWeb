import type { Meta, StoryObj } from '@storybook/react';
import LoginButton from './LoginButton';
import iconLocal from '@/assets/svg/icons/icon-email.svg';
import iconGoogle from '@/assets/svg/icons/icon-google.svg';
import iconKakao from '@/assets/svg/icons/icon-kakao.svg';
import iconApple from '@/assets/svg/icons/icon-apple-black.svg';

const meta = {
  title: 'Button/LoginButton',
  component: LoginButton,
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: {
        type: 'text',
      },
    },
    img: {
      control: {
        type: 'file',
      },
    },
  },
} satisfies Meta<typeof LoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'example 계정으로 로그인',
  },
};

export const Local: Story = {
  args: {
    text: '이메일 계정으로 로그인',
    img: iconLocal,
  },
};

export const Google: Story = {
  args: {
    text: '구글 계정으로 로그인',
    img: iconGoogle,
  },
};

export const Kakao: Story = {
  args: {
    text: '카카오 계정으로 로그인',
    img: iconKakao,
  },
};

export const Apple: Story = {
  args: {
    text: '애플 계정으로 로그인',
    img: iconApple,
  },
};
