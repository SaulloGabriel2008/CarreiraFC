/**
 * CARREIRA FC - MAIN BOOTSTRAPPER & GAME STATE MANAGER
 * Orquestrador central: Inicializa o fluxo de criação, gerencia as transições de tela
 * e mantém o estado global acessível para módulos e depuração.
 */

import { Player } from './modules/player.js';
import { getClubById } from './data/clubs.js';
import { initCreationForm, renderDashboard } from './ui/renderer.js';

// Estado Global Central da Aplicação
export const gameState = {
  currentView: 'creation', // 'creation' | 'dashboard' | 'event' | 'retirement'
  currentYear: 2026,
  player: null,
  isAudioEnabled: true
};

// Disponibiliza o gameState no window para facilidade de depuração e testes
if (typeof window !== 'undefined') {
  window.gameState = gameState;
}

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
  toast.innerHTML = `<span>${type === 'gold' ? '🏆' : type === 'danger' ? '⚠️' : '⚽'}</span> <span>${message}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(40px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, durationMs);
}

/**
 * Manipulador de Inicialização da Carreira Profissional
 * @param {object} creationParams { name, nickname, position, archetype, currentClubId }
 */
export function handleStartCareer(creationParams) {
  // 1. Instancia o objeto do Atleta com atributos da posição
  const player = new Player({
    name: creationParams.name,
    nickname: creationParams.nickname,
    position: creationParams.position,
    archetype: creationParams.archetype,
    currentClubId: creationParams.currentClubId,
    age: 17
  });

  // 2. Atualiza estado global
  gameState.player = player;
  gameState.currentYear = 2026;

  // 3. Renderiza o Dashboard inicial
  renderDashboard(gameState.player, gameState.currentYear);

  // 4. Alterna para o Dashboard com efeito visual
  switchView('dashboard');

  const club = getClubById(player.currentClubId);
  const clubName = club ? club.shortName || club.name : "clube de formação";
  showToast(`Carreira iniciada no ${clubName}! Mostre seu valor, garoto!`, 'gold', 4000);
}

// Inicialização de Listeners e ciclo de vida
document.addEventListener('DOMContentLoaded', () => {
  console.log('⚽ Carreira FC: Inicializando motor de jogo [Prompt 4 Ativo].');

  // Inicializa o formulário de criação com callbacks
  initCreationForm(handleStartCareer);

  // Botão de alternância de som / efeito
  const btnSound = document.getElementById('btn-sound-toggle');
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      gameState.isAudioEnabled = !gameState.isAudioEnabled;
      btnSound.textContent = gameState.isAudioEnabled ? '🔊' : '🔇';
      showToast(gameState.isAudioEnabled ? 'Efeitos ativados' : 'Efeitos silenciados', 'gold', 1500);
    });
  }

  // Placeholder para o botão Simular Temporada (será conectado ao motor no Prompt 5)
  const btnSimulate = document.getElementById('btn-simulate-season');
  if (btnSimulate) {
    btnSimulate.addEventListener('click', () => {
      showToast("Motor de Simulação será conectado no Prompt 5!", "gold", 2500);
    });
  }

  // Listener para o botão de confirmação do modal genérico
  const modalCloseBtn = document.getElementById('modal-btn-confirm');
  const modalContainer = document.getElementById('modal-container');
  if (modalCloseBtn && modalContainer) {
    modalCloseBtn.addEventListener('click', () => {
      modalContainer.classList.remove('active');
    });
  }
});
