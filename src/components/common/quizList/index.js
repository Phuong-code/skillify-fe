import React, { useEffect, useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Dialog,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import QuizService from '../../../service/quizService';
import QuizEditForm from './QuizEditForm';
import { UserRoleType } from '../../../constants/enums';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    QuizService.getMyQuizzes()
      .then((data) => {
        setQuizzes(data);
      })
      .catch((error) => {
        console.error('Error fetching my quizzes:', error);
        alert('Something went wrong');
      });
  }, []);

  const handleDelete = (quizId) => {
    QuizService.deleteQuiz(quizId)
      .then(() => {
        setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
      })
      .catch((error) => {
        console.error('Error deleting a quiz:', error);
        alert('Something went wrong');
      });
  };

  const handleEdit = (quizId) => {
    setEditingQuiz(quizzes.find((quiz) => quiz.id === quizId));
  };

  const handleCloseDialog = () => {
    setEditingQuiz(null);
  };

  return (
    <Box sx={{ padding: '20px', width: '100%' }} maxWidth="sm">
      <Paper elevation={3}>
        <h1>My Quizzes</h1>
        <List>
          {quizzes.map((quiz) => (
            <ListItem key={quiz.id}>
              {userInfo.role === UserRoleType.TRAINER && (
                <ListItemText
                  primaryTypographyProps={{ variant: 'h5' }}
                  primary={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        component="div"
                        sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                        maxWidth="75%"
                      >
                        {quiz.skill.name}
                      </Box>
                    </div>
                  }
                  secondary={`${quiz.skill.proficiency} - ${quiz.timeLimit} minutes`}
                />
              )}
              {userInfo.role === UserRoleType.SALES && (
                <ListItemText
                  primaryTypographyProps={{ variant: 'h5' }}
                  primary={
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        component="div"
                        sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                        maxWidth="75%"
                      >
                        {quiz.placement.title}
                      </Box>
                    </div>
                  }
                  secondary={`${quiz.placement.companyName} - ${quiz.timeLimit} minutes`}
                />
              )}
              <ListItemSecondaryAction sx={{ right: 0, paddingRight: 2 }}>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(quiz.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(quiz.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Dialog open={!!editingQuiz} onClose={handleCloseDialog}>
        {editingQuiz && (
          <Box sx={{ padding: '20px', width: '100%' }} maxWidth="md">
            <QuizEditForm
              initialQuiz={editingQuiz}
              onClose={handleCloseDialog}
              userRole={userInfo.role}
            />
          </Box>
        )}
      </Dialog>
    </Box>
  );
};

export default QuizList;
