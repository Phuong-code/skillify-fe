import React, { useState } from 'react';
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

const AddSkillFormDialog = ({ open, onClose, onAddSkill }) => {
  const [skillName, setSkillName] = useState('');
  const [proficiency, setProficiency] = useState('');
  const [description, setDescription] = useState('');

  const handleAddSkill = () => {
    onAddSkill({ name: skillName, proficiency, description });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ sx: { width: '400px' } }}>
      <DialogTitle>Add New Skill</DialogTitle>
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
        <Button onClick={handleAddSkill} color="primary">
          Add Skill
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSkillFormDialog;
