// Elementos interativos para o site do dentista

// Efeito de paralaxe para o hero section
export const setupParallaxEffect = () => {
    const handleMouseMove = (e) => {
      const hero = document.querySelector('.hero');
      if (!hero) return;
      
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      
      // Efeito no background
      const bgElement = document.querySelector('.hero-bg');
      if (bgElement) {
        bgElement.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      }
      
      // Efeito nos elementos decorativos
      const teeth = document.querySelectorAll('.floating-tooth');
      teeth.forEach((tooth, index) => {
        const factor = index + 1;
        const xOffset = x * (10 * factor);
        const yOffset = y * (10 * factor);
        tooth.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
      
      // Efeito nas partículas
      const particles = document.querySelectorAll('.particle');
      particles.forEach((particle, index) => {
        const factor = (index + 1) * 1.5;
        const xOffset = x * (15 * factor);
        const yOffset = y * (15 * factor);
        particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  };
  
  // Animação de números crescentes (contador)
  export const setupCounters = () => {
    const counters = document.querySelectorAll('.counter');
    
    const startCounter = (counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const duration = 2000; // 2 segundos
      const step = target / (duration / 16); // 60fps aproximadamente
      let current = 0;
      
      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };
      
      updateCounter();
    };
    
    // Observer para iniciar contador quando elemento ficar visível
    if (counters.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      counters.forEach(counter => {
        observer.observe(counter);
      });
    }
  };
  
  // Efeito de carrossel para os depoimentos
  export const setupTestimonialCarousel = () => {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const cards = slider.querySelectorAll('.testimonial-card');
    if (cards.length <= 1) return;
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 20; // width + margin
    const totalCards = cards.length;
    
    // Criar botões de navegação
    const prevBtn = document.createElement('button');
    prevBtn.classList.add('slider-btn', 'prev-btn');
    prevBtn.innerHTML = '&lt;';
    
    const nextBtn = document.createElement('button');
    nextBtn.classList.add('slider-btn', 'next-btn');
    nextBtn.innerHTML = '&gt;';
    
    slider.appendChild(prevBtn);
    slider.appendChild(nextBtn);
    
    // Funções de navegação
    const goToSlide = (index) => {
      if (index < 0) index = totalCards - 1;
      if (index >= totalCards) index = 0;
      
      slider.querySelector('.testimonials-track').style.transform = `translateX(-${index * cardWidth}px)`;
      currentIndex = index;
    };
    
    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    
    // Auto play
    let interval = setInterval(() => goToSlide(currentIndex + 1), 5000);
    
    slider.addEventListener('mouseenter', () => clearInterval(interval));
    slider.addEventListener('mouseleave', () => {
      interval = setInterval(() => goToSlide(currentIndex + 1), 5000);
    });
  };
  
  // Inicializar quando o documento carregar
  document.addEventListener('DOMContentLoaded', () => {
    setupParallaxEffect();
    setupCounters();
    setupTestimonialCarousel();
  });
  
  export default {
    setupParallaxEffect,
    setupCounters,
    setupTestimonialCarousel
  };