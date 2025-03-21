import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import MainView from './components/MainView'
import ToggleTheme from './components/ToggleTheme'
import './App.css'

function App() {
  const [images, setImages] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [topic, setTopic] = useState('nature')
  const [searchTerm, setSearchTerm] = useState('')
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const urlTopic = params.get('topic')
    if (urlTopic) {
      setTopic(urlTopic)
    }
  }, [])

  useEffect(() => {
    if (!topic) return
    const fetchImages = async () => {
      try {
        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${topic}&per_page=3`,
          {
            headers: {
              Authorization: import.meta.env.VITE_PEXELS_API_KEY
            }
          }
        )
        const data = await res.json()
        setImages(data.photos || [])
        setSelectedIndex(0)
      } catch (err) {
        console.error(err)
      }
    }
    fetchImages()
  }, [topic])

  const handleSelectImage = (index) => {
    setSelectedIndex(index)
  }

  const handleSearch = () => {
    setTopic(searchTerm)
  }

  const resetHome = () => {
    setTopic('nature')
    setSearchTerm('')
  }

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
  }

  if (images.length === 0) {
    return <div className="loading">Caricamento...</div>
  }

  const mainImage = images[selectedIndex]
  const mainSrc = mainImage.src.original
  const photographerName = mainImage.photographer
  const photographerUrl = mainImage.photographer_url

  return (
    <div className={`app-container ${theme}`}>
      {/* ToggleTheme posizionato all'esterno della Sidebar */}
      <div className="toggle-wrapper">
        <ToggleTheme theme={theme} toggleTheme={toggleTheme} />
      </div>
      <Sidebar
        images={images}
        selectedIndex={selectedIndex}
        onSelect={handleSelectImage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        resetHome={resetHome}
      />
      <MainView
        mainSrc={mainSrc}
        photographerName={photographerName}
        photographerUrl={photographerUrl}
        images={images}
        selectedIndex={selectedIndex}
        onSelect={handleSelectImage}
      />
    </div>
  )
}

export default App