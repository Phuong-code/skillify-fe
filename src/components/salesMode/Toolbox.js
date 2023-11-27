/* eslint-disable prettier/prettier */
import React from 'react';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Divider,
} from '@mui/material';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DescriptionIcon from '@mui/icons-material/Description';

const Toolbox = () => {
  const navigate = useNavigate();
  const onClickPostPlacement = () => {
    navigate('/createPlacement');
  };

  const onClickAddQuiz = () => {
    navigate('/add-quiz');
  };

  const onClickMyQuizzes = () => {
    navigate('/my-quizzes');
  };

  const onClickTraineeSubmissions = () => {
    navigate('/trainee-submissions');
  };

  return (
    <List
      sx={{ bgcolor: 'background.paper' }}
      subheader={<ListSubheader sx={{ textAlign: 'start', fontSize: 16 }}>Tools</ListSubheader>}
    >
      <Divider sx={{ mx: 2 }} />
      <ListItemButton onClick={onClickPostPlacement}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Post a placement" />
      </ListItemButton>
      <ListItemButton onClick={onClickAddQuiz}>
        <ListItemIcon>
          <PlaylistAddIcon />
        </ListItemIcon>
        <ListItemText primary="Add a client quiz" />
      </ListItemButton>
      <ListItemButton onClick={onClickMyQuizzes}>
        <ListItemIcon>
          <ManageSearchIcon />
        </ListItemIcon>
        <ListItemText primary="My quizzes" />
      </ListItemButton>
      <ListItemButton onClick={onClickTraineeSubmissions}>
        <ListItemIcon>
          <DescriptionIcon />
        </ListItemIcon>
        <ListItemText primary="Trainee submissions" />
      </ListItemButton>
    </List>
  );
};

export default Toolbox;
