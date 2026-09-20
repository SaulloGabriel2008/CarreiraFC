/**
 * CARREIRA FC - MÓDULO: JOGADOR (PLAYER)
 * Entidade central com suporte a 10 posições táticas, Overall inicial uniforme,
 * Potencial Dinâmico Oculto (Fog of War) e Perfis Etários Não-Lineares (Late Bloomers, Prodígios e Flops).
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
    this.position = params.position || "CA"; // GOL, ZAG, LD, LE, VOL, MC, MEI, PE, PD, CA
    this.archetype = params.archetype || "matador_ca";
    this.nationality = params.nationality || "Brasil";
    
    // Idade e Biometria
    this.age = params.age || 17;
    this.isRetired = params.isRetired || false;
    this.retirementReason = params.retirementReason || null;

    // Perfil Oculto de Desenvolvimento Etário
    // 'early_bloomer' (18-21) | 'late_bloomer' (25-28) | 'steady' (regular) | 'underachiever' (flop)
    this.growthProfile = params.growthProfile || this._generateGrowthProfile();

    // Potencial Dinâmico Oculto (o jogador NÃO vê este número)
    this.potential = params.potential || this._generateInitialPotential();

    // Físico, Reputação e Moral
    this.physical = params.physical || 85;
    this.reputation = params.reputation || 15; // 1 a 100
    this.morale = params.morale || 80; // 0 a 100
    
    // Atributos Específicos por Posição (Nivelados para manter Overall base 64-66 uniforme)
    this.attributes = params.attributes || this._generateInitialAttributes();

    // Overall calculado
    this.overall = params.overall || this.calculateOverall();
    this.peakOverall = params.peakOverall || this.overall;

    // Contrato e Clube
    this.currentClubId = params.currentClubId || "santos";
    this.wage = params.wage || 12000;
    this.marketValue = params.marketValue || this.calculateMarketValue();
    this.finances = params.finances || 35000;

    // Estilo de Vida, Staff e Investimentos (Vida & Fortuna)
    this.lifestyle = params.lifestyle || {
      items: [],
      totalPassiveIncome: 0,
      perks: []
    };

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
   * Sorteia o perfil oculto de trajetória da carreira
   * @private
   */
  _generateGrowthProfile() {
    const r = Math.random();
    if (r < 0.25) return 'early_bloomer'; // 25% Prodígio (Neymar, Mbappé)
    if (r < 0.55) return 'late_bloomer';  // 30% Maturação Tardia (Vardy, Hulk, Cano, Grafite)
    if (r < 0.85) return 'steady';        // 30% Constante e regular
    return 'underachiever';               // 15% Eterna Promessa que não vinga
  }

  /**
   * Gera o teto de potencial inicial oculto
   * @private
   */
  _generateInitialPotential() {
    if (this.growthProfile === 'underachiever') {
      return 68 + Math.floor(Math.random() * 7); // 68 a 74
    }
    if (this.growthProfile === 'late_bloomer') {
      return 82 + Math.floor(Math.random() * 12); // 82 a 93 (pode virar monstro mais velho)
    }
    if (this.growthProfile === 'early_bloomer') {
      return 84 + Math.floor(Math.random() * 11); // 84 a 94
    }
    return 77 + Math.floor(Math.random() * 11); // 77 a 87
  }

  /**
   * Gera os atributos iniciais rigorosamente nivelados para base uniforme (64-66)
   * @private
   */
  _generateInitialAttributes() {
    // Base uniforme aos 17 anos para qualquer clube formador
    const base = 65;
    const pos = this.position;

    if (pos === "GOL") {
      return { reflexes: base + 2, diving: base + 1, handling: base - 1, positioning: base, kicking: base - 2 };
    }
    if (pos === "ZAG") {
      return { tackling: base + 2, strength: base + 2, positioning: base, heading: base + 1, pace: base - 3 };
    }
    if (pos === "LD" || pos === "LE") {
      return { pace: base + 3, crossing: base + 1, tackling: base, passing: base, stamina: base + 2 };
    }
    if (pos === "VOL") {
      return { tackling: base + 3, passing: base, strength: base + 2, vision: base - 1, stamina: base + 2 };
    }
    if (pos === "MC") {
      return { passing: base + 2, vision: base + 1, dribbling: base, tackling: base - 1, stamina: base + 1 };
    }
    if (pos === "MEI") {
      return { vision: base + 3, passing: base + 2, dribbling: base + 1, shooting: base, pace: base - 1 };
    }
    if (pos === "PE" || pos === "PD") {
      return { pace: base + 3, dribbling: base + 2, crossing: base, finishing: base - 1, passing: base - 1 };
    }
    // CA
    return { finishing: base + 3, positioning: base + 2, heading: base + 1, shooting: base + 1, pace: base - 1 };
  }

  /**
   * Calcula a média dos atributos para definir o Overall (35 a 99)
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

    const baseOvr = count > 0 ? Math.round(sum / count) : 65;
    return Math.min(99, Math.max(35, baseOvr));
  }

  /**
   * Atualiza o Potencial Dinâmico Oculto com base no desempenho e escolhas
   * (O jogador não vê o número, mas sente os efeitos no longo prazo)
   * @param {number} delta Variação (+ ou -)
   */
  updateDynamicPotential(delta) {
    this.potential = Math.min(96, Math.max(62, this.potential + delta));
  }

  /**
   * Calcula o valor de mercado estimado do jogador
   * @returns {number} Em Reais
   */
  calculateMarketValue() {
    const ovrFactor = Math.pow(Math.max(50, this.overall) / 50, 4.2);
    let ageMultiplier = 1.0;

    if (this.age <= 21) ageMultiplier = 1.6;
    else if (this.age <= 25) ageMultiplier = 1.4;
    else if (this.age <= 29) ageMultiplier = 1.1;
    else if (this.age <= 32) ageMultiplier = 0.7;
    else ageMultiplier = 0.35;

    const baseVal = 500000;
    return Math.round((baseVal * ovrFactor * ageMultiplier) / 10000) * 10000;
  }

  /**
   * Aplica a evolução ou declínio anual respeitando as Curvas Não-Lineares (Late Bloomers / Prodígios / Flops)
   * @param {'balanced' | 'physical' | 'technical' | 'marketing'} trainingFocus 
   * @returns {object} Resumo das mudanças ({ overallDelta, physicalDelta, newOverall, newPhysical })
   */
  applyAgeProgression(trainingFocus = 'balanced') {
    this.age += 1;
    let overallDelta = 0;
    let physicalDelta = 0;
    const profile = this.growthProfile;

    // =========================================================================
    // FASE 1: 18 A 21 ANOS (Juventude)
    // =========================================================================
    if (this.age <= 21) {
      if (profile === 'early_bloomer') {
        // Prodígio: explosão juvenil agressiva
        overallDelta = Math.floor(Math.random() * 3) + 3; // +3 a +5
        physicalDelta = Math.floor(Math.random() * 2) + 1;
      } else if (profile === 'late_bloomer') {
        // Late Bloomer: crescimento bem tímido aos 18-21, parece um jogador comum
        overallDelta = Math.random() < 0.6 ? 1 : 0; // +0 a +1
        physicalDelta = Math.random() < 0.5 ? 1 : 0;
      } else if (profile === 'steady') {
        // Constante: crescimento regular
        overallDelta = Math.floor(Math.random() * 2) + 2; // +2 a +3
        physicalDelta = 1;
      } else {
        // Underachiever (Flop): começa devagar e perde fôlego
        overallDelta = Math.random() < 0.5 ? 1 : 0;
        physicalDelta = 0;
        this.updateDynamicPotential(-1);
      }
    }

    // =========================================================================
    // FASE 2: 22 A 24 ANOS (Transição)
    // =========================================================================
    else if (this.age <= 24) {
      if (profile === 'early_bloomer') {
        overallDelta = Math.min(this.potential - this.overall, Math.floor(Math.random() * 2) + 1); // +1 a +2
        physicalDelta = 0;
      } else if (profile === 'late_bloomer') {
        // Ainda sem estourar, maturação lenta
        overallDelta = Math.floor(Math.random() * 2) + 1; // +1 a +2
        physicalDelta = 1;
      } else if (profile === 'steady') {
        overallDelta = Math.floor(Math.random() * 2) + 1; // +1 a +2
        physicalDelta = 0;
      } else {
        // Underachiever estagna completamente
        overallDelta = Math.random() < 0.3 ? 1 : 0;
        this.updateDynamicPotential(-2);
      }
    }

    // =========================================================================
    // FASE 3: 25 A 28 ANOS (O Momento da Explosão do LATE BLOOMER!)
    // =========================================================================
    else if (this.age <= 28) {
      if (profile === 'late_bloomer') {
        // AQUI O LATE BLOOMER EXPLODE! (Estilo Vardy, Hulk, Cano, Grafite)
        const gap = Math.max(2, this.potential - this.overall);
        overallDelta = Math.max(2, Math.min(5, Math.floor(gap / 2) + Math.floor(Math.random() * 2))); // +3 a +5 ao ano!
        physicalDelta = Math.random() < 0.5 ? 1 : 0;
      } else if (profile === 'early_bloomer' || profile === 'steady') {
        // Auge / Manutenção de alto nível
        overallDelta = (this.overall < this.potential && Math.random() < 0.4) ? 1 : 0;
        physicalDelta = Math.random() < 0.3 ? 0 : -1;
      } else {
        // Underachiever começa a declinar precocemente
        overallDelta = Math.random() < 0.4 ? 0 : -1;
        physicalDelta = -1;
      }
    }

    // =========================================================================
    // FASE 4: 29 A 32 ANOS (Maturidade e Início de Queda Física)
    // =========================================================================
    else if (this.age <= 32) {
      if (profile === 'late_bloomer') {
        // Late bloomer dura bem no auge
        overallDelta = Math.random() < 0.5 ? 0 : -1;
        physicalDelta = -(Math.floor(Math.random() * 2) + 1);
      } else {
        overallDelta = Math.random() < 0.4 ? 0 : -1;
        physicalDelta = -(Math.floor(Math.random() * 3) + 1);
      }
    }

    // =========================================================================
    // FASE 5: 33 ANOS EM DIANTE (Declínio Acentuado)
    // =========================================================================
    else {
      overallDelta = -(Math.floor(Math.random() * 3) + 1); // -1 a -3
      physicalDelta = -(Math.floor(Math.random() * 4) + 2); // -2 a -5
    }

    // Bônus de Perks de Vida & Fortuna (Personal Trainer / Fisioterapeuta / Jatinho)
    if (this.hasPerk('personal_trainer') && this.age <= 24) {
      overallDelta = Math.max(1, overallDelta + 1);
    }
    if (this.hasPerk('fisio_elite') && physicalDelta < 0) {
      // Amortece 60% da perda física da velhice
      physicalDelta = Math.min(-1, Math.round(physicalDelta * 0.4));
    }
    if (this.hasPerk('jatinho_descanso') && physicalDelta < 0) {
      physicalDelta = Math.min(0, physicalDelta + 1);
    }

    // Bônus de Treino
    if (trainingFocus === 'physical') {
      physicalDelta += 2;
    } else if (trainingFocus === 'technical') {
      overallDelta += 1;
    } else if (trainingFocus === 'marketing') {
      this.reputation = Math.min(100, this.reputation + 4);
    }

    // Aplicação aos atributos específicos
    for (const key in this.attributes) {
      this.attributes[key] = Math.max(30, Math.min(99, this.attributes[key] + overallDelta));
    }

    this.physical = Math.max(20, Math.min(99, this.physical + physicalDelta));
    this.overall = this.calculateOverall();
    this.marketValue = this.calculateMarketValue();

    // Blindagem de Coach Mental
    if (this.hasPerk('coach_mental')) {
      this.morale = Math.max(65, this.morale);
    }

    if (this.overall > this.peakOverall) {
      this.peakOverall = this.overall;
    }

    // Checagem de aposentadoria forçada
    if (this.age >= 39 || this.physical <= 25 || this.overall <= 48) {
      this.retire("Fim de carreira natural por desgaste físico e idade avançada.");
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
   * Checa se o jogador adquiriu um item específico de estilo de vida
   * @param {string} itemId 
   * @returns {boolean}
   */
  hasLifestyleItem(itemId) {
    return !!(this.lifestyle && this.lifestyle.items && this.lifestyle.items.includes(itemId));
  }

  /**
   * Checa se o jogador possui um benefício passivo (perk)
   * @param {string} perkId 
   * @returns {boolean}
   */
  hasPerk(perkId) {
    return !!(this.lifestyle && this.lifestyle.perks && this.lifestyle.perks.includes(perkId));
  }

  /**
   * Realiza a compra instantânea de um item de Vida & Fortuna
   * @param {object} item Objeto do catálogo LIFESTYLE_ITEMS
   * @returns {object} { success: boolean, reason?: string, item?: object, gambleWon?: boolean }
   */
  buyLifestyleItem(item) {
    if (this.finances < item.price) {
      return { success: false, reason: "Saldo insuficiente na carteira!" };
    }

    // Inicializa estrutura caso não exista
    if (!this.lifestyle) {
      this.lifestyle = { items: [], totalPassiveIncome: 0, perks: [] };
    }

    // Deduz o custo
    this.finances -= item.price;

    // Tratamento especial para negócios de alto risco (Gamble)
    if (item.isGamble) {
      const gambleWon = Math.random() < 0.50; // 50% de chance
      if (gambleWon) {
        const payout = 450000;
        this.finances += payout;
        this.morale = Math.min(100, this.morale + 20);
        this.reputation = Math.min(100, this.reputation + 10);
        this.lifestyle.items.push(item.id);
        return { success: true, gambleWon: true, payout, item };
      } else {
        this.morale = Math.max(10, this.morale - 15);
        if (this.hasPerk('coach_mental')) this.morale = Math.max(65, this.morale);
        return { success: true, gambleWon: false, payout: 0, item };
      }
    }

    // Registro do item
    this.lifestyle.items.push(item.id);

    // Registro do Perk
    if (item.perkId && !this.lifestyle.perks.includes(item.perkId)) {
      this.lifestyle.perks.push(item.perkId);
    }

    // Incremento de Renda Passiva anual
    if (item.passiveIncome) {
      this.lifestyle.totalPassiveIncome = (this.lifestyle.totalPassiveIncome || 0) + item.passiveIncome;
    }

    // Bônus Imediatos
    if (item.moraleBonus) {
      this.morale = Math.min(100, this.morale + item.moraleBonus);
    }
    if (item.reputationBonus) {
      this.reputation = Math.min(100, this.reputation + item.reputationBonus);
    }
    if (item.physicalBonus) {
      this.physical = Math.min(99, this.physical + item.physicalBonus);
    }

    if (this.hasPerk('coach_mental')) {
      this.morale = Math.max(65, this.morale);
    }

    return { success: true, item };
  }

  /**
   * Registra a temporada disputada e ajusta o potencial dinâmico oculto
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

    this.careerStats.totalGames += seasonData.games;
    this.careerStats.totalGoals += seasonData.goals;
    this.careerStats.totalAssists += seasonData.assists;

    if (seasonData.trophiesWon && seasonData.trophiesWon.length > 0) {
      seasonData.trophiesWon.forEach(t => this.addTrophy(t));
    }

    if (seasonData.awardsWon && seasonData.awardsWon.length > 0) {
      seasonData.awardsWon.forEach(a => this.addAward(a));
    }

    const totalRatedGames = this.history.reduce((acc, h) => acc + h.games, 0);
    const weightedRatingSum = this.history.reduce((acc, h) => acc + (h.rating * h.games), 0);
    this.careerStats.averageRating = totalRatedGames > 0 ? +(weightedRatingSum / totalRatedGames).toFixed(2) : 0;

    // Salário Anual + Rendimentos de Investimentos
    const passiveEarnings = this.lifestyle ? (this.lifestyle.totalPassiveIncome || 0) : 0;
    this.finances += Math.round(this.wage * 13) + passiveEarnings;
    seasonData.passiveEarnings = passiveEarnings;

    // =========================================================================
    // AJUSTE DO POTENCIAL DINÂMICO OCULTO POR DESEMPENHO (Fog of War)
    // =========================================================================
    if (seasonData.avgRating >= 7.60 && seasonData.games >= 25) {
      // Temporada excelente aumenta o teto de crescimento futuro
      this.updateDynamicPotential(+2);
    } else if (seasonData.avgRating <= 6.50 || seasonData.games <= 10) {
      // Pouco tempo de jogo ou notas ruins deterioram o teto do jogador
      this.updateDynamicPotential(-2);
    }
  }

  addTrophy(trophy) {
    this.careerStats.trophies.push({
      id: trophy.id,
      name: trophy.name,
      year: trophy.year || 2026,
      clubId: this.currentClubId
    });
    this.reputation = Math.min(100, this.reputation + (trophy.reputationBonus || 5));
    // Títulos conquistados aumentam a ambição e o potencial dinâmico
    this.updateDynamicPotential(+1);
  }

  addAward(award) {
    this.careerStats.individualAwards.push(award);
    this.reputation = Math.min(100, this.reputation + 10);
    this.updateDynamicPotential(+2);
  }

  retire(reason = "Decisão voluntária de pendurar as chuteiras.") {
    this.isRetired = true;
    this.retirementReason = reason;
  }

  calculateLegacy() {
    const goalsScore = this.careerStats.totalGoals * 2.5;
    const assistsScore = this.careerStats.totalAssists * 1.8;
    const gamesScore = this.careerStats.totalGames * 0.8;
    const trophiesScore = this.careerStats.trophies.length * 45;
    const awardsScore = this.careerStats.individualAwards.length * 60;
    const peakBonus = Math.max(0, this.peakOverall - 70) * 22;

    // Pontuação de Estilo de Vida e Fortuna
    let lifestyleScore = 0;
    if (this.lifestyle && this.lifestyle.items) {
      lifestyleScore = this.lifestyle.items.length * 20;
      if (this.hasPerk('dono_de_clube')) lifestyleScore += 350;
      if (this.hasPerk('instituto_social')) lifestyleScore += 250;
      if (this.hasLifestyleItem('jatinho_particular')) lifestyleScore += 180;
      if (this.hasPerk('casa_mae')) lifestyleScore += 80;
    }

    const totalScore = Math.round(goalsScore + assistsScore + gamesScore + trophiesScore + awardsScore + peakBonus + lifestyleScore);

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

    // Título Social & Estilo de Vida
    let lifestyleStatus = "Vida Modesta";
    if (this.hasPerk('dono_de_clube')) {
      lifestyleStatus = "👑 Dono de Clube & Magnata";
    } else if (this.hasPerk('instituto_social')) {
      lifestyleStatus = "🤝 Ídolo do Povo & Benfeitor";
    } else if (this.hasLifestyleItem('jatinho_particular')) {
      lifestyleStatus = "✈️ Superstar dos Gramados";
    } else if (this.hasLifestyleItem('mansao_alphaville') || this.hasLifestyleItem('superesportivo')) {
      lifestyleStatus = "💎 Rei da Noite & Ostentação";
    } else if (this.hasPerk('casa_mae')) {
      lifestyleStatus = "❤️ Filho de Ouro";
    } else if (this.lifestyle && this.lifestyle.items && this.lifestyle.items.length >= 3) {
      lifestyleStatus = "💼 Boleiro Bem de Vida";
    }

    return {
      score: totalScore,
      tier,
      legacyTitle,
      lifestyleStatus,
      lifestyleItemsCount: this.lifestyle?.items?.length || 0,
      totalGames: this.careerStats.totalGames,
      totalGoals: this.careerStats.totalGoals,
      totalAssists: this.careerStats.totalAssists,
      totalTrophies: this.careerStats.trophies.length,
      peakOverall: this.peakOverall,
      averageRating: this.careerStats.averageRating
    };
  }

  toJSON() {
    return { ...this };
  }

  static fromJSON(json) {
    return new Player(json);
  }
}
