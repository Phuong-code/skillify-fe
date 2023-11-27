import {
  Container,
  ListItem,
  Typography,
  List,
  ListItemText,
  Box,
  ListSubheader,
  Divider,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import placementActions from '../../actions/placementActions';

const PlacementsDisplayBoard = () => {
  const dispatch = useDispatch();
  const placementList = useSelector((state) => state.placementList);
  const { userInfo } = useSelector((state) => state.auth);
  const { placements } = placementList;

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

  // Filter placements based on user info
  const filteredPlacements = placements.filter(
    (placement) =>
      placement.author.email === userInfo.email && placement.author.role === userInfo.role,
  );

  return (
    <Container>
      <ListSubheader
        component="div"
        id="list-subheader"
        sx={{ textAlign: 'left', fontSize: 16, padding: 0 }}
      >
        Your Placements
      </ListSubheader>
      <Divider />
      <List sx={{ pt: 0, overflowY: 'auto', overflowX: 'hidden', maxHeight: '75vh', my: 2 }}>
        {filteredPlacements.map((placement, index) => (
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
    </Container>
  );
};

export default PlacementsDisplayBoard;
