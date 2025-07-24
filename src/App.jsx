import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Preview from './pages/Preview'
import Templates from './pages/Templates'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preview/:id" element={<Preview />} />
          <Route path="/templates" element={<Templates />} />
        </Routes>
      </main>
    </div>
  )
}

export default App