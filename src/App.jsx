import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import BlogList from './components/BlogList'
import BlogPost from './components/BlogPost'

function App() {
  const [theme, setTheme] = useState(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme

    // Otherwise, use system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    document.body.className = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <BrowserRouter>
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
          <a href="https://aditya-patel.com" rel="noopener noreferrer">portfolio website</a>
        </nav>

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/:slug" element={<BlogPost />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
