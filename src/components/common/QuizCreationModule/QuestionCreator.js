import React from 'react';
import { Box, Paper, Tabs, Tab, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StepController from './StepController';
import QuestionEditDialog from './QuestionEditDialog';
import QuestionCard from './QuestionCard';

const QuestionCreator = ({ onClickNextStep, onClickPrevStep, currentStep, totalSteps }) => {
  const [questions, setQuestions] = React.useState(
    JSON.parse(localStorage.getItem('add-quiz-questions')) || [],
  );
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [isQuestionDialogOpen, setIsQuestionDialogOpen] = React.useState(false);

  const handleTabSwitch = (event, newValue) => {
    setCurrentQuestion(newValue);
  };

  const closeQuestionDialog = () => {
    setIsQuestionDialogOpen(false);
  };

  const openQuestionDialog = () => {
    setIsQuestionDialogOpen(true);
  };

  const confirmAddQuestion = (question) => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        ...question,
        mark: parseInt(question.mark, 10) || 1,
        question: question.subject,
      },
    ]);
  };

  const saveQuestions = () => {
    localStorage.setItem('add-quiz-questions', JSON.stringify(questions));
  };

  const processNextStep = () => {
    saveQuestions();
    onClickNextStep();
  };

  const deleteQuestion = (index) => {
    setCurrentQuestion(Math.max(0, index - 1));
    setQuestions((prevQuestions) => prevQuestions.filter((_, i) => i !== index));
  };

  const changeQuestion = (index, question) => {
    setQuestions((prevQuestions) => [
      ...prevQuestions.slice(0, index),
      {
        ...question,
        mark: parseInt(question.mark, 10) || 1,
        question: question.subject,
      },
      ...prevQuestions.slice(index + 1),
    ]);
  };

  return (
    <Box>
      <StepController
        onClickNextStep={processNextStep}
        onClickPreviouStep={onClickPrevStep}
        currentStep={currentStep}
        totalSteps={totalSteps}
        headerText={`Step ${currentStep + 1}/${totalSteps} - Create Questions`}
      />
      <Paper sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Tabs
          value={currentQuestion}
          onChange={handleTabSwitch}
          variant="scrollable"
          scrollButtons="auto"
        >
          {questions.map((question, index) => (
            <Tab
              id={`question-tab-${index}`}
              label={`Question ${index + 1}`}
              // eslint-disable-next-line react/no-array-index-key
              key={`question-tab-${index}`}
              aria-controls={`question-tabpanel-${index}`}
            />
          ))}
          <IconButton color="primary" aria-label="add question" onClick={openQuestionDialog}>
            <AddIcon />
          </IconButton>
        </Tabs>
        <Box>
          {questions.length > 0 ? (
            <QuestionCard
              question={questions[currentQuestion]}
              onQuestionDelete={() => deleteQuestion(currentQuestion)}
              onQuestionChange={(question) => changeQuestion(currentQuestion, question)}
            />
          ) : (
            <Typography variant="h6">Click the plus icon above to create a question.</Typography>
          )}
        </Box>
      </Paper>
      <QuestionEditDialog
        open={isQuestionDialogOpen}
        onClose={closeQuestionDialog}
        onConfirm={confirmAddQuestion}
      />
    </Box>
  );
};

export default QuestionCreator;
