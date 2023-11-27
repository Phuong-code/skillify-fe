import { Button, Stack } from '@mui/material';
import React from 'react';

const ControlPanel = ({ onCancel, onSave }) => {
  return (
    <Stack spacing={2} direction="row" justifyContent="flex-end">
      <Button variant="outlined" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="contained" color="primary" onClick={onSave}>
        Save
      </Button>
    </Stack>
  );
};

export default ControlPanel;
