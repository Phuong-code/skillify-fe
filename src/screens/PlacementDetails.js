import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  List,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
} from '@mui/material';
import { useSelector } from 'react-redux';
import PlacementService from '../service/placementService';
import WithFooterLayout from '../components/layout/withFooterLayout';

const PlacementDetails = () => {
  const { placementId } = useParams();
  const [placement, setPlacement] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [quizList, setQuizList] = useState(null);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Skillify - Placement';
  }, []);

  useEffect(() => {
    PlacementService.getPlacementById(placementId)
      .then((fetchedPlacement) => {
        setPlacement(fetchedPlacement);
        console.log(fetchedPlacement);
      })
      .catch((error) => {
        console.error('Error fetching placement:', error);
        alert('Something went wrong');
      });
  }, [placementId]);

  const handleDeletePlacement = async () => {
    try {
      await PlacementService.deletePlacement(placementId);
      navigate('/');
    } catch (error) {
      console.error('Error deleting placement:', error);
      alert('Something went wrong');
    }
  };

  const handleRedirectToEditPage = () => {
    navigate(`/placement/${placementId}/edit`);
  };

  const handleOpenDeleteConfirmation = () => {
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmationOpen(false);
  };

  const handleTakeInterviewQuiz = () => {
    PlacementService.getQuizListByPlacementId(placementId)
      .then((fetchedQuizList) => {
        setQuizList(fetchedQuizList);
      })
      .catch((error) => {
        console.error('Error fetching quiz list:', error);
        alert('Something went wrong');
      });
  };

  if (!placement) {
    // Display a loading indicator or other content while fetching data
    return <div>Loading...</div>;
  }

  return (
    <WithFooterLayout>
      <Container>
        <Box my={3}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
              {placement.title}
            </Typography>
            <Typography variant="h5">{placement.companyName}</Typography>
            <Typography variant="body2" mt={2}>
              Account Manager: {placement.author.firstName} {placement.author.lastName}
            </Typography>
            <Typography variant="body2">
              Date created: {new Date(placement.createdDate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Applications close: {new Date(placement.expiredDate).toDateString()}
            </Typography>
            <Typography
              variant="body1"
              gutterBottom
              style={{ textAlign: 'left', marginTop: '16px' }}
            >
              <strong>Description:</strong>
              <div style={{ marginLeft: '20px', marginTop: '8px' }}>{placement.description}</div>
            </Typography>
            <Box mt={2} mb={2}>
              <Typography variant="body1" style={{ textAlign: 'left' }}>
                <strong>Skills required:</strong>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  alignItems="center"
                  marginTop="8px"
                  marginLeft="20px"
                >
                  {placement.skills.map((skill) => (
                    <Chip
                      key={skill.id}
                      label={`${skill.proficiency.charAt(0).toUpperCase()}${skill.proficiency
                        .slice(1)
                        .toLowerCase()} ${skill.name}`}
                      variant="outlined"
                      style={{ marginRight: '8px', marginBottom: '8px' }}
                    />
                  ))}
                </Box>
              </Typography>
            </Box>

            {userInfo.role === 'TRAINEE' && (
              <>
                <Button variant="contained" color="primary" onClick={handleTakeInterviewQuiz}>
                  Take Interview Quiz
                </Button>
                <Dialog
                  open={quizList !== null}
                  onClose={() => setQuizList(null)}
                  aria-labelledby="quiz-dialog-title"
                  aria-describedby="quiz-dialog-description"
                >
                  <DialogTitle id="quiz-dialog-title">
                    Client Interview Quizzes To Complete
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="quiz-dialog-description">
                      <List>
                        {quizList && quizList.length > 0 ? (
                          quizList.map((quiz, index) => (
                            <ListItem key={quiz.id}>
                              <ListItemText
                                primary={`Quiz ${index + 1} - ${quiz.totalMark} marks`}
                              />
                              <ListItemSecondaryAction>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    navigate(`/quizList/${quiz.id}`);
                                  }}
                                  size="small"
                                >
                                  Take Quiz
                                </Button>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))
                        ) : (
                          <Typography variant="body1" style={{ textAlign: 'left' }}>
                            No client interview quiz for this placement
                          </Typography>
                        )}
                      </List>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setQuizList(null)} color="primary" variant="outlined">
                      Back
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
            {userInfo.role === 'SALES' && (
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: '16px' }}
                  onClick={handleRedirectToEditPage}
                >
                  Edit Placement
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleOpenDeleteConfirmation}
                >
                  Delete Placement
                </Button>
                <Dialog
                  open={deleteConfirmationOpen}
                  onClose={handleCloseDeleteConfirmation}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to delete this placement?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDeleteConfirmation} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleDeletePlacement} color="secondary" autoFocus>
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </WithFooterLayout>
  );
};

export default PlacementDetails;
