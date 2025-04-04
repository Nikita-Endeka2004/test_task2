import React, { useState, useEffect } from 'react'
import { Container, CssBaseline, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, CircularProgress } from '@mui/material'
import { TaskList, AddTaskModal, EditTaskModal } from './components'
import { getTasks, createTask, updateTask, deleteTask } from './services/api'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState({ add: false, edit: false })
  const [selectedTask, setSelectedTask] = useState(null)

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      const { data } = await getTasks()
      setTasks(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  const handleSearch = (e) => setSearchQuery(e.target.value.toLowerCase())
  const handleFilter = (e) => setFilter(e.target.value)

  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filter === 'all' || task.isCompleted === (filter === 'completed')
    const matchesSearch = task.title.toLowerCase().includes(searchQuery) ||
      task.description?.toLowerCase().includes(searchQuery)
    return matchesStatus && matchesSearch
  })

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Task Manager</Typography>
        <Button variant="contained" onClick={() => setModalOpen({ ...modalOpen, add: true })}>
          Add Task
        </Button>
      </Box>

      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          label="Search tasks"
          variant="outlined"
          fullWidth
          onChange={handleSearch}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select value={filter} label="Status" onChange={handleFilter}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="incomplete">Incomplete</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onEdit={task => {
            setSelectedTask(task)
            setModalOpen({ ...modalOpen, edit: true })
          }}
          onDelete={async id => {
            await deleteTask(id)
            await fetchTasks()
          }}
        />
      )}

      <AddTaskModal
        open={modalOpen.add}
        onClose={() => setModalOpen({ ...modalOpen, add: false })}
        onSubmit={async task => {
          await createTask(task)
          await fetchTasks()
          setModalOpen({ ...modalOpen, add: false })
        }}
      />

      <EditTaskModal
        open={modalOpen.edit}
        task={selectedTask}
        onClose={() => setModalOpen({ ...modalOpen, edit: false })}
        onSubmit={async task => {
          await updateTask(task.id, task)
          await fetchTasks()
          setModalOpen({ ...modalOpen, edit: false })
        }}
      />
    </Container>
  )
}

export default App