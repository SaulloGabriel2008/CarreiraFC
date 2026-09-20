/**
 * CARREIRA FC - BANCO DE DADOS: TORNEIOS & COMPETIÇÕES
 * Cobertura completa das 20 Ligas Mundiais, Copas Nacionais,
 * Torneios Continentais de Clubes e Copas do Mundo / Continentais de Seleção.
 */

export const TOURNAMENTS = [
  // ==========================================
  // ESTADUAIS BRASILEIROS (1º SEMESTRE)
  // ==========================================
  {
    id: "paulistao",
    name: "Campeonato Paulista",
    shortName: "Paulistão",
    type: "state",
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
  // AS 20 LIGAS MUNDIAIS
  // ==========================================
  // 1. Brasil - Série A
  {
    id: "brasileirao_serie_a",
    name: "Campeonato Brasileiro Série A",
    shortName: "Brasileirão A",
    type: "league",
    region: "brazil",
    country: "Brasil",
    prestige: 86,
    matchCount: 38,
    reputationBonus: 22,
    emoji: "🇧🇷"
  },
  // 2. Brasil - Série B
  {
    id: "brasileirao_serie_b",
    name: "Campeonato Brasileiro Série B",
    shortName: "Brasileirão B",
    type: "league",
    region: "brazil",
    country: "Brasil",
    prestige: 64,
    matchCount: 38,
    reputationBonus: 10,
    emoji: "🇧🇷"
  },
  // 3. Argentina - Liga Profesional
  {
    id: "liga_argentina",
    name: "Liga Profesional de Fútbol",
    shortName: "Liga Argentina",
    type: "league",
    region: "south_america",
    country: "Argentina",
    prestige: 82,
    matchCount: 27,
    reputationBonus: 18,
    emoji: "🇦🇷"
  },
  // 4. Inglaterra - Premier League
  {
    id: "premier_league",
    name: "Premier League Inglesa",
    shortName: "Premier League",
    type: "league",
    region: "europe",
    country: "Inglaterra",
    prestige: 98,
    matchCount: 38,
    reputationBonus: 32,
    emoji: "🦁"
  },
  // 5. Inglaterra - EFL Championship
  {
    id: "championship",
    name: "EFL Championship",
    shortName: "Championship",
    type: "league",
    region: "europe",
    country: "Inglaterra",
    prestige: 75,
    matchCount: 46,
    reputationBonus: 14,
    emoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
  },
  // 6. Espanha - La Liga
  {
    id: "la_liga",
    name: "La Liga EA Sports",
    shortName: "La Liga",
    type: "league",
    region: "europe",
    country: "Espanha",
    prestige: 95,
    matchCount: 38,
    reputationBonus: 28,
    emoji: "🇪🇸"
  },
  // 7. Espanha - La Liga 2
  {
    id: "la_liga_2",
    name: "La Liga Hypermotion",
    shortName: "La Liga 2",
    type: "league",
    region: "europe",
    country: "Espanha",
    prestige: 70,
    matchCount: 42,
    reputationBonus: 12,
    emoji: "🇪🇸"
  },
  // 8. Itália - Serie A
  {
    id: "serie_a_ita",
    name: "Serie A TIM",
    shortName: "Serie A",
    type: "league",
    region: "europe",
    country: "Itália",
    prestige: 93,
    matchCount: 38,
    reputationBonus: 27,
    emoji: "🇮🇹"
  },
  // 9. Itália - Serie B
  {
    id: "serie_b_ita",
    name: "Serie B Italiana",
    shortName: "Serie B",
    type: "league",
    region: "europe",
    country: "Itália",
    prestige: 68,
    matchCount: 38,
    reputationBonus: 11,
    emoji: "🇮🇹"
  },
  // 10. Alemanha - Bundesliga
  {
    id: "bundesliga",
    name: "Bundesliga Alemã",
    shortName: "Bundesliga",
    type: "league",
    region: "europe",
    country: "Alemanha",
    prestige: 94,
    matchCount: 34,
    reputationBonus: 28,
    emoji: "🇩🇪"
  },
  // 11. França - Ligue 1
  {
    id: "ligue_1",
    name: "Ligue 1 Francesa",
    shortName: "Ligue 1",
    type: "league",
    region: "europe",
    country: "França",
    prestige: 90,
    matchCount: 34,
    reputationBonus: 25,
    emoji: "🇫🇷"
  },
  // 12. Portugal - Primeira Liga
  {
    id: "primeira_liga_pt",
    name: "Liga Portugal Betclic",
    shortName: "Liga Portugal",
    type: "league",
    region: "europe",
    country: "Portugal",
    prestige: 85,
    matchCount: 34,
    reputationBonus: 20,
    emoji: "🇵🇹"
  },
  // 13. Holanda - Eredivisie
  {
    id: "eredivisie",
    name: "Eredivisie Holandesa",
    shortName: "Eredivisie",
    type: "league",
    region: "europe",
    country: "Holanda",
    prestige: 83,
    matchCount: 34,
    reputationBonus: 19,
    emoji: "🇳🇱"
  },
  // 14. Turquia - Süper Lig
  {
    id: "super_lig_tur",
    name: "Trendyol Süper Lig",
    shortName: "Süper Lig",
    type: "league",
    region: "europe",
    country: "Turquia",
    prestige: 80,
    matchCount: 38,
    reputationBonus: 17,
    emoji: "🇹🇷"
  },
  // 15. Arábia Saudita - Saudi Pro League
  {
    id: "saudi_pro_league",
    name: "Roshn Saudi League",
    shortName: "Saudi League",
    type: "league",
    region: "saudi",
    country: "Arábia Saudita",
    prestige: 84,
    matchCount: 34,
    reputationBonus: 20,
    emoji: "🇸🇦"
  },
  // 16. Estados Unidos - MLS
  {
    id: "mls",
    name: "Major League Soccer",
    shortName: "MLS",
    type: "league",
    region: "usa",
    country: "Estados Unidos",
    prestige: 78,
    matchCount: 34,
    reputationBonus: 16,
    emoji: "🇺🇸"
  },
  // 17. México - Liga MX
  {
    id: "liga_mx",
    name: "Liga BBVA MX",
    shortName: "Liga MX",
    type: "league",
    region: "concacaf",
    country: "México",
    prestige: 79,
    matchCount: 34,
    reputationBonus: 17,
    emoji: "🇲🇽"
  },
  // 18. Uruguai - Primera División
  {
    id: "primera_div_uru",
    name: "Primera División del Uruguay",
    shortName: "Liga Uruguaia",
    type: "league",
    region: "south_america",
    country: "Uruguai",
    prestige: 74,
    matchCount: 30,
    reputationBonus: 14,
    emoji: "🇺🇾"
  },
  // 19. Colômbia - Liga Dimayor
  {
    id: "liga_colombia",
    name: "Liga BetPlay Dimayor",
    shortName: "Liga Colombiana",
    type: "league",
    region: "south_america",
    country: "Colômbia",
    prestige: 75,
    matchCount: 36,
    reputationBonus: 15,
    emoji: "🇨🇴"
  },
  // 20. Japão - J1 League
  {
    id: "j1_league",
    name: "Meiji Yasuda J1 League",
    shortName: "J1 League",
    type: "league",
    region: "asia",
    country: "Japão",
    prestige: 76,
    matchCount: 34,
    reputationBonus: 15,
    emoji: "🇯🇵"
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
    prestige: 84,
    matchCount: 10,
    reputationBonus: 18,
    emoji: "🏆"
  },
  {
    id: "fa_cup",
    name: "The Emirates FA Cup",
    shortName: "FA Cup",
    type: "cup",
    region: "europe",
    country: "Inglaterra",
    prestige: 88,
    matchCount: 6,
    reputationBonus: 18,
    emoji: "🏆"
  },
  {
    id: "copa_del_rey",
    name: "Copa del Rey",
    shortName: "Copa del Rey",
    type: "cup",
    region: "europe",
    country: "Espanha",
    prestige: 86,
    matchCount: 6,
    reputationBonus: 16,
    emoji: "🏆"
  },
  {
    id: "coppa_italia",
    name: "Coppa Italia Frecciarossa",
    shortName: "Coppa Italia",
    type: "cup",
    region: "europe",
    country: "Itália",
    prestige: 85,
    matchCount: 5,
    reputationBonus: 15,
    emoji: "🏆"
  },
  {
    id: "dfb_pokal",
    name: "DFB-Pokal",
    shortName: "DFB-Pokal",
    type: "cup",
    region: "europe",
    country: "Alemanha",
    prestige: 85,
    matchCount: 5,
    reputationBonus: 15,
    emoji: "🏆"
  },
  {
    id: "coupe_de_france",
    name: "Coupe de France",
    shortName: "Coupe de France",
    type: "cup",
    region: "europe",
    country: "França",
    prestige: 83,
    matchCount: 6,
    reputationBonus: 14,
    emoji: "🏆"
  },
  {
    id: "king_cup_saudi",
    name: "Custódia das Duas Mesquitas Sagradas",
    shortName: "King Cup",
    type: "cup",
    region: "saudi",
    country: "Arábia Saudita",
    prestige: 80,
    matchCount: 5,
    reputationBonus: 14,
    emoji: "🏆"
  },
  {
    id: "us_open_cup",
    name: "Lamar Hunt U.S. Open Cup",
    shortName: "US Open Cup",
    type: "cup",
    region: "usa",
    country: "Estados Unidos",
    prestige: 75,
    matchCount: 5,
    reputationBonus: 12,
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
    region: "south_america",
    prestige: 96,
    matchCount: 13,
    reputationBonus: 30,
    emoji: "⭐"
  },
  {
    id: "sul_americana",
    name: "Copa Conmebol Sul-Americana",
    shortName: "Sul-Americana",
    type: "continental",
    region: "south_america",
    prestige: 78,
    matchCount: 11,
    reputationBonus: 16,
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
    id: "europa_league",
    name: "UEFA Europa League",
    shortName: "Europa League",
    type: "continental",
    region: "europe",
    prestige: 84,
    matchCount: 13,
    reputationBonus: 20,
    emoji: "🥈"
  },
  {
    id: "afc_champions",
    name: "AFC Champions League Elite",
    shortName: "AFC Champions",
    type: "continental",
    region: "asia",
    prestige: 86,
    matchCount: 10,
    reputationBonus: 22,
    emoji: "⭐"
  },
  {
    id: "concacaf_champions",
    name: "Concacaf Champions Cup",
    shortName: "Concacaf Champions",
    type: "continental",
    region: "concacaf",
    prestige: 82,
    matchCount: 8,
    reputationBonus: 18,
    emoji: "⭐"
  },
  {
    id: "mundial_clubes",
    name: "Mundial de Clubes da FIFA",
    shortName: "Mundial de Clubes",
    type: "international_club",
    region: "world",
    prestige: 95,
    matchCount: 5,
    reputationBonus: 25,
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
    id: "eurocopa",
    name: "UEFA Euro (Eurocopa)",
    shortName: "Eurocopa",
    type: "national_team",
    region: "europe",
    prestige: 95,
    matchCount: 7,
    reputationBonus: 25,
    recurrenceYears: [2028, 2032, 2036, 2040],
    emoji: "🏆"
  },
  {
    id: "copa_america",
    name: "Conmebol Copa América",
    shortName: "Copa América",
    type: "national_team",
    region: "south_america",
    prestige: 90,
    matchCount: 6,
    reputationBonus: 22,
    recurrenceYears: [2028, 2032, 2036, 2040],
    emoji: "🌎"
  },
  {
    id: "copa_ouro",
    name: "Concacaf Copa Ouro",
    shortName: "Copa Ouro",
    type: "national_team",
    region: "concacaf",
    prestige: 80,
    matchCount: 6,
    reputationBonus: 16,
    recurrenceYears: [2027, 2031, 2035, 2039],
    emoji: "🏆"
  },
  {
    id: "copa_asia",
    name: "AFC Copa da Ásia",
    shortName: "Copa da Ásia",
    type: "national_team",
    region: "asia",
    prestige: 80,
    matchCount: 6,
    reputationBonus: 16,
    recurrenceYears: [2027, 2031, 2035, 2039],
    emoji: "🏆"
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
 * Retorna os torneios disputados por um clube no ano com base em seu país, liga e tier
 * @param {object} club 
 * @param {number} year 
 * @returns {Array<object>}
 */
export function getTournamentsForClub(club, year) {
  const list = [];
  if (!club) return list;

  // 1. FUTEBOL BRASILEIRO
  if (club.country === "Brasil") {
    // Estadual
    if (["santos", "palmeiras", "sao_paulo", "corinthians", "ponte_preta", "red_bull_bragantino"].includes(club.id)) {
      list.push(getTournamentById("paulistao"));
    } else if (["flamengo", "fluminense", "vasco", "botafogo"].includes(club.id)) {
      list.push(getTournamentById("carioca"));
    } else {
      list.push(getTournamentById("estadual_geral"));
    }

    // Liga Nacional
    if (club.leagueId === "brasileirao_serie_b" || club.tier >= 3) {
      list.push(getTournamentById("brasileirao_serie_b"));
    } else {
      list.push(getTournamentById("brasileirao_serie_a"));
    }

    // Copa do Brasil
    list.push(getTournamentById("copa_do_brasil"));

    // Continental
    if (club.tier === 1) {
      list.push(getTournamentById("libertadores"));
    } else if (club.tier === 2) {
      list.push(getTournamentById("sul_americana"));
    }
  }

  // 2. ARGENTINA
  else if (club.country === "Argentina") {
    list.push(getTournamentById("liga_argentina"));
    if (club.tier === 1) {
      list.push(getTournamentById("libertadores"));
    } else {
      list.push(getTournamentById("sul_americana"));
    }
  }

  // 3. URUGUAI & COLÔMBIA
  else if (club.country === "Uruguai") {
    list.push(getTournamentById("primera_div_uru"));
    list.push(club.tier === 1 ? getTournamentById("libertadores") : getTournamentById("sul_americana"));
  }
  else if (club.country === "Colômbia") {
    list.push(getTournamentById("liga_colombia"));
    list.push(club.tier === 1 ? getTournamentById("libertadores") : getTournamentById("sul_americana"));
  }

  // 4. INGLATERRA
  else if (club.country === "Inglaterra") {
    if (club.leagueId === "championship") {
      list.push(getTournamentById("championship"));
    } else {
      list.push(getTournamentById("premier_league"));
    }
    list.push(getTournamentById("fa_cup"));
    if (club.tier === 1) list.push(getTournamentById("champions_league"));
    else if (club.tier === 2) list.push(getTournamentById("europa_league"));
  }

  // 5. ESPANHA
  else if (club.country === "Espanha") {
    if (club.leagueId === "la_liga_2") {
      list.push(getTournamentById("la_liga_2"));
    } else {
      list.push(getTournamentById("la_liga"));
    }
    list.push(getTournamentById("copa_del_rey"));
    if (club.tier === 1) list.push(getTournamentById("champions_league"));
    else if (club.tier === 2) list.push(getTournamentById("europa_league"));
  }

  // 6. ITÁLIA
  else if (club.country === "Itália") {
    if (club.leagueId === "serie_b_ita") {
      list.push(getTournamentById("serie_b_ita"));
    } else {
      list.push(getTournamentById("serie_a_ita"));
    }
    list.push(getTournamentById("coppa_italia"));
    if (club.tier === 1) list.push(getTournamentById("champions_league"));
    else if (club.tier === 2) list.push(getTournamentById("europa_league"));
  }

  // 7. ALEMANHA
  else if (club.country === "Alemanha") {
    list.push(getTournamentById("bundesliga"));
    list.push(getTournamentById("dfb_pokal"));
    if (club.tier === 1) list.push(getTournamentById("champions_league"));
    else if (club.tier === 2) list.push(getTournamentById("europa_league"));
  }

  // 8. FRANÇA
  else if (club.country === "França") {
    list.push(getTournamentById("ligue_1"));
    list.push(getTournamentById("coupe_de_france"));
    if (club.tier === 1) list.push(getTournamentById("champions_league"));
    else if (club.tier === 2) list.push(getTournamentById("europa_league"));
  }

  // 9. PORTUGAL
  else if (club.country === "Portugal") {
    list.push(getTournamentById("primeira_liga_pt"));
    if (club.tier === 1) list.push(getTournamentById("champions_league"));
    else if (club.tier === 2) list.push(getTournamentById("europa_league"));
  }

  // 10. HOLANDA
  else if (club.country === "Holanda") {
    list.push(getTournamentById("eredivisie"));
    if (club.tier === 1) list.push(getTournamentById("champions_league"));
    else if (club.tier === 2) list.push(getTournamentById("europa_league"));
  }

  // 11. TURQUIA
  else if (club.country === "Turquia") {
    list.push(getTournamentById("super_lig_tur"));
    if (club.tier === 1) list.push(getTournamentById("champions_league"));
    else if (club.tier === 2) list.push(getTournamentById("europa_league"));
  }

  // 12. ARÁBIA SAUDITA
  else if (club.country === "Arábia Saudita") {
    list.push(getTournamentById("saudi_pro_league"));
    list.push(getTournamentById("king_cup_saudi"));
    if (club.tier === 1) list.push(getTournamentById("afc_champions"));
  }

  // 13. ESTADOS UNIDOS (MLS)
  else if (club.country === "Estados Unidos") {
    list.push(getTournamentById("mls"));
    list.push(getTournamentById("us_open_cup"));
    if (club.tier <= 2) list.push(getTournamentById("concacaf_champions"));
  }

  // 14. MÉXICO
  else if (club.country === "México") {
    list.push(getTournamentById("liga_mx"));
    if (club.tier <= 2) list.push(getTournamentById("concacaf_champions"));
  }

  // 15. JAPÃO
  else if (club.country === "Japão") {
    list.push(getTournamentById("j1_league"));
    if (club.tier === 1) list.push(getTournamentById("afc_champions"));
  }

  // Fallback genérico caso não tenha caído em nenhum acima
  if (list.length === 0) {
    list.push(getTournamentById("brasileirao_serie_a"));
  }

  // Se o clube é campeão continental ou campeão de liga top mundial, disputa o Mundial de Clubes
  if (club.tier === 1 && Math.random() < 0.35) {
    list.push(getTournamentById("mundial_clubes"));
  }

  return list.filter(Boolean);
}
