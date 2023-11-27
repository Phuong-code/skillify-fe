import { Box, TextField, Stack, Button } from '@mui/material';
import React, { useEffect } from 'react';
import QuestionsManager from './QuestionsManager';
import QuizService from '../../../service/quizService';
import { UserRoleType } from '../../../constants/enums';

const QuizEditForm = ({ initialQuiz, onClose, userRole }) => {
  const [quiz, setQuiz] = React.useState(initialQuiz);
  const [questions, setQuestions] = React.useState(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [deletedQuestions, setDeletedQuestions] = React.useState([]);

  console.log('deletedQuestions', deletedQuestions);

  const handleTimeLimitChange = (event) => {
    setQuiz({ ...quiz, timeLimit: event.target.value });
  };

  const addQuestion = () => {
    const newQuestion = {
      quizId: quiz.id,
      mark: 1,
      type: '',
      question: '',
      options: [],
      correctAnswer: '',
    };
    setQuestions([...questions, newQuestion]);
  };

  const changeQuestion = (question, index) => {
    const newQuestions = [...questions];
    newQuestions[index] = question;
    setQuestions(newQuestions);
  };

  const deleteQuestion = (index) => {
    if (questions[index].question_id) {
      setDeletedQuestions([...deletedQuestions, questions[index].question_id]);
    }
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const onCancel = () => {
    onClose();
  };

  const onConfirm = async () => {
    const totalMark = questions.reduce((acc, curr) => acc + curr.mark, 0);
    const { timeLimit } = quiz;
    const updatedQuiz = {
      id: initialQuiz.id,
      totalMark,
      timeLimit,
    };
    try {
      setSubmitting(true);
      await QuizService.deleteQuestions(quiz.id, deletedQuestions);
      await QuizService.updateQuestions(quiz.id, questions);
      await QuizService.updateQuiz(updatedQuiz);
      onClose();
    } catch (error) {
      console.error('Error updating quiz:', error);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    QuizService.getQuizQuestions(initialQuiz.id)
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error('Error fetching quiz questions:', error);
      });
  }, []);

  return (
    <Box>
      <h1>Edit Quiz</h1>
      {userRole === UserRoleType.TRAINER && (
        <TextField
          fullWidth
          label="Skill Type"
          InputProps={{
            readOnly: true,
          }}
          value={`${quiz.skill.name} - ${quiz.skill.proficiency}`}
          margin="normal"
        />
      )}
      {userRole === UserRoleType.SALES && (
        <TextField
          fullWidth
          label="Placement"
          InputProps={{
            readOnly: true,
          }}
          value={`${quiz.placement.title} - ${quiz.placement.companyName}`}
          margin="normal"
        />
      )}
      <TextField
        fullWidth
        label="Time Limit"
        value={quiz.timeLimit}
        margin="normal"
        type="number"
        onChange={handleTimeLimitChange}
      />
      <QuestionsManager
        questions={questions || []}
        addQuestion={addQuestion}
        changeQuestion={changeQuestion}
        deleteQuestion={deleteQuestion}
      />
      <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Confirm'}
        </Button>
      </Stack>
    </Box>
  );
};

export default QuizEditForm;
