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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { QuestionType } from '../../../constants/enums';
import QuestionEditDialog from './QuestionEditDialog';

const QUESTION_TYPES = [
  { value: QuestionType.MULTIPLE_CHOICE, label: 'Multiple Choice' },
  { value: QuestionType.SHORT_ANSWER, label: 'Short Answer' },
];

const QuestionCard = ({ question, onQuestionDelete, onQuestionChange }) => {
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  const openEditDialog = () => {
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
  };

  const ShortAnswerSpecificFields = question && (
    <>
      <InputLabel id="question-correct-answer-label">Correct Answer</InputLabel>
      <TextField
        labelId="question-correct-answer-label"
        fullWidth
        margin="normal"
        multiline
        value={question?.correctAnswer}
        InputProps={{
          readOnly: true,
        }}
      />
    </>
  );

  const MultipleChoiceSpecificFields = question && question.options && (
    <FormControl component="fieldset" variant="standard" sx={{ width: '100%' }}>
      <FormLabel component="legend">Options</FormLabel>
      <FormGroup>
        {question.options?.map((option) => (
          <FormControlLabel
            control={<Checkbox checked={option.correct} name={option.title} />}
            label={
              <TextField
                id={option.title}
                key={option.title}
                fullWidth
                margin="dense"
                multiline
                value={option.content}
                InputProps={{
                  readOnly: true,
                }}
              />
            }
          />
        ))}
      </FormGroup>
    </FormControl>
  );

  return (
    <Box margin={4}>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={5}>
          <InputLabel id="question-type-label" sx={{ textAlign: 'left' }}>
            Type
          </InputLabel>
          <TextField
            labelId="question-type-label"
            id="question-type"
            value={question.type}
            margin="normal"
            select
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          >
            {QUESTION_TYPES.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={5}>
          <InputLabel id="question-mark-label" sx={{ textAlign: 'left' }}>
            Mark
          </InputLabel>
          <TextField
            labelId="question-mark-label"
            value={question.mark}
            type="number"
            margin="normal"
            fullWidth
            InputProps={{
              readOnly: true,
              inputProps: {
                style: { textAlign: 'center' },
              },
            }}
          />
        </Grid>
      </Grid>
      <InputLabel id="question-subject-label">Question</InputLabel>
      <TextField
        labelId="question-subject-label"
        fullWidth
        margin="normal"
        multiline
        value={question.question}
        InputProps={{
          readOnly: true,
        }}
      />
      {question.type === QuestionType.SHORT_ANSWER && ShortAnswerSpecificFields}
      {question.type === QuestionType.MULTIPLE_CHOICE && MultipleChoiceSpecificFields}
      <Stack spacing={2} direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={onQuestionDelete}
        >
          Delete
        </Button>
        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={openEditDialog}
        >
          Edit
        </Button>
      </Stack>
      <QuestionEditDialog
        open={editDialogOpen}
        onClose={closeEditDialog}
        onConfirm={onQuestionChange}
        initialValues={question}
        editMode
      />
    </Box>
  );
};

export default QuestionCard;
