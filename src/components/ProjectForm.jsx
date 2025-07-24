import { useState } from 'react'
import { Send, Sparkles } from 'lucide-react'
import { INDUSTRIES } from '../utils/constants'
import LoadingSpinner from './LoadingSpinner'

const ProjectForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    industry: '',
    targetAudience: '',
    keyFeatures: '',
    colorScheme: '',
    additionalRequirements: ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-gray-900">Create Landing Page</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="My Awesome Landing Page"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Describe your business, product, or service..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry *
          </label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="">Select Industry</option>
            {INDUSTRIES.map(industry => (
              <option key={industry} value={industry.toLowerCase()}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target Audience
          </label>
          <input
            type="text"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Small business owners, developers, students..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Key Features
          </label>
          <textarea
            name="keyFeatures"
            value={formData.keyFeatures}
            onChange={handleChange}
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="List key features or benefits..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color Scheme
          </label>
          <input
            type="text"
            name="colorScheme"
            value={formData.colorScheme}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Blue and white, modern dark theme, vibrant colors..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Requirements
          </label>
          <textarea
            name="additionalRequirements"
            value={formData.additionalRequirements}
            onChange={handleChange}
            rows="2"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Any specific requirements or preferences..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
        >
          {loading ? (
            <LoadingSpinner size="sm" text="Generating..." />
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Generate Landing Page</span>
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default ProjectForm