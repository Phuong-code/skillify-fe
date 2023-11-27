import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RequestService from '../service/requestService';
import DefaultLayout from '../components/layout/defaultLayout';
import userService from '../service/userService';

const RequestAuth = () => {
  useEffect(() => {
    document.title = 'Skillify - Request Authorisation';
  }, []);

  const [requestData, setRequestData] = useState([]);
  const [requestAuth, setRequestAuth] = useState({
    receiverEmail: '',
  });

  const [user, setUser] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(userInfo?.authenticated);
  const navigate = useNavigate();

  const fetchUserSentRequestsList = async () => {
    try {
      const data = await RequestService.getAllRequestSentByUser();
      setRequestData(data);
    } catch (error) {
      console.error('Error getting user RequestList', error);
      alert('Something went wrong');
    }
  };
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
  const fetchUserAuthenticatedSales = async () => {
    try {
      const emails = await userService.getAuthenticatedSales();
      const usersWithEmail = emails.map((email) => ({ email }));
      setUser(usersWithEmail);
    } catch (error) {
      console.error('Error getting user RequestList', error);
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    if (userInfo?.role === 'SALES') {
      fetchUserAuthenticatedSales();
    }
    if (userInfo?.role === 'TRAINER') {
      fetchUserAuthenticatedTrainer();
    }
    setIsAuthenticated(userInfo?.authenticated);
    fetchUserSentRequestsList();
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestAuth({ ...requestAuth, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RequestService.requestAuthentication(requestAuth);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  if (userInfo?.role === 'TRAINEE' && !isAuthenticated) {
    return (
      <DefaultLayout>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <h1>Access Denied ...</h1>
        </Box>
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      {requestData.length > 0 ? (
        <Typography
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <h1>Please wait for approval ...</h1>
        </Typography>
      ) : (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
            }}
          >
            <Typography component="h1" variant="h5">
              Send authorisation request to:
            </Typography>

            <Box>
              <Autocomplete
                id="receiverEmail"
                name="receiverEmail"
                options={user}
                freeSolo
                getOptionLabel={(option) => option.email}
                value={user.find((u) => u.email === requestAuth.receiverEmail) || null}
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
                    style={{ width: '300px' }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.stopPropagation();
                      }
                    }}
                  />
                )}
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
      )}
    </DefaultLayout>
  );
};

export default RequestAuth;
