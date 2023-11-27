import React, { useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  TextField,
  Stack,
  FormLabel,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ControlPanel from './ControlPanel';
import userAnswerService from '../../../service/userAnswerService';

const SubmissionViewer = ({ resultId }) => {
  const [userAnswers, setUserAnswers] = React.useState([]);
  const navigate = useNavigate();

  const handleMarkChange = (questionId, e) => {
    const newAnswers = [...userAnswers];
    const index = newAnswers.findIndex((answer) => answer.questionId === questionId);
    newAnswers[index].traineeMark = e.target.value;
    setUserAnswers(newAnswers);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    const updatedMarks = userAnswers.map((answer) => ({
      questionId: answer.questionId,
      traineeMark: answer.traineeMark,
      traineeEmail: answer.traineeEmail,
    }));
    userAnswerService
      .updateMarks(resultId, updatedMarks)
      .then(() => {
        alert('Marks updated successfully!');
        navigate(-1);
      })
      .catch((err) => {
        alert(`Error: ${err}`);
      });
  };

  useEffect(() => {
    userAnswerService
      .getAnswersByResultId(resultId)
      .then((data) => {
        setUserAnswers(data);
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }, [resultId]);

  return (
    <Box width="100%" maxWidth="md" sx={{ mt: 4 }}>
      <h2>Mark Student Submission</h2>
      <Paper sx={{ padding: 2, maxHeight: '80vh', overflowY: 'auto' }}>
        {userAnswers.map((answer, index) => (
          <Box key={answer.questionId} sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="h6" textAlign="left" margin="16px 0">
                  Q{index + 1}. {answer.questionDto.question} ({answer.questionDto.mark} mark)
                </Typography>
              </Grid>
              <Grid item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <TextField
                  label="Mark"
                  name={answer.questionDto.question_id}
                  value={answer.traineeMark}
                  onChange={(e) => handleMarkChange(answer.questionDto.question_id, e)}
                  type="number"
                  inputProps={{ min: 0, max: answer.questionDto.mark }}
                  size="small"
                />
                / {answer.questionDto.mark}
              </Grid>
            </Grid>
            {answer.questionDto.type === 'MULTIPLE_CHOICE' && (
              <Stack spacing={4} direction="row" justifyContent="center">
                <FormControl component="fieldset">
                  <FormLabel id="trainee-answer-mcq-label">Trainee Answer</FormLabel>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {answer.questionDto.options.map((option) => (
                      <FormControlLabel
                        key={option.title}
                        label={`${option.title}. ${option.content}`}
                        control={
                          <Checkbox
                            name={option.title}
                            checked={answer.answer.indexOf(option.title) >= 0}
                            disabled
                          />
                        }
                      />
                    ))}
                  </Box>
                </FormControl>
                <FormControl component="fieldset">
                  <FormLabel id="correct-answer-mcq-label">Correct Answer</FormLabel>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {answer.questionDto.options.map((option) => (
                      <FormControlLabel
                        key={option.title}
                        label={`${option.title}. ${option.content}`}
                        control={<Checkbox name={option.title} checked={option.correct} disabled />}
                      />
                    ))}
                  </Box>
                </FormControl>
              </Stack>
            )}
            {answer.questionDto.type === 'SHORT_ANSWER' && (
              <Stack spacing={4} direction="row" justifyContent="center" mt={1}>
                <TextField
                  fullWidth
                  label="Trainee Answer"
                  name={answer.questionDto.question_id}
                  value={answer.answer}
                  disabled
                  multiline
                />
                <TextField
                  fullWidth
                  label="Correct Answer"
                  name={answer.questionDto.question_id}
                  value={answer.questionDto.correctAnswer}
                  disabled
                  multiline
                />
              </Stack>
            )}
          </Box>
        ))}
        <ControlPanel onCancel={handleCancel} onSave={handleSave} />
      </Paper>
    </Box>
  );
};

export default SubmissionViewer;
