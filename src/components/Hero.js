import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  useEffect(() => {
    // Efeito de paralaxe no background
    const handleMouseMove = (e) => {
      const hero = document.querySelector('.hero');
      if (!hero) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      const bgElement = document.querySelector('.hero-bg');
      if (bgElement) {
        bgElement.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Sorrisos saudáveis, vidas transformadas</h1>
          <p>
            Odontologia de excelência com o Dr. Silva, especialista em transformar sorrisos 
            e proporcionar uma experiência única de atendimento odontológico.
          </p>
          <div className="hero-btns">
            <Link to="/agendar" className="btn">Agendar Consulta</Link>
            <Link to="/servicos" className="btn btn-outline">Nossos Serviços</Link>
          </div>
        </div>
      </div>
      
      <div className="hero-bg"></div>
      
      <div className="scroll-indicator" onClick={handleScroll}>
        <span>Deslize para saber mais</span>
        <div className="chevron"></div>
      </div>
      
      {/* Elementos decorativos interativos */}
      <div className="hero-decorations">
        <div className="floating-tooth tooth-1">
          <svg width="40" height="40" viewBox="0 0 100 100">
            <path d="M40,30 L60,30 L65,50 L55,70 L45,70 L35,50 Z" fill="none" stroke="rgba(0, 184, 212, 0.3)" strokeWidth="2" />
          </svg>
        </div>
        <div className="floating-tooth tooth-2">
          <svg width="30" height="30" viewBox="0 0 100 100">
            <path d="M40,30 L60,30 L65,50 L55,70 L45,70 L35,50 Z" fill="none" stroke="rgba(0, 184, 212, 0.2)" strokeWidth="2" />
          </svg>
        </div>
        <div className="floating-tooth tooth-3">
          <svg width="25" height="25" viewBox="0 0 100 100">
            <path d="M40,30 L60,30 L65,50 L55,70 L45,70 L35,50 Z" fill="none" stroke="rgba(0, 184, 212, 0.25)" strokeWidth="2" />
          </svg>
        </div>
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>
      
      {/* Canvas para efeito de ondas no background - será inicializado via JavaScript */}
      <canvas className="hero-canvas" id="hero-canvas"></canvas>
    </section>
  );
};

export default Hero;