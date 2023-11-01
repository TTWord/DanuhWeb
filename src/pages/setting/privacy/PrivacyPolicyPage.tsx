import StackLayout from '@/components/layout/StackLayout';
import styled from 'styled-components';
import PrivacyPolicy from './components/PrivacyPolicy';

const PrivacyPolicyPage = () => {
  return (
    <StackLayout
      topBar={{
        title: '개인정보 처리방침',
        back: {
          isShow: true,
          location: '/setting',
        },
      }}
    >
      <PrivacyPolicy />
    </StackLayout>
  );
};

export default PrivacyPolicyPage;

const Container = styled.div``;
