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

const Toolbox = () => {
  const navigate = useNavigate();

  const onClickMyQuizzes = () => {
    navigate('/my-quizzes');
  };

  const onClickAddQuiz = () => {
    navigate('/add-quiz');
  };

  const onClickManageSkill = () => {
    navigate('/skilllist');
  };

  return (
    <List
      sx={{ bgcolor: 'background.paper' }}
      subheader={<ListSubheader sx={{ textAlign: 'left', fontSize: 16 }}>Tools</ListSubheader>}
    >
      <Divider sx={{ mx: 2 }} />
      <ListItemButton onClick={onClickMyQuizzes}>
        <ListItemIcon>
          <ManageSearchIcon />
        </ListItemIcon>
        <ListItemText primary="My Quizzes" />
      </ListItemButton>
      <ListItemButton onClick={onClickManageSkill}>
        <ListItemIcon>
          <PlaylistAddIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Skill" />
      </ListItemButton>
      <ListItemButton onClick={onClickAddQuiz}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Add a Quiz" />
      </ListItemButton>
    </List>
  );
};

export default Toolbox;
