import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Work from './pages/Work.jsx'
import About from './pages/About.jsx'
import Resume from './pages/Resume.jsx'
import Play from './pages/Play.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import './App.css'

function App() {
  return (
    <>
      <div className="app-layout">
        <Nav />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/play" element={<Play />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
