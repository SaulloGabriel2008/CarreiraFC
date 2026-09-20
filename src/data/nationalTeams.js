/**
 * CARREIRA FC - BANCO DE DADOS: SELEÇÕES NACIONAIS & PAÍSES
 * Países disponíveis para nacionalidade do jogador, forças de seleções,
 * confederações e critérios de convocação para Copa do Mundo e copas continentais.
 */

export const NATIONAL_TEAMS = [
  // ==========================================
  // CONMEBOL (AMÉRICA DO SUL)
  // ==========================================
  {
    id: "brasil",
    name: "Seleção Brasileira",
    country: "Brasil",
    flagEmoji: "🇧🇷",
    confederation: "CONMEBOL",
    overall: 87,
    reputation: 96,
    continentalCupId: "copa_america",
    minOverallForCallUp: 79,
    colors: { primary: "#fdd835", secondary: "#1e88e5", text: "#004d40" }
  },
  {
    id: "argentina",
    name: "Seleção Argentina",
    country: "Argentina",
    flagEmoji: "🇦🇷",
    confederation: "CONMEBOL",
    overall: 87,
    reputation: 96,
    continentalCupId: "copa_america",
    minOverallForCallUp: 79,
    colors: { primary: "#75aadb", secondary: "#ffffff", text: "#111111" }
  },
  {
    id: "uruguai",
    name: "Seleção Uruguaia",
    country: "Uruguai",
    flagEmoji: "🇺🇾",
    confederation: "CONMEBOL",
    overall: 82,
    reputation: 86,
    continentalCupId: "copa_america",
    minOverallForCallUp: 74,
    colors: { primary: "#0038a8", secondary: "#ffffff", text: "#ffffff" }
  },
  {
    id: "colombia",
    name: "Seleção Colombiana",
    country: "Colômbia",
    flagEmoji: "🇨🇴",
    confederation: "CONMEBOL",
    overall: 80,
    reputation: 83,
    continentalCupId: "copa_america",
    minOverallForCallUp: 73,
    colors: { primary: "#fcd116", secondary: "#003893", text: "#ce1126" }
  },

  // ==========================================
  // UEFA (EUROPA)
  // ==========================================
  {
    id: "franca",
    name: "Seleção Francesa",
    country: "França",
    flagEmoji: "🇫🇷",
    confederation: "UEFA",
    overall: 88,
    reputation: 97,
    continentalCupId: "eurocopa",
    minOverallForCallUp: 80,
    colors: { primary: "#002654", secondary: "#ffffff", text: "#ed2939" }
  },
  {
    id: "inglaterra",
    name: "Seleção Inglesa",
    country: "Inglaterra",
    flagEmoji: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    confederation: "UEFA",
    overall: 87,
    reputation: 95,
    continentalCupId: "eurocopa",
    minOverallForCallUp: 79,
    colors: { primary: "#ffffff", secondary: "#ce1124", text: "#00247d" }
  },
  {
    id: "espanha",
    name: "Seleção Espanhola",
    country: "Espanha",
    flagEmoji: "🇪🇸",
    confederation: "UEFA",
    overall: 86,
    reputation: 94,
    continentalCupId: "eurocopa",
    minOverallForCallUp: 78,
    colors: { primary: "#c60b1e", secondary: "#ffc400", text: "#ffffff" }
  },
  {
    id: "alemanha",
    name: "Seleção Alemã",
    country: "Alemanha",
    flagEmoji: "🇩🇪",
    confederation: "UEFA",
    overall: 85,
    reputation: 93,
    continentalCupId: "eurocopa",
    minOverallForCallUp: 77,
    colors: { primary: "#111111", secondary: "#ffffff", text: "#ffffff" }
  },
  {
    id: "portugal",
    name: "Seleção Portuguesa",
    country: "Portugal",
    flagEmoji: "🇵🇹",
    confederation: "UEFA",
    overall: 86,
    reputation: 93,
    continentalCupId: "eurocopa",
    minOverallForCallUp: 78,
    colors: { primary: "#da121a", secondary: "#046a38", text: "#fed100" }
  },
  {
    id: "italia",
    name: "Seleção Italiana",
    country: "Itália",
    flagEmoji: "🇮🇹",
    confederation: "UEFA",
    overall: 84,
    reputation: 92,
    continentalCupId: "eurocopa",
    minOverallForCallUp: 76,
    colors: { primary: "#0066cc", secondary: "#ffffff", text: "#ffffff" }
  },
  {
    id: "holanda",
    name: "Seleção Holandesa",
    country: "Holanda",
    flagEmoji: "🇳🇱",
    confederation: "UEFA",
    overall: 84,
    reputation: 90,
    continentalCupId: "eurocopa",
    minOverallForCallUp: 76,
    colors: { primary: "#ff6600", secondary: "#ffffff", text: "#ffffff" }
  },
  {
    id: "belgica",
    name: "Seleção Belga",
    country: "Bélgica",
    flagEmoji: "🇧🇪",
    confederation: "UEFA",
    overall: 82,
    reputation: 87,
    continentalCupId: "eurocopa",
    minOverallForCallUp: 74,
    colors: { primary: "#e30613", secondary: "#ffe600", text: "#000000" }
  },
  {
    id: "turquia",
    name: "Seleção Turca",
    country: "Turquia",
    flagEmoji: "🇹🇷",
    confederation: "UEFA",
    overall: 78,
    reputation: 80,
    continentalCupId: "eurocopa",
    minOverallForCallUp: 71,
    colors: { primary: "#e30a17", secondary: "#ffffff", text: "#ffffff" }
  },

  // ==========================================
  // CONCACAF (AMÉRICA DO NORTE & CENTRAL)
  // ==========================================
  {
    id: "estados_unidos",
    name: "Seleção dos Estados Unidos",
    country: "Estados Unidos",
    flagEmoji: "🇺🇸",
    confederation: "CONCACAF",
    overall: 78,
    reputation: 81,
    continentalCupId: "copa_ouro",
    minOverallForCallUp: 70,
    colors: { primary: "#002868", secondary: "#bf0a30", text: "#ffffff" }
  },
  {
    id: "mexico",
    name: "Seleção Mexicana",
    country: "México",
    flagEmoji: "🇲🇽",
    confederation: "CONCACAF",
    overall: 79,
    reputation: 84,
    continentalCupId: "copa_ouro",
    minOverallForCallUp: 71,
    colors: { primary: "#006847", secondary: "#ce1126", text: "#ffffff" }
  },

  // ==========================================
  // AFC (ÁSIA & ORIENTE MÉDIO)
  // ==========================================
  {
    id: "arabia_saudita",
    name: "Seleção Saudita",
    country: "Arábia Saudita",
    flagEmoji: "🇸🇦",
    confederation: "AFC",
    overall: 74,
    reputation: 75,
    continentalCupId: "copa_asia",
    minOverallForCallUp: 67,
    colors: { primary: "#006c35", secondary: "#ffffff", text: "#ffffff" }
  },
  {
    id: "japao",
    name: "Seleção Japonesa",
    country: "Japão",
    flagEmoji: "🇯🇵",
    confederation: "AFC",
    overall: 80,
    reputation: 83,
    continentalCupId: "copa_asia",
    minOverallForCallUp: 72,
    colors: { primary: "#001e62", secondary: "#ffffff", text: "#e60012" }
  }
];

/**
 * Retorna uma seleção pelo ID ou pelo nome do país
 * @param {string} idOrCountry 
 * @returns {object}
 */
export function getNationalTeamById(idOrCountry) {
  if (!idOrCountry) return NATIONAL_TEAMS[0];
  const query = idOrCountry.toLowerCase().trim();
  return NATIONAL_TEAMS.find(t => 
    t.id.toLowerCase() === query || 
    t.country.toLowerCase() === query ||
    t.name.toLowerCase() === query
  ) || NATIONAL_TEAMS[0]; // Retorna Brasil como padrão
}

/**
 * Lista todas as nacionalidades disponíveis para seleção
 * @returns {Array<object>}
 */
export function getAllNationalities() {
  return NATIONAL_TEAMS.map(t => ({
    id: t.id,
    country: t.country,
    name: t.name,
    flagEmoji: t.flagEmoji
  }));
}
