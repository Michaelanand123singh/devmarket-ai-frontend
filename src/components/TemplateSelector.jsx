import { useState, useEffect } from 'react'
import { Layout, Search } from 'lucide-react'
import { getTemplates } from '../services/api'
import { TEMPLATE_CATEGORIES } from '../utils/constants'
import LoadingSpinner from './LoadingSpinner'

const TemplateSelector = ({ onSelect }) => {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('hero-sections')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const loadTemplates = async () => {
      setLoading(true)
      try {
        const data = await getTemplates(selectedCategory)
        setTemplates(data.templates || [])
      } catch (error) {
        console.error('Error loading templates:', error)
        setTemplates([])
      } finally {
        setLoading(false)
      }
    }

    loadTemplates()
  }, [selectedCategory])

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-4">
        <Layout className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Choose Template</h3>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex space-x-2">
            {TEMPLATE_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {loading ? (
          <LoadingSpinner text="Loading templates..." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map(template => (
              <div
                key={template.id}
                onClick={() => onSelect(template)}
                className="border border-gray-200 rounded-lg p-4 hover:border-primary cursor-pointer transition-colors"
              >
                <div className="aspect-video bg-gray-100 rounded mb-3 flex items-center justify-center">
                  <Layout className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
                <p className="text-sm text-gray-600">{template.description}</p>
              </div>
            ))}
          </div>
        )}

        {!loading && filteredTemplates.length === 0 && (
          <p className="text-center text-gray-500 py-8">
            No templates found matching your criteria.
          </p>
        )}
      </div>
    </div>
  )
}

export default TemplateSelector