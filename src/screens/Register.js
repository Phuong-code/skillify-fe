import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
} from '@mui/material';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import registerUser from '../actions/userActions';
import AuthLayout from '../components/layout/authLayout';

const Register = () => {
  useEffect(() => {
    document.title = 'Skillify - Register';
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registrationState = useSelector((state) => state.userRegister);
  const { loading, error } = registrationState;
  const [userInformation, setUserInformation] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userInformation));
    navigate('/');
  };

  return (
    <AuthLayout>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Register
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={userInformation.email}
              onChange={(e) => setUserInformation({ ...userInformation, email: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              autoComplete="register-password"
              autoFocus
              value={userInformation.password}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  password: e.target.value,
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              type="text"
              autoComplete="first-nane"
              autoFocus
              value={userInformation.firstName}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  firstName: e.target.value,
                })
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              type="text"
              autoComplete="lastName-password"
              autoFocus
              value={userInformation.lastName}
              onChange={(e) =>
                setUserInformation({
                  ...userInformation,
                  lastName: e.target.value,
                })
              }
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="role-select-label">Register as</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                value={userInformation.role}
                label="Role"
                onChange={(e) => setUserInformation({ ...userInformation, role: e.target.value })}
                style={{ textAlign: 'left' }}
              >
                <MenuItem value="TRAINEE">Trainee</MenuItem>
                <MenuItem value="TRAINER">Trainer</MenuItem>
                <MenuItem value="SALES">Sales</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}

            <Grid container justifyContent="center">
              <Grid item>
                {' '}
                <Link to="/">Already a User? Login In</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default Register;
