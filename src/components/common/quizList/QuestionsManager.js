import React from 'react';
import { Box, Paper, Tabs, Tab, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import QuestionEditor from './QuestionEditor';

const QuestionsManager = ({ questions, changeQuestion, addQuestion, deleteQuestion }) => {
  console.log('questions', questions);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  const handleTabSwitch = (event, newValue) => {
    setCurrentQuestion(newValue);
  };

  const handleDeleteQuestion = (index) => {
    deleteQuestion(index);
    if (index === questions.length - 1) {
      setCurrentQuestion(index - 1);
    }
  };

  return (
    <Box mt={2}>
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
          <IconButton color="primary" aria-label="add question" onClick={addQuestion}>
            <AddIcon />
          </IconButton>
        </Tabs>
        <Box>
          {questions.length > 0 ? (
            <QuestionEditor
              questionIndex={currentQuestion}
              question={questions[currentQuestion]}
              onQuestionDelete={handleDeleteQuestion}
              onQuestionChange={changeQuestion}
            />
          ) : (
            <Typography variant="h6">Click the plus icon above to create a question.</Typography>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default QuestionsManager;
