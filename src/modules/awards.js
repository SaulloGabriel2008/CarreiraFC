/**
 * CARREIRA FC - MÓDULO: PRÊMIOS & SELEÇÃO NACIONAL (AWARDS)
 * Gerencia convocações para a Seleção Brasileira, disputa de Copa do Mundo / Copa América
 * e eleição de prêmios individuais como Bola de Ouro e Chuteira de Ouro.
 */

export class AwardsManager {
  /**
   * Avalia convocações para a Seleção Nacional e simula torneio internacional se for ano de Copa
   * @param {Player} player 
   * @param {number} year 
   * @returns {object|null} Relatório da Seleção ({ tournamentName, games, goals, assists, wonTrophy })
   */
  static processNationalTeam(player, year) {
    // Requisitos mínimos de convocação para a Seleção Brasileira
    const isEligible = player.overall >= 78 && player.reputation >= 48 && player.physical >= 60;
    if (!isEligible) return null;

    const isWorldCup = [2026, 2030, 2034, 2038, 2042].includes(year);
    const isCopaAmerica = [2028, 2032, 2036, 2040].includes(year);

    if (!isWorldCup && !isCopaAmerica) {
      // Amistosos / Eliminatórias (2 a 4 jogos com bônus de reputação)
      const games = 2 + Math.floor(Math.random() * 3);
      const goals = player.position === "ATA" ? Math.floor(Math.random() * 3) : 0;
      const assists = ["ATA", "MEI"].includes(player.position) ? Math.floor(Math.random() * 2) : 0;
      
      player.careerStats.totalGames += games;
      player.careerStats.totalGoals += goals;
      player.careerStats.totalAssists += assists;
      player.reputation = Math.min(100, player.reputation + 4);

      return {
        tournamentName: "Eliminatórias & Amistosos da Seleção",
        games,
        goals,
        assists,
        wonTrophy: null
      };
    }

    // Disputa de Torneio Maior (Copa do Mundo ou Copa América)
    const tournamentName = isWorldCup ? "Copa do Mundo da FIFA" : "Conmebol Copa América";
    const matchesCount = isWorldCup ? 7 : 6;
    
    // Simulação do mata-mata da Seleção Brasileira (Força ~86)
    const teamPower = 86 + (player.overall > 85 ? 2 : 0);
    // Chance de título mundial do Brasil (~35-50% com elenco forte)
    const wonTitle = Math.random() < (isWorldCup ? 0.38 : 0.60);

    const goals = player.position === "ATA" ? Math.floor(Math.random() * 5) + 2 : (player.position === "MEI" ? Math.floor(Math.random() * 3) : 0);
    const assists = ["ATA", "MEI"].includes(player.position) ? Math.floor(Math.random() * 4) + 1 : 0;

    player.careerStats.totalGames += matchesCount;
    player.careerStats.totalGoals += goals;
    player.careerStats.totalAssists += assists;
    player.reputation = Math.min(100, player.reputation + (isWorldCup ? 18 : 10));

    let trophy = null;
    if (wonTitle) {
      trophy = {
        id: isWorldCup ? "copa_do_mundo" : "copa_america",
        name: tournamentName,
        year: year,
        prestige: 100,
        reputationBonus: isWorldCup ? 30 : 15
      };
      player.addTrophy(trophy);
    }

    return {
      tournamentName,
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

    // 3. Bola de Ouro (Melhor do Mundo - Ballon d'Or)
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
