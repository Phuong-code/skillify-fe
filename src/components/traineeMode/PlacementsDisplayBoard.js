import {
  Container,
  ListItem,
  Typography,
  List,
  ListItemText,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  ListSubheader,
  Divider,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import placementService from '../../service/placementService';
import placementActions from '../../actions/placementActions';

const PlacementsDisplayBoard = () => {
  const dispatch = useDispatch();
  const placementList = useSelector((state) => state.placementList);
  const { placements } = placementList;
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    try {
      dispatch(placementActions.listPlacements());
    } catch {
      alert('Something went wrong');
    }
  }, [dispatch]);

  const linkStyle = {
    display: 'inline-block',
    textDecoration: 'none',
    color: 'black',
    width: '100%',
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSearchResult([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const searchResults = await placementService.searchPlacements(query);
      setSearchResult(searchResults);
    } catch (error) {
      console.error('Error searching placements:', error);
      alert('Something went wrong');
    }
  };

  return (
    <Container>
      <ListSubheader
        component="div"
        id="list-subheader"
        sx={{ textAlign: 'left', fontSize: 16, padding: 0 }}
      >
        Available Placements
      </ListSubheader>
      <Divider sx={{ mb: 2 }} />
      <form onSubmit={handleSubmit}>
        <TextField
          value={query}
          onChange={handleChange}
          id="outlined-basic"
          label="Search placement by company, skill, author or title"
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
        <List sx={{ pt: 0, overflowY: 'auto', overflowX: 'hidden', maxHeight: '65vh', my: 2 }}>
          {placements.map((placement, index) => (
            <Box key={placement.id}>
              {index === 0 || <Divider />}
              <ListItem>
                <Link to={`/placement/${placement.id}`} style={linkStyle}>
                  <ListItemText
                    primary={placement.title}
                    secondary={
                      <>
                        <Typography component="div" variant="body1">
                          {`Company: ${placement.companyName}`}
                        </Typography>
                        <Typography component="div" variant="body1">
                          {`Account Manager: ${placement.author.firstName} ${placement.author.lastName}`}
                        </Typography>
                        <Typography component="div" variant="body1">
                          {`Expressions of interest by: ${new Date(
                            placement.expiredDate,
                          ).toDateString()}`}
                        </Typography>
                      </>
                    }
                  />
                </Link>
              </ListItem>
            </Box>
          ))}
        </List>
      )}

      {searchResult.length > 0 && (
        <List sx={{ pt: 0, overflowY: 'auto', overflowX: 'hidden', maxHeight: '65vh', my: 2 }}>
          {searchResult.map((placement, index) => (
            <Box key={placement.id}>
              {index === 0 || <Divider />}
              <ListItem>
                <Link to={`/placement/${placement.id}`} style={linkStyle}>
                  <ListItemText
                    primary={placement.title}
                    secondary={
                      <>
                        <Typography component="div" variant="body1">
                          {`Company: ${placement.companyName}`}
                        </Typography>
                        <Typography component="div" variant="body1">
                          {`Account Manager: ${placement.authorFirstName} ${placement.authorLastName}`}
                        </Typography>
                        <Typography component="div" variant="body1">
                          {`Expressions of interest by: ${new Date(
                            placement.expiredDate,
                          ).toDateString()}`}
                        </Typography>
                      </>
                    }
                  />
                </Link>
              </ListItem>
            </Box>
          ))}
        </List>
      )}
    </Container>
  );
};

export default PlacementsDisplayBoard;
