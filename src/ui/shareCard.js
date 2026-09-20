/**
 * CARREIRA FC - MÓDULO: SHARE CARD & APOSENTADORIA (SHARE CARD)
 * Renderiza o infográfico de despedida dos gramados, calcula o legado histórico,
 * copia o resumo em texto e gera o Card de Lenda em Canvas 2D de alta definição.
 */

import { formatMoney } from './renderer.js';
import { getLifestyleItemById } from '../data/lifestyle.js';
import { AssetManager } from '../modules/assetManager.js';

export class ShareCardRenderer {
  /**
   * Renderiza a tela completa de Aposentadoria na view #view-retirement
   * @param {Player} player 
   */
  static renderRetirementView(player) {
    if (!player) return;

    const legacy = player.calculateLegacy();

    // 1. Preenchimento de textos do pôster
    const tierEl = document.getElementById('legacy-tier');
    const nameEl = document.getElementById('retire-name');
    const nickEl = document.getElementById('retire-nickname');
    const gamesEl = document.getElementById('retire-games');
    const goalsEl = document.getElementById('retire-goals');
    const assistsEl = document.getElementById('retire-assists');
    const trophiesEl = document.getElementById('retire-trophies');
    const peakOvrEl = document.getElementById('retire-peak-overall');
    const ratingEl = document.getElementById('retire-rating');

    if (tierEl) tierEl.textContent = legacy.tier;
    if (nameEl) nameEl.textContent = player.name;
    if (nickEl) nickEl.textContent = player.nickname ? `"${player.nickname}"` : `"${legacy.legacyTitle}"`;
    if (gamesEl) gamesEl.textContent = player.careerStats.totalGames;
    if (goalsEl) goalsEl.textContent = player.careerStats.totalGoals;
    if (assistsEl) assistsEl.textContent = player.careerStats.totalAssists;
    if (trophiesEl) trophiesEl.textContent = player.careerStats.trophies.length;
    if (peakOvrEl) peakOvrEl.textContent = player.peakOverall;
    if (ratingEl) ratingEl.textContent = player.careerStats.averageRating || "7.2";

    // 2. Monta vitrine de prêmios individuais e lista de clubes no pôster
    const posterNode = document.getElementById('legacy-poster-node');
    if (posterNode) {
      // Remove elementos extras anteriores se houver
      const existingExtras = posterNode.querySelector('.legacy-extras-container');
      if (existingExtras) existingExtras.remove();

      const extrasContainer = document.createElement('div');
      extrasContainer.className = 'legacy-extras-container';
      extrasContainer.style.marginTop = '1rem';
      extrasContainer.style.borderTop = '1px solid var(--border-subtle)';
      extrasContainer.style.paddingTop = '1rem';

      // Prêmios individuais
      if (player.careerStats.individualAwards.length > 0) {
        const awardsHtml = player.careerStats.individualAwards.map(a => `
          <span class="trophy-item" style="background: rgba(255, 193, 7, 0.2); border-color: var(--accent-gold); display: inline-flex; align-items: center; gap: 0.35rem;">
            <img src="${AssetManager.getAwardImage(a.id)}" style="width: 20px; height: 20px; object-fit: contain;" alt="" />
            <span>${a.name} (${a.year})</span>
          </span>
        `).join('');

        extrasContainer.innerHTML += `
          <div style="margin-bottom: 0.85rem;">
            <div style="font-size: 0.75rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; margin-bottom: 0.4rem;">
              Prêmios Individuais de Glória
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem; justify-content: center;">
              ${awardsHtml}
            </div>
          </div>
        `;
      }

      // Conquistas de Vida & Fortuna
      let lifestyleItemsHtml = '';
      if (player.lifestyle && player.lifestyle.items && player.lifestyle.items.length > 0) {
        const uniqueItemIds = [...new Set(player.lifestyle.items)];
        const itemsData = uniqueItemIds.map(id => getLifestyleItemById(id)).filter(Boolean);
        const itemsBadges = itemsData.map(it => `
          <span class="trophy-item" style="background: rgba(255, 193, 7, 0.15); border-color: rgba(255, 193, 7, 0.35); font-size: 0.75rem;">
            ${it.icon} ${it.name}
          </span>
        `).join('');

        lifestyleItemsHtml = `
          <div style="margin-bottom: 0.75rem;">
            <div style="font-size: 0.75rem; color: var(--accent-gold); font-weight: 700; text-transform: uppercase; margin-bottom: 0.35rem;">
              💎 Vida & Fortuna: ${legacy.lifestyleStatus}
            </div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; justify-content: center;">
              ${itemsBadges}
            </div>
          </div>
        `;
      }

      // Clubes defendidos
      const clubsMap = {};
      player.history.forEach(h => {
        clubsMap[h.clubName] = (clubsMap[h.clubName] || 0) + 1;
      });
      const clubsText = Object.entries(clubsMap).map(([c, yrs]) => `${c} (${yrs} ${yrs === 1 ? 'ano' : 'anos'})`).join(' • ');

      extrasContainer.innerHTML += `
        ${lifestyleItemsHtml}
        <div style="font-size: 0.78rem; color: var(--text-secondary); margin-bottom: 0.45rem;">
          <b>Clubes Defendidos:</b> ${clubsText || player.currentClubId}
        </div>
        <div style="font-size: 0.82rem; color: var(--accent-green); font-weight: 700;">
          Patrimônio Acumulado na Carreira: ${formatMoney(player.finances)}
        </div>
      `;

      posterNode.appendChild(extrasContainer);
    }

    // 3. Botão de Copiar Resumo
    const btnCopy = document.getElementById('btn-share-copy');
    if (btnCopy) {
      btnCopy.onclick = () => {
        this.copyCareerSummaryToClipboard(player, legacy);
      };
    }
  }

  /**
   * Copia um resumo textual formatado para redes sociais / WhatsApp
   * @param {Player} player 
   * @param {object} legacy 
   */
  static copyCareerSummaryToClipboard(player, legacy) {
    const nick = player.nickname ? ` "${player.nickname}"` : "";
    const text = `⚽ CARREIRA FC • MINHA TRAJETÓRIA
Nome: ${player.name}${nick}
Posição: ${player.position}
Status Final: ${legacy.tier} ("${legacy.legacyTitle}")
💎 Estilo de Vida: ${legacy.lifestyleStatus}
💰 Fortuna Construída: ${formatMoney(player.finances)}

📊 Estatísticas de Carreira:
- ${player.careerStats.totalGames} Partidas
- ${player.careerStats.totalGoals} Gols Marcados
- ${player.careerStats.totalAssists} Assistências
- 🏆 ${player.careerStats.trophies.length} Títulos Conquistados
- ⭐ Pico de Overall: ${player.peakOverall}
- Nota Média de Carreira: ${player.careerStats.averageRating}
- Prêmios Individuais: ${player.careerStats.individualAwards.length}

Simule sua carreira grátis em: https://github.com/SaulloGabriel2008/CarreiraFC`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        alert("📋 Resumo de carreira copiado para a área de transferência! Cole no WhatsApp ou Twitter!");
      }).catch(() => {
        prompt("Copie seu resumo de carreira:", text);
      });
    } else {
      prompt("Copie seu resumo de carreira:", text);
    }
  }
}
