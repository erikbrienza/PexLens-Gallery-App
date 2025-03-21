import React from 'react'
import './ToggleTheme.css'

function ToggleTheme({ theme, toggleTheme }) {
  const isDark = theme === 'dark'
  return (
    <label className="switch">
      <input type="checkbox" checked={isDark} onChange={toggleTheme} />
      <span className="slider">
        <span className="icon sun">☀️</span>
        <span className="icon moon">🌙</span>
      </span>
    </label>
  )
}

export default ToggleTheme