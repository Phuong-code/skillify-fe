import React, { useEffect } from 'react';
import { Box, FormControl, MenuItem, TextField, Autocomplete } from '@mui/material';
import StepController from './StepController';
import SkillService from '../../../service/skillService';
import { UserRoleType } from '../../../constants/enums';
import placementService from '../../../service/placementService';

const QuizParamsDefinition = ({
  onClickNextStep,
  onClickPrevStep,
  currentStep,
  totalSteps,
  userRole,
}) => {
  const [skillTypes, setSkillTypes] = React.useState([]);
  const [selectedSkill, setSelectedSkill] = React.useState(
    JSON.parse(localStorage.getItem('add-quiz-skillType')) || null,
  );

  const [placements, setPlacements] = React.useState([]);
  const [selectedPlacement, setSelectedPlacement] = React.useState(
    localStorage.getItem('add-quiz-placement') || '',
  );

  const [timeLimit, setTimeLimit] = React.useState(
    parseInt(localStorage.getItem('add-quiz-timeLimit'), 10) || 60,
  );

  const onTimeLimitChange = (event) => {
    setTimeLimit(event.target.value);
  };

  const onSkillChange = (event, value) => {
    setSelectedSkill(value);
  };

  const onPlacementChange = (event) => {
    setSelectedPlacement(event.target.value);
  };

  const isOptionEqualToValue = (option, value) => {
    if (value === '') {
      return true;
    }
    return option.name === value.name && option.proficiency === value.proficiency;
  };

  const saveQuizParams = () => {
    switch (userRole) {
      case UserRoleType.TRAINER:
        localStorage.setItem('add-quiz-skillType', JSON.stringify(selectedSkill));
        break;
      case UserRoleType.SALES:
        localStorage.setItem('add-quiz-placement', selectedPlacement);
        break;
      default:
        break;
    }
    localStorage.setItem('add-quiz-timeLimit', timeLimit);
  };

  const processNextStep = () => {
    saveQuizParams();
    onClickNextStep();
  };

  useEffect(() => {
    const fetchSkillTypes = async () => {
      const data = await SkillService.getSkillsWithNoQuiz();
      setSkillTypes(data);
    };
    const fetchPlacements = async () => {
      const data = await placementService.getMyPlacements();
      setPlacements(data);
    };
    switch (userRole) {
      case UserRoleType.TRAINER:
        fetchSkillTypes();
        break;
      case UserRoleType.SALES:
        fetchPlacements();
        break;
      default:
        break;
    }
  }, [userRole]);

  return (
    <Box>
      <StepController
        onClickNextStep={processNextStep}
        onClickPreviouStep={onClickPrevStep}
        currentStep={currentStep}
        totalSteps={totalSteps}
        headerText={`Step ${currentStep + 1}/${totalSteps} - General Setting`}
      />
      <FormControl fullWidth sx={{ mb: 4 }}>
        {userRole === UserRoleType.TRAINER && (
          <Autocomplete
            label="Skill Type"
            id="skill-type"
            value={
              skillTypes.length > 0
                ? selectedSkill
                : 'No skill type available to add quiz to at the moment'
            }
            InputProps={{
              readOnly: skillTypes.length <= 0,
            }}
            error={skillTypes.length <= 0}
            onChange={onSkillChange}
            options={skillTypes}
            getOptionLabel={(option) => `${option.name} - ${option.proficiency}`}
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                label="Skill"
                variant="outlined"
                placeholder="Type a skill name to search and add"
              />
            )}
            isOptionEqualToValue={isOptionEqualToValue}
            sx={{
              background: 'white',
            }}
          />
        )}
        {userRole === UserRoleType.SALES && (
          <TextField
            label="Placement"
            id="placement"
            select={placements.length > 0}
            value={
              placements.length > 0
                ? selectedPlacement
                : 'No placement available to add quiz to at the moment'
            }
            InputProps={{
              readOnly: placements.length <= 0,
            }}
            error={placements.length <= 0}
            onChange={onPlacementChange}
            sx={{
              background: 'white',
              input: { background: 'white' },
            }}
          >
            {placements.length > 0 &&
              placements.map((placement) => {
                const placementName = `${placement.title} - ${placement.companyName}`;
                return (
                  <MenuItem key={placement.id} value={placement.id}>
                    {placementName}
                  </MenuItem>
                );
              })}
          </TextField>
        )}
      </FormControl>
      <FormControl fullWidth>
        <TextField
          label="Time Limit in Minutes"
          id="time-limit"
          value={timeLimit}
          onChange={onTimeLimitChange}
          sx={{
            background: 'white',
            input: { background: 'white' },
          }}
          InputProps={{
            inputProps: {
              style: { textAlign: 'center' },
            },
          }}
        />
      </FormControl>
    </Box>
  );
};

export default QuizParamsDefinition;
