/**
 * CARREIRA FC - MÓDULO: PRÊMIOS & SELEÇÃO NACIONAL (AWARDS)
 * Gerencia convocações internacionais, simulação de Copa do Mundo da FIFA,
 * copas continentais (Eurocopa, Copa América, etc.) e premiações mundiais.
 */

import { getNationalTeamById } from '../data/nationalTeams.js';

export class AwardsManager {
  /**
   * Avalia convocações para a Seleção Nacional e simula torneio internacional se for ano de Copa
   * @param {Player} player 
   * @param {number} year 
   * @returns {object|null} Relatório da Seleção ({ tournamentName, games, goals, assists, wonTrophy })
   */
  static processNationalTeam(player, year) {
    const team = getNationalTeamById(player.nationality);

    // Requisitos de convocação dinâmicos conforme o prestígio da seleção
    const isEligible = player.overall >= team.minOverallForCallUp && player.reputation >= 38 && player.physical >= 55;
    if (!isEligible) return null;

    const isWorldCup = [2026, 2030, 2034, 2038, 2042].includes(year);
    
    // Ciclos continentais
    let isContinental = false;
    let continentalName = "Torneio Continental";
    let continentalTrophyId = team.continentalCupId || "copa_america";

    if (team.confederation === "UEFA") {
      isContinental = [2028, 2032, 2036, 2040].includes(year);
      continentalName = "UEFA Eurocopa";
      continentalTrophyId = "eurocopa";
    } else if (team.confederation === "CONMEBOL") {
      isContinental = [2028, 2032, 2036, 2040].includes(year);
      continentalName = "Conmebol Copa América";
      continentalTrophyId = "copa_america";
    } else if (team.confederation === "CONCACAF") {
      isContinental = [2027, 2031, 2035, 2039].includes(year);
      continentalName = "Concacaf Copa Ouro";
      continentalTrophyId = "copa_ouro";
    } else if (team.confederation === "AFC") {
      isContinental = [2027, 2031, 2035, 2039].includes(year);
      continentalName = "AFC Copa da Ásia";
      continentalTrophyId = "copa_asia";
    }

    // 1. Amistosos / Eliminatórias em anos sem torneio maior
    if (!isWorldCup && !isContinental) {
      const games = 2 + Math.floor(Math.random() * 3);
      const goals = ["ATA", "CA", "PE", "PD"].includes(player.position) ? Math.floor(Math.random() * 3) : (["MEI", "MC"].includes(player.position) ? Math.floor(Math.random() * 2) : 0);
      const assists = ["ATA", "CA", "PE", "PD", "MEI", "MC"].includes(player.position) ? Math.floor(Math.random() * 2) : 0;

      player.careerStats.totalGames += games;
      player.careerStats.totalGoals += goals;
      player.careerStats.totalAssists += assists;
      player.careerStats.nationalCaps = (player.careerStats.nationalCaps || 0) + games;
      player.careerStats.nationalGoals = (player.careerStats.nationalGoals || 0) + goals;
      player.careerStats.nationalAssists = (player.careerStats.nationalAssists || 0) + assists;
      player.reputation = Math.min(100, player.reputation + 4);

      return {
        tournamentName: `Eliminatórias & Amistosos (${team.flagEmoji} ${team.name})`,
        games,
        goals,
        assists,
        wonTrophy: null
      };
    }

    // 2. Disputa de Copa do Mundo ou Copa Continental
    const tournamentName = isWorldCup ? "Copa do Mundo da FIFA" : continentalName;
    const matchesCount = isWorldCup ? 7 : 6;

    // Cálculo de probabilidade de título baseado na força da seleção e do jogador
    const baseWinChance = isWorldCup ? (team.overall >= 86 ? 0.35 : (team.overall >= 82 ? 0.20 : 0.08)) : (team.overall >= 85 ? 0.50 : 0.25);
    const playerStarBonus = player.overall >= 85 ? 0.08 : (player.overall >= 80 ? 0.04 : 0);
    const wonTitle = Math.random() < (baseWinChance + playerStarBonus);

    const goals = ["ATA", "CA", "PE", "PD"].includes(player.position) ? Math.floor(Math.random() * 5) + 2 : (["MEI", "MC"].includes(player.position) ? Math.floor(Math.random() * 3) + 1 : 0);
    const assists = ["ATA", "CA", "PE", "PD", "MEI", "MC"].includes(player.position) ? Math.floor(Math.random() * 4) + 1 : 0;

    player.careerStats.totalGames += matchesCount;
    player.careerStats.totalGoals += goals;
    player.careerStats.totalAssists += assists;
    player.careerStats.nationalCaps = (player.careerStats.nationalCaps || 0) + matchesCount;
    player.careerStats.nationalGoals = (player.careerStats.nationalGoals || 0) + goals;
    player.careerStats.nationalAssists = (player.careerStats.nationalAssists || 0) + assists;
    player.reputation = Math.min(100, player.reputation + (isWorldCup ? 20 : 12));

    let trophy = null;
    if (wonTitle) {
      trophy = {
        id: isWorldCup ? "copa_do_mundo" : continentalTrophyId,
        name: `${tournamentName} (${team.flagEmoji} ${team.name})`,
        year: year,
        prestige: isWorldCup ? 100 : 92,
        reputationBonus: isWorldCup ? 35 : 18
      };
      player.addTrophy(trophy);
      if (!player.careerStats.nationalTrophies) player.careerStats.nationalTrophies = [];
      player.careerStats.nationalTrophies.push(trophy);
    }

    return {
      tournamentName: `${tournamentName} (${team.flagEmoji} ${team.name})`,
      games: matchesCount,
      goals,
      assists,
      wonTrophy: trophy
    };
  }

  /**
   * Avalia e concede prêmios individuais ao final do ano
   * @param {Player} player 
   * @param {object} seasonReport 
   * @param {number} year 
   * @returns {Array<object>} Lista de prêmios conquistados
   */
  static evaluateIndividualAwards(player, seasonReport, year) {
    const awards = [];

    // 1. Chuteira de Ouro (Artilheiro Máximo do Ano)
    if (seasonReport.goals >= 32) {
      awards.push({
        id: "golden_boot",
        name: "Chuteira de Ouro",
        year,
        emoji: "👟",
        description: `Artilheiro máximo da temporada com ${seasonReport.goals} gols anotados.`
      });
    }

    // 2. Craque do Campeonato (Melhor Nota Média)
    if (seasonReport.avgRating >= 7.65 && seasonReport.games >= 25) {
      awards.push({
        id: "best_player_league",
        name: "Craque do Campeonato",
        year,
        emoji: "⭐",
        description: `Eleito o melhor jogador da competição com nota média de ${seasonReport.avgRating}.`
      });
    }

    // 3. Luva de Ouro (Melhor Goleiro do Ano)
    if (player.position === "GOL" && seasonReport.avgRating >= 7.45 && seasonReport.games >= 20) {
      awards.push({
        id: "golden_glove",
        name: "Luva de Ouro",
        year,
        emoji: "🧤",
        description: `Eleito o goleiro mais seguro e decisivo da temporada (Nota ${seasonReport.avgRating}).`
      });
    }

    // 4. Rei da América (Craque da Libertadores)
    const wonLibertadores = seasonReport.trophiesWon.some(t => t.id === 'libertadores');
    if (wonLibertadores && seasonReport.avgRating >= 7.60) {
      awards.push({
        id: "rei_da_america",
        name: "Rei da América",
        year,
        emoji: "👑",
        description: `Coroado o melhor jogador do continente sul-americano após o título da Libertadores!`
      });
    }

    // 5. Bola de Ouro (Melhor do Mundo - Ballon d'Or)
    // Exige Overall de elite (85+), grande produção e títulos
    const hadEliteSeason = (seasonReport.goals + seasonReport.assists) >= 34 || seasonReport.avgRating >= 7.80;
    const isGlobalElite = player.overall >= 85 && player.reputation >= 70;

    if (isGlobalElite && hadEliteSeason) {
      const ballonDorChance = Math.min(0.85, 0.40 + (seasonReport.trophiesWon.length * 0.20));
      if (Math.random() < ballonDorChance) {
        awards.push({
          id: "ballon_dor",
          name: "Bola de Ouro (Melhor do Mundo)",
          year,
          emoji: "🏆⚽",
          description: "Coroado o melhor jogador de futebol do planeta pela FIFA e France Football!"
        });
      }
    }

    // Adiciona ao registro do jogador
    awards.forEach(a => player.addAward(a));

    return awards;
  }
}
