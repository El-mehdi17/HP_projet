import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Products />
      <Services />
      <WhyUs />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
