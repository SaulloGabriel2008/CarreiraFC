/**
 * CARREIRA FC - MÓDULO: PERSISTÊNCIA (STORAGE SERVICE)
 * Gerencia o salvamento automático e carregamento no LocalStorage do navegador.
 */

import { Player } from './player.js';

const STORAGE_KEY = 'carreira_fc_save_v1';

export class StorageService {
  /**
   * Salva o estado atual da carreira
   * @param {object} gameState 
   * @returns {boolean}
   */
  static saveGame(gameState) {
    if (!gameState || !gameState.player) return false;

    try {
      const saveData = {
        version: 1,
        savedAt: new Date().toISOString(),
        currentYear: gameState.currentYear,
        recentEventIds: gameState.recentEventIds || [],
        player: gameState.player.toJSON()
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(saveData));
      return true;
    } catch (e) {
      console.warn("Falha ao salvar carreira no LocalStorage:", e);
      return false;
    }
  }

  /**
   * Verifica se há um savegame válido disponível
   * @returns {boolean}
   */
  static hasActiveSave() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return !!data;
    } catch (e) {
      return false;
    }
  }

  /**
   * Carrega os dados salvos da carreira
   * @returns {object|null} { player: Player, currentYear, recentEventIds }
   */
  static loadGame() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return null;

      const parsed = JSON.parse(data);
      if (!parsed || !parsed.player) return null;

      const player = Player.fromJSON(parsed.player);
      return {
        player,
        currentYear: parsed.currentYear || 2026,
        recentEventIds: parsed.recentEventIds || []
      };
    } catch (e) {
      console.warn("Falha ao carregar save:", e);
      return null;
    }
  }

  /**
   * Limpa o save do LocalStorage
   */
  static clearSave() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Falha ao limpar save:", e);
    }
  }
}
