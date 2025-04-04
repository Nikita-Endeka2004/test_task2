import React, { useState } from 'react'
import { Modal, Box, TextField, FormControlLabel, Checkbox, Button, Typography } from '@mui/material'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
}

export const AddTaskModal = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)

  const handleSubmit = () => {
    onSubmit({ title, description, isCompleted })
    setTitle('')
    setDescription('')
    setIsCompleted(false)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>Add New Task</Typography>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={<Checkbox checked={isCompleted} onChange={(e) => setIsCompleted(e.target.checked)} />}
          label="Completed"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Add Task
        </Button>
      </Box>
    </Modal>
  )
}

export const EditTaskModal = ({ open, task, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(task || {})

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleCheckbox = (e) => {
    setFormData({ ...formData, isCompleted: e.target.checked })
  }

  const handleSubmit = () => {
    onSubmit(formData)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>Edit Task</Typography>
        <TextField
          label="Title"
          fullWidth
          value={formData.title || ''}
          onChange={handleChange('title')}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={formData.description || ''}
          onChange={handleChange('description')}
          sx={{ mb: 2 }}
        />
        <FormControlLabel
          control={<Checkbox checked={formData.isCompleted || false} onChange={handleCheckbox} />}
          label="Completed"
          sx={{ mb: 2 }}
        />
        <Button variant="contained" fullWidth onClick={handleSubmit}>
          Save Changes
        </Button>
      </Box>
    </Modal>
  )
}