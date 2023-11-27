import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  TextField,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  InputLabel,
  Divider,
  Grid,
} from '@mui/material';
import React from 'react';
import { QuestionType } from '../../../constants/enums';

const QUESTION_TYPES = [
  { value: QuestionType.MULTIPLE_CHOICE, label: 'Multiple Choice' },
  { value: QuestionType.SHORT_ANSWER, label: 'Short Answer' },
];

const QuestionEditDialog = ({ open, onClose, onConfirm, initialValues, editMode = false }) => {
  const [questionType, setQuestionType] = React.useState(
    editMode ? initialValues.type : QUESTION_TYPES[1].value,
  );
  const [subject, setSubject] = React.useState(editMode ? initialValues.subject : '');
  const [mark, setMark] = React.useState(editMode ? initialValues.mark : 1);
  const [options, setOptions] = React.useState(
    editMode && initialValues.type === QuestionType.MULTIPLE_CHOICE ? initialValues.options : [],
  );
  const [correctAnswer, setCorrectAnswer] = React.useState(
    editMode && initialValues.type === QuestionType.SHORT_ANSWER ? initialValues.correctAnswer : '',
  );

  React.useEffect(() => {
    if (editMode) {
      setQuestionType(initialValues.type);
      setSubject(initialValues.subject);
      setMark(initialValues.mark);
      setOptions(initialValues.options);
      setCorrectAnswer(initialValues.correctAnswer);
    } else {
      setQuestionType(QUESTION_TYPES[1].value);
      setSubject('');
      setMark(1);
      setOptions([]);
      setCorrectAnswer('');
    }
  }, [editMode, initialValues, open]);

  const onAdd = () => {
    const question =
      questionType === QuestionType.MULTIPLE_CHOICE
        ? {
            mark,
            subject,
            type: questionType,
            options,
          }
        : {
            mark,
            subject,
            type: questionType,
            correctAnswer,
          };
    onConfirm(question);
    onClose();
  };

  const onQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  const onSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const onMarkChange = (e) => {
    setMark(e.target.value);
  };

  const onOptionClick = (e) => {
    setOptions(
      options.map((option) => {
        if (option.title === e.target.name) {
          return { ...option, correct: !option.correct };
        }
        return option;
      }),
    );
  };

  const onAddOption = () => {
    setOptions([
      ...options,
      { title: String.fromCharCode(65 + options.length), content: '', correct: false },
    ]);
  };

  const onOptionContentChange = (e) => {
    setOptions(
      options.map((option) => {
        if (option.title === e.target.id) {
          return { ...option, content: e.target.value };
        }
        return option;
      }),
    );
  };

  const ShortAnswerSpecificFields = (
    <>
      <InputLabel id="question-correct-answer-label">Correct Answer</InputLabel>
      <TextField
        labelId="question-correct-answer-label"
        fullWidth
        margin="normal"
        multiline
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(e.target.value)}
      />
    </>
  );

  const MultipleChoiceSpecificFields = (
    <FormControl component="fieldset" variant="standard" sx={{ width: '100%' }}>
      <FormLabel component="legend">Options</FormLabel>
      <FormGroup>
        {options?.map((option) => (
          <FormControlLabel
            control={
              <Checkbox checked={option.correct} onChange={onOptionClick} name={option.title} />
            }
            label={
              <TextField
                id={option.title}
                fullWidth
                margin="dense"
                multiline
                value={option.content}
                onChange={onOptionContentChange}
              />
            }
          />
        ))}
        <Button variant="outlined" onClick={onAddOption} sx={{ width: 'fit-content' }}>
          Add Option
        </Button>
      </FormGroup>
    </FormControl>
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{editMode ? 'Edit Question' : 'Add Question'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={4}>
            <InputLabel id="question-type-label">Type</InputLabel>
            <TextField
              labelId="question-type-label"
              id="question-type"
              value={questionType}
              onChange={onQuestionTypeChange}
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
              value={mark}
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
          value={subject}
          onChange={onSubjectChange}
        />
        <Divider sx={{ m: 1 }} />
        {questionType === QuestionType.SHORT_ANSWER && ShortAnswerSpecificFields}
        {questionType === QuestionType.MULTIPLE_CHOICE && MultipleChoiceSpecificFields}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onAdd} color="primary" variant="contained">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionEditDialog;
