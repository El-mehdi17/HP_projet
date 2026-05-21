import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Services />
    </div>
  )
}

export default App
