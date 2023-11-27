import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../components/layout/defaultLayout';

const Home = () => {
  const [viewMode, setViewMode] = React.useState('traineeMode');
  const MainContent = React.lazy(() => import(`../components/${viewMode}`));
  const navigate = useNavigate();

  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = 'Skillify - Home';
  }, []);

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/login');
    } else if (isLoggedIn === true) {
      switch (userInfo?.role) {
        case 'TRAINER':
          setViewMode('trainerMode');
          break;
        case 'SALES':
          setViewMode('salesMode');
          break;
        case 'TRAINEE':
        default:
          setViewMode('traineeMode');
          break;
      }
    }

    if (userInfo && userInfo.authenticated === false) {
      navigate('/requestAuth');
    }

    if (userInfo?.role === 'TRAINEE' && userInfo.authenticated === false) {
      navigate('/requestAuth');
    }
  }, [isLoggedIn, userInfo, navigate]);

  return (
    <DefaultLayout>
      <React.Suspense fallback={<div>Loading...</div>}>
        <MainContent />
      </React.Suspense>
    </DefaultLayout>
  );
};

export default Home;
