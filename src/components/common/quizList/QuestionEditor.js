import React from 'react';
import {
  Grid,
  InputLabel,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Box,
  MenuItem,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { QuestionType } from '../../../constants/enums';

const QUESTION_TYPES = [
  { value: QuestionType.MULTIPLE_CHOICE, label: 'Multiple Choice' },
  { value: QuestionType.SHORT_ANSWER, label: 'Short Answer' },
];

const QuestionEditor = ({ questionIndex, question, onQuestionDelete, onQuestionChange }) => {
  const onCorrectAnswerChange = (event) => {
    onQuestionChange({ ...question, correctAnswer: event.target.value }, questionIndex);
  };

  const onMarkChange = (event) => {
    onQuestionChange({ ...question, mark: event.target.value }, questionIndex);
  };

  const onSubjectChange = (event) => {
    onQuestionChange({ ...question, question: event.target.value }, questionIndex);
  };

  const onTypeChange = (event) => {
    onQuestionChange({ ...question, type: event.target.value }, questionIndex);
  };

  const onOptionChange = (event) => {
    const optionIndex = question.options.findIndex((option) => option.title === event.target.id);
    const newOptions = [...question.options];
    newOptions[optionIndex].content = event.target.value;
    onQuestionChange({ ...question, options: newOptions }, questionIndex);
  };

  const onOptionClick = (event) => {
    const optionIndex = question.options.findIndex((option) => option.title === event.target.name);
    const newOptions = [...question.options];
    newOptions[optionIndex].correct = event.target.checked;
    onQuestionChange({ ...question, options: newOptions }, questionIndex);
  };

  const onAddOption = () => {
    const newOptions = [
      ...question.options,
      { title: String.fromCharCode(65 + question.options.length), content: '', correct: false },
    ];
    onQuestionChange({ ...question, options: newOptions }, questionIndex);
  };

  const onDeleteQuestion = () => {
    onQuestionDelete(questionIndex);
  };

  const ShortAnswerSpecificFields = (
    <>
      <InputLabel id="question-correct-answer-label">Correct Answer</InputLabel>
      <TextField
        labelId="question-correct-answer-label"
        fullWidth
        margin="normal"
        multiline
        value={question.correctAnswer}
        onChange={onCorrectAnswerChange}
      />
    </>
  );

  const MultipleChoiceSpecificFields = (
    <FormControl component="fieldset" variant="standard" sx={{ width: '100%' }}>
      <FormLabel component="legend">Options</FormLabel>
      <FormGroup>
        {question.options?.map((option) => (
          <FormControlLabel
            control={
              <Checkbox checked={option.correct} name={option.title} onChange={onOptionClick} />
            }
            label={
              <TextField
                id={option.title}
                fullWidth
                margin="dense"
                multiline
                value={option.content}
                onChange={onOptionChange}
              />
            }
          />
        ))}
      </FormGroup>
      <Button variant="outlined" onClick={onAddOption} sx={{ width: 'fit-content' }}>
        Add Option
      </Button>
    </FormControl>
  );

  return (
    <Box margin={4}>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={4}>
          <InputLabel id="question-type-label">Type</InputLabel>
          <TextField
            labelId="question-type-label"
            id="question-type"
            value={question.type}
            onChange={onTypeChange}
            margin="normal"
            select
          >
            {QUESTION_TYPES.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <InputLabel id="question-mark-label">Mark</InputLabel>
          <TextField
            labelId="question-mark-label"
            value={question.mark}
            onChange={onMarkChange}
            type="number"
            margin="normal"
            InputProps={{
              inputProps: {
                style: { textAlign: 'center' },
              },
            }}
          />
        </Grid>
      </Grid>
      <Divider sx={{ m: 1 }} />
      <InputLabel id="question-subject-label">Question</InputLabel>
      <TextField
        labelId="question-subject-label"
        fullWidth
        margin="normal"
        multiline
        value={question.question}
        onChange={onSubjectChange}
      />
      <Divider sx={{ m: 1 }} />
      {question.type === QuestionType.SHORT_ANSWER && ShortAnswerSpecificFields}
      {question.type === QuestionType.MULTIPLE_CHOICE && MultipleChoiceSpecificFields}
      <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={onDeleteQuestion}
        >
          Delete
        </Button>
      </Stack>
    </Box>
  );
};

export default QuestionEditor;
