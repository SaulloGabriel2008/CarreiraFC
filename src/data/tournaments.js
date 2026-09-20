/**
 * CARREIRA FC - BANCO DE DADOS: TORNEIOS
 * Competições nacionais, estaduais, copas mata-mata, continentais e internacionais.
 */

export const TOURNAMENTS = [
  // ==========================================
  // ESTADUAIS BRASILEIROS (1º SEMESTRE)
  // ==========================================
  {
    id: "paulistao",
    name: "Campeonato Paulista",
    shortName: "Paulistão",
    type: "state", // estadual
    region: "brazil",
    prestige: 60,
    matchCount: 16,
    reputationBonus: 8,
    emoji: "🏆"
  },
  {
    id: "carioca",
    name: "Campeonato Carioca",
    shortName: "Carioca",
    type: "state",
    region: "brazil",
    prestige: 55,
    matchCount: 15,
    reputationBonus: 7,
    emoji: "🏆"
  },
  {
    id: "estadual_geral",
    name: "Campeonato Estadual",
    shortName: "Estadual",
    type: "state",
    region: "brazil",
    prestige: 50,
    matchCount: 14,
    reputationBonus: 6,
    emoji: "🏆"
  },

  // ==========================================
  // LIGAS NACIONAIS (PONTOS CORRIDOS)
  // ==========================================
  {
    id: "brasileirao_serie_a",
    name: "Campeonato Brasileiro Série A",
    shortName: "Brasileirão A",
    type: "league",
    region: "brazil",
    prestige: 85,
    matchCount: 38,
    reputationBonus: 20,
    emoji: "🇧🇷"
  },
  {
    id: "brasileirao_serie_b",
    name: "Campeonato Brasileiro Série B",
    shortName: "Brasileirão B",
    type: "league",
    region: "brazil",
    prestige: 62,
    matchCount: 38,
    reputationBonus: 10,
    emoji: "🇧🇷"
  },
  {
    id: "premier_league",
    name: "Premier League Inglesa",
    shortName: "Premier League",
    type: "league",
    region: "europe",
    prestige: 98,
    matchCount: 38,
    reputationBonus: 30,
    emoji: "🦁"
  },
  {
    id: "la_liga",
    name: "La Liga Espanhola",
    shortName: "La Liga",
    type: "league",
    region: "europe",
    prestige: 94,
    matchCount: 38,
    reputationBonus: 26,
    emoji: "🇪🇸"
  },

  // ==========================================
  // COPAS NACIONAIS (MATA-MATA)
  // ==========================================
  {
    id: "copa_do_brasil",
    name: "Copa do Brasil",
    shortName: "Copa do Brasil",
    type: "cup",
    region: "brazil",
    prestige: 82,
    matchCount: 10, // fases eliminatórias ida e volta
    reputationBonus: 18,
    emoji: "🏆"
  },
  {
    id: "fa_cup",
    name: "FA Cup (Copa da Inglaterra)",
    shortName: "FA Cup",
    type: "cup",
    region: "europe",
    prestige: 86,
    matchCount: 6,
    reputationBonus: 16,
    emoji: "🏆"
  },

  // ==========================================
  // TORNEIOS CONTINENTAIS DE CLUBES
  // ==========================================
  {
    id: "libertadores",
    name: "Copa Conmebol Libertadores",
    shortName: "Libertadores",
    type: "continental",
    region: "brazil",
    prestige: 95,
    matchCount: 13,
    reputationBonus: 28,
    emoji: "⭐"
  },
  {
    id: "sul_americana",
    name: "Copa Conmebol Sul-Americana",
    shortName: "Sul-Americana",
    type: "continental",
    region: "brazil",
    prestige: 75,
    matchCount: 11,
    reputationBonus: 14,
    emoji: "🥈"
  },
  {
    id: "champions_league",
    name: "UEFA Champions League",
    shortName: "Champions League",
    type: "continental",
    region: "europe",
    prestige: 100,
    matchCount: 13,
    reputationBonus: 35,
    emoji: "⭐"
  },
  {
    id: "mundial_clubes",
    name: "Mundial de Clubes da FIFA",
    shortName: "Mundial de Clubes",
    type: "international_club",
    region: "world",
    prestige: 92,
    matchCount: 4,
    reputationBonus: 22,
    emoji: "🌍"
  },

  // ==========================================
  // SELEÇÕES NACIONAIS (CICLOS DE 4 ANOS)
  // ==========================================
  {
    id: "copa_do_mundo",
    name: "Copa do Mundo da FIFA",
    shortName: "Copa do Mundo",
    type: "national_team",
    region: "world",
    prestige: 100,
    matchCount: 7,
    reputationBonus: 40,
    recurrenceYears: [2026, 2030, 2034, 2038, 2042],
    emoji: "🌐"
  },
  {
    id: "copa_america",
    name: "Conmebol Copa América",
    shortName: "Copa América",
    type: "national_team",
    region: "brazil",
    prestige: 88,
    matchCount: 6,
    reputationBonus: 20,
    recurrenceYears: [2028, 2032, 2036, 2040],
    emoji: "🌎"
  }
];

/**
 * Retorna o torneio pelo ID
 * @param {string} id 
 * @returns {object|null}
 */
export function getTournamentById(id) {
  return TOURNAMENTS.find(t => t.id === id) || null;
}

/**
 * Retorna os torneios disputados por um clube no ano
 * @param {object} club 
 * @param {number} year 
 * @returns {Array<object>}
 */
export function getTournamentsForClub(club, year) {
  const list = [];

  if (club.region === "brazil") {
    // Estadual
    if (["santos", "palmeiras", "sao_paulo", "corinthians", "ponte_preta"].includes(club.id)) {
      list.push(getTournamentById("paulistao"));
    } else if (["flamengo", "fluminense", "vasco", "botafogo"].includes(club.id)) {
      list.push(getTournamentById("carioca"));
    } else {
      list.push(getTournamentById("estadual_geral"));
    }

    // Liga Nacional
    if (club.tier === 3 && ["coritiba", "sport", "ceara", "goias", "ponte_preta", "santos"].includes(club.id)) {
      // Começam na Série B ou disputam acesso
      list.push(getTournamentById("brasileirao_serie_b"));
    } else {
      list.push(getTournamentById("brasileirao_serie_a"));
    }

    // Copa do Brasil
    list.push(getTournamentById("copa_do_brasil"));

    // Continental (Clubes de elite disputam Libertadores; médios Sul-Americana)
    if (club.tier === 1) {
      list.push(getTournamentById("libertadores"));
    } else if (club.tier === 2) {
      list.push(getTournamentById("sul_americana"));
    }

  } else if (club.region === "europe") {
    // Liga Europeia
    if (club.country === "Inglaterra") {
      list.push(getTournamentById("premier_league"));
      list.push(getTournamentById("fa_cup"));
    } else {
      list.push(getTournamentById("la_liga"));
    }

    // Champions League
    list.push(getTournamentById("champions_league"));
  }

  return list;
}
