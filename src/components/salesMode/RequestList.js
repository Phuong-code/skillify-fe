import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
  CardActions,
  ListSubheader,
  List,
} from '@mui/material';
import RequestService from '../../service/requestService';

const RequestList = () => {
  const [requestData, setRequestData] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const fetchUserRequestsList = async () => {
    try {
      const data = await RequestService.getAllRequestReceivedByUser();
      setRequestData(data);
    } catch (error) {
      console.error('Error getting user RequestList', error);
    }
  };

  useEffect(() => {
    fetchUserRequestsList();
  }, []);

  const handleAccept = async (request) => {
    try {
      await RequestService.processAuthenticationRequest(request, true);

      fetchUserRequestsList();
    } catch (error) {
      console.error('Error accepting request', error);
    }
  };

  const handleDecline = async (request) => {
    try {
      await RequestService.processAuthenticationRequest(request, false);
      fetchUserRequestsList();
    } catch (error) {
      console.error('Error declining request', error);
    }
  };
  return (
    <Box>
      <ListSubheader component="div" id="list-subheader" sx={{ textAlign: 'left', fontSize: 16 }}>
        Notifications
      </ListSubheader>
      <Divider sx={{ mx: 2 }} />

      <List sx={{ pt: 0, overflowY: 'auto', overflowX: 'hidden', maxHeight: '65vh', my: 2 }}>
        {requestData.map((request) => (
          <Card key={request.id} style={{ margin: '16px', padding: '16px' }}>
            <CardContent>
              <Typography variant="h8">Requested {request.type}</Typography>
              <Typography variant="body2">By: {request.senderName}</Typography>
              <Typography variant="body2">
                Created Date: {formatDate(request.createdDate)}
              </Typography>
            </CardContent>
            <CardActions>
              <Box sx={{ display: 'flex', gap: 8 }}>
                <Button size="small" onClick={() => handleAccept(request)}>
                  Accept
                </Button>
                <Button size="small" onClick={() => handleDecline(request)}>
                  Decline
                </Button>
              </Box>
            </CardActions>
          </Card>
        ))}
      </List>
    </Box>
  );
};

export default RequestList;
