import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, Eye, Code, Zap } from 'lucide-react'
import { getTemplates } from '../services/api'
import { useAPI } from '../hooks/useAPI'
import { TEMPLATE_CATEGORIES, INDUSTRIES } from '../utils/constants'
import LoadingSpinner from '../components/LoadingSpinner'

const Templates = () => {
  const navigate = useNavigate()
  const { loading, error, execute } = useAPI()
  const [templates, setTemplates] = useState([])
  const [filteredTemplates, setFilteredTemplates] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedIndustry, setSelectedIndustry] = useState('all')

  useEffect(() => {
    loadTemplates()
  }, [])

  useEffect(() => {
    filterTemplates()
  }, [templates, searchTerm, selectedCategory, selectedIndustry])

  const loadTemplates = async () => {
    try {
      const result = await execute(() => getTemplates('all'))
      setTemplates(result.templates || [])
    } catch (error) {
      console.error('Error loading templates:', error)
    }
  }

  const filterTemplates = () => {
    let filtered = templates

    if (searchTerm) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(template => template.category === selectedCategory)
    }

    if (selectedIndustry !== 'all') {
      filtered = filtered.filter(template => template.industry === selectedIndustry)
    }

    setFilteredTemplates(filtered)
  }

  const handleUseTemplate = (template) => {
    // Navigate to dashboard with selected template
    navigate('/dashboard', { state: { selectedTemplate: template } })
  }

  const handlePreviewTemplate = (template) => {
    // Open template preview in new tab
    window.open(`/preview/template/${template.id}`, '_blank')
  }

  // Mock templates data if API doesn't return any
  const mockTemplates = [
    {
      id: 'saas-hero-1',
      name: 'SaaS Hero Section',
      description: 'Modern hero section perfect for SaaS products',
      category: 'hero-sections',
      industry: 'saas',
      thumbnail: 'https://via.placeholder.com/400x300?text=SaaS+Hero',
      tags: ['modern', 'clean', 'conversion-focused']
    },
    {
      id: 'ecom-pricing-1',
      name: 'E-commerce Pricing Table',
      description: 'Elegant pricing table for online stores',
      category: 'pricing-tables',
      industry: 'ecommerce',
      thumbnail: 'https://via.placeholder.com/400x300?text=Pricing+Table',
      tags: ['pricing', 'comparison', 'responsive']
    },
    {
      id: 'agency-portfolio-1',
      name: 'Agency Portfolio',
      description: 'Showcase your work with this portfolio layout',
      category: 'feature-layouts',
      industry: 'agency',
      thumbnail: 'https://via.placeholder.com/400x300?text=Portfolio',
      tags: ['portfolio', 'showcase', 'creative']
    },
    {
      id: 'startup-testimonials-1',
      name: 'Startup Testimonials',
      description: 'Build trust with customer testimonials',
      category: 'testimonials',
      industry: 'startup',
      thumbnail: 'https://via.placeholder.com/400x300?text=Testimonials',
      tags: ['social-proof', 'trust', 'conversion']
    },
    {
      id: 'restaurant-nav-1',
      name: 'Restaurant Navigation',
      description: 'Appetizing navigation for food businesses',
      category: 'navigation-patterns',
      industry: 'restaurant',
      thumbnail: 'https://via.placeholder.com/400x300?text=Restaurant+Nav',
      tags: ['food', 'menu', 'mobile-friendly']
    },
    {
      id: 'healthcare-hero-1',
      name: 'Healthcare Hero',
      description: 'Professional hero section for healthcare',
      category: 'hero-sections',
      industry: 'healthcare',
      thumbnail: 'https://via.placeholder.com/400x300?text=Healthcare+Hero',
      tags: ['professional', 'trust', 'healthcare']
    }
  ]

  const displayTemplates = filteredTemplates.length > 0 ? filteredTemplates : mockTemplates.filter(template => {
    const matchesSearch = !searchTerm || 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    const matchesIndustry = selectedIndustry === 'all' || template.industry === selectedIndustry
    
    return matchesSearch && matchesCategory && matchesIndustry
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Template Gallery
          </h1>
          <p className="text-gray-600">
            Choose from our collection of professionally designed templates
          </p>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {TEMPLATE_CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Industry Filter */}
            <div>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="all">All Industries</option>
                {INDUSTRIES.map(industry => (
                  <option key={industry} value={industry.toLowerCase()}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center md:justify-end">
              <span className="text-sm text-gray-600">
                {displayTemplates.length} template{displayTemplates.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <LoadingSpinner size="lg" text="Loading templates..." />
          </div>
        )}

        {/* Templates Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayTemplates.map((template) => (
              <div key={template.id} className="card group hover:shadow-lg transition-shadow">
                {/* Template Thumbnail */}
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePreviewTemplate(template)}
                        className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                        title="Preview Template"
                      >
                        <Eye className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() => handleUseTemplate(template)}
                        className="p-2 bg-primary rounded-full shadow-lg hover:bg-secondary transition-colors"
                        title="Use Template"
                      >
                        <Zap className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {template.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {template.description}
                    </p>
                  </div>

                  {/* Tags */}
                  {template.tags && (
                    <div className="flex flex-wrap gap-1">
                      {template.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2">
                    <button
                      onClick={() => handlePreviewTemplate(template)}
                      className="flex-1 btn-secondary text-sm py-2 flex items-center justify-center space-x-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={() => handleUseTemplate(template)}
                      className="flex-1 btn-primary text-sm py-2 flex items-center justify-center space-x-1"
                    >
                      <Zap className="w-4 h-4" />
                      <span>Use Template</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && displayTemplates.length === 0 && (
          <div className="text-center py-12">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No templates found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
                setSelectedIndustry('all')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12 p-8 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Don't see what you're looking for?
          </h2>
          <p className="text-gray-600 mb-4">
            Our AI can create custom landing pages tailored to your specific needs
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary flex items-center space-x-2 mx-auto"
          >
            <Code className="w-4 h-4" />
            <span>Create Custom Page</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Templates