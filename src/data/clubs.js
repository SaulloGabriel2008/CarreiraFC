/**
 * CARREIRA FC - BANCO DE DADOS: CLUBES
 * Base de clubes nacionais e internacionais com equilíbrio estatístico e tiers de força.
 */

export const CLUBS = [
  // ==========================================
  // BRASIL: TIER 1 (GIGANTES / CANDIDATOS A TÍTULOS)
  // ==========================================
  {
    id: "flamengo",
    name: "Clube de Regatas do Flamengo",
    shortName: "Flamengo",
    country: "Brasil",
    region: "brazil",
    tier: 1,
    overall: 80,
    reputation: 88,
    financialPower: 5,
    colors: { primary: "#c00000", secondary: "#111111", text: "#ffffff" },
    emoji: "🔴⚫"
  },
  {
    id: "palmeiras",
    name: "Sociedade Esportiva Palmeiras",
    shortName: "Palmeiras",
    country: "Brasil",
    region: "brazil",
    tier: 1,
    overall: 80,
    reputation: 87,
    financialPower: 5,
    colors: { primary: "#006437", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🟢⚪"
  },
  {
    id: "atletico_mg",
    name: "Clube Atlético Mineiro",
    shortName: "Atlético-MG",
    country: "Brasil",
    region: "brazil",
    tier: 1,
    overall: 78,
    reputation: 82,
    financialPower: 4,
    colors: { primary: "#111111", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🐓"
  },
  {
    id: "sao_paulo",
    name: "São Paulo Futebol Clube",
    shortName: "São Paulo",
    country: "Brasil",
    region: "brazil",
    tier: 1,
    overall: 77,
    reputation: 85,
    financialPower: 4,
    colors: { primary: "#d21a22", secondary: "#111111", text: "#ffffff" },
    emoji: "🔴⚪⚫"
  },
  {
    id: "fluminense",
    name: "Fluminense Football Club",
    shortName: "Fluminense",
    country: "Brasil",
    region: "brazil",
    tier: 1,
    overall: 76,
    reputation: 82,
    financialPower: 3,
    colors: { primary: "#7a1526", secondary: "#005537", text: "#ffffff" },
    emoji: "🇭🇺"
  },
  {
    id: "internacional",
    name: "Sport Club Internacional",
    shortName: "Internacional",
    country: "Brasil",
    region: "brazil",
    tier: 1,
    overall: 76,
    reputation: 82,
    financialPower: 3,
    colors: { primary: "#e50000", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🔴⚪"
  },
  {
    id: "gremio",
    name: "Grêmio Foot-Ball Porto Alegrense",
    shortName: "Grêmio",
    country: "Brasil",
    region: "brazil",
    tier: 1,
    overall: 76,
    reputation: 83,
    financialPower: 3,
    colors: { primary: "#0d80bf", secondary: "#111111", text: "#ffffff" },
    emoji: "🇪🇪"
  },
  {
    id: "botafogo",
    name: "Botafogo de Futebol e Regatas",
    shortName: "Botafogo",
    country: "Brasil",
    region: "brazil",
    tier: 1,
    overall: 77,
    reputation: 80,
    financialPower: 4,
    colors: { primary: "#111111", secondary: "#ffffff", text: "#ffffff" },
    emoji: "⭐"
  },

  // ==========================================
  // BRASIL: TIER 2 (TRADIÇÃO E FORÇA COMPETITIVA)
  // ==========================================
  {
    id: "corinthians",
    name: "Sport Club Corinthians Paulista",
    shortName: "Corinthians",
    country: "Brasil",
    region: "brazil",
    tier: 2,
    overall: 75,
    reputation: 86,
    financialPower: 4,
    colors: { primary: "#111111", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🦅"
  },
  {
    id: "cruzeiro",
    name: "Cruzeiro Esporte Clube",
    shortName: "Cruzeiro",
    country: "Brasil",
    region: "brazil",
    tier: 2,
    overall: 75,
    reputation: 81,
    financialPower: 4,
    colors: { primary: "#003b8e", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🦊"
  },
  {
    id: "vasco",
    name: "Club de Regatas Vasco da Gama",
    shortName: "Vasco da Gama",
    country: "Brasil",
    region: "brazil",
    tier: 2,
    overall: 74,
    reputation: 80,
    financialPower: 3,
    colors: { primary: "#111111", secondary: "#ffffff", text: "#ffffff" },
    emoji: "💢"
  },
  {
    id: "bahia",
    name: "Esporte Clube Bahia",
    shortName: "Bahia",
    country: "Brasil",
    region: "brazil",
    tier: 2,
    overall: 74,
    reputation: 76,
    financialPower: 4,
    colors: { primary: "#0055a5", secondary: "#e01e2b", text: "#ffffff" },
    emoji: "🔵🔴"
  },
  {
    id: "athletico_pr",
    name: "Club Athletico Paranaense",
    shortName: "Athletico-PR",
    country: "Brasil",
    region: "brazil",
    tier: 2,
    overall: 74,
    reputation: 77,
    financialPower: 3,
    colors: { primary: "#c8102e", secondary: "#111111", text: "#ffffff" },
    emoji: "🌪️"
  },
  {
    id: "fortaleza",
    name: "Fortaleza Esporte Clube",
    shortName: "Fortaleza",
    country: "Brasil",
    region: "brazil",
    tier: 2,
    overall: 74,
    reputation: 75,
    financialPower: 3,
    colors: { primary: "#002b7f", secondary: "#c8102e", text: "#ffffff" },
    emoji: "🦁"
  },

  // ==========================================
  // BRASIL: TIER 3 (FORMADORES E ACESSO / SÉRIE B TRADICIONAIS)
  // ==========================================
  {
    id: "santos",
    name: "Santos Futebol Clube",
    shortName: "Santos FC",
    country: "Brasil",
    region: "brazil",
    tier: 3,
    overall: 72,
    reputation: 84, // Tradição da base (Pelé, Neymar, Rodrygo)
    financialPower: 2,
    colors: { primary: "#ffffff", secondary: "#111111", text: "#111111" },
    emoji: "🐳"
  },
  {
    id: "coritiba",
    name: "Coritiba Foot Ball Club",
    shortName: "Coritiba",
    country: "Brasil",
    region: "brazil",
    tier: 3,
    overall: 69,
    reputation: 71,
    financialPower: 2,
    colors: { primary: "#005030", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🟢⚪"
  },
  {
    id: "sport",
    name: "Sport Club do Recife",
    shortName: "Sport Recife",
    country: "Brasil",
    region: "brazil",
    tier: 3,
    overall: 69,
    reputation: 73,
    financialPower: 2,
    colors: { primary: "#d21a22", secondary: "#111111", text: "#ffffff" },
    emoji: "🦁"
  },
  {
    id: "ceara",
    name: "Ceará Sporting Club",
    shortName: "Ceará",
    country: "Brasil",
    region: "brazil",
    tier: 3,
    overall: 68,
    reputation: 70,
    financialPower: 2,
    colors: { primary: "#111111", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🏁"
  },
  {
    id: "goias",
    name: "Goiás Esporte Clube",
    shortName: "Goiás",
    country: "Brasil",
    region: "brazil",
    tier: 3,
    overall: 68,
    reputation: 69,
    financialPower: 2,
    colors: { primary: "#00563f", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🦜"
  },
  {
    id: "ponte_preta",
    name: "Associação Atlética Ponte Preta",
    shortName: "Ponte Preta",
    country: "Brasil",
    region: "brazil",
    tier: 3,
    overall: 66,
    reputation: 67,
    financialPower: 1,
    colors: { primary: "#111111", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🦍"
  },

  // ==========================================
  // EUROPA / MUNDO: TIER 1 (SUPERPOTÊNCIAS GLOBAIS)
  // ==========================================
  {
    id: "real_madrid",
    name: "Real Madrid Club de Fútbol",
    shortName: "Real Madrid",
    country: "Espanha",
    region: "europe",
    tier: 1,
    overall: 87,
    reputation: 99,
    financialPower: 5,
    colors: { primary: "#ffffff", secondary: "#00529f", text: "#111111" },
    emoji: "👑"
  },
  {
    id: "man_city",
    name: "Manchester City Football Club",
    shortName: "Man City",
    country: "Inglaterra",
    region: "europe",
    tier: 1,
    overall: 86,
    reputation: 96,
    financialPower: 5,
    colors: { primary: "#6cabdd", secondary: "#1c2c5b", text: "#ffffff" },
    emoji: "🔵"
  },
  {
    id: "barcelona",
    name: "Futbol Club Barcelona",
    shortName: "Barcelona",
    country: "Espanha",
    region: "europe",
    tier: 1,
    overall: 84,
    reputation: 97,
    financialPower: 4,
    colors: { primary: "#a50044", secondary: "#004d98", text: "#ffffff" },
    emoji: "🔵🔴"
  },
  {
    id: "bayern",
    name: "FC Bayern München",
    shortName: "Bayern Munique",
    country: "Alemanha",
    region: "europe",
    tier: 1,
    overall: 85,
    reputation: 95,
    financialPower: 5,
    colors: { primary: "#dc052d", secondary: "#0066b2", text: "#ffffff" },
    emoji: "🔴"
  },
  {
    id: "liverpool",
    name: "Liverpool Football Club",
    shortName: "Liverpool",
    country: "Inglaterra",
    region: "europe",
    tier: 1,
    overall: 85,
    reputation: 94,
    financialPower: 4,
    colors: { primary: "#c8102e", secondary: "#00b2a9", text: "#ffffff" },
    emoji: "🔴"
  },
  {
    id: "arsenal",
    name: "Arsenal Football Club",
    shortName: "Arsenal",
    country: "Inglaterra",
    region: "europe",
    tier: 1,
    overall: 84,
    reputation: 92,
    financialPower: 4,
    colors: { primary: "#ef0107", secondary: "#063672", text: "#ffffff" },
    emoji: "🔴⚪"
  },
  {
    id: "psg",
    name: "Paris Saint-Germain Football Club",
    shortName: "Paris SG",
    country: "França",
    region: "europe",
    tier: 1,
    overall: 83,
    reputation: 93,
    financialPower: 5,
    colors: { primary: "#004170", secondary: "#da291c", text: "#ffffff" },
    emoji: "🗼"
  },
  {
    id: "inter_milao",
    name: "Football Club Internazionale Milano",
    shortName: "Inter de Milão",
    country: "Itália",
    region: "europe",
    tier: 1,
    overall: 83,
    reputation: 91,
    financialPower: 4,
    colors: { primary: "#001489", secondary: "#111111", text: "#ffffff" },
    emoji: "🔵⚫"
  },

  // ==========================================
  // MERCADOS ALTERNATIVOS E VETERANOS (ARÁBIA & MLS)
  // ==========================================
  {
    id: "al_hilal",
    name: "Al-Hilal Saudi Football Club",
    shortName: "Al-Hilal",
    country: "Arábia Saudita",
    region: "saudi",
    tier: 2,
    overall: 79,
    reputation: 80,
    financialPower: 5, // Salários astronômicos
    colors: { primary: "#004899", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🌙"
  },
  {
    id: "inter_miami",
    name: "Club Internacional de Fútbol Miami",
    shortName: "Inter Miami",
    country: "Estados Unidos",
    region: "usa",
    tier: 3,
    overall: 73,
    reputation: 79,
    financialPower: 4,
    colors: { primary: "#f7b5cd", secondary: "#231f20", text: "#231f20" },
    emoji: "🦩"
  }
];

/**
 * Retorna clube pelo identificador único
 * @param {string} id 
 * @returns {object|null}
 */
export function getClubById(id) {
  return CLUBS.find(c => c.id === id) || null;
}

/**
 * Lista clubes formadores disponíveis para o início de carreira (Tier 3 ou base de tradicionais)
 * @returns {Array<object>}
 */
export function getStartingClubs() {
  return CLUBS.filter(c => c.region === "brazil" && (c.tier === 3 || c.id === "fluminense" || c.id === "santos"));
}

/**
 * Filtra clubes compatíveis para transferência com base no Overall e Reputação do atleta
 * @param {number} playerOverall 
 * @param {number} playerReputation 
 * @param {string} currentClubId 
 * @returns {Array<object>}
 */
export function getEligibleClubsForTransfer(playerOverall, playerReputation, currentClubId) {
  return CLUBS.filter(club => {
    if (club.id === currentClubId) return false;
    
    // Propostas da Europa exigem overall e reputação consolidados
    if (club.region === "europe") {
      return playerOverall >= 78 && playerReputation >= 55;
    }

    // Gigantes do Brasil (Tier 1)
    if (club.tier === 1 && club.region === "brazil") {
      return playerOverall >= 73 && playerReputation >= 35;
    }

    // Clubes médios / Série B
    return Math.abs(club.overall - playerOverall) <= 8;
  });
}
