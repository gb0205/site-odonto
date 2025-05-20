import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fecha o menu quando uma rota é alterada
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="logo interactive-element">Dr. Silva</Link>
        
        <div className={`burger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={`interactive-element ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/sobre" 
              className={`interactive-element ${location.pathname === '/sobre' ? 'active' : ''}`}
            >
              Sobre
            </Link>
          </li>
          <li>
            <Link 
              to="/servicos" 
              className={`interactive-element ${location.pathname === '/servicos' ? 'active' : ''}`}
            >
              Serviços
            </Link>
          </li>
          <li>
            <Link 
              to="/agendar" 
              className={`interactive-element ${location.pathname === '/agendar' ? 'active' : ''}`}
            >
              Agendar
            </Link>
          </li>
          <li>
            <Link 
              to="/contato" 
              className={`interactive-element ${location.pathname === '/contato' ? 'active' : ''}`}
            >
              Contato
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;