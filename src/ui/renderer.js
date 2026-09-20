/**
 * CARREIRA FC - MÓDULO: RENDERER (UI)
 * Gerencia a manipulação reativa do DOM, sincronização de estado com as views e
 * renderização dos painéis de criação e dashboard.
 */

import { POSITIONS, getArchetypesByPosition, getArchetypeById } from '../data/archetypes.js';
import { getRandomStartingClubs, getClubById } from '../data/clubs.js';
import { LIFESTYLE_CATEGORIES, LIFESTYLE_ITEMS, getItemsByCategory, getLifestyleItemById } from '../data/lifestyle.js';
import { getAllNationalities, getNationalTeamById } from '../data/nationalTeams.js';
import { AssetManager } from '../modules/assetManager.js';

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
  const pitchPins = document.querySelectorAll('.pitch-pin');
  const selectedPosDisplay = document.getElementById('selected-pos-display');
  const archetypeSelect = document.getElementById('player-archetype');
  const archetypeDesc = document.getElementById('archetype-desc');
  const clubsGrid = document.getElementById('starting-clubs-grid');
  const clubHiddenInput = document.getElementById('player-club');
  const nationalitySelect = document.getElementById('player-nationality');
  const btnRerollClubs = document.getElementById('btn-reroll-clubs');

  if (!form) return;

  // 0. Inicializa Seletor de Nacionalidade com Bandeiras
  if (nationalitySelect) {
    nationalitySelect.innerHTML = '';
    const nationalities = getAllNationalities();
    nationalities.forEach(nat => {
      const opt = document.createElement('option');
      opt.value = nat.country;
      opt.textContent = `${nat.flagEmoji} ${nat.country}`;
      if (nat.country === 'Brasil') opt.selected = true;
      nationalitySelect.appendChild(opt);
    });

    nationalitySelect.addEventListener('change', () => {
      renderClubsSelection();
    });
  }

  // 1. Função para sortear e renderizar os 3 clubes formadores aleatórios
  const renderClubsSelection = () => {
    if (!clubsGrid || !clubHiddenInput) return;
    clubsGrid.innerHTML = '';

    const selectedCountry = nationalitySelect ? nationalitySelect.value : "Brasil";
    const randomClubs = getRandomStartingClubs(3, selectedCountry);

    randomClubs.forEach((club, index) => {
      const card = document.createElement('div');
      card.className = `starting-club-card ${index === 0 ? 'selected' : ''}`;
      card.setAttribute('data-club-id', club.id);
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Selecionar clube formador ${club.name}, Tier ${club.tier}`);
      card.innerHTML = `
        <div style="margin-bottom: 0.25rem;">${AssetManager.renderClubBadgeHtml(club, 42)}</div>
        <span class="starting-club-name">${club.shortName || club.name}</span>
        <span class="starting-club-sub">${club.country} &bull; Tier ${club.tier}</span>
      `;

      const selectClub = () => {
        document.querySelectorAll('.starting-club-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        clubHiddenInput.value = club.id;
      };

      card.onclick = selectClub;
      card.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectClub();
        }
      };

      clubsGrid.appendChild(card);
    });

    // Define o primeiro como selecionado por padrão
    if (randomClubs.length > 0) {
      clubHiddenInput.value = randomClubs[0].id;
    }
  };

  // Inicializa os 3 clubes sorteados
  renderClubsSelection();

  // Botão de re-sorteio de clubes
  if (btnRerollClubs) {
    btnRerollClubs.onclick = () => {
      renderClubsSelection();
    };
  }

  // 2. Atualização dinâmica dos arquétipos conforme a posição no campinho
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

    if (list.length > 0 && archetypeDesc) {
      archetypeDesc.textContent = list[0].shortDesc;
    }

    if (selectedPosDisplay) {
      const posInfo = POSITIONS[posCode] || { name: posCode, materialIcon: "sports_soccer" };
      selectedPosDisplay.innerHTML = `<span class="material-symbols-outlined" style="font-size: 14px;">${posInfo.materialIcon || 'sports_soccer'}</span> ${posCode} - ${posInfo.name}`;
    }
  };

  // 3. Listeners nos Pins do Campinho Tático Interativo
  let currentPosition = "CA";
  pitchPins.forEach(pin => {
    pin.addEventListener('click', () => {
      pitchPins.forEach(p => p.classList.remove('active'));
      pin.classList.add('active');
      currentPosition = pin.getAttribute('data-pos');
      updateArchetypesForPos(currentPosition);
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

  // Inicializa com Centroavante (CA) ativo por padrão
  updateArchetypesForPos('CA');

  // 4. Submissão do formulário de criação
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('player-name');
    const nicknameInput = document.getElementById('player-nickname');

    const name = nameInput ? nameInput.value.trim() : "";
    if (!name) {
      alert("Por favor, digite o nome do seu atleta!");
      return;
    }

    const nickname = nicknameInput ? nicknameInput.value.trim() : "";
    const nationality = nationalitySelect ? nationalitySelect.value : "Brasil";
    const position = currentPosition || "CA";
    const archetype = archetypeSelect ? archetypeSelect.value : "matador_ca";
    const currentClubId = clubHiddenInput ? clubHiddenInput.value : "santos";

    if (onStartCareerCallback) {
      onStartCareerCallback({
        name,
        nickname,
        nationality,
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

  // 2. Banner & Card FUT do Atleta
  const nameEl = document.getElementById('dash-player-name');
  const posBadge = document.getElementById('dash-pos-badge');
  const clubNameEl = document.getElementById('dash-club-name');
  const clubBadgeSlot = document.getElementById('dash-club-badge-slot');
  const ageEl = document.getElementById('dash-age');
  const tournamentBadge = document.getElementById('dash-tournament-badge');
  const btnSimulate = document.getElementById('btn-simulate-season');
  const tierBadge = document.getElementById('dash-card-tier-badge');
  const futCardContainer = document.getElementById('dash-fut-card-container');
  const statChipsGrid = document.getElementById('dash-stat-chips-grid');

  if (nameEl) {
    const nickHtml = player.nickname ? ` <span id="dash-nickname" style="color: var(--accent-green); font-size: 1rem;">"${player.nickname}"</span>` : "";
    nameEl.innerHTML = `${player.name}${nickHtml}`;
  }
  if (posBadge) {
    posBadge.textContent = `${positionInfo.icon} ${player.position}`;
  }
  const nationalityBadge = document.getElementById('dash-nationality-badge');
  if (nationalityBadge) {
    const natTeam = getNationalTeamById(player.nationality);
    nationalityBadge.innerHTML = `${natTeam.flagEmoji} ${natTeam.country}`;
  }
  if (clubBadgeSlot) {
    clubBadgeSlot.innerHTML = AssetManager.renderClubBadgeHtml(club, 24);
  }
  if (clubNameEl) {
    clubNameEl.textContent = `${club.shortName || club.name}`;
  }
  if (ageEl) {
    ageEl.innerHTML = `${player.age} anos • <span style="color: var(--accent-green); font-weight: 700;">${formatMoney(player.marketValue)}</span>`;
  }
  if (tierBadge) {
    tierBadge.textContent = AssetManager.getCardTierName(player.overall);
    tierBadge.className = `badge ${player.overall >= 85 ? 'badge-green' : player.overall >= 75 ? 'badge-gold' : 'badge-pos'}`;
  }

  // Renderiza o Match Career Card Oficial (Proporção 4:5 - Padrão Broadcast Stitch)
  if (futCardContainer) {
    const clubCrestHtml = AssetManager.renderClubBadgeHtml(club, 22);
    const posIcon = positionInfo.materialIcon || 'sports_soccer';
    const archetypeObj = getArchetypeById(player.archetype) || { name: player.archetype };

    futCardContainer.innerHTML = `
      <div class="match-career-card" id="match-career-card">
        <!-- Marca d'água técnica de campo de futebol -->
        <svg class="match-career-watermark" viewBox="0 0 100 100" fill="none" stroke="#00FF87">
          <circle cx="50" cy="50" r="45" stroke-width="1.5" />
          <circle cx="50" cy="50" r="18" stroke-width="1.5" />
          <line x1="5" y1="50" x2="95" y2="50" stroke-width="1.5" />
        </svg>

        <div class="career-card-header">
          <div class="career-card-rating-block">
            <span class="career-card-ovr">${player.overall}</span>
            <span class="career-card-pos">${player.position}</span>
          </div>
          <div class="career-card-archetype">
            <span class="material-symbols-outlined" style="font-size: 13px;">shield</span>
            <span>${archetypeObj.name || player.archetype}</span>
          </div>
        </div>

        <div class="career-card-visual-area">
          <div class="career-card-avatar-box">
            <span class="material-symbols-outlined">${posIcon}</span>
          </div>
          <div class="career-card-name-block">
            <div class="career-card-name">${player.name}</div>
            <div class="career-card-club-line">
              ${clubCrestHtml}
              <span>${club.shortName || club.name}</span>
            </div>
          </div>
        </div>

        <div class="career-card-telemetry-grid">
          <div class="career-mini-telemetry">
            <span class="career-mini-val" style="color: var(--primary-container);">${player.physical}</span>
            <span class="career-mini-lbl">FÍSICO</span>
          </div>
          <div class="career-mini-telemetry">
            <span class="career-mini-val">${player.careerStats.totalGoals}</span>
            <span class="career-mini-lbl">GOLS</span>
          </div>
          <div class="career-mini-telemetry">
            <span class="career-mini-val" style="color: var(--secondary);">${player.careerStats.trophies.length}</span>
            <span class="career-mini-lbl">TÍTULOS</span>
          </div>
        </div>
      </div>
    `;
  }

  // Renderiza Grid de Chips de Telemetria Tática
  if (statChipsGrid) {
    const moraleColor = player.morale >= 70 ? 'var(--primary-container)' : player.morale <= 35 ? 'var(--card-red)' : 'var(--secondary)';
    
    let potentialStatus = "EM EXPANSÃO";
    let potentialColor = "var(--primary-container)";
    if (player.age >= 33) {
      potentialStatus = "VETERANO";
      potentialColor = "var(--text-muted)";
    } else if (player.age >= 28) {
      potentialStatus = "CONSOLIDADO";
      potentialColor = "var(--secondary)";
    }

    statChipsGrid.innerHTML = `
      <div class="stat-chip-tactical" title="Condição Física e Resistência a Lesões">
        <div class="stat-chip-icon-box">
          <span class="material-symbols-outlined" style="color: var(--primary-container);">fitness_center</span>
        </div>
        <div class="stat-chip-info">
          <span class="stat-chip-value" style="color: var(--primary-container);">${player.physical}</span>
          <span class="stat-chip-label">FÍSICO / STAMINA</span>
        </div>
      </div>

      <div class="stat-chip-tactical" title="Nível de Moral e Motivação">
        <div class="stat-chip-icon-box">
          <span class="material-symbols-outlined" style="color: ${moraleColor};">psychology</span>
        </div>
        <div class="stat-chip-info">
          <span class="stat-chip-value" style="color: ${moraleColor};">${player.morale}%</span>
          <span class="stat-chip-label">MORAL / FOCO</span>
        </div>
      </div>

      <div class="stat-chip-tactical" title="Reputação e Prestígio no Circuito">
        <div class="stat-chip-icon-box">
          <span class="material-symbols-outlined" style="color: var(--secondary);">military_tech</span>
        </div>
        <div class="stat-chip-info">
          <span class="stat-chip-value" style="color: var(--secondary);">${player.reputation}</span>
          <span class="stat-chip-label">REPUTAÇÃO</span>
        </div>
      </div>

      <div class="stat-chip-tactical" title="Saldo Financeiro em Conta">
        <div class="stat-chip-icon-box">
          <span class="material-symbols-outlined" style="color: var(--secondary);">account_balance_wallet</span>
        </div>
        <div class="stat-chip-info">
          <span class="stat-chip-value" style="color: var(--secondary);">${formatMoney(player.finances)}</span>
          <span class="stat-chip-label">PATRIMÔNIO</span>
        </div>
      </div>

      <div class="stat-chip-tactical" title="Projeção Evolutiva Atual">
        <div class="stat-chip-icon-box">
          <span class="material-symbols-outlined" style="color: ${potentialColor};">trending_up</span>
        </div>
        <div class="stat-chip-info">
          <span class="stat-chip-value" style="color: ${potentialColor}; font-size: 0.82rem;">${potentialStatus}</span>
          <span class="stat-chip-label">PROJEÇÃO</span>
        </div>
      </div>
    `;
  }

  if (tournamentBadge) {
    tournamentBadge.innerHTML = `<span class="material-symbols-outlined" style="font-size:14px;">emoji_events</span> TEMPORADA ${currentYear}`;
  }
  if (btnSimulate) {
    btnSimulate.innerHTML = `<span class="material-symbols-outlined">sports_soccer</span> SIMULAR TEMPORADA ${currentYear}`;
  }

  // Conecta o botão de Vida & Fortuna
  const btnOpenLifestyle = document.getElementById('btn-open-lifestyle');
  if (btnOpenLifestyle) {
    btnOpenLifestyle.onclick = () => {
      openLifestyleModal(player, currentYear);
    };
  }

  // 3. Sala de Troféus 3D
  const trophyCaseEl = document.getElementById('dash-trophy-case');
  const trophyCountEl = document.getElementById('dash-trophies-count');

  if (trophyCountEl) {
    const count = player.careerStats.trophies.length;
    trophyCountEl.textContent = `${count} ${count === 1 ? 'Título' : 'Títulos'}`;
  }

  if (trophyCaseEl) {
    if (player.careerStats.trophies.length === 0) {
      trophyCaseEl.innerHTML = `
        <span style="font-size: 0.85rem; color: var(--text-muted); font-style: italic; padding: 0.75rem;">
          Nenhum troféu conquistado ainda. Entre em campo e busque sua primeira taça!
        </span>
      `;
    } else {
      trophyCaseEl.innerHTML = '';
      // Agrupa troféus por nome/id para exibir contadores limpos (ex: 3x Paulistão)
      const trophyMap = new Map();
      player.careerStats.trophies.forEach(t => {
        const key = t.id || t.name;
        if (!trophyMap.has(key)) {
          trophyMap.set(key, { ...t, count: 1, years: [t.year] });
        } else {
          const existing = trophyMap.get(key);
          existing.count += 1;
          existing.years.push(t.year);
        }
      });

      trophyMap.forEach(t => {
        const card = document.createElement('div');
        card.className = 'trophy-shelf-card';
        const trophyImgUrl = AssetManager.getTrophyImage(t.id);
        const countBadge = t.count > 1 ? `<span class="trophy-shelf-count">${t.count}x</span>` : '';
        const yearsStr = t.years.length > 2 ? `${t.years[0]}...${t.years[t.years.length - 1]}` : t.years.join(', ');

        card.innerHTML = `
          ${countBadge}
          <img src="${trophyImgUrl}" alt="${t.name}" class="trophy-shelf-img" loading="lazy" />
          <span class="trophy-shelf-name">${t.name}</span>
          <span class="trophy-shelf-year">${yearsStr}</span>
        `;
        trophyCaseEl.appendChild(card);
      });
    }
  }

  // 4. Galeria de Prêmios Individuais (Bola de Ouro, Chuteira, etc.)
  const awardsSection = document.getElementById('dash-awards-section');
  const awardsGrid = document.getElementById('dash-awards-grid');
  if (awardsSection && awardsGrid) {
    const awards = player.careerStats.individualAwards || [];
    if (awards.length > 0) {
      awardsSection.style.display = 'block';
      awardsGrid.innerHTML = '';
      awards.forEach(a => {
        const card = document.createElement('div');
        card.className = 'award-card-3d';
        const awardImg = AssetManager.getAwardImage(a.id);
        card.innerHTML = `
          <img src="${awardImg}" alt="${a.name}" class="award-card-img" loading="lazy" />
          <span class="award-card-name">${a.name}</span>
          <span class="award-card-year">${a.year}</span>
        `;
        awardsGrid.appendChild(card);
      });
    } else {
      awardsSection.style.display = 'none';
    }
  }

  // 5. Totais de Carreira
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
      player.history.forEach(row => {
        const tr = document.createElement('tr');
        const trophiesStr = (row.trophiesWon && row.trophiesWon.length > 0)
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

// =========================================================================
// SISTEMA DE MODAL: VIDA & FORTUNA (LIFESTYLE)
// =========================================================================
let currentLifestyleCategory = 'garage';

function notifyToast(message, type = 'success', durationMs = 4500) {
  if (typeof window !== 'undefined' && typeof window.showToast === 'function') {
    window.showToast(message, type, durationMs);
    return;
  }
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
 * Abre o Modal de Vida & Fortuna
 * @param {Player} player 
 * @param {number} currentYear 
 */
export function openLifestyleModal(player, currentYear = 2026) {
  const modal = document.getElementById('modal-lifestyle');
  const btnClose = document.getElementById('btn-close-lifestyle');
  const balanceEl = document.getElementById('lifestyle-current-balance');
  const tabsBar = document.getElementById('lifestyle-tabs-bar');

  if (!modal) return;

  if (btnClose) {
    btnClose.onclick = () => closeLifestyleModal();
  }

  // Atualiza exibição de saldo no cabeçalho do modal
  if (balanceEl) {
    balanceEl.textContent = formatMoney(player.finances);
  }

  // Renderiza as abas de categorias
  if (tabsBar) {
    tabsBar.innerHTML = '';
    LIFESTYLE_CATEGORIES.forEach(cat => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `lifestyle-tab-btn ${cat.id === currentLifestyleCategory ? 'active' : ''}`;
      btn.textContent = cat.name;
      btn.onclick = () => {
        currentLifestyleCategory = cat.id;
        document.querySelectorAll('.lifestyle-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderLifestyleItems(player, currentLifestyleCategory, currentYear);
      };
      tabsBar.appendChild(btn);
    });
  }

  renderLifestyleItems(player, currentLifestyleCategory, currentYear);
  modal.classList.add('active');
}

/**
 * Fecha o Modal de Vida & Fortuna
 */
export function closeLifestyleModal() {
  const modal = document.getElementById('modal-lifestyle');
  if (modal) modal.classList.remove('active');
}

/**
 * Renderiza os itens da categoria ativa no modal
 * @param {Player} player 
 * @param {string} categoryId 
 * @param {number} currentYear 
 */
export function renderLifestyleItems(player, categoryId, currentYear = 2026) {
  const container = document.getElementById('lifestyle-items-container');
  const balanceEl = document.getElementById('lifestyle-current-balance');
  if (!container) return;

  if (balanceEl) {
    balanceEl.textContent = formatMoney(player.finances);
  }

  const items = getItemsByCategory(categoryId);
  container.innerHTML = '';

  if (items.length === 0) {
    container.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 2rem;">Nenhum item nesta categoria.</div>`;
    return;
  }

  items.forEach(item => {
    const isPurchased = player.hasLifestyleItem(item.id);
    const hasEnoughMoney = player.finances >= item.price;
    const isRepeatable = !!item.isRepeatable;

    // Contagem de compras para itens repetíveis (como cotas)
    let purchaseCount = 0;
    if (player.lifestyle && player.lifestyle.items) {
      purchaseCount = player.lifestyle.items.filter(id => id === item.id).length;
    }

    const card = document.createElement('div');
    card.className = `lifestyle-card ${isPurchased && !isRepeatable ? 'acquired' : ''}`;

    let actionBtnHtml = '';
    if (isPurchased && !isRepeatable) {
      actionBtnHtml = `<button class="btn btn-secondary btn-sm" disabled style="opacity: 0.85; border-color: rgba(0, 230, 118, 0.4); color: var(--accent-green);">Adquirido ✅</button>`;
    } else if (!hasEnoughMoney) {
      const diff = item.price - player.finances;
      actionBtnHtml = `<button class="btn btn-secondary btn-sm" disabled title="Saldo insuficiente na carteira">Falta ${formatMoney(diff)}</button>`;
    } else {
      const label = isRepeatable && purchaseCount > 0 ? `Comprar Outro (${formatMoney(item.price)})` : (item.isGamble ? `Apostar (${formatMoney(item.price)})` : `Comprar (${formatMoney(item.price)})`);
      actionBtnHtml = `<button class="btn ${item.isGamble ? 'btn-danger' : 'btn-gold'} btn-sm btn-buy-lifestyle" data-item-id="${item.id}">${label}</button>`;
    }

    const statusBadge = isRepeatable && purchaseCount > 0 ? ` <span class="badge badge-pos" style="font-size: 0.72rem;">${purchaseCount}x adquirido</span>` : '';

    card.innerHTML = `
      <div class="lifestyle-card-icon">${item.icon}</div>
      <div class="lifestyle-card-info">
        <div class="lifestyle-card-title">
          <span>${item.name}</span>
          ${statusBadge}
        </div>
        <div class="lifestyle-card-desc">${item.desc}</div>
        <span class="lifestyle-benefit-badge">✨ ${item.benefitDesc}</span>
      </div>
      <div class="lifestyle-card-action">
        <div class="lifestyle-price-tag">${formatMoney(item.price)}</div>
        ${actionBtnHtml}
      </div>
    `;

    const buyBtn = card.querySelector('.btn-buy-lifestyle');
    if (buyBtn) {
      buyBtn.onclick = () => {
        handleBuyItem(player, item, currentYear);
      };
    }

    container.appendChild(card);
  });
}

/**
 * Processa a compra instantânea e feedback na interface
 * @param {Player} player 
 * @param {object} item 
 * @param {number} currentYear 
 */
function handleBuyItem(player, item, currentYear) {
  const result = player.buyLifestyleItem(item);
  if (!result.success) {
    notifyToast(result.reason || "Não foi possível realizar a compra.", "danger");
    return;
  }

  // Notificações temáticas
  if (item.isGamble) {
    if (result.gambleWon) {
      notifyToast(`🔥 DEU BOM DEMAIS! O parça acertou em cheio e você embolsou ${formatMoney(result.payout)} (+R$ 300 mil de lucro)!`, "gold", 5500);
    } else {
      notifyToast(`💥 GOLPE DO PARÇA! O projeto naufragou, você perdeu ${formatMoney(item.price)} e virou piada no elenco!`, "danger", 5500);
    }
  } else if (item.id === 'casa_mae') {
    notifyToast(`❤️ PROMESSA CUMPRIDA! Você entregou as chaves da casa própria da sua mãe! (+25 Moral)!`, "gold", 6000);
  } else if (item.id === 'comprar_clube') {
    notifyToast(`👑 HISTÓRICO! Você agora é o Presidente & Dono do Clube! +30 Reputação e dividendos anuais!`, "gold", 6000);
  } else if (item.id === 'instituto_social') {
    notifyToast(`🤝 ORGULHO DA QUEBRADA! O Instituto Social foi inaugurado com festa! +25 Reputação!`, "gold", 6000);
  } else {
    notifyToast(`🎉 Parabéns! Você adquiriu ${item.name}! (${item.benefitDesc})`, "gold", 4000);
  }

  // Atualiza dashboard e modal instantaneamente
  renderDashboard(player, currentYear);
  renderLifestyleItems(player, currentLifestyleCategory, currentYear);

  // Sincroniza save se o StorageService estiver acessível via window.gameState
  if (typeof window !== 'undefined' && window.gameState && window.StorageService) {
    window.StorageService.saveGame(window.gameState);
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
  const compsHtml = seasonReport.competitionsSummary.map(comp => {
    const trophyImg = comp.won 
      ? `<img src="${AssetManager.getTrophyImage(comp.id)}" style="width: 22px; height: 22px; vertical-align: middle; margin-right: 6px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5));" alt="Taça" />` 
      : '<span style="margin-right: 4px;">⚽</span>';
    return `
      <div class="comp-item ${comp.won ? 'comp-champion' : ''}">
        <span style="display: flex; align-items: center;">${trophyImg}<b>${comp.name}</b>&nbsp;(${comp.stageReached})</span>
        <span style="font-size: 0.8rem; color: var(--text-secondary);">
          ${comp.playerGames}J | ${comp.playerGoals}G | ${comp.playerAssists}A • <b style="color: var(--accent-gold);">${comp.rating}</b>
        </span>
      </div>
    `;
  }).join('');

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

      <!-- Balanço Financeiro da Temporada -->
      <div class="comp-item" style="border-color: rgba(255, 193, 7, 0.45); background: rgba(255, 193, 7, 0.05); margin-top: 0.6rem; border-left: 4px solid var(--accent-gold);">
        <span>💰 <b>Ganhos Financeiros do Ano</b></span>
        <span style="font-size: 0.85rem; font-weight: 700; color: var(--accent-gold);">
          +${formatMoney(seasonReport.playerWage ? seasonReport.playerWage * 13 : 0)} 
          ${seasonReport.passiveEarnings ? `<small style="color: var(--accent-green); font-weight: 700;">(+${formatMoney(seasonReport.passiveEarnings)} rendimentos)</small>` : ''}
        </span>
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
 * com exibição explícita de ganhos e perdas e botões de 'Ir no Garantido' vs 'Arriscar no Sorteio'.
 * @param {object} event Objeto do evento
 * @param {Function} onChoiceCallback Callback chamado com (choiceId, mode) onde mode é 'guaranteed' ou 'gamble'
 */
export function renderEventView(event, onChoiceCallback) {
  const catEl = document.getElementById('event-category');
  const titleEl = document.getElementById('event-title');
  const descEl = document.getElementById('event-description');
  const choicesContainer = document.getElementById('event-choices');
  const bannerContainer = document.getElementById('event-hero-banner-container');

  if (bannerContainer) {
    const bannerUrl = AssetManager.getEventBanner(event.id);
    if (bannerUrl) {
      bannerContainer.innerHTML = `
        <img src="${bannerUrl}" alt="${event.title}" class="event-banner-img" />
      `;
    } else {
      bannerContainer.innerHTML = '';
    }
  }

  if (catEl) {
    catEl.innerHTML = `<span class="material-symbols-outlined" style="font-size: 13px;">theater_comedy</span> ${event.categoryName || "DILEMA EXTRACAMPO"}`;
  }
  if (titleEl) titleEl.textContent = event.title;
  if (descEl) descEl.textContent = event.description;

  if (choicesContainer) {
    choicesContainer.innerHTML = '';
    event.choices.forEach(choice => {
      // Monta badges de Ganhos Base
      const gainBadges = [];
      const baseGain = choice.baseGain || {};
      if (baseGain.morale) gainBadges.push(`<span class="choice-gain">+${baseGain.morale} Moral</span>`);
      if (baseGain.reputation) gainBadges.push(`<span class="choice-gain">+${baseGain.reputation} Reputação</span>`);
      if (baseGain.physical) gainBadges.push(`<span class="choice-gain">+${baseGain.physical} Físico</span>`);
      if (baseGain.overall) gainBadges.push(`<span class="choice-gain">+${baseGain.overall} OVR</span>`);
      if (baseGain.money) gainBadges.push(`<span class="choice-gain">+${formatMoney(baseGain.money)}</span>`);

      // Monta badges de Perdas Base
      const lossBadges = [];
      const baseLoss = choice.baseLoss || {};
      if (baseLoss.morale) lossBadges.push(`<span class="choice-loss">-${Math.abs(baseLoss.morale)} Moral</span>`);
      if (baseLoss.reputation) lossBadges.push(`<span class="choice-loss">-${Math.abs(baseLoss.reputation)} Reputação</span>`);
      if (baseLoss.physical) lossBadges.push(`<span class="choice-loss">-${Math.abs(baseLoss.physical)} Físico</span>`);
      if (baseLoss.overall) lossBadges.push(`<span class="choice-loss">-${Math.abs(baseLoss.overall)} OVR</span>`);
      if (baseLoss.money) lossBadges.push(`<span class="choice-loss">-${formatMoney(Math.abs(baseLoss.money))}</span>`);

      const gainsHtml = gainBadges.length > 0 ? `<div><b>Ganhos Base:</b> ${gainBadges.join(' &bull; ')}</div>` : '';
      const lossesHtml = lossBadges.length > 0 ? `<div><b>Perdas Base:</b> ${lossBadges.join(' &bull; ')}</div>` : '';

      // Se possui a mecânica de Sorteio (Gamble)
      if (choice.hasGamble && choice.gamble) {
        const choiceCard = document.createElement('div');
        choiceCard.className = 'choice-btn choice-gamble';
        choiceCard.innerHTML = `
          <div class="choice-header-row">
            <span class="choice-label">${choice.text}</span>
            <span class="choice-odds-badge gamble-badge">
              <span class="material-symbols-outlined" style="font-size:12px; vertical-align: middle;">casino</span>
              ${choice.gamble.gambleLabel || 'Sorteio Opcional'}
            </span>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem; line-height: 1.45;">
            ${choice.desc}
          </div>
          <div class="choice-outcomes" style="margin-bottom: 0.75rem;">
            ${gainsHtml}
            ${lossesHtml}
          </div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; width: 100%;">
            <button type="button" class="btn btn-secondary btn-sm btn-choice-guaranteed" style="border-color: rgba(0,255,135,0.4); color: var(--primary-container);">
              <span class="material-symbols-outlined" style="font-size:14px;">shield</span> IR NO GARANTIDO
            </button>
            <button type="button" class="btn btn-gold btn-sm btn-choice-gamble">
              <span class="material-symbols-outlined" style="font-size:14px;">casino</span> ARRISCAR NO SORTEIO
            </button>
          </div>
        `;

        choiceCard.querySelector('.btn-choice-guaranteed').onclick = (e) => {
          e.stopPropagation();
          if (onChoiceCallback) onChoiceCallback(choice.id, 'guaranteed');
        };
        choiceCard.querySelector('.btn-choice-gamble').onclick = (e) => {
          e.stopPropagation();
          if (onChoiceCallback) onChoiceCallback(choice.id, 'gamble');
        };

        choicesContainer.appendChild(choiceCard);
      } 
      // Escolha Padrão (Sem Sorteio)
      else {
        const choiceCard = document.createElement('div');
        choiceCard.className = 'choice-btn choice-guaranteed';
        choiceCard.innerHTML = `
          <div class="choice-header-row">
            <span class="choice-label">${choice.text}</span>
            <span class="choice-odds-badge guaranteed-badge">
              <span class="material-symbols-outlined" style="font-size:12px; vertical-align: middle;">shield</span> GARANTIDO
            </span>
          </div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.5rem; line-height: 1.45;">
            ${choice.desc}
          </div>
          <div class="choice-outcomes" style="margin-bottom: 0.75rem;">
            ${gainsHtml}
            ${lossesHtml}
          </div>
          <button type="button" class="btn btn-primary btn-block btn-sm btn-choice-standard">
            CONFIRMAR DECISÃO
          </button>
        `;

        choiceCard.querySelector('.btn-choice-standard').onclick = (e) => {
          e.stopPropagation();
          if (onChoiceCallback) onChoiceCallback(choice.id, 'guaranteed');
        };

        choicesContainer.appendChild(choiceCard);
      }
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
  const isGamble = outcomeResult.isGamble;
  const changes = outcomeResult.changes;

  // Monta badges de deltas de atributos
  const badges = [];
  if (changes.morale) badges.push(`<span class="badge ${changes.morale > 0 ? 'badge-green' : 'badge-red'}">Moral ${changes.morale > 0 ? '+' : ''}${changes.morale}</span>`);
  if (changes.reputation) badges.push(`<span class="badge ${changes.reputation > 0 ? 'badge-gold' : 'badge-red'}">Reputação ${changes.reputation > 0 ? '+' : ''}${changes.reputation}</span>`);
  if (changes.physical) badges.push(`<span class="badge ${changes.physical > 0 ? 'badge-green' : 'badge-red'}">Físico ${changes.physical > 0 ? '+' : ''}${changes.physical}</span>`);
  if (changes.overall) badges.push(`<span class="badge ${changes.overall > 0 ? 'badge-gold' : 'badge-red'}">Overall ${changes.overall > 0 ? '+' : ''}${changes.overall}</span>`);
  if (changes.money) badges.push(`<span class="badge badge-gold">Finanças ${changes.money > 0 ? '+' : ''}R$ ${Math.abs(changes.money)}</span>`);

  const modeBadge = isGamble 
    ? `<span class="badge badge-gold" style="margin-bottom: 0.5rem;"><span class="material-symbols-outlined" style="font-size:12px;">casino</span> Resolução por Sorteio</span>`
    : `<span class="badge badge-green" style="margin-bottom: 0.5rem;"><span class="material-symbols-outlined" style="font-size:12px;">shield</span> Resolução Garantida</span>`;

  descEl.innerHTML = `
    ${modeBadge}
    <div style="font-size: 1.25rem; font-weight: 900; color: ${isSuccess ? 'var(--primary-container)' : 'var(--card-red)'}; margin-bottom: 0.65rem;">
      ${outcomeResult.title || (isSuccess ? 'SUCESSO ESPORTIVO!' : 'COMPLICAÇÕES GRAVES!')}
    </div>
    <p style="margin-bottom: 1rem; color: var(--text-main); font-size: 0.95rem; line-height: 1.6;">${outcomeResult.text}</p>
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      ${badges.length > 0 ? badges.join(' ') : '<span class="badge">Nenhuma alteração nos atributos</span>'}
    </div>
  `;

  choicesContainer.innerHTML = `
    <button id="btn-event-continue" class="btn btn-primary btn-block btn-lg" style="margin-top: 1rem;">
      <span class="material-symbols-outlined">play_arrow</span> PROSSEGUIR COM A TEMPORADA
    </button>
  `;

  const btnContinue = document.getElementById('btn-event-continue');
  if (btnContinue) {
    btnContinue.onclick = () => {
      if (onContinueCallback) onContinueCallback();
    };
  }
}

/**
 * Exibe a Janela de Transferências com propostas na mesa
 * @param {Player} player 
 * @param {object} marketData Retorno de TransferMarket.generateTransferOffers()
 * @param {Function} onDecisionCallback Chamado com { action: 'transfer' | 'renew' | 'stay', offer?: object }
 */
export function showTransferMarketModal(player, marketData, onDecisionCallback) {
  const modalContainer = document.getElementById('modal-container');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalBtn = document.getElementById('modal-btn-confirm');

  if (!modalContainer || !modalBody) return;

  modalTitle.innerHTML = `💼 Janela de Transferências • Mercado da Bola`;

  const offersHtml = marketData.offers.map((offer, idx) => {
    const offerClub = getClubById(offer.clubId) || offer;
    const badgeHtml = AssetManager.renderClubBadgeHtml(offerClub, 28);
    return `
    <div class="card-panel" style="background: var(--bg-card); border-color: var(--border-medium); margin-bottom: 0.75rem; padding: 0.85rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <span style="display: flex; align-items: center; gap: 0.5rem; font-size: 1.05rem; font-weight: 800;">
          ${badgeHtml}
          <span>${offer.clubName} <small style="color: var(--text-muted); font-size: 0.75rem;">(${offer.country})</small></span>
        </span>
        <span class="badge badge-pos">${offer.squadRole}</span>
      </div>
      <div style="display: flex; gap: 1rem; font-size: 0.84rem; color: var(--text-secondary); margin-bottom: 0.75rem;">
        <span>Salário: <b style="color: var(--accent-green);">${formatMoney(offer.wage)}/mês</b></span>
        <span>Luvas: <b style="color: var(--accent-gold);">${formatMoney(offer.signingBonus)}</b></span>
      </div>
      <button class="btn btn-primary btn-sm btn-block btn-accept-transfer" data-offer-idx="${idx}">
        ✍️ Assinar com ${offer.clubName}
      </button>
    </div>
  `;
  }).join('');

  modalBody.innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      <p style="font-size: 0.88rem; color: var(--text-secondary);">
        Com base no seu Overall (<b>${player.overall}</b>) e reputação, surgiram propostas na mesa do seu empresário:
      </p>
      
      <div style="max-height: 280px; overflow-y: auto; padding-right: 0.25rem;">
        ${offersHtml || '<p style="font-style: italic; color: var(--text-muted);">Nenhum clube fez proposta formal nesta janela.</p>'}
      </div>

      <div style="border-top: 1px solid var(--border-subtle); padding-top: 0.75rem; display: flex; flex-direction: column; gap: 0.5rem;">
        <button id="btn-renew-contract" class="btn btn-gold btn-block">
          🤝 Renovar com ${marketData.currentClubOffer.clubName} (${formatMoney(marketData.currentClubOffer.wage)}/mês)
        </button>
        <button id="btn-stay-current" class="btn btn-secondary btn-block btn-sm">
          Recusar e cumprir contrato atual
        </button>
      </div>
    </div>
  `;

  // Oculta o botão padrão do modal para usar os botões específicos
  if (modalBtn) modalBtn.style.display = 'none';

  // Listeners das ofertas
  document.querySelectorAll('.btn-accept-transfer').forEach(btn => {
    btn.onclick = () => {
      const idx = parseInt(btn.getAttribute('data-offer-idx'), 10);
      const chosenOffer = marketData.offers[idx];
      modalContainer.classList.remove('active');
      if (modalBtn) modalBtn.style.display = 'inline-flex';
      if (onDecisionCallback) onDecisionCallback({ action: 'transfer', offer: chosenOffer });
    };
  });

  const btnRenew = document.getElementById('btn-renew-contract');
  if (btnRenew) {
    btnRenew.onclick = () => {
      modalContainer.classList.remove('active');
      if (modalBtn) modalBtn.style.display = 'inline-flex';
      if (onDecisionCallback) onDecisionCallback({ action: 'renew', offer: marketData.currentClubOffer });
    };
  }

  const btnStay = document.getElementById('btn-stay-current');
  if (btnStay) {
    btnStay.onclick = () => {
      modalContainer.classList.remove('active');
      if (modalBtn) modalBtn.style.display = 'inline-flex';
      if (onDecisionCallback) onDecisionCallback({ action: 'stay' });
    };
  }

  modalContainer.classList.add('active');
}


