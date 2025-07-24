import axios from 'axios'
import { API_BASE_URL } from '../utils/constants'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const generateLandingPage = async (projectData) => {
  const response = await api.post('/api/generate', projectData)
  return response.data
}

export const getProject = async (projectId) => {
  const response = await api.get(`/api/projects/${projectId}`)
  return response.data
}

export const getAllProjects = async () => {
  const response = await api.get('/api/projects')
  return response.data
}

export const deployProject = async (projectId, platform) => {
  const response = await api.post(`/api/deploy/${projectId}`, { platform })
  return response.data
}

export const getTemplates = async (category) => {
  const response = await api.get(`/api/templates?category=${category}`)
  return response.data
}

export default api