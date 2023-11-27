import React, { useEffect } from 'react';
import { Box, Button, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { QuizType, UserRoleType } from '../../../constants/enums';
import QuizService from '../../../service/quizService';
import questionService from '../../../service/questionService';
import StepController from './StepController';

const SubmissionProcessor = ({ onClickPrevStep, currentStep, totalSteps, userRole }) => {
  const [stage, setStage] = React.useState(0);
  const [submissionSuccess, setSubmissionSuccess] = React.useState(false);
  const navigate = useNavigate();

  const createQuiz = async ({ totalMark, skillType, timeLimit, placement }) => {
    try {
      switch (userRole) {
        case UserRoleType.SALES:
          return await QuizService.addClientQuiz({
            type: QuizType.CLIENT,
            placementId: placement,
            totalMark,
            timeLimit,
          });
        case UserRoleType.TRAINER:
        default:
          return await QuizService.addTechQuiz({
            type: QuizType.SKILL,
            skillId: skillType?.id,
            totalMark,
            timeLimit,
          });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const submitQuiz = async () => {
    setStage(1);
    try {
      const questions = JSON.parse(localStorage.getItem('add-quiz-questions'));
      const totalMark = questions.reduce((acc, curr) => acc + curr.mark, 0);
      const skillType = JSON.parse(localStorage.getItem('add-quiz-skillType'));
      const timeLimit = parseInt(localStorage.getItem('add-quiz-timeLimit'), 10);
      const placement = localStorage.getItem('add-quiz-placement');
      const quiz = await createQuiz({ totalMark, skillType, timeLimit, placement });
      const quizId = quiz.id;
      const questionsWithQuizId = questions.map((question) => ({
        ...question,
        quizId,
      }));
      await questionService.addQuestions(questionsWithQuizId);
      localStorage.removeItem('add-quiz-questions');
      localStorage.removeItem('add-quiz-skillType');
      localStorage.removeItem('add-quiz-timeLimit');
      setSubmissionSuccess(true);
    } catch (error) {
      console.log(error);
      setSubmissionSuccess(false);
      console.log('Something went wrong');
    }
    setStage(2);
  };

  const stage0 = (
    <>
      <h1>Ready to add the quiz?</h1>
      <Button variant="contained" onClick={submitQuiz}>
        Confirm
      </Button>
    </>
  );

  const stage1 = (
    <>
      <h1>Submitting the quiz...</h1>
      <LinearProgress />
    </>
  );

  const stage2 = (
    <h1>
      {submissionSuccess
        ? 'Quiz is successfully created!'
        : 'Quiz creation failed, please try again.'}
    </h1>
  );

  const stages = [stage0, stage1, stage2];

  useEffect(() => {
    if (stage === 2) {
      if (submissionSuccess) {
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setTimeout(() => {
          setStage(0);
        }, 1000);
      }
    }
  }, [stage, submissionSuccess]);

  return (
    <Box>
      <StepController
        onClickPreviouStep={onClickPrevStep}
        currentStep={currentStep}
        totalSteps={totalSteps}
        headerText={`Step ${currentStep + 1}/${totalSteps} - Submit`}
      />
      {stages[stage]}
    </Box>
  );
};

export default SubmissionProcessor;
