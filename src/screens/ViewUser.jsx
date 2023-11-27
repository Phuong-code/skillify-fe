/* eslint-disable spaced-comment */
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Chip,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import DefaultLayout from '../components/layout/defaultLayout';
import ProfileImage from '../assets/profile_image.jpg';

export default function ViewUser() {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const role = userInfo?.role || false;
  const [trainee, setTrainee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    status: '',
  });
  const [open, setOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [password, setPassword] = useState('');
  const options = ['TRAINING', 'POND', 'BEACHED', 'ABSENT'];
  const roles = ['TRAINER', 'TRAINEE', 'SALES', 'STAFF', 'ADMIN'];
  const statuses = ['TRAINING', 'POND', 'BEACHED', 'ABSENT'];

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePasswordClickOpen = () => {
    setPasswordOpen(true);
  };

  const handlePasswordClose = () => {
    setPasswordOpen(false);
  };

  useEffect(() => {
    const getTrainee = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/getTrainee/${id}`);

        setTrainee(response.data);
      } catch {
        alert('Something went wrong');
      }
    };

    getTrainee();
  }, [id]);

  const handleSubmit = async () => {
    try {
      await axios.put(`http://localhost:8080/api/user/update_trainee_status/${id}`, null, {
        params: {
          type: selectedValue,
        },
      });
    } catch {
      alert('Something went wrong');
    }

    setOpen(false);

    try {
      const response = await axios.get(`http://localhost:8080/api/user/getTrainee/${id}`);
      setTrainee(response.data);
    } catch {
      alert('Something went wrong');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTrainee((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTraineeUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/user/update_trainee/${id}`, trainee);

      setOpen(false);
    } catch {
      alert('Something went wrong');
    }
  };

  const handlePasswordChange = async () => {
    try {
      await axios.put(`http://localhost:8080/api/user/update_trainee_password/${id}`, { password });

      setPasswordOpen(false);
    } catch {
      alert('Something went wrong');
    }
  };

  return (
    <DefaultLayout>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img
              src={ProfileImage}
              alt="User Avatar"
              style={{ width: '200px', height: '200px', borderRadius: '50%' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Typography variant="h5" gutterBottom>
              <strong>First Name:</strong> {trainee.firstName}
            </Typography>
            <Typography variant="h5" gutterBottom>
              <strong>Last Name:</strong> {trainee.lastName}
            </Typography>
            <Typography sx={{ textAlign: 'left' }} variant="h5" gutterBottom>
              <strong>Email:</strong> {trainee.email}
            </Typography>
            <Typography variant="h5" gutterBottom>
              <strong>Status:</strong> {trainee.status}
            </Typography>
            <Typography sx={{ textAlign: 'left' }} variant="h5" gutterBottom>
              <strong>Skills:</strong>{' '}
              {trainee.skills &&
                trainee.skills
                  .sort((a, b) => {
                    const nameComparison = a.name.localeCompare(b.name);
                    if (nameComparison !== 0) {
                      return nameComparison;
                    }
                    return a.proficiency.localeCompare(b.proficiency);
                  })
                  .map((skill) => (
                    <Chip
                      key={skill.id}
                      label={`${skill.name} ${skill.proficiency}`}
                      variant="outlined"
                      style={{
                        fontSize: '16px',
                        marginRight: '8px',
                        marginBottom: '8px',
                      }}
                    />
                  ))}
            </Typography>
          </div>

          {role === 'SALES' && (
            <>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, fontSize: '1.2rem', width: '300px', height: '50px' }}
                onClick={handleClickOpen}
              >
                Update trainee status
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update status</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {`${trainee.firstName}'s current status: ${trainee.status}. Change status to:`}
                  </DialogContentText>
                  <TextField
                    select
                    label="Select an option"
                    value={selectedValue}
                    onChange={handleSelectChange}
                    variant="outlined"
                    fullWidth
                    sx={{ marginTop: '20px' }}
                  >
                    {options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleSubmit}>Confirm</Button>
                </DialogActions>
              </Dialog>
            </>
          )}

          {role === 'TRAINER' && (
            <>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, fontSize: '1.2rem', width: '300px', height: '50px' }}
                onClick={handleClickOpen}
              >
                Update trainee profile
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update profile</DialogTitle>
                <DialogContent>
                  <form onSubmit={handleTraineeUpdate}>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      name="firstName"
                      value={trainee.firstName}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      name="lastName"
                      value={trainee.lastName}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Email"
                      variant="outlined"
                      type="email"
                      name="email"
                      value={trainee.email}
                      onChange={handleInputChange}
                      fullWidth
                      margin="normal"
                    />
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel>Role</InputLabel>
                      <Select
                        name="role"
                        value={trainee.role}
                        onChange={handleInputChange}
                        label="Role"
                      >
                        {roles.map((item) => (
                          <MenuItem key={item} value={item}>
                            {item}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth variant="outlined" margin="normal">
                      <InputLabel>Status</InputLabel>
                      <Select
                        name="status"
                        value={trainee.status}
                        onChange={handleInputChange}
                        label="Status"
                      >
                        {statuses.map((status) => (
                          <MenuItem key={status} value={status}>
                            {status}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </form>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={handleTraineeUpdate}>Confirm</Button>
                </DialogActions>
              </Dialog>

              <div>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2, fontSize: '1.2rem', width: '300px', height: '50px' }}
                  onClick={handlePasswordClickOpen}
                >
                  Reset trainee password
                </Button>
                <Dialog open={passwordOpen} onClose={handlePasswordClose}>
                  <DialogTitle>Reset</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="New Password"
                      name="newPassword"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="text"
                      fullWidth
                      variant="standard"
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handlePasswordClose}>Cancel</Button>
                    <Button onClick={handlePasswordChange}>Confirm</Button>
                  </DialogActions>
                </Dialog>
              </div>
            </>
          )}
        </Paper>
      </Box>
    </DefaultLayout>
  );
}
