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
    ageEl.textContent = `${player.age} anos`;
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
    careerTotalsEl.textContent = `${player.careerStats.totalGames} J | ${player.careerStats.totalGoals} G | ${player.careerStats.totalAssists} A`;
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
