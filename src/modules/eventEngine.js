/**
 * CARREIRA FC - MÓDULO: MOTOR DE EVENTOS (EVENT ENGINE)
 * Processa a resolução de dilemas com suporte à mecânica:
 * - 'guaranteed' (Ir no Garantido: aplica ganhos e perdas base 100% certos)
 * - 'gamble' (Arriscar no Sorteio: chance de dobrar/turbinar ganhos ou piorar perdas)
 */

import { getRandomEligibleEvent } from '../data/events.js';

export class EventEngine {
  /**
   * Obtém um evento relevante para o momento do jogador
   * @param {Player} player 
   * @param {Array<string>} recentEventIds 
   * @returns {object|null}
   */
  static getEvent(player, recentEventIds = []) {
    return getRandomEligibleEvent(player, recentEventIds);
  }

  /**
   * Aplica a escolha feita pelo jogador, resolvendo se foi 'guaranteed' ou 'gamble'
   * @param {Player} player Instância do jogador
   * @param {object} event Objeto do evento
   * @param {string} choiceId ID da escolha feita
   * @param {'guaranteed' | 'gamble'} mode Modo de resolução escolhido
   * @returns {object} { isSuccess, isGamble, title, text, changes: { morale, reputation, physical, overall, money } }
   */
  static processChoice(player, event, choiceId, mode = 'guaranteed') {
    const choice = event.choices.find(c => c.id === choiceId);
    if (!choice) {
      return {
        isSuccess: true,
        isGamble: false,
        title: "Tudo Normal",
        text: "Nada de anormal aconteceu.",
        changes: {}
      };
    }

    let changes = { morale: 0, reputation: 0, physical: 0, overall: 0, money: 0 };
    let isSuccess = true;
    let isGamble = false;
    let title = "Decisão Tomada";
    let text = "";

    // 1. MODO ARRISCAR / ROLETAR (GAMBLE)
    if (mode === 'gamble' && choice.hasGamble && choice.gamble) {
      isGamble = true;
      const g = choice.gamble;
      isSuccess = Math.random() < g.winChance;

      if (isSuccess) {
        title = g.winTitle || "DEU BOM DEMAIS! 🔥";
        text = g.winText;
        // Aplica ganhos turbinados do sorteio
        const gains = g.jackpotGain || choice.baseGain || {};
        for (const k in gains) changes[k] = (changes[k] || 0) + gains[k];
      } else {
        title = g.lossTitle || "DEU RUIM! 💥";
        text = g.lossText;
        // Aplica perdas agravadas do sorteio
        const losses = g.disasterLoss || choice.baseLoss || {};
        for (const k in losses) changes[k] = (changes[k] || 0) + losses[k];
      }
    } 
    // 2. MODO GARANTIDO OU ESCOLHA PADRÃO
    else {
      isGamble = false;
      isSuccess = true;
      title = "Caminho Garantido 🛡️";
      text = choice.guaranteedText || `Você optou pelo caminho seguro: "${choice.text}". Consequências aplicadas sem surpresas.`;

      // Aplica ganhos base certos
      const baseGain = choice.baseGain || {};
      for (const k in baseGain) changes[k] = (changes[k] || 0) + baseGain[k];

      // Aplica perdas base certas
      const baseLoss = choice.baseLoss || {};
      for (const k in baseLoss) changes[k] = (changes[k] || 0) + baseLoss[k];
    }

    // Aplicação das alterações ao jogador
    if (changes.morale !== 0) {
      player.morale = Math.min(100, Math.max(0, player.morale + changes.morale));
    }
    if (changes.reputation !== 0) {
      player.reputation = Math.min(100, Math.max(1, player.reputation + changes.reputation));
    }
    if (changes.physical !== 0) {
      player.physical = Math.min(99, Math.max(20, player.physical + changes.physical));
    }
    if (changes.money !== 0) {
      player.finances = Math.max(0, player.finances + changes.money);
    }
    if (changes.overall !== 0) {
      for (const attrKey in player.attributes) {
        player.attributes[attrKey] = Math.min(99, Math.max(30, player.attributes[attrKey] + changes.overall));
      }
      player.overall = player.calculateOverall();
      if (player.overall > player.peakOverall) {
        player.peakOverall = player.overall;
      }
      player.marketValue = player.calculateMarketValue();
    }

    return {
      isSuccess,
      isGamble,
      title,
      text,
      changes
    };
  }
}
