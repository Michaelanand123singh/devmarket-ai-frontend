import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  Eye, 
  Code, 
  Download, 
  Share2, 
  Edit, 
  Globe, 
  Smartphone, 
  Tablet, 
  Monitor,
  Copy,
  Check,
  ExternalLink,
  ArrowLeft,
  Loader2
} from 'lucide-react'
import { getProject, deployProject } from '../services/api'
import { useAPI } from '../hooks/useAPI'
import { useWebSocket } from '../hooks/useWebSocket'
import { DEPLOYMENT_PLATFORMS } from '../utils/constants'
import LoadingSpinner from '../components/LoadingSpinner'
import DeploymentPanel from '../components/DeploymentPanel'

const Preview = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { loading, error, execute } = useAPI()
  const { connect, disconnect, progress, status, messages } = useWebSocket(id)
  
  const [project, setProject] = useState(null)
  const [activeTab, setActiveTab] = useState('preview')
  const [viewMode, setViewMode] = useState('desktop')
  const [copied, setCopied] = useState(false)
  const [showDeployment, setShowDeployment] = useState(false)
  const [deploymentStatus, setDeploymentStatus] = useState(null)

  useEffect(() => {
    loadProject()
    return () => disconnect()
  }, [id])

  const loadProject = async () => {
    try {
      const result = await execute(() => getProject(id))
      setProject(result.project)
    } catch (error) {
      console.error('Error loading project:', error)
    }
  }

  const handleCopyCode = async () => {
    if (!project?.code) return
    
    try {
      await navigator.clipboard.writeText(project.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  const handleDownload = () => {
    if (!project?.code) return
    
    const blob = new Blob([project.code], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.name || 'landing-page'}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleDeploy = async (platform) => {
    try {
      connect()
      const result = await execute(() => deployProject(id, platform))
      setDeploymentStatus(result)
      setShowDeployment(true)
    } catch (error) {
      console.error('Error deploying project:', error)
      setDeploymentStatus({
        success: false,
        error: error.message || 'Deployment failed'
      })
    }
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: project?.name || 'Landing Page',
        text: 'Check out this landing page created with DevMarket',
        url: window.location.href
      })
    } catch (error) {
      // Fallback to copying URL
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      } catch (clipboardError) {
        console.error('Failed to share or copy:', error, clipboardError)
      }
    }
  }

  const getViewModeClass = () => {
    switch (viewMode) {
      case 'mobile':
        return 'max-w-sm'
      case 'tablet':
        return 'max-w-2xl'
      default:
        return 'w-full'
    }
  }

  const getViewModeIcon = (mode) => {
    switch (mode) {
      case 'mobile':
        return Smartphone
      case 'tablet':
        return Tablet
      default:
        return Monitor
    }
  }

  const handleCloseDeployment = () => {
    setShowDeployment(false)
    setDeploymentStatus(null)
  }

  const handleRefreshProject = () => {
    loadProject()
  }

  if (loading && !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading project..." />
      </div>
    )
  }

  if (error && !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <ExternalLink className="w-12 h-12 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {project?.name || 'Landing Page Preview'}
                </h1>
                <p className="text-sm text-gray-600">
                  {project?.description || 'Generated landing page'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                {['desktop', 'tablet', 'mobile'].map((mode) => {
                  const Icon = getViewModeIcon(mode)
                  return (
                    <button
                      key={mode}
                      onClick={() => setViewMode(mode)}
                      className={`p-2 rounded-md transition-colors ${
                        viewMode === mode
                          ? 'bg-white shadow-sm text-primary'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                      title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} view`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  )
                })}
              </div>

              {/* Action Buttons */}
              <button
                onClick={handleShare}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate(`/dashboard?edit=${id}`)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center space-x-1 mt-4">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'preview'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'code'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4" />
                <span>Code</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('deploy')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'deploy'
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <span>Deploy</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className={`mx-auto transition-all duration-300 ${getViewModeClass()}`}>
              {project?.code ? (
                <iframe
                  srcDoc={project.code}
                  className="w-full h-screen border-0"
                  title="Landing Page Preview"
                  sandbox="allow-scripts allow-same-origin allow-forms"
                />
              ) : (
                <div className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No preview available</p>
                    <button
                      onClick={handleRefreshProject}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                    >
                      Refresh Project
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Code Tab */}
        {activeTab === 'code' && (
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Generated Code</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopyCode}
                  disabled={!project?.code}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-green-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!project?.code}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-primary text-white hover:bg-secondary rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>
            <div className="p-4">
              {project?.code ? (
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  <code>{project.code}</code>
                </pre>
              ) : (
                <div className="text-center py-8">
                  <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No code available</p>
                  <button
                    onClick={handleRefreshProject}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors"
                  >
                    Refresh Project
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Deploy Tab */}
        {activeTab === 'deploy' && (
          <div className="space-y-6">
            {/* Deployment Options */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Deploy Your Landing Page
              </h3>
              <p className="text-gray-600 mb-6">
                Choose a platform to deploy your landing page instantly
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DEPLOYMENT_PLATFORMS.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => handleDeploy(platform.id)}
                    disabled={status === 'deploying' || !project?.code}
                    className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{platform.icon}</span>
                      <div>
                        <div className="font-medium text-gray-900">
                          {platform.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          Deploy to {platform.name}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Deployment Status */}
            {(status === 'deploying' || deploymentStatus) && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Deployment Status
                </h3>
                
                {status === 'deploying' && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      <span className="text-gray-700">Deploying your landing page...</span>
                    </div>
                    
                    {progress > 0 && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    )}

                    {messages.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-gray-900">Deployment Log:</h4>
                        {messages.slice(-3).map((message, index) => (
                          <div key={index} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            {message.content}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {deploymentStatus && (
                  <div className="space-y-4">
                    {deploymentStatus.success ? (
                      <div className="flex items-center space-x-3 text-green-600">
                        <Check className="w-5 h-5" />
                        <span>Deployment successful!</span>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3 text-red-600">
                          <ExternalLink className="w-5 h-5" />
                          <span>Deployment failed</span>
                        </div>
                        {deploymentStatus.error && (
                          <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                            {deploymentStatus.error}
                          </p>
                        )}
                      </div>
                    )}

                    {deploymentStatus.url && (
                      <div>
                        <p className="text-gray-600 mb-2">Your landing page is live at:</p>
                        <a
                          href={deploymentStatus.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-primary hover:text-secondary break-all"
                        >
                          <span>{deploymentStatus.url}</span>
                          <ExternalLink className="w-4 h-4 flex-shrink-0" />
                        </a>
                      </div>
                    )}

                    <button
                      onClick={handleCloseDeployment}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Deployment Panel Modal */}
      {showDeployment && (
        <DeploymentPanel
          project={project}
          deploymentStatus={deploymentStatus}
          onClose={handleCloseDeployment}
          onDeploy={handleDeploy}
          isDeploying={status === 'deploying'}
        />
      )}
    </div>
  )
}

export default Preview