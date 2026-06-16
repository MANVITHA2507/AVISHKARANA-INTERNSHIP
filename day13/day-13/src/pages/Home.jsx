import { Link } from 'react-router-dom'
import './Pages.css'

function Home() {
  return (
    <div className="page home-page">
      <div className="hero">
        <h1>Welcome to MyApp 👋</h1>
        <p>A simple multi-page app built with React Router & Forms</p>
        <div className="hero-buttons">
          <Link to="/about" className="btn btn-primary">Learn More</Link>
          <Link to="/contact" className="btn btn-outline">Contact Us</Link>
        </div>
      </div>
      <div className="features">
        <div className="feature-card">
          <span>🗺️</span>
          <h3>React Router</h3>
          <p>Navigate between pages without reloading</p>
        </div>
        <div className="feature-card">
          <span>📝</span>
          <h3>Forms</h3>
          <p>Controlled inputs with live validation</p>
        </div>
        <div className="feature-card">
          <span>⚡</span>
          <h3>Vite Powered</h3>
          <p>Super fast dev experience</p>
        </div>
      </div>
    </div>
  )
}

export default Home