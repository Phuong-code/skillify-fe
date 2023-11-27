import React, { useState, useEffect } from 'react';
import {
  Box,
  ListSubheader,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Container,
  Paper,
  Divider,
  InputAdornment,
  TextField,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SkillService from '../service/skillService';
import AddSkillFormDialog from '../components/skillList/AddSkillFormDialog';
import DeleteSkillAlertDialog from '../components/skillList/DeleteSkillAlertDialog';
import EditSkillFormDialog from '../components/skillList/EditSkillFormDialog';
import DefaultLayout from '../components/layout/defaultLayout';

const SkillList = () => {
  const [skills, setSkills] = useState([]);
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  useEffect(() => {
    document.title = 'Skillify - Manage Skills';
  }, []);

  useEffect(() => {
    SkillService.getAllSkills()
      .then((data) => {
        setSkills(data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error fetching skills:', error);
        alert('Something went wrong');
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const searchResults = await SkillService.searchSkills(query);
      setSearchResult(searchResults);
      console.log(searchResults);
    } catch (error) {
      console.error('Error searching placements:', error);
      alert('Something went wrong');
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    setSearchResult([]);
  };

  const handleAddSkill = async (newSkill) => {
    try {
      const addedSkill = await SkillService.addSkill(newSkill);
      console.log('addedSkill', addedSkill);
      if (addedSkill.id != null) {
        setSkills([...skills, addedSkill]);
      }
      setIsAddDialogOpen(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error adding skill:', error);
      alert('Something went wrong');
    }
  };

  const handleEditSkill = (skill) => {
    setSelectedSkill(skill);
    setEditDialogOpen(true);
  };

  const handleDeleteSkill = (id) => {
    setSelectedSkillId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteSkill = async () => {
    try {
      await SkillService.deleteSkill(selectedSkillId);
      setSkills(skills.filter((skill) => skill.id !== selectedSkillId));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error deleting skill:', error);
      alert('Something went wrong');
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  return (
    <DefaultLayout>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Paper
            elevation={3}
            style={{
              width: '100%',
              maxHeight: '75vh',
              borderRadius: '12px',
              padding: '10px',
              marginTop: '70px',
            }}
          >
            <ListSubheader
              component="div"
              id="list-subheader"
              sx={{ textAlign: 'center', fontSize: 25 }}
            >
              All Skills
              <Divider sx={{ mb: 2 }} />
              <form onSubmit={handleSubmit}>
                <TextField
                  value={query}
                  onChange={handleChange}
                  id="outlined-basic"
                  label="Search skill by name"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit" aria-label="search">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ marginBottom: 2 }}
                />
              </form>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ marginBottom: 2 }}
                onClick={() => setIsAddDialogOpen(true)}
              >
                Add A New Skill
              </Button>
            </ListSubheader>
            {searchResult.length === 0 && (
              <List sx={{ pt: 0, maxHeight: '45vh', my: 2, overflowY: 'auto' }}>
                {skills.map((skill) => (
                  <ListItem key={skill.id}>
                    <ListItemText
                      primaryTypographyProps={{ variant: 'h5' }}
                      primary={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            component="div"
                            sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                            maxWidth="50%"
                          >
                            {skill.name}{' '}
                          </Box>
                          <div style={{ marginLeft: '5px' }}>- {skill.proficiency}</div>
                        </div>
                      }
                      secondary={skill.description}
                      sx={{ paddingRight: '40px' }}
                    />
                    <ListItemSecondaryAction sx={{ right: 0, paddingRight: 2 }}>
                      {/* Edit Button */}
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditSkill(skill)}
                      >
                        <EditIcon />
                      </IconButton>
                      {/* Delete Button */}
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteSkill(skill.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
            {searchResult.length > 0 && (
              <List sx={{ pt: 0, maxHeight: '45vh', my: 2, overflowY: 'auto' }}>
                {searchResult.map((skill) => (
                  <ListItem key={skill.id}>
                    <ListItemText
                      primaryTypographyProps={{ variant: 'h5' }}
                      primary={
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            component="div"
                            sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                            maxWidth="50%"
                          >
                            {skill.name}{' '}
                          </Box>
                          <div style={{ marginLeft: '5px' }}>- {skill.proficiency}</div>
                        </div>
                      }
                      secondary={skill.description}
                      sx={{ paddingRight: '40px' }}
                    />
                    <ListItemSecondaryAction sx={{ right: 0, paddingRight: 2 }}>
                      {/* Edit Button */}
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => handleEditSkill(skill)}
                      >
                        <EditIcon />
                      </IconButton>
                      {/* Delete Button */}
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => handleDeleteSkill(skill.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Box>
      </Container>
      {/* Add Skill Form Dialog */}
      <AddSkillFormDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddSkill={handleAddSkill}
      />
      {/* Delete Confirmation Dialog */}
      <DeleteSkillAlertDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDeleteSkill}
      />
      {/* Edit Skill Dialog */}
      <EditSkillFormDialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        skillData={selectedSkill}
        onUpdateSkill={(updatedSkill) => {
          // Update the skill in the skills array
          const updatedSkills = skills.map((skill) =>
            skill.id === updatedSkill.id ? updatedSkill : skill,
          );
          setSkills(updatedSkills);
          setEditDialogOpen(false);
        }}
      />
    </DefaultLayout>
  );
};

export default SkillList;
