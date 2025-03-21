import React from 'react'
import './Sidebar.css'

function Sidebar({
  images,
  selectedIndex,
  onSelect,
  searchTerm,
  setSearchTerm,
  onSearch,
  resetHome
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <div className="sidebar">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Insert your topic"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="buttons-container">
        {images.map((img, idx) => (
          <button
            key={img.id}
            className={`sidebar-button ${selectedIndex === idx ? 'active' : ''}`}
            onClick={() => onSelect(idx)}
          >
            Image {idx + 1}
          </button>
        ))}
      </div>
      <button className="home-button" onClick={resetHome}>
        Back to Homepage
      </button>
    </div>
  )
}

export default Sidebar