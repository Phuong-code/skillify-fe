import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Autocomplete, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import placementService from '../service/placementService';
import SkillService from '../service/skillService';
import DefaultLayout from '../components/layout/defaultLayout';

export default function CreatePlacement() {
  useEffect(() => {
    document.title = 'Skillify - Post a Placement';
  }, []);
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    title: '',
    description: '',
    companyName: '',
    expiredDate: '',
    skillNames: [],
  });
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    SkillService.getAllSkills()
      .then((responseSkills) => {
        setSkills(responseSkills);
      })
      .catch((error) => {
        console.error('Error fetching skills:', error);
        alert('Something went wrong');
      });
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormInput((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    console.log(formInput.skillNames);
  }

  function handleSkillsChange(e, value) {
    const finalValue = [];
    const selectedNames = new Set();
    value.forEach((option) => {
      if (!selectedNames.has(option.name)) {
        finalValue.push(option);
        selectedNames.add(option.name);
      }
    });
    setFormInput((prevFormData) => ({
      ...prevFormData,
      skillNames: finalValue,
    }));
  }

  function filterOptions(options, state) {
    const filtered = options.filter((option) => {
      const value = state.inputValue.toLowerCase();
      const skillName = option.name.toLowerCase();
      const skillProficiency = option.proficiency.toLowerCase();
      const concatedSkillName = `${skillName} - ${skillProficiency}`;
      return concatedSkillName.includes(value);
    });
    return filtered;
  }

  function isOptionEqualToValue(option, value) {
    if (value === '') {
      return false;
    }
    return (
      option.name.toLowerCase() === value.name.toLowerCase() &&
      option.proficiency === value.proficiency
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await placementService.createPlacement(formInput);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  }

  return (
    <DefaultLayout>
      <h1>Publish a placement opportunity</h1>

      <Paper sx={{ padding: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '800px',
              gap: '2rem',
              margin: 'auto',
              justifyContent: 'center',
              flexGrow: 1,
              mb: 2,
            }}
          >
            <TextField
              InputLabelProps={{ shrink: true }}
              id="outlined-basic"
              value={formInput.title}
              name="title"
              label="Title"
              variant="outlined"
              onChange={handleChange}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              id="outlined-basic"
              value={formInput.description}
              name="description"
              label="Description"
              variant="outlined"
              multiline
              rows={6}
              onChange={handleChange}
            />
            <TextField
              InputLabelProps={{ shrink: true }}
              id="outlined-basic"
              value={formInput.companyName}
              name="companyName"
              label="Company"
              variant="outlined"
              onChange={handleChange}
            />

            <Autocomplete
              id="skill-autocomplete"
              value={formInput?.skillNames || []}
              multiple
              limitTags={2}
              options={skills}
              getOptionLabel={(option) => `${option.name} - ${option.proficiency}`}
              onChange={handleSkillsChange}
              renderInput={(params) => (
                <TextField
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label="Skill"
                  variant="outlined"
                  placeholder="Type a skill name to search and add"
                />
              )}
              filterOptions={filterOptions}
              isOptionEqualToValue={isOptionEqualToValue}
              fullWidth
            />

            <TextField
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              label="Application expiry date"
              type="date"
              name="expiredDate"
              value={formInput.expiredDate}
              onChange={handleChange}
              required
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '20%', margin: 'auto' }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </DefaultLayout>
  );
}
