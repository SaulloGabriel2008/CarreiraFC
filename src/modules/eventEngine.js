/**
 * CARREIRA FC - MÓDULO: MOTOR DE EVENTOS (EVENT ENGINE)
 * Processa o sorteio de eventos, cálculo de probabilidades de escolhas e
 * aplicação imediata de consequências nos atributos do atleta.
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
   * Aplica a escolha feita pelo jogador e resolve as consequências estocásticas
   * @param {Player} player Instância do jogador
   * @param {object} event Objeto do evento
   * @param {string} choiceId ID da escolha feita
   * @returns {object} { isSuccess, text, changes: { morale, reputation, physical, overall, money } }
   */
  static processChoice(player, event, choiceId) {
    const choice = event.choices.find(c => c.id === choiceId);
    if (!choice) {
      return {
        isSuccess: true,
        text: "Nada aconteceu.",
        changes: {}
      };
    }

    const outcome = choice.outcome;
    const isSuccess = Math.random() < (outcome.successProb ?? 1.0);
    const consequences = isSuccess ? outcome.success : (outcome.failure || outcome.success);

    const changes = {
      morale: consequences.morale || 0,
      reputation: consequences.reputation || 0,
      physical: consequences.physical || 0,
      overall: consequences.overall || 0,
      money: consequences.money || 0
    };

    // Aplica alterações diretas ao jogador
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
        player.attributes[attrKey] = Math.min(99, Math.max(35, player.attributes[attrKey] + changes.overall));
      }
      player.overall = player.calculateOverall();
      if (player.overall > player.peakOverall) {
        player.peakOverall = player.overall;
      }
      player.marketValue = player.calculateMarketValue();
    }

    return {
      isSuccess,
      text: consequences.text,
      changes
    };
  }
}
