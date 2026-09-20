/**
 * CARREIRA FC - MAIN BOOTSTRAPPER & GAME STATE MANAGER
 * Orquestrador central: Inicializa o fluxo de criação, gerencia o ciclo anual das temporadas,
 * conecta o motor matemático ao dashboard e controla as transições entre views.
 */

import { Player } from './modules/player.js';
import { SeasonSimulator } from './modules/simulator.js';
import { EventEngine } from './modules/eventEngine.js';
import { getClubById } from './data/clubs.js';
import { initCreationForm, renderDashboard, showSeasonModal, renderEventView, renderEventOutcome } from './ui/renderer.js';

// Estado Global Central da Aplicação
export const gameState = {
  currentView: 'creation', // 'creation' | 'dashboard' | 'event' | 'retirement'
  currentYear: 2026,
  player: null,
  recentEventIds: [],
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
  // 1. Instancia o atleta aos 17 anos com arquétipo e clube
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

/**
 * Executa a simulação esportiva propriamente dita após eventuais decisões tomadas
 */
export function executeSeasonSimulation() {
  const btnSimulate = document.getElementById('btn-simulate-season');
  if (btnSimulate) {
    btnSimulate.disabled = true;
    btnSimulate.innerHTML = `⚽ Simulando...`;
  }

  // Pequeno delay sensorial (200ms) para dar sensação de processamento esportivo
  setTimeout(() => {
    // 1. Simula os resultados esportivos pelo SeasonSimulator
    const seasonReport = SeasonSimulator.simulateSeason(gameState.player, gameState.currentYear);

    // 2. Registra o histórico e atualiza acumuladores de carreira
    gameState.player.addSeasonRecord(seasonReport);

    // 3. Aplica a curva etária anual (evolução juvenil ou declínio físico)
    const progression = gameState.player.applyAgeProgression();

    // 4. Notificações rápidas na tela
    if (seasonReport.trophiesWon.length > 0) {
      const trophyNames = seasonReport.trophiesWon.map(t => t.name).join(', ');
      showToast(`🏆 É CAMPEÃO! Você levantou a taça: ${trophyNames}!`, 'gold', 4500);
    } else {
      showToast(`Temporada ${gameState.currentYear} concluída com ${seasonReport.goals} gols e ${seasonReport.assists} assistências!`, 'success', 3000);
    }

    // 5. Exibe o Modal comemorativo detalhado com resumo das competições e evolução
    showSeasonModal(seasonReport, progression, () => {
      // Callback disparado ao clicar em "Continuar para [Próximo Ano]"
      gameState.currentYear += 1;
      renderDashboard(gameState.player, gameState.currentYear);

      // Se o jogador se aposentou por idade/desgaste físico
      if (gameState.player.isRetired) {
        showToast(`Aos ${gameState.player.age} anos, sua carreira nos gramados chegou ao fim!`, 'gold', 5000);
        switchView('retirement');
      }
    });

    if (btnSimulate) {
      btnSimulate.disabled = false;
      btnSimulate.innerHTML = `⚽ Simular Temporada ${gameState.currentYear}`;
    }
  }, 200);
}

/**
 * Ponto de entrada ao clicar no botão "Simular Temporada" (Verifica eventos antes dos jogos)
 */
export function handleSimulateSeason() {
  if (!gameState.player) return;

  if (gameState.player.isRetired) {
    showToast("Este atleta já encerrou a carreira profissional.", "danger");
    return;
  }

  // 65% de chance de ocorrer um dilema crítico antes ou durante a temporada
  const shouldTriggerEvent = Math.random() < 0.65;
  const event = shouldTriggerEvent ? EventEngine.getEvent(gameState.player, gameState.recentEventIds) : null;

  if (event) {
    gameState.recentEventIds.push(event.id);
    if (gameState.recentEventIds.length > 6) gameState.recentEventIds.shift();

    // Alterna para tela do dilema
    switchView('event');
    renderEventView(event, (choiceId) => {
      const outcome = EventEngine.processChoice(gameState.player, event, choiceId);
      renderEventOutcome(outcome, () => {
        // Ao clicar em prosseguir com a temporada
        switchView('dashboard');
        renderDashboard(gameState.player, gameState.currentYear);
        executeSeasonSimulation();
      });
    });
  } else {
    // Simula diretamente
    executeSeasonSimulation();
  }
}


// Inicialização de Listeners e ciclo de vida
document.addEventListener('DOMContentLoaded', () => {
  console.log('⚽ Carreira FC: Inicializando motor de jogo [Prompt 6 Ativo].');

  // Inicializa o formulário de criação com callbacks
  initCreationForm(handleStartCareer);

  // Botão "Simular Temporada" conectado ao motor
  const btnSimulate = document.getElementById('btn-simulate-season');
  if (btnSimulate) {
    btnSimulate.addEventListener('click', handleSimulateSeason);
  }

  // Botão "Pendurar Chuteiras" (Aposentadoria voluntária)
  const btnRetire = document.getElementById('btn-retire-early');
  if (btnRetire) {
    btnRetire.addEventListener('click', () => {
      if (!gameState.player || gameState.player.isRetired) return;
      if (confirm("Tem certeza que deseja pendurar as chuteiras e encerrar sua carreira agora?")) {
        gameState.player.retire("Aposentadoria voluntária do atleta.");
        renderDashboard(gameState.player, gameState.currentYear);
        showToast("Carreira encerrada! Confira seu legado final.", "gold", 3500);
        switchView('retirement');
      }
    });
  }

  // Botão "Nova Carreira" na tela de aposentadoria
  const btnPlayAgain = document.getElementById('btn-play-again');
  if (btnPlayAgain) {
    btnPlayAgain.addEventListener('click', () => {
      gameState.player = null;
      gameState.currentYear = 2026;
      switchView('creation');
    });
  }

  // Botão de alternância de som / efeito
  const btnSound = document.getElementById('btn-sound-toggle');
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      gameState.isAudioEnabled = !gameState.isAudioEnabled;
      btnSound.textContent = gameState.isAudioEnabled ? '🔊' : '🔇';
      showToast(gameState.isAudioEnabled ? 'Efeitos ativados' : 'Efeitos silenciados', 'gold', 1500);
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
