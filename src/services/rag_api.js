import api from './api'

export const getRAGInsights = async (query) => {
  const response = await api.post('/api/rag/insights', { query })
  return response.data
}

export const searchKnowledgeBase = async (query, filters = {}) => {
  const response = await api.post('/api/rag/search', { query, filters })
  return response.data
}

export const getSimilarDesigns = async (description) => {
  const response = await api.post('/api/rag/similar-designs', { description })
  return response.data
}

export const getContentSuggestions = async (industry, section) => {
  const response = await api.post('/api/rag/content-suggestions', { industry, section })
  return response.data
}