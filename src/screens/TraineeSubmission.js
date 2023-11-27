import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { UserRoleType } from '../constants/enums';
import DefaultLayout from '../components/layout/defaultLayout';
import SubmissionViewer from '../components/common/submissionViewer';

const TraineeSubmission = () => {
  const { resultId } = useParams();
  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/login');
    } else if (userInfo?.role === UserRoleType.TRAINEE) {
      navigate('/');
    }
  }, [isLoggedIn, userInfo]);
  return (
    <DefaultLayout>
      <SubmissionViewer resultId={resultId} />
    </DefaultLayout>
  );
};

export default TraineeSubmission;
