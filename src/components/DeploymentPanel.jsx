import { useState } from 'react'
import { Globe, ExternalLink, CheckCircle, XCircle } from 'lucide-react'
import { DEPLOYMENT_PLATFORMS } from '../utils/constants'
import { deployProject } from '../services/api'
import LoadingSpinner from './LoadingSpinner'

const DeploymentPanel = ({ project }) => {
  const [deploying, setDeploying] = useState(false)
  const [deploymentStatus, setDeploymentStatus] = useState(null)
  const [deploymentUrl, setDeploymentUrl] = useState(null)

  const handleDeploy = async (platform) => {
    setDeploying(true)
    setDeploymentStatus(null)

    try {
      const result = await deployProject(project.id, platform)
      setDeploymentStatus('success')
      setDeploymentUrl(result.url)
    } catch (error) {
      setDeploymentStatus('error')
      console.error('Deployment failed:', error)
    } finally {
      setDeploying(false)
    }
  }

  return (
    <div className="card">
      <div className="flex items-center space-x-2 mb-4">
        <Globe className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Deploy Your Landing Page</h3>
      </div>

      {deploymentStatus === 'success' && deploymentUrl && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-medium">Deployment Successful!</span>
          </div>
          <a
            href={deploymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-green-700 hover:text-green-800 mt-2"
          >
            <span>View your site</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      {deploymentStatus === 'error' && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 font-medium">Deployment Failed</span>
          </div>
          <p className="text-red-700 mt-1">Please try again or contact support.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {DEPLOYMENT_PLATFORMS.map(platform => (
          <button
            key={platform.id}
            onClick={() => handleDeploy(platform.id)}
            disabled={deploying}
            className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-blue-50 transition-colors disabled:opacity-50"
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-2xl">{platform.icon}</span>
              <span className="font-medium text-gray-900">{platform.name}</span>
              {deploying ? (
                <LoadingSpinner size="sm" text="" />
              ) : (
                <span className="text-sm text-gray-600">Deploy Now</span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default DeploymentPanel