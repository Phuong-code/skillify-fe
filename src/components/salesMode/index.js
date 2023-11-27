import React from 'react';
import { Grid, Paper } from '@mui/material';
import styled from 'styled-components';

import RequestList from './RequestList';
import Toolbox from './Toolbox';
import PlacementsDisplayBoard from './PlacementsDisplayBoard';

const CustomPaper = styled(Paper)`
  border-radius: 8px;
  overflow: hidden;
`;

const salesMainContent = () => {
  return (
    <Grid
      container
      spacing={2}
      sx={{
        mt: 0,
        height: '100%',
        pt: 4,
      }}
    >
      <Grid item xs={12} md={3}>
        <CustomPaper>
          <RequestList />
        </CustomPaper>
      </Grid>
      <Grid item xs={12} md={6}>
        <CustomPaper>
          <PlacementsDisplayBoard />
        </CustomPaper>
      </Grid>
      <Grid item xs={12} md={3}>
        <CustomPaper>
          <Toolbox />
        </CustomPaper>
      </Grid>
    </Grid>
  );
};

export default salesMainContent;
