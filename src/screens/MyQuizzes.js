import React, { useEffect } from 'react';
import DefaultLayout from '../components/layout/defaultLayout';
import QuizList from '../components/common/quizList';

const MyQuizzes = () => {
  useEffect(() => {
    document.title = 'Skillify - My Quizzes';
  }, []);

  return (
    <DefaultLayout>
      <React.Suspense fallback={<div>Loading...</div>}>
        <QuizList />
      </React.Suspense>
    </DefaultLayout>
  );
};

export default MyQuizzes;
