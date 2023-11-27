import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
  Alert,
  Paper,
} from '@mui/material';
import QuizService from '../service/quizService';
import DefaultLayout from '../components/layout/defaultLayout';

const Quiz = () => {
  useEffect(() => {
    document.title = 'Skillify - Quiz';
  }, []);

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quiz, setQuiz] = useState({});
  const [timer, setTimer] = useState('00:00:00');
  const [multipleChoiceAnswers, setMultipleChoiceAnswers] = useState({});
  const [shortAnswerAnswers, setShortAnswerAnswers] = useState({});
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const quizId = useParams().id;

  const fetchQuizById = async () => {
    try {
      const quizInfo = await QuizService.getQuizById(quizId);
      setQuiz(quizInfo);
    } catch (error) {
      console.error('Error fetching quiz info', error);
      alert('Something went wrong');
    }
  };

  const fetchQuizQuestions = async () => {
    try {
      const questions = await QuizService.getQuizQuestions(quizId);
      setQuizQuestions(questions);
    } catch (error) {
      console.error('Error fetching quiz questions', error);
      alert('Something went wrong');
    }
  };

  const handleMultipleChoiceChange = (event, questionId, optionTitle) => {
    setMultipleChoiceAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: {
        ...prevAnswers[questionId],
        [optionTitle]: event.target.checked,
      },
    }));
  };

  const handleShortAnswerChange = (event, questionId) => {
    setShortAnswerAnswers({
      ...shortAnswerAnswers,
      [questionId]: event.target.value,
    });
  };

  const submitQuizAnswers = async () => {
    try {
      const userAnswers = [];

      quizQuestions.forEach((question) => {
        if (question.type === 'MULTIPLE_CHOICE') {
          const selectedOptions = question.options
            .filter((option) => multipleChoiceAnswers[question.question_id]?.[option.title])
            .map((option) => option.title)
            .join(' ');

          userAnswers.push({
            questionId: question.question_id,
            answer: selectedOptions,
          });
        } else if (question.type === 'SHORT_ANSWER') {
          userAnswers.push({
            questionId: question.question_id,
            answer: shortAnswerAnswers[question.question_id] || '',
          });
        }
      });
      console.log('User Answers:', userAnswers);
      localStorage.removeItem(`quizTimer-${quizId}`);

      await QuizService.submitQuizAnswers(quizId, userAnswers);
    } catch (error) {
      console.error('Error submitting quiz answers', error);
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    fetchQuizQuestions();
    fetchQuizById();
  }, [quizId]);

  useEffect(() => {
    if (quiz.timeLimit) {
      const storedTimer = localStorage.getItem(`quizTimer-${quiz.id}`);
      let remainingTime = storedTimer
        ? Math.max(0, parseInt(storedTimer, 10))
        : quiz.timeLimit * 60;

      const intervalId = setInterval(() => {
        remainingTime -= 1;
        if (remainingTime <= 0) {
          clearInterval(intervalId);
          setTimer('00:00:00');

          if (!autoSubmitted) {
            setAutoSubmitted(true);
          }
        } else {
          const hours = Math.floor(remainingTime / 3600);
          const minutes = Math.floor((remainingTime % 3600) / 60);
          const seconds = remainingTime % 60;
          setTimer(
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds
              .toString()
              .padStart(2, '0')}`,
          );

          localStorage.setItem(`quizTimer-${quiz.id}`, remainingTime.toString());
        }
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
    return () => {};
  }, [quiz]);

  return (
    <DefaultLayout>
      <Container maxWidth="md">
        <Alert severity="info" sx={{ mt: 4, display: autoSubmitted ? 'block' : 'none' }}>
          The quiz has ended
        </Alert>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', marginTop: '32px' }}>
          {quiz.type === 'SKILL' ? `${quiz.skillName} - ${quiz.proficiency}` : ''}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {timer}
        </Typography>
        <Paper sx={{ padding: 4, maxHeight: '70vh', overflowY: 'auto', mb: 2 }}>
          {quizQuestions.map((question, index) => (
            <Box key={question.question_id} sx={{ mb: 2 }}>
              <Typography variant="h6" textAlign="left">
                Q{index + 1}. {question.question} ({question.mark} mark)
              </Typography>
              {question.type === 'MULTIPLE_CHOICE' && (
                <FormControl component="fieldset">
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {question.options.map((option) => (
                      <FormControlLabel
                        key={option.title}
                        label={`${option.title}. ${option.content}`}
                        control={
                          <Checkbox
                            name={option.title}
                            checked={
                              multipleChoiceAnswers[question.question_id]?.[option.title] || false
                            }
                            onChange={(event) =>
                              handleMultipleChoiceChange(event, question.question_id, option.title)
                            }
                            disabled={autoSubmitted}
                          />
                        }
                      />
                    ))}
                  </Box>
                </FormControl>
              )}
              {question.type === 'SHORT_ANSWER' && (
                <TextField
                  fullWidth
                  name={question.question_id}
                  value={shortAnswerAnswers[question.question_id] || ''}
                  disabled={autoSubmitted}
                  onChange={(event) => handleShortAnswerChange(event, question.question_id)}
                />
              )}
            </Box>
          ))}
        </Paper>
        {autoSubmitted === true ? (
          <Link to="/quizlist">
            <Button
              fullWidth
              variant="contained"
              sx={{
                mb: 2,
                backgroundColor: '#0078d4',
                color: 'white',
                '&:hover': { backgroundColor: '#005a9e' },
              }}
              onClick={submitQuizAnswers}
            >
              Return
            </Button>
          </Link>
        ) : (
          <Link to="/">
            <Button
              fullWidth
              variant="contained"
              sx={{
                mb: 2,
                backgroundColor: '#0078d4',
                color: 'white',
                '&:hover': { backgroundColor: '#005a9e' },
              }}
              onClick={submitQuizAnswers}
            >
              Submit
            </Button>
          </Link>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default Quiz;
