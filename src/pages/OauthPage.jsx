import { useLocation } from 'react-router-dom';

const OauthPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const myQueryParam = searchParams.get('code');

  console.log(myQueryParam);

  return <div>잠시만 기다리세요...</div>;
};

export default OauthPage;
