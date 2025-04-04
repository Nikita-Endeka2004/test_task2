import React from 'react'
import { List, ListItem, ListItemText, Checkbox, IconButton, ListItemSecondaryAction } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'

export const TaskList = ({ tasks, onEdit, onDelete }) => (
  <List>
    {tasks.map(task => (
      <ListItem key={task.id} divider>
        <Checkbox
          checked={task.isCompleted}
          color="primary"
          inputProps={{ 'aria-label': 'task status' }}
          disabled
        />
        <ListItemText
          primary={task.title}
          secondary={task.description}
          sx={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}
        />
        <ListItemSecondaryAction>
          <IconButton onClick={() => onEdit(task)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => onDelete(task.id)}>
            <Delete />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ))}
  </List>
)