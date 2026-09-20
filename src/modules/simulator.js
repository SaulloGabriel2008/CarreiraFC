/**
 * CARREIRA FC - MÓDULO: MOTOR DE SIMULAÇÃO (SIMULATOR)
 * Motor estocástico e determinístico que calcula partidas disputadas, gols,
 * assistências, notas médias e desfecho de competições em uma temporada inteira.
 */

import { getArchetypeById } from '../data/archetypes.js';
import { getTournamentsForClub } from '../data/tournaments.js';
import { getClubById, CLUBS } from '../data/clubs.js';

export class SeasonSimulator {
  /**
   * Simula uma temporada anual completa para o atleta e seu clube
   * @param {Player} player Instância do jogador
   * @param {number} year Ano da temporada (ex: 2026)
   * @returns {object} Relatório consolidado da temporada
   */
  static simulateSeason(player, year = 2026) {
    const club = getClubById(player.currentClubId) || {
      id: "sem_clube",
      name: "Sem Clube",
      shortName: "Sem Clube",
      overall: 65,
      tier: 3,
      region: "brazil"
    };

    const tournaments = getTournamentsForClub(club, year);
    const archetype = getArchetypeById(player.archetype) || { modifiers: { goalMult: 1, assistMult: 1, ratingBaseBonus: 0 } };

    let totalGames = 0;
    let totalGoals = 0;
    let totalAssists = 0;
    let ratingSum = 0;
    const trophiesWon = [];
    const competitionsSummary = [];

    // Fator de lesão aleatória na temporada (influenciado pelo atributo físico do atleta)
    const injuryOccurred = this._checkSeasonInjury(player, archetype);
    const injuryFactor = injuryOccurred ? (0.75 - Math.random() * 0.15) : 1.0; // Perde de 25% a 40% dos jogos se machucou

    tournaments.forEach(tournament => {
      // 1. Simula o desempenho do clube no torneio
      const tournamentResult = this.simulateTournamentOutcome(player, club, tournament);

      if (tournamentResult.isChampion) {
        trophiesWon.push({
          id: tournament.id,
          name: tournament.name,
          year: year,
          prestige: tournament.prestige,
          reputationBonus: tournament.reputationBonus || 10
        });
      }

      // 2. Calcula quantas partidas o jogador disputou nesta competição
      const matchesPlayed = this.calculatePlayerMatches(
        player,
        club,
        tournamentResult.matchesClubPlayed,
        injuryFactor
      );

      // 3. Calcula gols, assistências e nota média na competição
      const stats = this.calculatePlayerStats(
        player,
        club,
        matchesPlayed,
        tournament,
        archetype
      );

      totalGames += matchesPlayed;
      totalGoals += stats.goals;
      totalAssists += stats.assists;
      ratingSum += (stats.rating * matchesPlayed);

      competitionsSummary.push({
        tournamentId: tournament.id,
        name: tournament.shortName || tournament.name,
        type: tournament.type,
        stageReached: tournamentResult.stageReached,
        won: tournamentResult.isChampion,
        playerGames: matchesPlayed,
        playerGoals: stats.goals,
        playerAssists: stats.assists,
        rating: stats.rating
      });
    });

    // Média ponderada da nota do ano
    const avgRating = totalGames > 0 ? +(ratingSum / totalGames).toFixed(2) : 6.00;

    // Se houve lesão, reduz temporariamente um pouco do físico
    if (injuryOccurred) {
      player.physical = Math.max(30, player.physical - 3);
    }

    return {
      year,
      clubId: club.id,
      clubName: club.shortName || club.name,
      games: totalGames,
      goals: totalGoals,
      assists: totalAssists,
      avgRating,
      trophiesWon,
      competitionsSummary,
      injuryOccurred
    };
  }

  /**
   * Checa se o jogador sofreu lesão durante o ano
   * @private
   */
  static _checkSeasonInjury(player, archetype) {
    const injuryRiskMult = archetype.modifiers.injuryRisk || 1.0;
    // Físico alto (85+) -> 8% chance base. Físico baixo (55-) -> 30% chance base.
    const baseRisk = Math.max(0.06, (100 - player.physical) / 100 * 0.35);
    return Math.random() < (baseRisk * injuryRiskMult);
  }

  /**
   * Calcula partidas disputadas pelo atleta com base em titularidade e físico
   * @param {Player} player 
   * @param {object} club 
   * @param {number} totalClubMatches 
   * @param {number} injuryFactor 
   * @returns {number}
   */
  static calculatePlayerMatches(player, club, totalClubMatches, injuryFactor = 1.0) {
    if (totalClubMatches <= 0) return 0;

    // Relação de força do atleta vs média do clube
    const overallDiff = player.overall - club.overall;
    let starterRate = 0.70;

    if (overallDiff >= 4) starterRate = 0.95; // Titular incontestável
    else if (overallDiff >= 1) starterRate = 0.86; // Titular consolidado
    else if (overallDiff >= -2) starterRate = 0.72; // Rotação frequente
    else if (overallDiff >= -5) starterRate = 0.45; // Reserva entrando com frequência
    else starterRate = 0.22; // Jovem na base / poucas chances

    // Disponibilidade física
    const physicalRate = Math.min(1.0, Math.max(0.60, player.physical / 90));
    
    // Jogos finais clampados
    const calculatedMatches = Math.round(totalClubMatches * starterRate * physicalRate * injuryFactor);
    return Math.min(totalClubMatches, Math.max(0, calculatedMatches));
  }

  /**
   * Gera gols, assistências e nota média para a quantidade de partidas disputadas
   * @param {Player} player 
   * @param {object} club 
   * @param {number} matches 
   * @param {object} tournament 
   * @param {object} archetype 
   * @returns {object} { goals, assists, rating }
   */
  static calculatePlayerStats(player, club, matches, tournament, archetype) {
    if (matches <= 0) {
      return { goals: 0, assists: 0, rating: 6.0 };
    }

    const archMods = archetype.modifiers || {};
    const pos = player.position;

    // 1. Taxas base por posição
    let baseGoalRate = 0.48; // ATA
    let baseAssistRate = 0.18;

    if (pos === "MEI") {
      baseGoalRate = 0.16;
      baseAssistRate = 0.32;
    } else if (pos === "ZAG") {
      baseGoalRate = 0.04; // Bolas paradas / escanteios
      baseAssistRate = 0.03;
    } else if (pos === "GOL") {
      baseGoalRate = archetype.id === "goleiro_artilheiro" ? 0.03 : 0.00;
      baseAssistRate = 0.005;
    }

    // 2. Multiplicadores de Força e Qualidade
    // Overall do atleta (ex: OVR 85 gera ~1.38x mais gols que OVR 70)
    const playerOvrFactor = Math.pow(Math.max(45, player.overall) / 70, 1.85);

    // Força da equipe gerando jogadas ofensivas
    const teamOvrFactor = Math.pow(club.overall / 74, 0.55);

    // Moral do atleta
    const moraleFactor = 0.85 + (player.morale / 100) * 0.25;

    // Modificador do arquétipo tático
    const goalArchMod = archMods.goalMult || 1.0;
    const assistArchMod = archMods.assistMult || 1.0;

    // Variância estocástica aleatória (futebol é imprevisível)
    const variance = 0.82 + Math.random() * 0.36;

    // 3. Cálculo de Gols e Assistências
    const expectedGoals = matches * baseGoalRate * playerOvrFactor * teamOvrFactor * moraleFactor * goalArchMod * variance;
    const goals = Math.max(0, Math.round(expectedGoals));

    const expectedAssists = matches * baseAssistRate * playerOvrFactor * teamOvrFactor * moraleFactor * assistArchMod * variance;
    const assists = Math.max(0, Math.round(expectedAssists));

    // 4. Cálculo da Nota Média (Rating 5.5 a 9.0)
    // Base técnica pelo overall
    let baseRating = 6.35 + ((player.overall - 55) / 45) * 1.15;
    
    // Bônus pelo arquétipo (ex: volantes e zagueiros têm bônus de nota de segurança)
    if (archMods.ratingBaseBonus) {
      baseRating += archMods.ratingBaseBonus;
    }

    // Bônus de produção ofensiva
    const performanceBonus = Math.min(0.70, ((goals * 2.0 + assists * 1.2) / matches) * 0.5);
    
    // Ruído gaussiano leve
    const randomRatingNoise = (Math.random() * 0.36) - 0.18;

    let finalRating = baseRating + performanceBonus + randomRatingNoise;
    finalRating = Math.min(8.95, Math.max(5.70, finalRating));

    return {
      goals,
      assists,
      rating: +finalRating.toFixed(2)
    };
  }

  /**
   * Simula o desfecho do clube no torneio (colocação ou fases de mata-mata)
   * @param {Player} player 
   * @param {object} club 
   * @param {object} tournament 
   * @returns {object} { isChampion, stageReached, matchesClubPlayed }
   */
  static simulateTournamentOutcome(player, club, tournament) {
    // Força combinada do time com impacto do atleta
    const effectiveTeamPower = (club.overall * 0.85) + (player.overall * 0.15);

    // -------------------------------------------------------------
    // A. TORNEIOS DE PONTOS CORRIDOS (LIGAS)
    // -------------------------------------------------------------
    if (tournament.type === "league") {
      const totalMatches = tournament.matchCount || 38;

      if (tournament.id === "brasileirao_serie_b") {
        // Se a força for 72+, chance altíssima de título e acesso
        const champProb = Math.min(0.85, Math.max(0.10, (effectiveTeamPower - 66) * 0.12));
        const isChamp = Math.random() < champProb;
        return {
          isChampion: isChamp,
          stageReached: isChamp ? "Campeão" : "G4 (Acesso)",
          matchesClubPlayed: totalMatches
        };
      }

      // Brasileirão Série A / Ligas Europeias
      // Referência dos maiores concorrentes do país
      const topLeagueThreshold = tournament.region === "europe" ? 85 : 79;
      const powerDiff = effectiveTeamPower - topLeagueThreshold;

      // Probabilidade sigmoide suave de título
      let champProb = 0.03; // Chance de zebra
      if (powerDiff >= 3) champProb = 0.48;
      else if (powerDiff >= 0) champProb = 0.28;
      else if (powerDiff >= -3) champProb = 0.12;
      else if (powerDiff >= -6) champProb = 0.04;

      const isChamp = Math.random() < champProb;
      let stage = "Meio de Tabela";

      if (isChamp) stage = "Campeão";
      else if (powerDiff >= 0) stage = "G4 (Vaga Continental)";
      else if (powerDiff >= -4) stage = "G6 (Classificado)";
      else if (powerDiff <= -9) stage = "Zona de Rebaixamento";

      return {
        isChampion: isChamp,
        stageReached: stage,
        matchesClubPlayed: totalMatches
      };
    }

    // -------------------------------------------------------------
    // B. TORNEIOS DE MATA-MATA (ESTADUAIS, COPAS E CONTINENTAIS)
    // -------------------------------------------------------------
    // Simulação progressiva de 4 fases eliminatórias: Oitavas -> Quartas -> Semis -> Final
    const phases = ["Oitavas de Final", "Quartas de Final", "Semifinal", "Final", "Campeão"];
    const totalPhases = 4;
    let currentPhaseIndex = 0;
    const matchesPerPhase = Math.max(2, Math.floor((tournament.matchCount || 10) / 4));
    let matchesAccumulated = matchesPerPhase;

    for (let phase = 0; phase < totalPhases; phase++) {
      // Força do rival aumenta conforme avança na copa
      const rivalPower = (club.overall - 4) + (phase * 2.8) + (Math.random() * 4 - 2);
      
      // Probabilidade de confronto direto
      const winProb = Math.pow(effectiveTeamPower, 2.5) / (Math.pow(effectiveTeamPower, 2.5) + Math.pow(rivalPower, 2.5));

      if (Math.random() < winProb) {
        currentPhaseIndex++;
        matchesAccumulated += matchesPerPhase;
      } else {
        break; // Eliminado nesta fase
      }
    }

    const isChamp = currentPhaseIndex === totalPhases;
    const stageReached = phases[currentPhaseIndex];
    const matchesClubPlayed = Math.min(tournament.matchCount || 12, matchesAccumulated);

    return {
      isChampion: isChamp,
      stageReached,
      matchesClubPlayed
    };
  }
}
