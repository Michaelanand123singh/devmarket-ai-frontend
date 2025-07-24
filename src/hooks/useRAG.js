import { useState, useCallback } from 'react'
import { getRAGInsights, searchKnowledgeBase, getSimilarDesigns, getContentSuggestions } from '../services/rag_api'

export const useRAG = () => {
  const [insights, setInsights] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchInsights = useCallback(async (query) => {
    setLoading(true)
    try {
      const data = await getRAGInsights(query)
      setInsights(data.insights)
      return data
    } catch (error) {
      console.error('Error fetching RAG insights:', error)
      return { insights: [] }
    } finally {
      setLoading(false)
    }
  }, [])

  const searchKB = useCallback(async (query, filters) => {
    setLoading(true)
    try {
      const data = await searchKnowledgeBase(query, filters)
      return data
    } catch (error) {
      console.error('Error searching knowledge base:', error)
      return { results: [] }
    } finally {
      setLoading(false)
    }
  }, [])

  const getSimilar = useCallback(async (description) => {
    setLoading(true)
    try {
      const data = await getSimilarDesigns(description)
      return data
    } catch (error) {
      console.error('Error getting similar designs:', error)
      return { designs: [] }
    } finally {
      setLoading(false)
    }
  }, [])

  const getContentSuggestion = useCallback(async (industry, section) => {
    setLoading(true)
    try {
      const data = await getContentSuggestions(industry, section)
      return data
    } catch (error) {
      console.error('Error getting content suggestions:', error)
      return { suggestions: [] }
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    insights,
    loading,
    fetchInsights,
    searchKB,
    getSimilar,
    getContentSuggestion
  }
}