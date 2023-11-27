import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, TextField, Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete'; // Import the Autocomplete component
import RequestService from '../service/requestService';
import CenterLayout from '../components/layout/centerLayout';
import userService from '../service/userService';

const RequestSkill = () => {
  useEffect(() => {
    document.title = 'Skillify - Request Skill';
  }, []);

  const [requestSkill, setRequestSkill] = useState({
    receiverEmail: '',
    type: 'SKILL_ADDITION',
    content: '',
    expiredDate: '',
  });
  const [user, setUser] = useState([]);

  const navigate = useNavigate();

  const fetchUserAuthenticatedTrainer = async () => {
    try {
      const emails = await userService.getAuthenticatedTrainer();
      const usersWithEmail = emails.map((email) => ({ email }));
      setUser(usersWithEmail);
    } catch (error) {
      console.error('Error getting user RequestList', error);
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    fetchUserAuthenticatedTrainer();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestSkill({ ...requestSkill, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RequestService.traineeRequestSkill(requestSkill);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <CenterLayout>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Request Skill
          </Typography>

          <Box>
            <Autocomplete
              id="receiverEmail"
              name="receiverEmail"
              freeSolo
              options={user}
              getOptionLabel={(option) => option.email}
              value={user.find((u) => u.email === requestSkill.receiverEmail) || null}
              onChange={(event, newValue) =>
                handleChange({
                  target: { name: 'receiverEmail', value: newValue ? newValue.email : '' },
                })
              }
              limitTags={10}
              renderInput={(params) => (
                /* eslint-disable react/jsx-props-no-spreading */
                <TextField
                  {...params}
                  margin="normal"
                  required
                  fullWidth
                  label="Email"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.stopPropagation();
                    }
                  }}
                />
              )}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="content"
              label="Content"
              name="content"
              value={requestSkill.content}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button
              onClick={handleSubmit}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </CenterLayout>
  );
};

export default RequestSkill;
