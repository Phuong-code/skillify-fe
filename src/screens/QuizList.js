import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Container,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  ListSubheader,
  Divider,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import QuizService from '../service/quizService';
import DefaultLayout from '../components/layout/defaultLayout';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    document.title = 'Skillify - Quizzes';
  }, []);

  useEffect(() => {
    QuizService.getAllQuizzes()
      .then((data) => {
        setQuizzes(data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching skills:', error);
        alert('Something went wrong');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const searchResults = await QuizService.searchTechQuizzes(query);
      setSearchResult(searchResults);
      console.log(searchResults);
    } catch (error) {
      console.error('Error searching placements:', error);
      alert('Something went wrong');
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSearchResult([]);
  };

  const technicalQuizzes = quizzes.filter((quiz) => quiz.type === 'SKILL');

  return (
    <DefaultLayout>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper
            elevation={3}
            style={{
              width: '450px',
              maxHeight: '85vh',
              borderRadius: '12px',
              padding: '10px',
              marginTop: '100px',
            }}
          >
            <ListSubheader
              component="div"
              id="list-subheader"
              sx={{ textAlign: 'center', fontSize: 16 }}
            >
              Technical Skills Quizzes
            </ListSubheader>
            <Divider sx={{ mb: 2 }} />
            <form onSubmit={handleSubmit}>
              <TextField
                value={query}
                onChange={handleChange}
                id="outlined-basic"
                label="Search skill by name"
                variant="outlined"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" aria-label="search">
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </form>

            {searchResult.length === 0 && (
              <List sx={{ pt: 0, maxHeight: '85vh', my: 2, overflowY: 'auto' }}>
                {technicalQuizzes.map((quiz) => (
                  <ListItem key={quiz.id}>
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {quiz.skill.name}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component="div"
                          variant="body2"
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          {`${quiz.skill.proficiency} ${quiz.timeLimit} minutes`}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction sx={{ right: 0, paddingRight: 2 }}>
                      <Link to={`/quizList/${quiz.id}`}>
                        <Button variant="contained" sx={{ marginBottom: 2 }}>
                          Take Quiz
                        </Button>
                      </Link>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
            {searchResult.length > 0 && (
              <List sx={{ pt: 0, maxHeight: '65vh', my: 2 }}>
                {searchResult.map((quiz) => (
                  <ListItem key={quiz.id}>
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          {quiz.skillName}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          component="div"
                          variant="body2"
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          {`${quiz.skillProficiency} ${quiz.timeLimit} minutes`}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction sx={{ right: 0, paddingRight: 2 }}>
                      <Link to={`/quizList/${quiz.id}`}>
                        <Button variant="contained" sx={{ marginBottom: 2 }}>
                          Take Quiz
                        </Button>
                      </Link>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Box>
      </Container>
    </DefaultLayout>
  );
};

export default QuizList;
