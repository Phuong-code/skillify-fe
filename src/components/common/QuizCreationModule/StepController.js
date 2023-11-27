import { Grid, Button, ListSubheader } from '@mui/material';
import React from 'react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const StepController = ({
  onClickNextStep,
  onClickPreviouStep,
  currentStep,
  totalSteps,
  headerText,
}) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
      <Grid item xs={4} sx={{ display: 'flex' }} justifyContent="flex-start">
        {currentStep > 0 && (
          <Button
            variant="contained"
            startIcon={<NavigateBeforeIcon />}
            onClick={onClickPreviouStep}
          >
            Previous Step
          </Button>
        )}
      </Grid>
      <Grid item>
        <ListSubheader sx={{ textAlign: 'center', fontSize: 16 }}>{headerText}</ListSubheader>
      </Grid>
      <Grid item xs={4} sx={{ display: 'flex' }} justifyContent="flex-end">
        {currentStep < totalSteps - 1 && (
          <Button variant="contained" endIcon={<NavigateNextIcon />} onClick={onClickNextStep}>
            Next Step
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default StepController;
