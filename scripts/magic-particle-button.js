// Função para criar uma partícula
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'magic-particle';
    document.body.appendChild(particle);
  
    const size = Math.random() * 5 + 2;
    const destinationX = x + (Math.random() - 0.5) * 2 * 75;
    const destinationY = y - 75 - Math.random() * 50;
    const rotation = Math.random() * 520;
    const delay = Math.random() * 200;
  
    particle.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      background: hsl(${Math.random() * 40 + 270}, 100%, 75%);
      border-radius: 50%;
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      opacity: 0;
      pointer-events: none;
      transform: rotate(${rotation}deg);
    `;
  
    const animation = particle.animate([
      {
        transform: `translate(0, 0) rotate(${rotation}deg)`,
        opacity: 1
      },
      {
        transform: `translate(${destinationX - x}px, ${destinationY - y}px) rotate(${rotation + 360}deg)`,
        opacity: 0
      }
    ], {
      duration: 1000 + Math.random() * 1000,
      delay: delay,
      fill: 'forwards'
    });
  
    animation.onfinish = () => {
      particle.remove();
    };
  }
  
  // Função para adicionar o efeito de partículas ao botão
  function addParticleEffect(button) {
    let intervalId = null;
  
    button.addEventListener('mouseenter', () => {
      if (intervalId) return;
  
      intervalId = setInterval(() => {
        const rect = button.getBoundingClientRect();
        const x = rect.left + Math.random() * rect.width;
        const y = rect.top + rect.height + window.scrollY;
        createParticle(x, y);
      }, 50);
    });
  
    button.addEventListener('mouseleave', () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    });
  }
  
  // Adicionar o efeito aos botões quando o DOM estiver carregado
  document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.heroButton, .sectionButton');
    buttons.forEach(button => {
      addParticleEffect(button);
    });
  });