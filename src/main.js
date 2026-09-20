/**
 * CARREIRA FC - MAIN ORCHESTRATOR & GAME CONTROLLER
 * Orquestrador do ciclo completo do jogo:
 * Criação -> Pré-Temporada -> Dilemas -> Simulação -> Seleção -> Prêmios -> Mercado da Bola -> Aposentadoria & Saves
 */

import { Player } from './modules/player.js';
import { SeasonSimulator } from './modules/simulator.js';
import { EventEngine } from './modules/eventEngine.js';
import { TransferMarket } from './modules/transfer.js';
import { AwardsManager } from './modules/awards.js';
import { StorageService } from './modules/storage.js';
import { getClubById } from './data/clubs.js';
import {
  initCreationForm,
  renderDashboard,
  showSeasonModal,
  showTransferMarketModal,
  renderEventView,
  renderEventOutcome
} from './ui/renderer.js';
import { ShareCardRenderer } from './ui/shareCard.js';

// Estado Global Central
export const gameState = {
  currentView: 'creation', // 'creation' | 'dashboard' | 'event' | 'retirement'
  currentYear: 2026,
  player: null,
  recentEventIds: [],
  isAudioEnabled: true
};

// Disponibiliza o gameState no escopo global para testes e depuração
if (typeof window !== 'undefined') {
  window.gameState = gameState;
}

/**
 * Alterna suavemente entre as telas principais
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
 * Emite notificações Toast rápidas e visuais na tela
 * @param {string} message 
 * @param {'success' | 'danger' | 'gold'} type 
 * @param {number} durationMs 
 */
export function showToast(message, type = 'success', durationMs = 3500) {
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
 * Manipulador de Inicialização de uma Nova Carreira
 * @param {object} creationParams 
 */
export function handleStartCareer(creationParams) {
  const player = new Player({
    name: creationParams.name,
    nickname: creationParams.nickname,
    position: creationParams.position,
    archetype: creationParams.archetype,
    currentClubId: creationParams.currentClubId,
    age: 17
  });

  gameState.player = player;
  gameState.currentYear = 2026;
  gameState.recentEventIds = [];

  // Salva no LocalStorage
  StorageService.saveGame(gameState);

  // Renderiza Dashboard e altera tela
  renderDashboard(gameState.player, gameState.currentYear);
  switchView('dashboard');

  const club = getClubById(player.currentClubId);
  const clubName = club ? club.shortName || club.name : "clube formador";
  showToast(`Carreira iniciada no ${clubName}! Boa sorte, garoto!`, 'gold', 4500);
}

/**
 * Executa a simulação esportiva e o desfecho da temporada
 */
export function executeSeasonSimulation() {
  const btnSimulate = document.getElementById('btn-simulate-season');
  if (btnSimulate) {
    btnSimulate.disabled = true;
    btnSimulate.innerHTML = `⚽ Simulando...`;
  }

  setTimeout(() => {
    const player = gameState.player;
    const year = gameState.currentYear;

    // 1. Simulação das competições de clube
    const seasonReport = SeasonSimulator.simulateSeason(player, year);

    // 2. Avaliação de Seleção Nacional (Copa do Mundo / Copa América / Amistosos)
    const nationalReport = AwardsManager.processNationalTeam(player, year);
    if (nationalReport) {
      if (nationalReport.wonTrophy) {
        seasonReport.trophiesWon.push(nationalReport.wonTrophy);
        showToast(`🌐 HISTÓRICO! Você conquistou a ${nationalReport.wonTrophy.name} com a Seleção!`, 'gold', 6000);
      }
    }

    // 3. Avaliação de Prêmios Individuais (Bola de Ouro, Chuteira de Ouro, Craque)
    const awardsWon = AwardsManager.evaluateIndividualAwards(player, seasonReport, year);
    if (awardsWon.length > 0) {
      const awardNames = awardsWon.map(a => `${a.emoji} ${a.name}`).join(' • ');
      showToast(`⭐ CONSAGRAÇÃO! Prêmios conquistados: ${awardNames}!`, 'gold', 5500);
    }
    seasonReport.awardsWon = awardsWon;

    // 4. Registra histórico acumulado na carreira do atleta
    player.addSeasonRecord(seasonReport);

    // 5. Aplica a curva etária anual (evolução juvenil ou declínio físico)
    const progression = player.applyAgeProgression();

    // 6. Alertas de títulos de clube
    if (seasonReport.trophiesWon.length > 0) {
      const trophyNames = seasonReport.trophiesWon.map(t => t.name).join(', ');
      showToast(`🏆 É CAMPEÃO! Você levantou a taça: ${trophyNames}!`, 'gold', 4500);
    } else {
      showToast(`Temporada ${year} finalizada com ${seasonReport.goals} gols e ${seasonReport.assists} assistências!`, 'success', 3000);
    }

    // Salva automaticamente o progresso
    StorageService.saveGame(gameState);

    // 7. Abre o Modal Festivo de Fim de Temporada
    showSeasonModal(seasonReport, progression, () => {
      // Checa se o atleta se aposentou por idade/desgaste
      if (player.isRetired) {
        handlePlayerRetirement();
        return;
      }

      // 8. Abre a Janela de Transferências do Mercado da Bola
      const marketData = TransferMarket.generateTransferOffers(player);
      if (marketData.offers.length > 0) {
        showTransferMarketModal(player, marketData, (decision) => {
          if (decision.action === 'transfer') {
            TransferMarket.acceptOffer(player, decision.offer);
            showToast(`✍️ Negócio fechado! Você é o novo reforço do ${decision.offer.clubName}!`, 'gold', 4500);
          } else if (decision.action === 'renew') {
            TransferMarket.acceptOffer(player, decision.offer);
            showToast(`🤝 Vínculo renovado com aumento salarial no ${decision.offer.clubName}!`, 'success', 4000);
          } else {
            showToast(`Você optou por permanecer focado no clube atual.`, 'success', 3000);
          }

          // Avança para o próximo ano
          gameState.currentYear += 1;
          StorageService.saveGame(gameState);
          renderDashboard(player, gameState.currentYear);
        });
      } else {
        // Se não houve ofertas, avança normalmente
        gameState.currentYear += 1;
        StorageService.saveGame(gameState);
        renderDashboard(player, gameState.currentYear);
      }
    });

    if (btnSimulate) {
      btnSimulate.disabled = false;
      btnSimulate.innerHTML = `⚽ Simular Temporada ${gameState.currentYear}`;
    }
  }, 220);
}

/**
 * Ponto de entrada ao clicar em "Simular Temporada" (Verifica eventos e dilemas de campo/extracampo)
 */
export function handleSimulateSeason() {
  if (!gameState.player) return;

  if (gameState.player.isRetired) {
    showToast("Este atleta já encerrou a carreira profissional.", "danger");
    return;
  }

  // 65% de chance de ocorrer um dilema crítico estilo 7 a 0
  const shouldTriggerEvent = Math.random() < 0.65;
  const event = shouldTriggerEvent ? EventEngine.getEvent(gameState.player, gameState.recentEventIds) : null;

  if (event) {
    gameState.recentEventIds.push(event.id);
    if (gameState.recentEventIds.length > 6) gameState.recentEventIds.shift();

    switchView('event');
    renderEventView(event, (choiceId) => {
      const outcome = EventEngine.processChoice(gameState.player, event, choiceId);
      renderEventOutcome(outcome, () => {
        switchView('dashboard');
        renderDashboard(gameState.player, gameState.currentYear);
        executeSeasonSimulation();
      });
    });
  } else {
    executeSeasonSimulation();
  }
}

/**
 * Encaminha o atleta para a tela de glória e aposentadoria
 */
export function handlePlayerRetirement() {
  if (!gameState.player) return;

  showToast(`Aos ${gameState.player.age} anos, sua trajetória nos gramados foi imortalizada!`, 'gold', 5000);
  ShareCardRenderer.renderRetirementView(gameState.player);
  switchView('retirement');
  StorageService.clearSave(); // Limpa o save ativo após aposentadoria definitiva
}

// Inicialização Geral da Aplicação
document.addEventListener('DOMContentLoaded', () => {
  console.log('⚽ Carreira FC: Aplicação Pronta e Operacional [Full Pipeline Ativo].');

  // Inicializa o formulário de criação
  initCreationForm(handleStartCareer);

  // Checa se existe savegame salvo
  const btnLoadSave = document.getElementById('btn-load-saved-career');
  if (btnLoadSave && StorageService.hasActiveSave()) {
    btnLoadSave.classList.remove('hidden');
    btnLoadSave.onclick = () => {
      const saved = StorageService.loadGame();
      if (saved && saved.player) {
        gameState.player = saved.player;
        gameState.currentYear = saved.currentYear;
        gameState.recentEventIds = saved.recentEventIds;

        renderDashboard(gameState.player, gameState.currentYear);
        switchView('dashboard');
        showToast(`Carreira de ${gameState.player.name} restaurada com sucesso!`, 'gold', 3500);
      }
    };
  }

  // Botão "Simular Temporada"
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
        handlePlayerRetirement();
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

  // Alternador de som / efeitos
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
