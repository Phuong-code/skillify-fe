import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import SkillService from '../../service/skillService';

const EditSkillFormDialog = ({ open, onClose, skillData, onUpdateSkill }) => {
  const [skillName, setSkillName] = useState('');
  const [proficiency, setProficiency] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (open && skillData) {
      setSkillName(skillData.name || '');
      setProficiency(skillData.proficiency || '');
      setDescription(skillData.description || '');
    }
  }, [open, skillData]);

  const handleUpdateSkill = async () => {
    try {
      const updatedSkill = {
        id: skillData.id,
        name: skillName,
        proficiency,
        description,
      };

      const response = await SkillService.updateSkill(skillData.id, updatedSkill);
      onUpdateSkill(response);
      onUpdateSkill({ id: skillData.id, name: skillName, proficiency, description });
      onClose();
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: '400px' } }}>
      <DialogTitle>Edit Skill</DialogTitle>
      <DialogContent>
        <TextField
          label="Skill Name"
          value={skillName}
          onChange={(e) => setSkillName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <InputLabel>Proficiency</InputLabel>
        <Select
          value={proficiency}
          onChange={(e) => setProficiency(e.target.value)}
          fullWidth
          sx={{ width: '100%' }}
        >
          <MenuItem value="BEGINNER">BEGINNER</MenuItem>
          <MenuItem value="INTERMEDIATE">INTERMEDIATE</MenuItem>
          <MenuItem value="ADVANCED">ADVANCED</MenuItem>
        </Select>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleUpdateSkill} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSkillFormDialog;
