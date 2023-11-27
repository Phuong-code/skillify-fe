import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  ListSubheader,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Stack,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { UserRoleType } from '../constants/enums';
import DefaultLayout from '../components/layout/defaultLayout';
import QuizService from '../service/quizService';

const TraineeSubmissions = () => {
  useEffect(() => {
    document.title = 'Skillify - Trainee Submissions';
  }, []);

  const { isLoggedIn, userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [submissions, setSubmissions] = React.useState([]);
  const [openPlacement, setOpenPlacement] = React.useState();
  const [openQuiz, setOpenQuiz] = React.useState();

  const mergeSubmissions = useMemo(() => {
    const mergedSubmissions = {};
    submissions.forEach((submission) => {
      if (!mergedSubmissions[submission.quiz.placement.id]) {
        mergedSubmissions[submission.quiz.placement.id] = {
          [submission.quiz.id]: [submission],
        };
      } else if (!mergedSubmissions[submission.quiz.placement.id][submission.quiz.id]) {
        mergedSubmissions[submission.quiz.placement.id][submission.quiz.id] = [submission];
      } else {
        mergedSubmissions[submission.quiz.placement.id][submission.quiz.id].push(submission);
      }
    });
    return mergedSubmissions;
  }, [submissions]);

  const handleClickPlacement = (placementId) => {
    if (openPlacement === placementId) {
      setOpenPlacement(null);
      setOpenQuiz(null);
      return;
    }
    setOpenPlacement(placementId);
    setOpenQuiz(null);
  };

  const handleClickQuiz = (quizId) => {
    if (openQuiz === quizId) {
      setOpenQuiz(null);
      return;
    }
    setOpenQuiz(quizId);
  };

  const handleClickResult = (resultId) => {
    navigate(`/trainee-submission/${resultId}`);
  };

  const countSubmissionsByPlacement = (placementId) => {
    let count = 0;
    submissions.forEach((submission) => {
      if (submission.quiz.placement.id === placementId) {
        count += 1;
      }
    });
    return count;
  };

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/login');
    } else if (userInfo?.role === UserRoleType.TRAINEE) {
      navigate('/');
    }
  }, [isLoggedIn, userInfo]);

  useEffect(() => {
    QuizService.getResults()
      .then((data) => {
        setSubmissions(data);
      })
      .catch((err) => {
        console.log(err);
        alert('Something went wrong');
      });
  }, []);

  return (
    <DefaultLayout>
      <Box width="100%" maxWidth="md" sx={{ mt: 4 }}>
        <Paper sx={{ padding: 2, pt: 0, maxHeight: '80vh', overflowY: 'auto' }}>
          <ListSubheader
            component="div"
            id="list-subheader"
            sx={{ textAlign: 'left', fontSize: 16, padding: 0 }}
          >
            Trainee Submissions
          </ListSubheader>
          <Divider />
          <List component="nav" aria-labelledby="list-subheader">
            {submissions &&
              Object.keys(mergeSubmissions).map((placementId, index) => (
                <Box key={placementId}>
                  {index !== 0 && <Divider />}
                  <ListItemButton
                    onClick={() => handleClickPlacement(placementId)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <ListItemText
                      primary={`${
                        mergeSubmissions[placementId][
                          Object.keys(mergeSubmissions[placementId])[0]
                        ][0].quiz.placement.title
                      } - ${
                        mergeSubmissions[placementId][
                          Object.keys(mergeSubmissions[placementId])[0]
                        ][0].quiz.placement.companyName
                      }`}
                      secondary={
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {countSubmissionsByPlacement(placementId)} submissions
                        </Typography>
                      }
                    />
                    {openPlacement === placementId ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  {openPlacement === placementId &&
                    mergeSubmissions[placementId] &&
                    Object.keys(mergeSubmissions[placementId]).map((quizId, subIndex) => (
                      <>
                        <ListItemButton
                          key={quizId}
                          sx={{ cursor: 'pointer', pl: 4 }}
                          onClick={() => handleClickQuiz(quizId)}
                        >
                          <ListItemText
                            primary={`Quiz ${subIndex + 1} (${
                              mergeSubmissions[placementId][quizId][0].quiz.totalMark
                            } marks)`}
                          />
                          {openQuiz === quizId ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        {openQuiz === quizId &&
                          mergeSubmissions[placementId][quizId].map((submission) => (
                            <ListItemButton
                              key={submission.id}
                              sx={{ cursor: 'pointer', pl: 6 }}
                              onClick={() => handleClickResult(submission.id)}
                            >
                              <ListItemText
                                primary={
                                  <Stack spacing={2} direction="row" justifyContent="space-between">
                                    <Typography
                                      sx={{ display: 'inline' }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {`Trainee: ${submission.trainee.firstName} ${submission.trainee.lastName}`}
                                    </Typography>
                                    <Typography
                                      sx={{ display: 'inline' }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      {submission.score} / {submission.quiz.totalMark} Marks
                                    </Typography>
                                    <Typography
                                      sx={{ display: 'inline' }}
                                      component="span"
                                      variant="body2"
                                      color="text.primary"
                                    >
                                      Submitted at{' '}
                                      {new Date(submission.submissionDate).toLocaleString()}
                                    </Typography>
                                  </Stack>
                                }
                              />
                            </ListItemButton>
                          ))}
                      </>
                    ))}
                </Box>
              ))}
          </List>
        </Paper>
      </Box>
    </DefaultLayout>
  );
};

export default TraineeSubmissions;
