import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  ListSubheader,
  List,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RequestService from '../../service/requestService';

const RequestList = () => {
  const [requestData, setRequestData] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const fetchUserSentRequestsList = async () => {
    try {
      const data = await RequestService.getAllRequestSentByUser();
      setRequestData(data);
    } catch (error) {
      console.error('Error getting user RequestList', error);
      alert('Something went wrong');
    }
  };
  const fetchUserRequestsList = async () => {
    try {
      const data = await RequestService.getAllRequestReceivedByUser();
      setNotifications(data);
    } catch (error) {
      console.error('Error getting user RequestList', error);
      alert('Something went wrong');
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      console.log(notifications);
      await RequestService.deleteNotification(notificationId);
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.requestId !== notificationId),
      );
    } catch (error) {
      console.error('Error deleting notification', error);
      alert('Failed to delete notification');
    }
  };
  useEffect(() => {
    fetchUserSentRequestsList();
    fetchUserRequestsList();
  }, []);

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
              <Typography variant="h8">
                Pending &quot;{request.content}&quot; approval by {request.receiverName}
              </Typography>

              <Typography variant="body2">
                Created Date: {formatDate(request.createdDate)}
              </Typography>
            </CardContent>
          </Card>
        ))}
        {notifications.map((notification) => (
          <Card style={{ margin: '16px', padding: '16px', position: 'relative' }}>
            <IconButton
              edge="end"
              aria-label="delete"
              sx={{ position: 'absolute', top: '1px', right: '10px' }}
              onClick={() => handleDeleteNotification(notification.requestId)}
            >
              <DeleteIcon />
            </IconButton>
            <CardContent>
              <Typography variant="h8">
                {notification.senderName} has{' '}
                {notification.content === 'true'
                  ? 'accepted your skill request'
                  : 'declined you skill request'}
              </Typography>

              <Typography variant="body2">
                Created Date: {formatDate(notification.createdDate)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </List>
    </Box>
  );
};

export default RequestList;
