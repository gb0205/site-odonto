import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-info">
            <div className="footer-logo">Dr. Silva</div>
            <p>Odontologia de excelência para cuidar do seu sorriso com as mais modernas técnicas e um atendimento humanizado.</p>
            <div className="footer-contact">
              <a href="tel:+551134567890" className="interactive-element">(11) 3456-7890</a>
              <a href="mailto:contato@drsilva.com.br" className="interactive-element">contato@drsilva.com.br</a>
            </div>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="interactive-element">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="interactive-element">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="interactive-element">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="interactive-element">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-nav">
            <h3>Links Rápidos</h3>
            <ul className="footer-links">
              <li>
                <Link to="/" className="interactive-element">Home</Link>
              </li>
              <li>
                <Link to="/sobre" className="interactive-element">Sobre</Link>
              </li>
              <li>
                <Link to="/servicos" className="interactive-element">Serviços</Link>
              </li>
              <li>
                <Link to="/agendar" className="interactive-element">Agendar Consulta</Link>
              </li>
              <li>
                <Link to="/contato" className="interactive-element">Contato</Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-nav">
            <h3>Serviços</h3>
            <ul className="footer-links">
              <li>
                <Link to="/servicos/clinica-geral" className="interactive-element">Clínica Geral</Link>
              </li>
              <li>
                <Link to="/servicos/estetica-dental" className="interactive-element">Estética Dental</Link>
              </li>
              <li>
                <Link to="/servicos/implantes" className="interactive-element">Implantes</Link>
              </li>
              <li>
                <Link to="/servicos/ortodontia" className="interactive-element">Ortodontia</Link>
              </li>
              <li>
                <Link to="/servicos/clareamento" className="interactive-element">Clareamento</Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-nav">
            <h3>Horário de Atendimento</h3>
            <ul className="footer-hours">
              <li>
                <span>Segunda - Sexta:</span>
                <span>9h às 18h</span>
              </li>
              <li>
                <span>Sábado:</span>
                <span>9h às 12h</span>
              </li>
              <li>
                <span>Domingo:</span>
                <span>Fechado</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Dr. Silva Odontologia. Todos os direitos reservados.</p>
          <p>Desenvolvido com <span className="heart">♥</span> para sorrisos mais bonitos</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;