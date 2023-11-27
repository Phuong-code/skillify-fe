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

const Toolbox = () => {
  const navigate = useNavigate();

  const onClickTakeQuiz = () => {
    navigate('/quizList');
  };
  const onClickSuggesSkill = () => {
    navigate('/requestSkill');
  };

  return (
    <List
      sx={{ bgcolor: 'background.paper' }}
      subheader={<ListSubheader sx={{ textAlign: 'start', fontSize: 16 }}>Tools</ListSubheader>}
    >
      <Divider sx={{ mx: 2 }} />
      <ListItemButton onClick={onClickTakeQuiz}>
        <ListItemIcon>
          <ManageSearchIcon />
        </ListItemIcon>
        <ListItemText primary="Technical Quizzes" />
      </ListItemButton>
      <ListItemButton onClick={onClickSuggesSkill}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Suggest a Skill" />
      </ListItemButton>
    </List>
  );
};
export default Toolbox;
