// Função para detectar elementos visíveis durante o scroll
export const handleScrollAnimation = () => {
    const scrollElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    
    scrollElements.forEach((element) => {
      // Calculando posição do elemento
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      } else {
        element.classList.remove('visible');
      }
    });
  };
  
  // Inicializar quando o documento carregar
  document.addEventListener('DOMContentLoaded', () => {
    // Adicionar listener para scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Verificar elementos visíveis na carga inicial
    handleScrollAnimation();
  });
  
  // Exportar como padrão para permitir import simples
  export default {};