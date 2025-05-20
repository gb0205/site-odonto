// Efeitos de hover para elementos interativos

// Função para adicionar efeito de hover ao cursor personalizado
export const setupHoverEffects = () => {
  // Adicionar efeito de cursor personalizado
  const handleMouseMove = (e) => {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
    
    if (follower) {
      // Efeito de atraso no seguidor do cursor para criar movimento mais fluido
      setTimeout(() => {
        follower.style.left = `${e.clientX}px`;
        follower.style.top = `${e.clientY}px`;
      }, 50);
    }
  };

  const handleMouseOver = () => {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor) {
      cursor.classList.add('active');
    }
    
    if (follower) {
      follower.classList.add('active');
    }
  };

  const handleMouseOut = () => {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor) {
      cursor.classList.remove('active');
    }
    
    if (follower) {
      follower.classList.remove('active');
    }
  };
  
  // Adicionar efeito de clique
  const handleMouseDown = () => {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor) {
      // Remover a classe releasing se existir
      cursor.classList.remove('releasing');
      cursor.classList.add('clicking');
    }
    
    if (follower) {
      follower.classList.add('clicking');
    }
  };
  
  const handleMouseUp = () => {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor) {
      // Remover classe clicking e adicionar releasing para a animação de volta
      cursor.classList.remove('clicking');
      cursor.classList.add('releasing');
      
      // Remover a classe releasing após a animação terminar
      setTimeout(() => {
        if (cursor) {
          cursor.classList.remove('releasing');
        }
      }, 600); // Tempo da animação rise
    }
    
    if (follower) {
      follower.classList.remove('clicking');
    }
  };

  // Criar os elementos de cursor personalizados se não existirem
  if (!document.querySelector('.custom-cursor')) {
    const cursorElement = document.createElement('div');
    cursorElement.classList.add('custom-cursor');
    document.body.appendChild(cursorElement);
    
    const followerElement = document.createElement('div');
    followerElement.classList.add('cursor-follower');
    document.body.appendChild(followerElement);
  }

  // Adicionar listeners para movimento do mouse
  window.addEventListener('mousemove', handleMouseMove);
  
  // Adicionar listeners para clique
  window.addEventListener('mousedown', handleMouseDown);
  window.addEventListener('mouseup', handleMouseUp);
  
  // Adicionar listeners para elementos interativos
  const interactiveElements = document.querySelectorAll('a, button, .interactive-element');
  interactiveElements.forEach((element) => {
    element.addEventListener('mouseover', handleMouseOver);
    element.addEventListener('mouseout', handleMouseOut);
  });

  // Ocultar o cursor padrão no corpo do documento
  document.body.style.cursor = 'none';

  // Função de limpeza
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mousedown', handleMouseDown);
    window.removeEventListener('mouseup', handleMouseUp);
    
    interactiveElements.forEach((element) => {
      element.removeEventListener('mouseover', handleMouseOver);
      element.removeEventListener('mouseout', handleMouseOut);
    });
    
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    
    if (cursor && cursor.parentNode) {
      cursor.parentNode.removeChild(cursor);
    }
    
    if (follower && follower.parentNode) {
      follower.parentNode.removeChild(follower);
    }
    
    // Restaurar o cursor padrão
    document.body.style.cursor = 'auto';
  };
};

// Função para adicionar efeito de onda em botões
export const setupButtonRippleEffect = () => {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      // Adicionar efeito sonoro de "click" dental (opcional)
      // const clickSound = new Audio('/sounds/dental-click.mp3');
      // clickSound.volume = 0.5;
      // clickSound.play();
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
};

// Inicializar quando o documento carregar
document.addEventListener('DOMContentLoaded', () => {
  setupHoverEffects();
  setupButtonRippleEffect();
});

export default {
  setupHoverEffects,
  setupButtonRippleEffect
};