import { useState, useEffect } from 'react'
import { Brain, Lightbulb, TrendingUp } from 'lucide-react'
import { useRAG } from '../hooks/useRAG'
import LoadingSpinner from './LoadingSpinner'

const KnowledgeInsights = ({ query, industry }) => {
  const { insights, loading, fetchInsights } = useRAG()
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    if (query) {
      fetchInsights(query).then(data => {
        setSuggestions(data.suggestions || [])
      })
    }
  }, [query, fetchInsights])

  if (!query) return null

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
      </div>

      {loading ? (
        <LoadingSpinner text="Analyzing your requirements..." />
      ) : (
        <div className="space-y-4">
          {insights.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-1">
                <Lightbulb className="w-4 h-4 text-yellow-500" />
                <span>Design Recommendations</span>
              </h4>
              <ul className="space-y-2">
                {insights.map((insight, index) => (
                  <li key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {suggestions.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span>Industry Best Practices</span>
              </h4>
              <ul className="space-y-2">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                    {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {insights.length === 0 && suggestions.length === 0 && (
            <p className="text-gray-500 text-sm">No insights available for this query.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default KnowledgeInsights;