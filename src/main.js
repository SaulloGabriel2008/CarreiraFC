/**
 * CARREIRA FC - MAIN BOOTSTRAPPER
 * Orquestrador do ciclo de vida, navegação entre views e gerenciamento de estado global.
 */

// Estado Global Provisório (Será integrado aos módulos em prompts subsequentes)
export const gameState = {
  currentView: 'creation', // 'creation' | 'dashboard' | 'event' | 'retirement'
  player: null,
  isAudioEnabled: true
};

/**
 * Alterna a visualização entre as views principais com animação suave
 * @param {'creation' | 'dashboard' | 'event' | 'retirement'} viewId
 */
export function switchView(viewId) {
  const views = {
    creation: document.getElementById('view-creation'),
    dashboard: document.getElementById('view-dashboard'),
    event: document.getElementById('view-event'),
    retirement: document.getElementById('view-retirement')
  };

  Object.entries(views).forEach(([id, element]) => {
    if (element) {
      if (id === viewId) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    }
  });

  gameState.currentView = viewId;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Emite uma notificação Toast rápida na tela
 * @param {string} message 
 * @param {'success' | 'danger' | 'gold'} type 
 * @param {number} durationMs 
 */
export function showToast(message, type = 'success', durationMs = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'gold' ? '🏆' : type === 'danger' ? '⚠️' : '✅'}</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, durationMs);
}

// Inicialização de Event Listeners Base
document.addEventListener('DOMContentLoaded', () => {
  console.log('⚽ Carreira FC inicializado com sucesso [Sprint 1 - Prompt 1 Concluído].');

  // Alternador de som / efeito visual
  const btnSound = document.getElementById('btn-sound-toggle');
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      gameState.isAudioEnabled = !gameState.isAudioEnabled;
      btnSound.textContent = gameState.isAudioEnabled ? '🔊' : '🔇';
      showToast(gameState.isAudioEnabled ? 'Sons ativados' : 'Sons desativados', 'gold', 1500);
    });
  }

  // Seletor de botões de posição na view de criação
  const posButtons = document.querySelectorAll('.pos-btn');
  posButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      posButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Listener para o botão de confirmação do modal genérico
  const modalCloseBtn = document.getElementById('modal-btn-confirm');
  const modalContainer = document.getElementById('modal-container');
  if (modalCloseBtn && modalContainer) {
    modalCloseBtn.addEventListener('click', () => {
      modalContainer.classList.remove('active');
    });
  }
});
