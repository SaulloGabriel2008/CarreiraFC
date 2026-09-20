/**
 * CARREIRA FC - MÓDULO: RENDERER (UI)
 * Gerencia a manipulação reativa do DOM, sincronização de estado com as views e
 * renderização dos painéis de criação e dashboard.
 */

import { POSITIONS, getArchetypesByPosition, getArchetypeById } from '../data/archetypes.js';
import { getRandomStartingClubs, getClubById } from '../data/clubs.js';
import { LIFESTYLE_CATEGORIES, LIFESTYLE_ITEMS, getItemsByCategory, getLifestyleItemById } from '../data/lifestyle.js';
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
  const btnRerollClubs = document.getElementById('btn-reroll-clubs');

  if (!form) return;

  // 1. Função para sortear e renderizar os 3 clubes formadores aleatórios
  const renderClubsSelection = () => {
    if (!clubsGrid || !clubHiddenInput) return;
    clubsGrid.innerHTML = '';

    const randomClubs = getRandomStartingClubs(3);
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
        <span class="starting-club-sub">Tier ${club.tier} &bull; Base 65 OVR</span>
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
      const posInfo = POSITIONS[posCode] || { name: posCode, icon: "⚽" };
      selectedPosDisplay.innerHTML = `${posInfo.icon} ${posCode} - ${posInfo.name}`;
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
    const position = currentPosition || "CA";
    const archetype = archetypeSelect ? archetypeSelect.value : "matador_ca";
    const currentClubId = clubHiddenInput ? clubHiddenInput.value : "santos";

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

  // Renderiza o Card Colecionável FUT (Ultimate Team Style)
  if (futCardContainer) {
    const cardFrame = AssetManager.getCardFrame(player.overall);
    const tierClass = AssetManager.getCardTierClass(player.overall);
    const archBadge = AssetManager.getArchetypeBadge(player.archetype);
    const archBadgeHtml = archBadge ? `<div class="fut-card-archetype-badge" title="Arquétipo: ${player.archetype}"><img src="${archBadge}" alt="Arquétipo" /></div>` : '';
    const clubCrestHtml = AssetManager.renderClubBadgeHtml(club, 24);

    futCardContainer.innerHTML = `
      <div class="fut-player-card ${tierClass}">
        <img src="${cardFrame}" alt="Moldura do Card" class="fut-card-frame-bg" />
        <div class="fut-card-inner">
          <div class="fut-card-top">
            <div class="fut-card-rating-block">
              <span class="fut-card-ovr">${player.overall}</span>
              <span class="fut-card-pos">${player.position}</span>
            </div>
            ${archBadgeHtml}
          </div>

          <div class="fut-card-avatar-area">
            <div class="fut-card-avatar-circle">
              ${positionInfo.icon}
            </div>
          </div>

          <div class="fut-card-name">${player.name}</div>
          ${player.nickname ? `<div class="fut-card-nickname">"${player.nickname}"</div>` : ''}

          <div class="fut-card-club-row">
            ${clubCrestHtml}
            <span style="font-size: 0.8rem; font-weight: 800; color: var(--text-main);">${club.shortName || club.name}</span>
          </div>

          <div class="fut-card-stats-row">
            <div class="fut-mini-stat">
              <span class="fut-mini-stat-val" style="color: var(--accent-green);">${player.physical}</span>
              <span class="fut-mini-stat-lbl">FÍSICO</span>
            </div>
            <div class="fut-mini-stat">
              <span class="fut-mini-stat-val" style="color: var(--accent-blue);">${player.careerStats.totalGoals}</span>
              <span class="fut-mini-stat-lbl">GOLS</span>
            </div>
            <div class="fut-mini-stat">
              <span class="fut-mini-stat-val" style="color: var(--accent-gold);">${player.careerStats.trophies.length}</span>
              <span class="fut-mini-stat-lbl">TÍTULOS</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Renderiza Grid de Chips de Estatísticas com Sprites 3D
  if (statChipsGrid) {
    const moraleColor = player.morale >= 70 ? 'var(--accent-green)' : player.morale <= 35 ? 'var(--accent-red)' : 'var(--accent-gold)';
    statChipsGrid.innerHTML = `
      <div class="stat-chip-3d" title="Condição Física Atual">
        <img src="${AssetManager.getUiIcon('physical')}" alt="Físico" class="stat-chip-icon-img" />
        <div class="stat-chip-info">
          <span class="stat-chip-value" style="color: var(--accent-green);">${player.physical}</span>
          <span class="stat-chip-label">Condição Física</span>
        </div>
      </div>

      <div class="stat-chip-3d" title="Nível de Moral e Motivação">
        <img src="${AssetManager.getUiIcon('morale')}" alt="Moral" class="stat-chip-icon-img" />
        <div class="stat-chip-info">
          <span class="stat-chip-value" style="color: ${moraleColor};">${player.morale}%</span>
          <span class="stat-chip-label">Moral / Foco</span>
        </div>
      </div>

      <div class="stat-chip-3d" title="Reputação e Prestígio Nacional">
        <img src="${AssetManager.getUiIcon('reputation')}" alt="Reputação" class="stat-chip-icon-img" />
        <div class="stat-chip-info">
          <span class="stat-chip-value" style="color: var(--accent-gold);">${player.reputation}</span>
          <span class="stat-chip-label">Reputação / Fama</span>
        </div>
      </div>

      <div class="stat-chip-3d" title="Saldo Financeiro em Conta">
        <img src="${AssetManager.getUiIcon('money')}" alt="Carteira" class="stat-chip-icon-img" />
        <div class="stat-chip-info">
          <span class="stat-chip-value" style="color: var(--accent-gold);">${formatMoney(player.finances)}</span>
          <span class="stat-chip-label">Saldo Bancário</span>
        </div>
      </div>
    `;
  }

  if (tournamentBadge) {
    tournamentBadge.textContent = `🏆 Temporada ${currentYear}`;
  }
  if (btnSimulate) {
    btnSimulate.innerHTML = `⚽ Simular Temporada ${currentYear}`;
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
        <div class="event-hero-banner">
          <img src="${bannerUrl}" alt="" class="event-hero-img" />
          <div class="event-hero-overlay"></div>
        </div>
      `;
    } else {
      bannerContainer.innerHTML = '';
    }
  }

  if (catEl) catEl.textContent = event.categoryName || "🎭 Dilema Futebolístico";
  if (titleEl) titleEl.textContent = event.title;
  if (descEl) descEl.textContent = event.description;

  if (choicesContainer) {
    choicesContainer.innerHTML = '';
    event.choices.forEach(choice => {
      const choiceCard = document.createElement('div');
      choiceCard.className = 'card-panel';
      choiceCard.style.cssText = 'background: var(--bg-surface); border: 1px solid var(--border-medium); margin-bottom: 0.85rem; padding: 1.15rem; border-radius: var(--radius-sm);';

      // Monta badges de Ganhos Base
      const gainBadges = [];
      const baseGain = choice.baseGain || {};
      if (baseGain.morale) gainBadges.push(`<span class="badge badge-green">+${baseGain.morale} Moral</span>`);
      if (baseGain.reputation) gainBadges.push(`<span class="badge badge-gold">+${baseGain.reputation} Reputação</span>`);
      if (baseGain.physical) gainBadges.push(`<span class="badge badge-green">+${baseGain.physical} Físico</span>`);
      if (baseGain.overall) gainBadges.push(`<span class="badge badge-gold">+${baseGain.overall} Overall</span>`);
      if (baseGain.money) gainBadges.push(`<span class="badge badge-gold">+${formatMoney(baseGain.money)}</span>`);

      // Monta badges de Perdas Base
      const lossBadges = [];
      const baseLoss = choice.baseLoss || {};
      if (baseLoss.morale) lossBadges.push(`<span class="badge badge-red">${baseLoss.morale} Moral</span>`);
      if (baseLoss.reputation) lossBadges.push(`<span class="badge badge-red">${baseLoss.reputation} Reputação</span>`);
      if (baseLoss.physical) lossBadges.push(`<span class="badge badge-red">${baseLoss.physical} Físico</span>`);
      if (baseLoss.overall) lossBadges.push(`<span class="badge badge-red">${baseLoss.overall} Overall</span>`);
      if (baseLoss.money) lossBadges.push(`<span class="badge badge-red">-${formatMoney(Math.abs(baseLoss.money))}</span>`);

      const gainsHtml = gainBadges.length > 0 ? `<div><small style="color: var(--accent-green); font-weight: 700;">Ganhos Base:</small> ${gainBadges.join(' ')}</div>` : '';
      const lossesHtml = lossBadges.length > 0 ? `<div><small style="color: var(--accent-red); font-weight: 700;">Perdas Base:</small> ${lossBadges.join(' ')}</div>` : '';

      // Se possui a mecânica de Sorteio (Gamble)
      if (choice.hasGamble && choice.gamble) {
        choiceCard.innerHTML = `
          <div style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.3rem;">
            ${choice.text}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem; line-height: 1.5;">
            ${choice.desc}
          </div>
          
          <div style="display: flex; flex-direction: column; gap: 0.35rem; background: rgba(0,0,0,0.3); padding: 0.75rem; border-radius: var(--radius-xs); margin-bottom: 0.85rem; border: 1px dashed var(--border-subtle);">
            ${gainsHtml}
            ${lossesHtml}
            <div style="font-size: 0.8rem; color: var(--accent-gold); margin-top: 0.25rem;">
              🎲 <b>Sorteio Opcional:</b> ${choice.gamble.gambleLabel}
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.65rem;">
            <button class="btn btn-guaranteed-styled btn-sm btn-choice-guaranteed" aria-label="Ir no garantido com certeza de resultado">
              <img src="${AssetManager.getUiIcon('guaranteed')}" class="btn-action-icon" alt="" />
              <span>Ir no Garantido</span>
            </button>
            <button class="btn btn-gamble-styled btn-sm btn-choice-gamble" aria-label="Arriscar no sorteio por ganhos maiores">
              <img src="${AssetManager.getUiIcon('gamble')}" class="btn-action-icon" alt="" />
              <span>Arriscar no Sorteio!</span>
            </button>
          </div>
        `;

        choiceCard.querySelector('.btn-choice-guaranteed').onclick = () => {
          if (onChoiceCallback) onChoiceCallback(choice.id, 'guaranteed');
        };
        choiceCard.querySelector('.btn-choice-gamble').onclick = () => {
          if (onChoiceCallback) onChoiceCallback(choice.id, 'gamble');
        };
      } 
      // Escolha Padrão (Sem Sorteio)
      else {
        choiceCard.innerHTML = `
          <div style="font-size: 1.05rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.3rem;">
            ${choice.text}
          </div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem; line-height: 1.5;">
            ${choice.desc}
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.35rem; background: rgba(0,0,0,0.3); padding: 0.75rem; border-radius: var(--radius-xs); margin-bottom: 0.85rem; border: 1px dashed var(--border-subtle);">
            ${gainsHtml}
            ${lossesHtml}
          </div>

          <button class="btn btn-primary btn-block btn-sm btn-choice-standard" aria-label="Confirmar esta escolha">
            ✔️ Escolher Esta Opção
          </button>
        `;

        choiceCard.querySelector('.btn-choice-standard').onclick = () => {
          if (onChoiceCallback) onChoiceCallback(choice.id, 'guaranteed');
        };
      }

      choicesContainer.appendChild(choiceCard);
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
    ? `<span class="badge badge-gold" style="margin-bottom: 0.5rem;">🎲 Resolução por Sorteio</span>`
    : `<span class="badge badge-green" style="margin-bottom: 0.5rem;">🛡️ Resolução Garantida</span>`;

  descEl.innerHTML = `
    ${modeBadge}
    <div style="font-size: 1.25rem; font-weight: 900; color: ${isSuccess ? 'var(--accent-green)' : 'var(--accent-red)'}; margin-bottom: 0.65rem;">
      ${outcomeResult.title || (isSuccess ? '✅ SUCESSO ESPORTIVO!' : '⚠️ COMPLICAÇÕES GRAVES!')}
    </div>
    <p style="margin-bottom: 1rem; color: var(--text-main); font-size: 0.95rem; line-height: 1.6;">${outcomeResult.text}</p>
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
      ${badges.length > 0 ? badges.join(' ') : '<span class="badge">Nenhuma alteração nos atributos</span>'}
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

  const offersHtml = marketData.offers.map((offer, idx) => `
    <div class="card-panel" style="background: var(--bg-card); border-color: var(--border-medium); margin-bottom: 0.75rem; padding: 0.85rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <span style="font-size: 1.05rem; font-weight: 800;">${offer.emoji} ${offer.clubName} <small style="color: var(--text-muted); font-size: 0.75rem;">(${offer.country})</small></span>
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
  `).join('');

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


