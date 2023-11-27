import { Paper, ListSubheader, Divider } from '@mui/material';
import React from 'react';
import { UserRoleType } from '../../../constants/enums';

const QuizParamsDefinition = React.lazy(() => import('./QuizParamsDefinition'));
const QuestionCreator = React.lazy(() => import('./QuestionCreator'));
const SubmissionProcessor = React.lazy(() => import('./SubmissionProcessor'));

const STEP_LENGTH = 3;

const QuizCreationModule = ({ userRole }) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const quizType = {
    [UserRoleType.TRAINER]: 'Skill Qualification Quiz',
    [UserRoleType.SALES]: 'Client Interview Quiz',
  };

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  const goToPreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const techQuizSteps = [
    <QuizParamsDefinition
      onClickNextStep={goToNextStep}
      onClickPrevStep={goToPreviousStep}
      currentStep={currentStep}
      totalSteps={STEP_LENGTH}
      userRole={userRole}
    />,
    <QuestionCreator
      onClickNextStep={goToNextStep}
      onClickPrevStep={goToPreviousStep}
      currentStep={currentStep}
      totalSteps={STEP_LENGTH}
    />,
    <SubmissionProcessor
      onClickPrevStep={goToPreviousStep}
      currentStep={currentStep}
      totalSteps={STEP_LENGTH}
      userRole={userRole}
    />,
  ];
  return (
    <Paper sx={{ maxWidth: 'md', padding: 2, width: '100%', mt: 4 }}>
      <ListSubheader component="div" id="list-subheader" sx={{ textAlign: 'center', fontSize: 16 }}>
        {quizType[userRole]} Creation
      </ListSubheader>
      <Divider sx={{ mb: 2 }} />
      <React.Suspense fallback={<div>Loading...</div>}>{techQuizSteps[currentStep]}</React.Suspense>
    </Paper>
  );
};

export default QuizCreationModule;
