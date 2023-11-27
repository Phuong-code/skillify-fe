import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Link,
  TextField,
  Menu,
  MenuItem,
  Autocomplete,
  Box,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import axios from 'axios';
import { logout } from '../../../actions/authActions';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [allTrainees, setAllTrainees] = useState([]);
  const [greeting, setGreeting] = useState('');

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth.userInfo);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleYourProfileClick = () => {
    navigate('/user-details');
    handleMenuClose();
  };

  const logoutHandler = () => {
    navigate('/');
    dispatch(logout());
  };

  useEffect(() => {
    if (currentUser) {
      setGreeting(`Hi, ${currentUser.firstName} ${currentUser.lastName}`);
    }
  }, [currentUser]);

  useEffect(() => {
    const getAllTrainees = async () => {
      const response = await axios.get('http://localhost:8080/api/user/alltrainees');
      setAllTrainees(response.data);
    };

    getAllTrainees();
  }, []);

  const filterOptions = (options, { inputValue }) => {
    const inputValueLower = inputValue.toLowerCase();

    return options.filter((option) => {
      const firstNameLower = option.firstName.toLowerCase();
      const lastNameLower = option.lastName.toLowerCase();
      const skillsNames = option.skills.map((skill) => skill.name.toLowerCase());

      return (
        firstNameLower.includes(inputValueLower) ||
        lastNameLower.includes(inputValueLower) ||
        skillsNames.includes(inputValueLower)
      );
    });
  };

  const handleTraineeSelection = (event, value) => {
    if (value && value.id && allTrainees.some((trainee) => trainee.id === value.id)) {
      navigate(`/view-trainee/${value.id}`);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#007bff' }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          <Link href="/" underline="none" color="inherit">
            Skillify {currentUser && `- ${currentUser.role}`}
          </Link>
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          {currentUser && currentUser.authenticated && (
            <Autocomplete
              onChange={handleTraineeSelection}
              sx={{ margin: 'auto', backgroundColor: 'white', borderRadius: '5px' }}
              clearOnEscape
              open={open}
              freeSolo
              onOpen={() => {
                if (input) {
                  setOpen(true);
                }
              }}
              onClose={() => setOpen(false)}
              onInputChange={(e, value) => {
                setInput(value);

                if (!value) {
                  setOpen(false);
                }
              }}
              inputValue={input}
              options={allTrainees}
              getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
              style={{ width: 300 }}
              filterOptions={filterOptions}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  placeholder="Search trainee by name or skill"
                  variant="outlined"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.stopPropagation();
                    }
                  }}
                />
              )}
            />
          )}
        </Box>
        <Typography variant="body1" component="div">
          <Button
            aria-controls="user-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            {greeting}
            <KeyboardArrowDownIcon />
          </Button>
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleYourProfileClick}>Your Profile</MenuItem>
            <MenuItem onClick={logoutHandler}>Log out</MenuItem>
          </Menu>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
