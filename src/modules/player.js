/**
 * CARREIRA FC - MÓDULO: JOGADOR (PLAYER)
 * Entidade central orientada a objetos que gerencia os atributos, evolução etária,
 * estatísticas acumuladas, finanças e legado de carreira.
 */

import { ARCHETYPES, getArchetypeById } from '../data/archetypes.js';
import { getClubById } from '../data/clubs.js';

export class Player {
  /**
   * Construtor da entidade Player
   * @param {object} params 
   */
  constructor(params = {}) {
    this.id = params.id || `player_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    this.name = params.name || "Jogador Promissor";
    this.nickname = params.nickname || "";
    this.position = params.position || "ATA"; // 'GOL' | 'ZAG' | 'MEI' | 'ATA'
    this.archetype = params.archetype || "matador";
    this.nationality = params.nationality || "Brasil";
    
    // Idade e Biometria
    this.age = params.age || 17;
    this.isRetired = params.isRetired || false;
    this.retirementReason = params.retirementReason || null;

    // Atributos Nucleares
    this.potential = params.potential || this._generateInitialPotential();
    this.physical = params.physical || 85;
    this.reputation = params.reputation || 15; // 1 a 100
    this.morale = params.morale || 80; // 0 a 100
    
    // Atributos Específicos por Posição (0 a 99)
    this.attributes = params.attributes || this._generateInitialAttributes();

    // Overall calculado
    this.overall = params.overall || this.calculateOverall();
    this.peakOverall = params.peakOverall || this.overall;

    // Contrato e Clube
    this.currentClubId = params.currentClubId || "santos";
    this.wage = params.wage || 12000; // Salário mensal em R$
    this.marketValue = params.marketValue || this.calculateMarketValue();
    this.finances = params.finances || 35000; // Saldo bancário acumulado

    // Carreira e Estatísticas Acumuladas
    this.careerStats = params.careerStats || {
      totalGames: 0,
      totalGoals: 0,
      totalAssists: 0,
      cleanSheets: 0,
      averageRating: 0.0,
      trophies: [],
      individualAwards: []
    };

    // Histórico temporada a temporada
    this.history = params.history || [];
  }

  /**
   * Gera o potencial oculto inicial do atleta (entre 72 e 96)
   * @private
   */
  _generateInitialPotential() {
    // Curva ponderada para dar boas promessas com chance de supercraques
    const rand = Math.random();
    if (rand < 0.10) return 90 + Math.floor(Math.random() * 7); // 10% de ser um fenômeno (90-96)
    if (rand < 0.40) return 84 + Math.floor(Math.random() * 6); // 30% de craque de elite (84-89)
    if (rand < 0.80) return 78 + Math.floor(Math.random() * 6); // 40% de jogador titular sólido (78-83)
    return 72 + Math.floor(Math.random() * 6); // 20% de jogador regular (72-77)
  }

  /**
   * Gera os atributos iniciais compatíveis com a posição e arquétipo para 17 anos
   * @private
   */
  _generateInitialAttributes() {
    const baseVal = 62 + Math.floor(Math.random() * 6); // Base inicial de 62 a 67
    const arch = getArchetypeById(this.archetype);

    if (this.position === "ATA") {
      return {
        finishing: baseVal + (this.archetype === "matador" ? 7 : 2),
        pace: baseVal + (this.archetype === "ponta_veloz" ? 8 : 1),
        dribbling: baseVal + (this.archetype === "ponta_veloz" ? 6 : 0),
        passing: baseVal - 3,
        heading: baseVal + (this.archetype === "matador" ? 4 : -2)
      };
    } else if (this.position === "MEI") {
      return {
        passing: baseVal + (this.archetype === "camisa_10" ? 8 : 3),
        vision: baseVal + (this.archetype === "camisa_10" ? 7 : 2),
        dribbling: baseVal + 3,
        shooting: baseVal + (this.archetype === "box_to_box" ? 5 : 0),
        defense: baseVal + (this.archetype === "volante_racudo" ? 9 : -4)
      };
    } else if (this.position === "ZAG") {
      return {
        tackling: baseVal + (this.archetype === "xerife" ? 8 : 4),
        strength: baseVal + (this.archetype === "xerife" ? 7 : 2),
        positioning: baseVal + 4,
        heading: baseVal + (this.archetype === "zag_artilheiro" ? 8 : 3),
        pace: baseVal + (this.archetype === "libero_tecnico" ? 4 : -2)
      };
    } else { // GOL
      return {
        reflexes: baseVal + (this.archetype === "paredao" ? 9 : 4),
        diving: baseVal + 5,
        handling: baseVal + 3,
        positioning: baseVal + 4,
        kicking: baseVal + (this.archetype === "goleiro_artilheiro" ? 9 : -2)
      };
    }
  }

  /**
   * Calcula a média ponderada dos atributos da posição para definir o Overall (35 a 99)
   * @returns {number}
   */
  calculateOverall() {
    const attrs = this.attributes;
    let sum = 0;
    let count = 0;

    for (const key in attrs) {
      sum += attrs[key];
      count++;
    }

    let ovr = count > 0 ? Math.round(sum / count) : 65;
    
    // Bônus leve do arquétipo
    const arch = getArchetypeById(this.archetype);
    if (arch && arch.modifiers && arch.modifiers.ratingBaseBonus) {
      ovr += Math.round(arch.modifiers.ratingBaseBonus * 2);
    }

    return Math.min(99, Math.max(40, ovr));
  }

  /**
   * Calcula o valor de mercado estimado do jogador
   * @returns {number} Em Reais
   */
  calculateMarketValue() {
    // Fatores: Overall, Idade e Potencial
    const ovrFactor = Math.pow(Math.max(50, this.overall) / 50, 4.2);
    let ageMultiplier = 1.0;

    if (this.age <= 21) ageMultiplier = 1.6; // Valor inflacionado por juventude/promessa
    else if (this.age <= 25) ageMultiplier = 1.4;
    else if (this.age <= 29) ageMultiplier = 1.1;
    else if (this.age <= 32) ageMultiplier = 0.7;
    else ageMultiplier = 0.35; // Veterano

    const baseVal = 500000; // 500 mil R$
    return Math.round((baseVal * ovrFactor * ageMultiplier) / 10000) * 10000;
  }

  /**
   * Aplica a evolução ou declínio anual com base na curva etária
   * @param {'balanced' | 'physical' | 'technical' | 'marketing'} trainingFocus 
   * @returns {object} Resumo das mudanças ({ overallDelta, physicalDelta, text })
   */
  applyAgeProgression(trainingFocus = 'balanced') {
    this.age += 1;
    let overallDelta = 0;
    let physicalDelta = 0;

    // 17 a 21 anos: Explosão de juventude
    if (this.age <= 21) {
      const gapToPotential = Math.max(0, this.potential - this.overall);
      const growthRate = Math.max(2, Math.min(6, Math.floor(gapToPotential / 3) + Math.floor(Math.random() * 3)));
      overallDelta = growthRate;
      physicalDelta = Math.floor(Math.random() * 3); // +0 a +2
    }
    // 22 a 27 anos: Auge e consolidação
    else if (this.age <= 27) {
      if (this.overall < this.potential) {
        overallDelta = Math.floor(Math.random() * 3) + 1; // +1 a +3
      } else {
        overallDelta = Math.random() < 0.5 ? 1 : 0; // Pequeno pico ou estabilidade
      }
      physicalDelta = Math.random() < 0.3 ? 1 : 0;
    }
    // 28 a 31 anos: Maturidade e início sutil de perda física
    else if (this.age <= 31) {
      overallDelta = Math.random() < 0.4 ? 0 : -1;
      physicalDelta = -(Math.floor(Math.random() * 2) + 1); // -1 a -2
    }
    // 32 anos em diante: Declínio físico acentuado
    else {
      physicalDelta = -(Math.floor(Math.random() * 4) + 2); // -2 a -5
      overallDelta = -(Math.floor(Math.random() * 3) + 1); // -1 a -3
    }

    // Modificadores de Foco de Treino da Pré-Temporada
    if (trainingFocus === 'physical') {
      physicalDelta += 2;
    } else if (trainingFocus === 'technical') {
      overallDelta += 1;
    } else if (trainingFocus === 'marketing') {
      this.reputation = Math.min(100, this.reputation + 4);
    }

    // Aplicação aos atributos específicos
    for (const key in this.attributes) {
      this.attributes[key] = Math.max(35, Math.min(99, this.attributes[key] + overallDelta));
    }

    this.physical = Math.max(20, Math.min(99, this.physical + physicalDelta));
    this.overall = this.calculateOverall();
    this.marketValue = this.calculateMarketValue();

    if (this.overall > this.peakOverall) {
      this.peakOverall = this.overall;
    }

    // Checagem de aposentadoria forçada
    if (this.age >= 38 || this.physical <= 28 || this.overall <= 52) {
      this.retire("Fim de ciclo natural por idade e desgaste físico.");
    }

    return {
      age: this.age,
      overallDelta,
      physicalDelta,
      newOverall: this.overall,
      newPhysical: this.physical
    };
  }

  /**
   * Registra o resultado consolidado de uma temporada disputada
   * @param {object} seasonData 
   */
  addSeasonRecord(seasonData) {
    this.history.push({
      year: seasonData.year,
      age: this.age,
      clubId: this.currentClubId,
      clubName: seasonData.clubName,
      games: seasonData.games,
      goals: seasonData.goals,
      assists: seasonData.assists,
      rating: seasonData.avgRating,
      trophiesWon: seasonData.trophiesWon || [],
      awardsWon: seasonData.awardsWon || []
    });

    // Atualiza acumuladores de carreira
    this.careerStats.totalGames += seasonData.games;
    this.careerStats.totalGoals += seasonData.goals;
    this.careerStats.totalAssists += seasonData.assists;

    if (seasonData.trophiesWon && seasonData.trophiesWon.length > 0) {
      seasonData.trophiesWon.forEach(t => this.addTrophy(t));
    }

    if (seasonData.awardsWon && seasonData.awardsWon.length > 0) {
      seasonData.awardsWon.forEach(a => this.addAward(a));
    }

    // Recalcula a nota média global da carreira
    const totalRatedGames = this.history.reduce((acc, h) => acc + h.games, 0);
    const weightedRatingSum = this.history.reduce((acc, h) => acc + (h.rating * h.games), 0);
    this.careerStats.averageRating = totalRatedGames > 0 ? +(weightedRatingSum / totalRatedGames).toFixed(2) : 0;

    // Salário anual adicionado às finanças
    this.finances += Math.round(this.wage * 13); // 13 salários
  }

  /**
   * Adiciona um troféu à sala de taças
   * @param {object} trophy 
   */
  addTrophy(trophy) {
    this.careerStats.trophies.push({
      id: trophy.id,
      name: trophy.name,
      year: trophy.year || 2026,
      clubId: this.currentClubId
    });
    this.reputation = Math.min(100, this.reputation + (trophy.reputationBonus || 5));
  }

  /**
   * Adiciona um prêmio individual conquistado
   * @param {object} award 
   */
  addAward(award) {
    this.careerStats.individualAwards.push(award);
    this.reputation = Math.min(100, this.reputation + 10);
  }

  /**
   * Declara a aposentadoria do jogador
   * @param {string} reason 
   */
  retire(reason = "Decisão voluntária de pendurar as chuteiras.") {
    this.isRetired = true;
    this.retirementReason = reason;
  }

  /**
   * Calcula a pontuação de legado e o título de lenda para o pôster final
   * @returns {object} { score, tier, legacyTitle, summary }
   */
  calculateLegacy() {
    const goalsScore = this.careerStats.totalGoals * 2.5;
    const assistsScore = this.careerStats.totalAssists * 1.5;
    const gamesScore = this.careerStats.totalGames * 0.8;
    const trophiesScore = this.careerStats.trophies.length * 45;
    const awardsScore = this.careerStats.individualAwards.length * 60;
    const peakBonus = Math.max(0, this.peakOverall - 70) * 20;

    const totalScore = Math.round(goalsScore + assistsScore + gamesScore + trophiesScore + awardsScore + peakBonus);

    let tier = "Promessa Inacabada";
    let legacyTitle = "Cigano da Bola";

    if (totalScore >= 1800) {
      tier = "LENDA HISTÓRICA DO FUTEBOL MUNDIAL";
      legacyTitle = "O Deus da Bola";
    } else if (totalScore >= 1200) {
      tier = "ÍDOLO CONSAGRADO NACIONAL";
      legacyTitle = "Rei dos Clássicos";
    } else if (totalScore >= 750) {
      tier = "CRAQUE DE ALTO NÍVEL";
      legacyTitle = "Gênio Indiscutível";
    } else if (totalScore >= 400) {
      tier = "JOGADOR RESPEITADO";
      legacyTitle = "Guerreiro dos Gramados";
    }

    return {
      score: totalScore,
      tier,
      legacyTitle,
      totalGames: this.careerStats.totalGames,
      totalGoals: this.careerStats.totalGoals,
      totalAssists: this.careerStats.totalAssists,
      totalTrophies: this.careerStats.trophies.length,
      peakOverall: this.peakOverall,
      averageRating: this.careerStats.averageRating
    };
  }

  /**
   * Serialização para JSON
   */
  toJSON() {
    return { ...this };
  }

  /**
   * Desserialização a partir de objeto JSON
   * @param {object} json 
   * @returns {Player}
   */
  static fromJSON(json) {
    return new Player(json);
  }
}
