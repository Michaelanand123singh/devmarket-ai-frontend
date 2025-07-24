import { Link } from 'react-router-dom'
import { Zap, Code, Globe, Sparkles, ArrowRight, CheckCircle } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Zap,
      title: 'AI-Powered Generation',
      description: 'Advanced AI creates professional landing pages in seconds'
    },
    {
      icon: Code,
      title: 'Clean Code Output',
      description: 'Get optimized HTML, CSS, and JavaScript code ready to deploy'
    },
    {
      icon: Globe,
      title: 'Instant Deployment',
      description: 'Deploy to Netlify, Vercel, or Railway with one click'
    },
    {
      icon: Sparkles,
      title: 'Smart Templates',
      description: 'Industry-specific templates powered by our knowledge base'
    }
  ]

  const benefits = [
    'No coding experience required',
    'Responsive design guaranteed',
    'SEO optimized pages',
    'Fast loading times',
    'Mobile-first approach',
    'Professional quality'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Create Stunning Landing Pages with{' '}
              <span className="text-primary">AI Magic</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your business ideas into professional landing pages instantly. 
              No design skills needed - just describe your vision and watch AI bring it to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/dashboard" className="btn-primary text-lg px-8 py-4 flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Start Creating</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/templates" className="btn-secondary text-lg px-8 py-4">
                View Templates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DevMarket?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine the power of AI with design expertise to deliver landing pages that convert
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need
              </h2>
              <p className="text-xl text-gray-600">
                Professional landing pages with all the features you expect
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build Your Landing Page?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of businesses who trust DevMarket to create their web presence
            </p>
            <Link to="/dashboard" className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              <Sparkles className="w-5 h-5" />
              <span>Get Started Free</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home