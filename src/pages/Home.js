import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// Componentes
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';

// Framer Motion (para adicionar depois quando instalar as dependências)
// import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const Home = () => {
  // Refs para cada seção para o scroll animado
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);

  // Estado para controlar o dropdown personalizado
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Selecione um serviço');
  const [serviceValue, setServiceValue] = useState('');
  const dropdownRef = useRef(null);

  // Função para abrir/fechar o dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Função para selecionar um serviço
  const selectService = (service, value) => {
    console.log("Serviço selecionado:", service, value);
    setSelectedService(service); // Isso deve estar atualizado o texto, mas parece não estar funcionando
    setServiceValue(value); 
    setDropdownOpen(false);
    
    // Atualizar o valor do input hidden para envio do formulário
    const serviceInput = document.getElementById('service-value');
    if (serviceInput) {
      serviceInput.value = value;
    }
  };

  // Fechar o dropdown quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  // Função para detectar elementos visíveis durante o scroll
  useEffect(() => {
    const handleScrollAnimation = () => {
      const scrollElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
      
      scrollElements.forEach((element) => {
        // Calculando posição do elemento
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('visible');
        }
      });
    };

    // Adicionar efeito de cursor personalizado
    const handleMouseMove = (e) => {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      }
    };

    const handleMouseOver = () => {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) {
        cursor.classList.add('active');
      }
    };

    const handleMouseOut = () => {
      const cursor = document.querySelector('.custom-cursor');
      if (cursor) {
        cursor.classList.remove('active');
      }
    };

    // Adicionando os event listeners
    window.addEventListener('scroll', handleScrollAnimation);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Adicionando listeners para elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .interactive-element');
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseover', handleMouseOver);
      element.addEventListener('mouseout', handleMouseOut);
    });

    // Chamando a função uma vez para verificar elementos visíveis na carga inicial
    handleScrollAnimation();

    // Criando o cursor personalizado
    const cursorElement = document.createElement('div');
    cursorElement.classList.add('custom-cursor');
    document.body.appendChild(cursorElement);

    // Limpeza
    return () => {
      window.removeEventListener('scroll', handleScrollAnimation);
      window.removeEventListener('mousemove', handleMouseMove);
      
      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseover', handleMouseOver);
        element.removeEventListener('mouseout', handleMouseOut);
      });
      
      if (cursorElement.parentNode) {
        cursorElement.parentNode.removeChild(cursorElement);
      }
    };
  }, []);

  return (
    <div className="home-page">
      {/* Componente Hero com animação de entrada */}
      <Hero />
      
      {/* Seção Sobre */}
      <section id="about" className="about" ref={aboutRef}>
        <div className="container">
          <div className="about-container">
            <div className="about-img fade-in">
              <img src="/images/dentist.jpg" alt="Dr. Silva" />
            </div>
            <div className="about-content slide-in-right">
              <h2>Sobre Dr. Silva</h2>
              <p>Com mais de 15 anos de experiência em odontologia, o Dr. Silva oferece tratamentos modernos e personalizados para cada paciente. Especializado em odontologia estética e restauradora, ele combina técnicas avançadas com um atendimento humanizado.</p>
              <p>Formado pela Universidade de São Paulo (USP) com especialização em implantodontia, o Dr. Silva está sempre atualizado com as mais recentes tecnologias e procedimentos odontológicos.</p>
              <Link to="/sobre" className="btn">Saiba mais</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção Serviços */}
      <section id="services" ref={servicesRef}>
        <div className="container">
          <div className="section-header service-header fade-in">
            <h2 className="service-title">Nossos Serviços</h2>
            <div className="service-divider"></div>
            <p className="service-description">Oferecemos uma ampla gama de tratamentos odontológicos de alta qualidade</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card scale-in">
              <div className="service-img">
                <img src="/images/service-1.jpg" alt="Clínica Geral" />
              </div>
              <div className="service-content">
                <h3>Clínica Geral</h3>
                <p>Tratamentos preventivos e restauradores para manter sua saúde bucal em dia.</p>
              </div>
            </div>
            
            <div className="service-card scale-in">
              <div className="service-img">
                <img src="/images/service-2.jpg" alt="Estética Dental" />
              </div>
              <div className="service-content">
                <h3>Estética Dental</h3>
                <p>Procedimentos para melhorar a aparência do seu sorriso, incluindo clareamento e facetas.</p>
              </div>
            </div>
            
            <div className="service-card scale-in">
              <div className="service-img">
                <img src="/images/service-3.jpg" alt="Implantes" />
              </div>
              <div className="service-content">
                <h3>Implantes</h3>
                <p>Substitua dentes perdidos com soluções duradouras e naturais que restauram função e estética.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-5 fade-in">
            <Link to="/servicos" className="btn">Ver todos os serviços</Link>
          </div>
        </div>
      </section>
      
      {/* Seção Agendamento */}
      <section id="appointment" className="appointment">
        <div className="container">
          <div className="appointment-container">
            <div className="appointment-content slide-in-left">
              <h2>Agende uma Consulta</h2>
              <p>Estamos prontos para cuidar do seu sorriso. Agende uma consulta com o Dr. Silva e descubra como podemos ajudar você a alcançar a saúde bucal ideal e um sorriso radiante.</p>
              <ul className="appointment-benefits">
                <li>Atendimento personalizado</li>
                <li>Tecnologia de ponta</li>
                <li>Ambiente confortável e acolhedor</li>
                <li>Horários flexíveis</li>
              </ul>
            </div>
            
            <div className="appointment-form fade-in">
              <form>
                <div className="form-group">
                  <label htmlFor="name">Nome Completo</label>
                  <input type="text" id="name" name="name" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Telefone</label>
                  <input type="tel" id="phone" name="phone" required />
                </div>
                
              
                <div className="form-group">
                  <label htmlFor="service">Serviço</label>
                  <div className="custom-dropdown" ref={dropdownRef}>
                    <input 
                      type="text" 
                      id="service-display" 
                      value={selectedService}
                      onClick={toggleDropdown}
                      readOnly
                      className="dropdown-display"
                    />
                    
                    {dropdownOpen && (
                      <ul className="dropdown-options">
                        <li onClick={() => selectService('Consulta Inicial', 'consulta')}>
                          Consulta Inicial
                        </li>
                        <li onClick={() => selectService('Limpeza Dental', 'limpeza')}>
                          Limpeza Dental
                        </li>
                        <li onClick={() => selectService('Clareamento', 'clareamento')}>
                          Clareamento
                        </li>
                        <li onClick={() => selectService('Implante', 'implante')}>
                          Implante
                        </li>
                        <li onClick={() => selectService('Outro', 'outro')}>
                          Outro
                        </li>
                      </ul>
                    )}
                      <input type="hidden" id="service-value" name="service" value={serviceValue} />
                  </div>
                </div>          
              
                <div className="form-group">
                  <label htmlFor="message">Mensagem (Opcional)</label>
                  <textarea id="message" name="message" rows="3"></textarea>
                </div>
                
                <button type="submit" className="btn w-100">Agendar Consulta</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção Depoimentos */}
      <section id="testimonials" ref={testimonialsRef}>
        <div className="container">
          <div className="section-header service-header fade-in">
            <h2 className="service-title">O que nossos pacientes dizem</h2>
            <div className="service-divider"></div>
            <p className="service-description">A opinião de quem já experimentou nossos tratamentos</p>
          </div>  
          
          <div className="testimonials-slider">
            <div className="testimonial-card slide-in-left">
              <div className="testimonial-header">
                <div className="testimonial-img">
                  <img src="/images/testimonial-1.jpg" alt="Paciente Maria" />
                </div>
                <div className="testimonial-author">
                  <h4>Maria Silva</h4>
                  <span>Paciente há 3 anos</span>
                </div>
              </div>
              <div className="testimonial-body">
                <p>"O Dr. Silva transformou completamente meu sorriso e minha confiança. O tratamento foi indolor e os resultados superaram todas as minhas expectativas!"</p>
              </div>
            </div>
            
            <div className="testimonial-card fade-in">
              <div className="testimonial-header">
                <div className="testimonial-img">
                  <img src="/images/testimonial-2.jpg" alt="Paciente João" />
                </div>
                <div className="testimonial-author">
                  <h4>João Pereira</h4>
                  <span>Paciente há 1 ano</span>
                </div>
              </div>
              <div className="testimonial-body">
                <p>"Sempre tive medo de dentista, mas o Dr. Silva me deixou completamente à vontade. Seu consultório é moderno e o atendimento é excelente!"</p>
              </div>
            </div>
            
            <div className="testimonial-card slide-in-right">
              <div className="testimonial-header">
                <div className="testimonial-img">
                  <img src="/images/testimonial-3.jpg" alt="Paciente Ana" />
                </div>
                <div className="testimonial-author">
                  <h4>Ana Oliveira</h4>
                  <span>Paciente há 2 anos</span>
                </div>
              </div>
              <div className="testimonial-body">
                <p>"Fiz um implante com o Dr. Silva e o resultado ficou perfeito! Nem parece que não é meu dente natural. Recomendo a todos que precisam de um dentista de confiança."</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção Contato */}
      <section id="contact" ref={contactRef}>
        <div className="container">
          <div className="section-header service-header fade-in">
            <h2 className="service-title">Entre em Contato</h2>
            <div className="service-divider"></div>
            <p className="service-description">Estamos aqui para responder suas dúvidas e agendar sua consulta</p>
          </div>
    
          <div className="contact-container">
            <div className="contact-info slide-in-left">
              <div className="contact-item">
                <div className="contact-icon">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <h3>Endereço</h3>
            <p>Av. Paulista, 1000, Sala 101<br />Bela Vista, São Paulo - SP</p>
          </div>
        </div>
        
        <div className="contact-item">
          <div className="contact-icon">
            <i className="fas fa-phone-alt"></i>
          </div>
          <div>
            <h3>Telefone</h3>
            <p>(11) 3456-7890</p>
            <p>(11) 98765-4321</p>
          </div>
        </div>
        
        <div className="contact-item">
          <div className="contact-icon">
            <i className="fas fa-envelope"></i>
          </div>
          <div>
            <h3>Email</h3>
            <p>contato@drsilva.com.br</p>
          </div>
        </div>
        
        <div className="contact-item">
          <div className="contact-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div>
            <h3>Horário de Atendimento</h3>
            <p>Segunda a Sexta: 9h às 18h</p>
            <p>Sábado: 9h às 12h</p>
          </div>
        </div>
      </div>
      
      <div className="contact-map fade-in">
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1024875561!2d-46.6585678!3d-23.563258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1627430000000!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="450" 
            style={{ border: 0, borderRadius: '10px' }}
            allowFullScreen="" 
            loading="lazy"
            title="Localização do Consultório Dr. Silva"
            className="interactive-element"
          ></iframe>
        </div>
        <div className="map-info">
          <h4>Como Chegar</h4>
          <p>Estamos localizados na Av. Paulista, próximo à estação de metrô Brigadeiro. Disponibilizamos estacionamento no local para nossos pacientes.</p>
          <a href="https://goo.gl/maps/NR1ZbKuLYjX7JGLT7" target="_blank" rel="noopener noreferrer" className="btn btn-sm">
            <i className="fas fa-directions mr-2"></i> Obter Direções
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
</div>
  );
};

export default Home;