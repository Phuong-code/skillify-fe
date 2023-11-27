import React, { useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Box,
  Divider,
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
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    fetchUserRequestsList();
  }, []);

  const handleAccept = async (request) => {
    try {
      if (request.type === 'SKILL_ADDITION') {
        await RequestService.trainerProcessSkillRequest(request, true);
      } else if (request.type === 'AUTHORIZATION') {
        await RequestService.processAuthenticationRequest(request, true);
      }

      fetchUserRequestsList();
    } catch (error) {
      console.error('Error accepting request', error);
      alert('Something went wrong');
    }
  };

  const handleDecline = async (request) => {
    try {
      if (request.type === 'SKILL_ADDITION') {
        await RequestService.trainerProcessSkillRequest(request, false);
      }
      if (request.type === 'AUTHORIZATION') {
        await RequestService.trainerProcessSkillRequest(request, false);
      }

      fetchUserRequestsList();
    } catch (error) {
      console.error('Error declining request', error);
      alert('Something went wrong');
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
          <Box key={request.id} sx={{ mb: 4 }}>
            {request.type === 'SKILL_ADDITION' && (
              <Card key={request.id} style={{ margin: '16px', padding: '16px' }}>
                <CardContent>
                  <Typography variant="h6">
                    {request.senderName} suggests {request.content}
                  </Typography>
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
            )}
            {request.type === 'AUTHORIZATION' && (
              <Card key={request.id} style={{ margin: '16px', padding: '16px' }}>
                <CardContent>
                  <Typography variant="h6">
                    {request.senderName} is requesting authorisation
                  </Typography>
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
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default RequestList;
