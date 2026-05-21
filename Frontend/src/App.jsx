import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'
import RegisterModal from './components/RegisterModal'

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="app-container">
      <Navbar 
        currentUser={currentUser} 
        onLoginClick={() => setIsLoginOpen(true)} 
        onLogout={() => setCurrentUser(null)} 
      />
      <Hero 
        onLoginClick={() => setIsLoginOpen(true)} 
        onRegisterClick={() => setIsRegisterOpen(true)} 
      />
      <Products />
      <Services />
      <WhyUs />
      <Contact />
      <Footer />
      
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onLoginSuccess={(user) => setCurrentUser(user)} 
      />

      <RegisterModal 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)} 
        onRegisterSuccess={(user) => setCurrentUser(user)} 
      />
    </div>
  )
}

export default App
