import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import QuizCreationModule from '../components/common/QuizCreationModule';
import DefaultLayout from '../components/layout/defaultLayout';

const AddQuiz = () => {
  const navigate = useNavigate();

  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = 'Skillify - Add Quiz';
  }, []);

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/login');
    }
  }, [isLoggedIn]);

  return (
    <DefaultLayout>{isLoggedIn && <QuizCreationModule userRole={userInfo.role} />}</DefaultLayout>
  );
};

export default AddQuiz;
