import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="container">
      <label className="theme-toggle">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
          aria-label="Toggle theme"
        />
        <span className="slider"></span>
      </label>
      
      <h1>the thesaurus</h1>
      
      <nav className="links">
        <a href="https://github.com/thisisadityapatel" target="_blank" rel="noopener noreferrer">github</a>
        <a href="https://linkedin.com/in/thisisadityapatel" target="_blank" rel="noopener noreferrer">linkedin</a>
        <a href="https://aditya-patel.com" rel="noopener noreferrer"> Portfolio Website
        </a>
      </nav>
    </div>
  )
}

export default App
