import { Link, useLocation } from 'react-router-dom'
import { Code, Zap } from 'lucide-react'

const Header = () => {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-lg">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">DevMarket</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-primary' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`font-medium transition-colors ${
                isActive('/dashboard') 
                  ? 'text-primary' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/templates"
              className={`font-medium transition-colors ${
                isActive('/templates') 
                  ? 'text-primary' 
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Templates
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="btn-primary flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Create Landing Page</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header