import { useState } from 'react'
import { Code, Eye, Download, Copy, Check } from 'lucide-react'

const CodePreview = ({ project }) => {
  const [activeTab, setActiveTab] = useState('preview')
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(project.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([project.code], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.name}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const tabs = [
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'code', label: 'Code', icon: Code }
  ]

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-600 hover:text-primary transition-colors"
            title="Copy code"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            onClick={handleDownload}
            className="p-2 text-gray-600 hover:text-primary transition-colors"
            title="Download HTML"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200 mb-4">
        <nav className="flex space-x-6">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="h-96 border border-gray-200 rounded-lg overflow-hidden">
        {activeTab === 'preview' ? (
          <iframe
            srcDoc={project.code}
            className="w-full h-full"
            title={`${project.name} preview`}
          />
        ) : (
          <pre className="p-4 h-full overflow-auto bg-gray-50 text-sm">
            <code>{project.code}</code>
          </pre>
        )}
      </div>
    </div>
  )
}

export default CodePreview