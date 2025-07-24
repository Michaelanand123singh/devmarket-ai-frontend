import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectForm from '../components/ProjectForm'
import KnowledgeInsights from '../components/KnowledgeInsights'
import TemplateSelector from '../components/TemplateSelector'
import { generateLandingPage } from '../services/api'
import { useAPI } from '../hooks/useAPI'
import { generateProjectId } from '../utils/helpers'

const Dashboard = () => {
  const navigate = useNavigate()
  const { loading, error, execute } = useAPI()
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showTemplates, setShowTemplates] = useState(false)
  const [insights, setInsights] = useState('')

  const handleFormSubmit = async (formData) => {
    try {
      const projectData = {
        ...formData,
        id: generateProjectId(),
        template: selectedTemplate,
        timestamp: new Date().toISOString()
      }

      const result = await execute(() => generateLandingPage(projectData))
      
      if (result.success) {
        navigate(`/preview/${result.projectId}`)
      }
    } catch (error) {
      console.error('Error generating landing page:', error)
    }
  }

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template)
    setShowTemplates(false)
  }

  const handleInsightsUpdate = (query) => {
    setInsights(query)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Your Landing Page
          </h1>
          <p className="text-gray-600">
            Fill out the form below and let our AI generate a professional landing page for you
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <ProjectForm onSubmit={handleFormSubmit} loading={loading} />
            
            {/* Template Selection */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Choose a Template (Optional)
                </h3>
                <button
                  onClick={() => setShowTemplates(!showTemplates)}
                  className="text-primary hover:text-secondary font-medium"
                >
                  {showTemplates ? 'Hide Templates' : 'Browse Templates'}
                </button>
              </div>
              
              {selectedTemplate && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-800">
                        Selected: {selectedTemplate.name}
                      </p>
                      <p className="text-sm text-green-600">
                        {selectedTemplate.description}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedTemplate(null)}
                      className="text-green-600 hover:text-green-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
              
              {showTemplates && (
                <TemplateSelector onSelect={handleTemplateSelect} />
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <KnowledgeInsights query={insights} />
            
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tips for Better Results
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Be specific about your target audience</li>
                <li>• Include your key value propositions</li>
                <li>• Mention any specific features or benefits</li>
                <li>• Specify your preferred color scheme</li>
                <li>• Add any industry-specific requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard