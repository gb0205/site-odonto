import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Páginas
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import AppointmentPage from './pages/AppointmentPage';
import ContactPage from './pages/ContactPage';

// Animações
import './animations/ScrollAnimations';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando carregamento de recursos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-animation">
          <div className="loading-container">
            <svg width="150" height="150" viewBox="0 0 150 150">
              <circle className="loading-circle" cx="75" cy="75" r="70" />
            </svg>
            <img 
              src="/android-chrome-512x512.png" 
              alt="Carregando Dr. Silva Odontologia" 
              className="loading-icon"
              width="120"
              height="120"
            />
          </div>
        </div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<AboutPage />} />
            <Route path="/servicos" element={<ServicesPage />} />
            <Route path="/agendar" element={<AppointmentPage />} />
            <Route path="/contato" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;