import {
  Container,
  ListItemButton,
  Typography,
  List,
  ListItemText,
  Box,
  Divider,
  ListSubheader,
  Stack,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import QuizService from '../../service/quizService';

const QuizToMarkList = () => {
  const [unmarkedResults, setUnmarkedResults] = useState(null);
  const [open, setOpen] = useState();
  const navigate = useNavigate();

  const mergeUnmarkedResults = useMemo(() => {
    const mergedResults = {};
    unmarkedResults?.forEach((result) => {
      if (!mergedResults[result.quiz.id]) {
        mergedResults[result.quiz.id] = [result];
      } else {
        mergedResults[result.quiz.id].push(result);
      }
    });
    return mergedResults;
  }, [unmarkedResults]);

  const handleClickQuiz = (quizId) => {
    if (open === quizId) {
      setOpen(null);
      return;
    }
    setOpen(quizId);
  };

  const handleClickResult = (resultId) => {
    navigate(`/trainee-submission/${resultId}`);
  };

  useEffect(() => {
    QuizService.getUnmarkedResults()
      .then((data) => {
        setUnmarkedResults(data);
      })
      .catch((err) => {
        console.log('unmarked error: ', err);
        alert('Something went wrong');
      });
  }, []);

  return (
    <Container>
      <ListSubheader
        component="div"
        id="list-subheader"
        sx={{ textAlign: 'left', fontSize: 16, padding: 0 }}
      >
        Manual Marking List
      </ListSubheader>
      <Divider />
      <List sx={{ pt: 0, overflowY: 'auto', overflowX: 'hidden', height: '75vh', my: 2 }}>
        {unmarkedResults &&
          Object.keys(mergeUnmarkedResults).map((quizId, index) => (
            <Box key={quizId}>
              {index === 0 || <Divider />}
              <ListItemButton onClick={() => handleClickQuiz(quizId)} sx={{ cursor: 'pointer' }}>
                <ListItemText
                  primary={`${mergeUnmarkedResults[quizId][0].quiz.skill.name}
                   - ${mergeUnmarkedResults[quizId][0].quiz.skill.proficiency}`}
                  secondary={
                    <Typography
                      sx={{
                        display: 'inline',
                        color: 'text.secondary',
                        fontSize: 14,
                      }}
                    >
                      {mergeUnmarkedResults[quizId].length} submissions to mark
                    </Typography>
                  }
                />
                {open === quizId ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {open === quizId &&
                mergeUnmarkedResults[quizId].map((result) => (
                  <ListItemButton
                    key={result.id}
                    sx={{ cursor: 'pointer', pl: 4 }}
                    onClick={() => handleClickResult(result.id)}
                  >
                    <ListItemText
                      primary={`${result.trainee.firstName} ${result.trainee.lastName}`}
                      secondary={
                        <Stack spacing={2} direction="row" justifyContent="space-between">
                          <Typography
                            sx={{
                              display: 'inline',
                              color: 'text.secondary',
                              fontSize: 14,
                            }}
                          >
                            {result.score} / {result.quiz.totalMark} Marks
                          </Typography>
                          <Typography
                            sx={{
                              display: 'inline',
                              color: 'text.secondary',
                              fontSize: 14,
                            }}
                          >
                            Submitted at {new Date(result.submissionDate).toLocaleString()}
                          </Typography>
                        </Stack>
                      }
                    />
                  </ListItemButton>
                ))}
            </Box>
          ))}
      </List>
    </Container>
  );
};

export default QuizToMarkList;
