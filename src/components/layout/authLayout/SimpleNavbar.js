import React from 'react';
import { AppBar, Link, Toolbar, Typography } from '@mui/material';

const SimpleNavbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#007bff' }}>
      <Toolbar>
        <Typography variant="h6" component="div" href="/">
          <Link href="/" underline="none" color="inherit">
            Skillify
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default SimpleNavbar;
