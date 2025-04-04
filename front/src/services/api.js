import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3005/tasks',
})

export const getTasks = () => API.get('/')
export const createTask = (task) => API.post('/', task)
export const updateTask = (id, task) => API.put(`/${id}`, task)
export const deleteTask = (id) => API.delete(`/${id}`)