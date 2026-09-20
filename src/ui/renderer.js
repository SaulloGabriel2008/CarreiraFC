/**
 * CARREIRA FC - MÓDULO: RENDERER (UI)
 * Gerencia a manipulação reativa do DOM, sincronização de estado com as views e
 * renderização dos painéis de criação e dashboard.
 */

import { POSITIONS, getArchetypesByPosition, getArchetypeById } from '../data/archetypes.js';
import { getStartingClubs, getClubById } from '../data/clubs.js';

/**
 * Formata valores monetários no padrão brasileiro amigável (R$ mil / R$ mi)
 * @param {number} value 
 * @returns {string}
 */
export function formatMoney(value) {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1).replace('.', ',')} mi`;
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)} mil`;
  }
  return `R$ ${value}`;
}

/**
 * Inicializa e preenche o formulário de criação de jogador
 * @param {Function} onStartCareerCallback Callback disparado ao submeter a criação
 */
export function initCreationForm(onStartCareerCallback) {
  const form = document.getElementById('form-create-player');
  const posButtons = document.querySelectorAll('.pos-btn');
  const archetypeSelect = document.getElementById('player-archetype');
  const archetypeDesc = document.getElementById('archetype-desc');
  const clubSelect = document.getElementById('player-club');

  if (!form) return;

  // 1. Preenche os clubes de base / formação disponíveis
  if (clubSelect) {
    clubSelect.innerHTML = '';
    const startingClubs = getStartingClubs();
    startingClubs.forEach(club => {
      const option = document.createElement('option');
      option.value = club.id;
      option.textContent = `${club.emoji} ${club.name} (Tier ${club.tier} - OVR ${club.overall})`;
      clubSelect.appendChild(option);
    });
  }

  // Função interna para atualizar a lista de arquétipos conforme a posição selecionada
  const updateArchetypesForPos = (posCode) => {
    if (!archetypeSelect) return;
    archetypeSelect.innerHTML = '';
    const list = getArchetypesByPosition(posCode);

    list.forEach(arch => {
      const opt = document.createElement('option');
      opt.value = arch.id;
      opt.textContent = `${arch.name}`;
      archetypeSelect.appendChild(opt);
    });

    // Atualiza a descrição com o primeiro arquétipo da lista
    if (list.length > 0 && archetypeDesc) {
      archetypeDesc.textContent = list[0].shortDesc;
    }
  };

  // 2. Listeners para os botões de posição (GOL, ZAG, MEI, ATA)
  posButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      posButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const posCode = btn.getAttribute('data-pos');
      updateArchetypesForPos(posCode);
    });
  });

  // Atualiza descrição ao trocar o select de arquétipo
  if (archetypeSelect) {
    archetypeSelect.addEventListener('change', () => {
      const selectedArch = getArchetypeById(archetypeSelect.value);
      if (selectedArch && archetypeDesc) {
        archetypeDesc.textContent = selectedArch.shortDesc;
      }
    });
  }

  // Inicializa com Atacante selecionado por padrão
  updateArchetypesForPos('ATA');

  // 3. Submissão do formulário de criação
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('player-name');
    const nicknameInput = document.getElementById('player-nickname');
    const activePosBtn = document.querySelector('.pos-btn.active');

    const name = nameInput ? nameInput.value.trim() : "";
    if (!name) {
      alert("Por favor, digite o nome do seu atleta!");
      return;
    }

    const nickname = nicknameInput ? nicknameInput.value.trim() : "";
    const position = activePosBtn ? activePosBtn.getAttribute('data-pos') : "ATA";
    const archetype = archetypeSelect ? archetypeSelect.value : "matador";
    const currentClubId = clubSelect ? clubSelect.value : "santos";

    if (onStartCareerCallback) {
      onStartCareerCallback({
        name,
        nickname,
        position,
        archetype,
        currentClubId
      });
    }
  });
}

/**
 * Renderiza todos os dados do atleta no Dashboard de Carreira
 * @param {Player} player 
 * @param {number} currentYear 
 */
export function renderDashboard(player, currentYear = 2026) {
  if (!player) return;

  const club = getClubById(player.currentClubId) || { name: "Sem Clube", emoji: "⚽", tier: 3 };
  const positionInfo = POSITIONS[player.position] || { icon: "⚽", code: player.position };

  // 1. Header Global
  const headerYearBadge = document.getElementById('header-year-badge');
  const headerYear = document.getElementById('header-year');
  if (headerYearBadge) headerYearBadge.classList.remove('hidden');
  if (headerYear) headerYear.textContent = currentYear;

  // 2. Banner do Atleta
  const avatarEl = document.getElementById('dash-avatar');
  const nameEl = document.getElementById('dash-player-name');
  const posBadge = document.getElementById('dash-pos-badge');
  const clubNameEl = document.getElementById('dash-club-name');
  const ageEl = document.getElementById('dash-age');
  const overallEl = document.getElementById('dash-overall');
  const physicalEl = document.getElementById('dash-physical');
  const tournamentBadge = document.getElementById('dash-tournament-badge');
  const btnSimulate = document.getElementById('btn-simulate-season');

  if (avatarEl) avatarEl.textContent = positionInfo.icon;
  if (nameEl) {
    const nickHtml = player.nickname ? ` <span id="dash-nickname" style="color: var(--accent-green); font-size: 1rem;">"${player.nickname}"</span>` : "";
    nameEl.innerHTML = `${player.name}${nickHtml}`;
  }
  if (posBadge) {
    posBadge.textContent = player.position;
  }
  if (clubNameEl) {
    clubNameEl.textContent = `${club.emoji} ${club.shortName || club.name}`;
  }
  if (ageEl) {
    ageEl.innerHTML = `${player.age} anos • <span style="color: var(--accent-green);">${formatMoney(player.marketValue)}</span>`;
  }
  if (overallEl) {
    overallEl.textContent = player.overall;
  }
  if (physicalEl) {
    physicalEl.textContent = player.physical;
  }
  if (tournamentBadge) {
    tournamentBadge.textContent = `🏆 Temporada ${currentYear}`;
  }
  if (btnSimulate) {
    btnSimulate.innerHTML = `⚽ Simular Temporada ${currentYear}`;
  }

  // 3. Sala de Troféus
  const trophyCaseEl = document.getElementById('dash-trophy-case');
  const trophyCountEl = document.getElementById('dash-trophies-count');

  if (trophyCountEl) {
    const count = player.careerStats.trophies.length;
    trophyCountEl.textContent = `${count} ${count === 1 ? 'Título' : 'Títulos'}`;
  }

  if (trophyCaseEl) {
    if (player.careerStats.trophies.length === 0) {
      trophyCaseEl.innerHTML = `
        <span style="font-size: 0.82rem; color: var(--text-muted); font-style: italic;">
          Nenhum troféu conquistado ainda. Entre em campo e busque sua primeira taça!
        </span>
      `;
    } else {
      trophyCaseEl.innerHTML = '';
      player.careerStats.trophies.forEach(t => {
        const item = document.createElement('span');
        item.className = 'trophy-item';
        item.innerHTML = `🏆 ${t.name} <small>(${t.year})</small>`;
        trophyCaseEl.appendChild(item);
      });
    }
  }

  // 4. Totais de Carreira
  const careerTotalsEl = document.getElementById('dash-career-totals');
  if (careerTotalsEl) {
    careerTotalsEl.textContent = `${player.careerStats.totalGames} J | ${player.careerStats.totalGoals} G | ${player.careerStats.totalAssists} A | Nota: ${player.careerStats.averageRating || '0.0'}`;
  }

  // 5. Tabela de Histórico de Temporadas
  const historyTbody = document.getElementById('dash-history-tbody');
  if (historyTbody) {
    if (player.history.length === 0) {
      historyTbody.innerHTML = `
        <tr>
          <td colspan="8" style="text-align: center; color: var(--text-muted); padding: 1.5rem;">
            Nenhuma temporada disputada. Clique em "Simular Temporada" para começar.
          </td>
        </tr>
      `;
    } else {
      historyTbody.innerHTML = '';
      // Exibe da temporada mais recente para a mais antiga
      [...player.history].reverse().forEach(row => {
        const tr = document.createElement('tr');
        const trophiesStr = row.trophiesWon && row.trophiesWon.length > 0 
          ? row.trophiesWon.map(t => `🏆 ${t.name}`).join(', ')
          : '-';

        tr.innerHTML = `
          <td><b>${row.year}</b></td>
          <td>${row.age}</td>
          <td>${row.clubName}</td>
          <td><b>${row.games}</b></td>
          <td style="color: var(--accent-green); font-weight: 700;">${row.goals}</td>
          <td style="color: var(--accent-blue);">${row.assists}</td>
          <td><span class="badge ${row.rating >= 7.5 ? 'badge-gold' : 'badge-green'}">${row.rating}</span></td>
          <td style="font-size: 0.78rem; color: var(--accent-gold);">${trophiesStr}</td>
        `;
        historyTbody.appendChild(tr);
      });
    }
  }
}

/**
 * Exibe o Modal Festivo de Resumo da Temporada Recém-Simulada
 * @param {object} seasonReport Relatório do SeasonSimulator
 * @param {object} progression Relatório de evolução de applyAgeProgression()
 * @param {Function} onContinueCallback Função ao clicar em avançar
 */
export function showSeasonModal(seasonReport, progression, onContinueCallback) {
  const modalContainer = document.getElementById('modal-container');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalBtn = document.getElementById('modal-btn-confirm');

  if (!modalContainer || !modalBody) return;

  modalTitle.innerHTML = `🏁 Fim da Temporada ${seasonReport.year} • ${seasonReport.clubName}`;

  // Monta lista de competições disputadas
  const compsHtml = seasonReport.competitionsSummary.map(comp => `
    <div class="comp-item ${comp.won ? 'comp-champion' : ''}">
      <span>${comp.won ? '🏆' : '⚽'} <b>${comp.name}</b> (${comp.stageReached})</span>
      <span style="font-size: 0.8rem; color: var(--text-secondary);">
        ${comp.playerGames}J | ${comp.playerGoals}G | ${comp.playerAssists}A • <b style="color: var(--accent-gold);">${comp.rating}</b>
      </span>
    </div>
  `).join('');

  // Mensagem de evolução etária
  const ovrSign = progression.overallDelta >= 0 ? `+${progression.overallDelta}` : `${progression.overallDelta}`;
  const ovrClass = progression.overallDelta >= 0 ? 'var(--accent-green)' : 'var(--accent-red)';
  
  const progressionText = `
    <div class="progression-banner">
      <span style="font-size: 1.3rem;">🚀</span>
      <div>
        <b>Evolução Anual (${progression.age} anos)</b>: Overall <b style="color: ${ovrClass};">${ovrSign}</b> (Novo OVR: ${progression.newOverall}) &bull; Físico: <b>${progression.newPhysical}</b>
      </div>
    </div>
  `;

  // Alerta de lesão se ocorreu
  const injuryHtml = seasonReport.injuryOccurred ? `
    <div class="injury-alert-banner">
      <span>⚠️</span>
      <div>
        <b>Fisgada Muscular!</b> Você sofreu uma lesão no meio do ano e perdeu algumas partidas importantes.
      </div>
    </div>
  ` : '';

  modalBody.innerHTML = `
    <div class="season-summary-content">
      <!-- Grid de Estatísticas do Ano -->
      <div class="season-summary-grid">
        <div class="season-stat-box">
          <div class="season-stat-val">${seasonReport.games}</div>
          <div class="season-stat-lbl">Partidas</div>
        </div>
        <div class="season-stat-box" style="border-color: var(--accent-green);">
          <div class="season-stat-val" style="color: var(--accent-green);">${seasonReport.goals}</div>
          <div class="season-stat-lbl">Gols</div>
        </div>
        <div class="season-stat-box" style="border-color: var(--accent-blue);">
          <div class="season-stat-val" style="color: var(--accent-blue);">${seasonReport.assists}</div>
          <div class="season-stat-lbl">Assists</div>
        </div>
        <div class="season-stat-box" style="border-color: var(--accent-gold);">
          <div class="season-stat-val" style="color: var(--accent-gold);">${seasonReport.avgRating}</div>
          <div class="season-stat-lbl">Nota Média</div>
        </div>
      </div>

      ${injuryHtml}

      <!-- Competições e Fases -->
      <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-top: 0.25rem;">
        Desempenho por Torneio
      </div>
      <div class="competitions-list">
        ${compsHtml}
      </div>

      <!-- Evolução de Atributos -->
      ${progressionText}
    </div>
  `;

  modalBtn.textContent = `Continuar para ${seasonReport.year + 1} ➡️`;
  modalBtn.onclick = () => {
    modalContainer.classList.remove('active');
    if (onContinueCallback) onContinueCallback();
  };

  modalContainer.classList.add('active');
}

/**
 * Renderiza o Dilema Esportivo / Extracampo na tela #view-event
 * @param {object} event Objeto do evento
 * @param {Function} onChoiceCallback Callback chamado com o choiceId
 */
export function renderEventView(event, onChoiceCallback) {
  const catEl = document.getElementById('event-category');
  const titleEl = document.getElementById('event-title');
  const descEl = document.getElementById('event-description');
  const choicesContainer = document.getElementById('event-choices');

  if (catEl) catEl.textContent = event.categoryName || "🎭 Dilema Futebolístico";
  if (titleEl) titleEl.textContent = event.title;
  if (descEl) descEl.textContent = event.description;

  if (choicesContainer) {
    choicesContainer.innerHTML = '';
    event.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerHTML = `
        <span class="choice-label">${choice.text}</span>
        <span class="choice-risk">⚡ ${choice.riskLabel || 'Impacto Imediato'}</span>
      `;
      btn.onclick = () => {
        if (onChoiceCallback) onChoiceCallback(choice.id);
      };
      choicesContainer.appendChild(btn);
    });
  }
}

/**
 * Renderiza o desfecho dramático da escolha do evento
 * @param {object} outcomeResult Resultado de EventEngine.processChoice()
 * @param {Function} onContinueCallback Função chamada ao prosseguir
 */
export function renderEventOutcome(outcomeResult, onContinueCallback) {
  const choicesContainer = document.getElementById('event-choices');
  const descEl = document.getElementById('event-description');

  if (!choicesContainer || !descEl) return;

  const isSuccess = outcomeResult.isSuccess;
  const changes = outcomeResult.changes;

  // Monta badges de deltas de atributos
  const badges = [];
  if (changes.morale !== 0) badges.push(`<span class="badge ${changes.morale > 0 ? 'badge-green' : 'badge-red'}">Moral ${changes.morale > 0 ? '+' : ''}${changes.morale}</span>`);
  if (changes.reputation !== 0) badges.push(`<span class="badge ${changes.reputation > 0 ? 'badge-gold' : 'badge-red'}">Reputação ${changes.reputation > 0 ? '+' : ''}${changes.reputation}</span>`);
  if (changes.physical !== 0) badges.push(`<span class="badge ${changes.physical > 0 ? 'badge-green' : 'badge-red'}">Físico ${changes.physical > 0 ? '+' : ''}${changes.physical}</span>`);
  if (changes.overall !== 0) badges.push(`<span class="badge ${changes.overall > 0 ? 'badge-gold' : 'badge-red'}">Overall ${changes.overall > 0 ? '+' : ''}${changes.overall}</span>`);
  if (changes.money !== 0) badges.push(`<span class="badge badge-gold">Finanças ${changes.money > 0 ? '+' : ''}R$ ${Math.abs(changes.money)}</span>`);

  descEl.innerHTML = `
    <div style="font-size: 1.15rem; font-weight: 800; color: ${isSuccess ? 'var(--accent-green)' : 'var(--accent-red)'}; margin-bottom: 0.65rem;">
      ${isSuccess ? '✅ SUCESSO ESPORTIVO!' : '⚠️ COMPLICAÇÕES GRAVES!'}
    </div>
    <p style="margin-bottom: 1rem; color: var(--text-main);">${outcomeResult.text}</p>
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      ${badges.join(' ')}
    </div>
  `;

  choicesContainer.innerHTML = `
    <button id="btn-event-continue" class="btn btn-primary btn-block btn-lg" style="margin-top: 1rem;">
      ⚽ Prosseguir com a Temporada ➡️
    </button>
  `;

  const btnContinue = document.getElementById('btn-event-continue');
  if (btnContinue) {
    btnContinue.onclick = () => {
      if (onContinueCallback) onContinueCallback();
    };
  }
}

