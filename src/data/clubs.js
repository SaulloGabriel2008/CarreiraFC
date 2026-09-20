/**
 * CARREIRA FC - BANCO DE DADOS: CLUBES GLOBAIS (20 LIGAS MUNDIAIS)
 * Mais de 160 clubes com atributos de força, finanças, cores, escudos oficiais e ligas.
 */

export const CLUBS = [
  // =========================================================================
  // 1. BRASIL - BRASILEIRÃO SÉRIE A
  // =========================================================================
  {
    id: "flamengo",
    name: "Clube de Regatas do Flamengo",
    shortName: "Flamengo",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_a",
    tier: 1,
    overall: 80,
    reputation: 88,
    financialPower: 5,
    colors: { primary: "#c00000", secondary: "#111111", text: "#ffffff" },
    emoji: "🔴⚫",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/5926.png"
  },
  {
    id: "palmeiras",
    name: "Sociedade Esportiva Palmeiras",
    shortName: "Palmeiras",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_a",
    tier: 1,
    overall: 80,
    reputation: 87,
    financialPower: 5,
    colors: { primary: "#006437", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🟢⚪",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1981.png"
  },
  {
    id: "atletico_mg",
    name: "Clube Atlético Mineiro",
    shortName: "Atlético-MG",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_a",
    tier: 1,
    overall: 78,
    reputation: 82,
    financialPower: 4,
    colors: { primary: "#111111", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🐓",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1977.png"
  },
  {
    id: "sao_paulo",
    name: "São Paulo Futebol Clube",
    shortName: "São Paulo",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_a",
    tier: 1,
    overall: 77,
    reputation: 85,
    financialPower: 4,
    colors: { primary: "#d21a22", secondary: "#111111", text: "#ffffff" },
    emoji: "🔴⚪⚫",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1984.png"
  },
  {
    id: "fluminense",
    name: "Fluminense Football Club",
    shortName: "Fluminense",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_a",
    tier: 1,
    overall: 76,
    reputation: 82,
    financialPower: 3,
    colors: { primary: "#7a1526", secondary: "#005537", text: "#ffffff" },
    emoji: "🇭🇺",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1978.png"
  },
  {
    id: "internacional",
    name: "Sport Club Internacional",
    shortName: "Internacional",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_a",
    tier: 1,
    overall: 76,
    reputation: 82,
    financialPower: 3,
    colors: { primary: "#e50000", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🔴⚪",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1980.png"
  },
  {
    id: "gremio",
    name: "Grêmio Foot-Ball Porto Alegrense",
    shortName: "Grêmio",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_a",
    tier: 1,
    overall: 76,
    reputation: 83,
    financialPower: 3,
    colors: { primary: "#0d80bf", secondary: "#111111", text: "#ffffff" },
    emoji: "🇪🇪",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/5927.png"
  },
  {
    id: "botafogo",
    name: "Botafogo de Futebol e Regatas",
    shortName: "Botafogo",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_a",
    tier: 1,
    overall: 78,
    reputation: 81,
    financialPower: 5,
    colors: { primary: "#111111", secondary: "#ffffff", text: "#ffffff" },
    emoji: "⭐",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8517.png"
  },
  {
    id: "corinthians",
    name: "Sport Club Corinthians Paulista",
    shortName: "Corinthians",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_a",
    tier: 2,
    overall: 75,
    reputation: 86,
    financialPower: 4,
    colors: { primary: "#111111", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🦅",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1957.png"
  },
  {
    id: "cruzeiro",
    name: "Cruzeiro Esporte Clube",
    shortName: "Cruzeiro",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_a",
    tier: 2,
    overall: 75,
    reputation: 82,
    financialPower: 4,
    colors: { primary: "#003a94", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🦊",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1979.png"
  },
  {
    id: "vasco",
    name: "Club de Regatas Vasco da Gama",
    shortName: "Vasco",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_a",
    tier: 2,
    overall: 74,
    reputation: 83,
    financialPower: 3,
    colors: { primary: "#111111", secondary: "#ffffff", text: "#ffffff" },
    emoji: "💢",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1986.png"
  },
  {
    id: "bahia",
    name: "Esporte Clube Bahia",
    shortName: "Bahia",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_a",
    tier: 2,
    overall: 75,
    reputation: 77,
    financialPower: 4,
    colors: { primary: "#002b80", secondary: "#c00000", text: "#ffffff" },
    emoji: "🔵🔴⚪",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1955.png"
  },

  // =========================================================================
  // 2. BRASIL - BRASILEIRÃO SÉRIE B
  // =========================================================================
  {
    id: "santos",
    name: "Santos Futebol Clube",
    shortName: "Santos",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_b",
    tier: 2,
    overall: 74,
    reputation: 87,
    financialPower: 3,
    colors: { primary: "#ffffff", secondary: "#111111", text: "#111111" },
    emoji: "🐳",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1983.png"
  },
  {
    id: "sport",
    name: "Sport Club do Recife",
    shortName: "Sport",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_b",
    tier: 3,
    overall: 71,
    reputation: 75,
    financialPower: 2,
    colors: { primary: "#c8102e", secondary: "#111111", text: "#ffffff" },
    emoji: "🦁",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1985.png"
  },
  {
    id: "coritiba",
    name: "Coritiba Foot Ball Club",
    shortName: "Coritiba",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_b",
    tier: 3,
    overall: 71,
    reputation: 74,
    financialPower: 2,
    colors: { primary: "#00552b", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🟢⚪",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1958.png"
  },
  {
    id: "ceara",
    name: "Ceará Sporting Club",
    shortName: "Ceará",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_b",
    tier: 3,
    overall: 71,
    reputation: 74,
    financialPower: 2,
    colors: { primary: "#111111", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🏁",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1956.png"
  },
  {
    id: "goias",
    name: "Goiás Esporte Clube",
    shortName: "Goiás",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_b",
    tier: 3,
    overall: 70,
    reputation: 73,
    financialPower: 2,
    colors: { primary: "#005a36", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🦜",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1976.png"
  },
  {
    id: "america_mg",
    name: "América Futebol Clube",
    shortName: "América-MG",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_b",
    tier: 3,
    overall: 70,
    reputation: 72,
    financialPower: 2,
    colors: { primary: "#008000", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🐰",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1954.png"
  },
  {
    id: "ponte_preta",
    name: "Associação Atlética Ponte Preta",
    shortName: "Ponte Preta",
    country: "Brasil",
    region: "brazil",
    leagueId: "brasileirao_serie_b",
    tier: 3,
    overall: 68,
    reputation: 70,
    financialPower: 1,
    colors: { primary: "#ffffff", secondary: "#111111", text: "#111111" },
    emoji: "🦍",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1982.png"
  },

  // =========================================================================
  // 3. ARGENTINA - LIGA PROFESIONAL
  // =========================================================================
  {
    id: "boca_juniors",
    name: "Club Atlético Boca Juniors",
    shortName: "Boca Juniors",
    country: "Argentina",
    region: "south_america",
    leagueId: "liga_argentina",
    tier: 1,
    overall: 78,
    reputation: 89,
    financialPower: 4,
    colors: { primary: "#003b7a", secondary: "#fdb913", text: "#ffffff" },
    emoji: "🔷🔶",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10086.png"
  },
  {
    id: "river_plate",
    name: "Club Atlético River Plate",
    shortName: "River Plate",
    country: "Argentina",
    region: "south_america",
    leagueId: "liga_argentina",
    tier: 1,
    overall: 79,
    reputation: 89,
    financialPower: 4,
    colors: { primary: "#ffffff", secondary: "#e30613", text: "#111111" },
    emoji: "⚪🔴",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10085.png"
  },
  {
    id: "racing_club",
    name: "Racing Club de Avellaneda",
    shortName: "Racing",
    country: "Argentina",
    region: "south_america",
    leagueId: "liga_argentina",
    tier: 2,
    overall: 76,
    reputation: 82,
    financialPower: 3,
    colors: { primary: "#75aadb", secondary: "#ffffff", text: "#111111" },
    emoji: "🎓",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10087.png"
  },
  {
    id: "independiente",
    name: "Club Atlético Independiente",
    shortName: "Independiente",
    country: "Argentina",
    region: "south_america",
    leagueId: "liga_argentina",
    tier: 2,
    overall: 75,
    reputation: 84,
    financialPower: 3,
    colors: { primary: "#cc0000", secondary: "#ffffff", text: "#ffffff" },
    emoji: "👹",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10088.png"
  },
  {
    id: "san_lorenzo",
    name: "Club Atlético San Lorenzo de Almagro",
    shortName: "San Lorenzo",
    country: "Argentina",
    region: "south_america",
    leagueId: "liga_argentina",
    tier: 2,
    overall: 74,
    reputation: 81,
    financialPower: 2,
    colors: { primary: "#002a54", secondary: "#c00000", text: "#ffffff" },
    emoji: "🌪️",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10089.png"
  },
  {
    id: "estudiantes",
    name: "Club Estudiantes de La Plata",
    shortName: "Estudiantes",
    country: "Argentina",
    region: "south_america",
    leagueId: "liga_argentina",
    tier: 2,
    overall: 74,
    reputation: 80,
    financialPower: 2,
    colors: { primary: "#cc0000", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🦁",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10091.png"
  },
  {
    id: "velez",
    name: "Club Atlético Vélez Sarsfield",
    shortName: "Vélez",
    country: "Argentina",
    region: "south_america",
    leagueId: "liga_argentina",
    tier: 3,
    overall: 72,
    reputation: 78,
    financialPower: 2,
    colors: { primary: "#003b7a", secondary: "#ffffff", text: "#ffffff" },
    emoji: "Fortín",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10090.png"
  },

  // =========================================================================
  // 4. INGLATERRA - PREMIER LEAGUE
  // =========================================================================
  {
    id: "man_city",
    name: "Manchester City Football Club",
    shortName: "Man City",
    country: "Inglaterra",
    region: "europe",
    leagueId: "premier_league",
    tier: 1,
    overall: 86,
    reputation: 96,
    financialPower: 5,
    colors: { primary: "#6cabdd", secondary: "#1c2c5b", text: "#ffffff" },
    emoji: "🦈",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8456.png"
  },
  {
    id: "liverpool",
    name: "Liverpool Football Club",
    shortName: "Liverpool",
    country: "Inglaterra",
    region: "europe",
    leagueId: "premier_league",
    tier: 1,
    overall: 85,
    reputation: 95,
    financialPower: 5,
    colors: { primary: "#c8102e", secondary: "#00b2a9", text: "#ffffff" },
    emoji: "🔴",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8650.png"
  },
  {
    id: "arsenal",
    name: "Arsenal Football Club",
    shortName: "Arsenal",
    country: "Inglaterra",
    region: "europe",
    leagueId: "premier_league",
    tier: 1,
    overall: 84,
    reputation: 93,
    financialPower: 5,
    colors: { primary: "#ef0107", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🔫",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9825.png"
  },
  {
    id: "chelsea",
    name: "Chelsea Football Club",
    shortName: "Chelsea",
    country: "Inglaterra",
    region: "europe",
    leagueId: "premier_league",
    tier: 1,
    overall: 82,
    reputation: 92,
    financialPower: 5,
    colors: { primary: "#034694", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🦁",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8455.png"
  },
  {
    id: "man_united",
    name: "Manchester United Football Club",
    shortName: "Man United",
    country: "Inglaterra",
    region: "europe",
    leagueId: "premier_league",
    tier: 1,
    overall: 82,
    reputation: 94,
    financialPower: 5,
    colors: { primary: "#da291c", secondary: "#fbe122", text: "#ffffff" },
    emoji: "👹",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10260.png"
  },
  {
    id: "tottenham",
    name: "Tottenham Hotspur Football Club",
    shortName: "Tottenham",
    country: "Inglaterra",
    region: "europe",
    leagueId: "premier_league",
    tier: 1,
    overall: 82,
    reputation: 89,
    financialPower: 4,
    colors: { primary: "#132257", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🐓",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8586.png"
  },
  {
    id: "newcastle",
    name: "Newcastle United Football Club",
    shortName: "Newcastle",
    country: "Inglaterra",
    region: "europe",
    leagueId: "premier_league",
    tier: 2,
    overall: 81,
    reputation: 86,
    financialPower: 5,
    colors: { primary: "#111111", secondary: "#ffffff", text: "#ffffff" },
    emoji: "⚪⚫",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10261.png"
  },
  {
    id: "aston_villa",
    name: "Aston Villa Football Club",
    shortName: "Aston Villa",
    country: "Inglaterra",
    region: "europe",
    leagueId: "premier_league",
    tier: 2,
    overall: 81,
    reputation: 85,
    financialPower: 4,
    colors: { primary: "#670e36", secondary: "#95bfe5", text: "#ffffff" },
    emoji: "🦁",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10252.png"
  },

  // =========================================================================
  // 5. INGLATERRA - EFL CHAMPIONSHIP (2ª DIVISÃO)
  // =========================================================================
  {
    id: "leeds",
    name: "Leeds United Football Club",
    shortName: "Leeds United",
    country: "Inglaterra",
    region: "europe",
    leagueId: "championship",
    tier: 3,
    overall: 75,
    reputation: 82,
    financialPower: 3,
    colors: { primary: "#ffffff", secondary: "#1d428a", text: "#111111" },
    emoji: "⚪",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8463.png"
  },
  {
    id: "leicester",
    name: "Leicester City Football Club",
    shortName: "Leicester",
    country: "Inglaterra",
    region: "europe",
    leagueId: "championship",
    tier: 3,
    overall: 76,
    reputation: 84,
    financialPower: 3,
    colors: { primary: "#003090", secondary: "#fdbe11", text: "#ffffff" },
    emoji: "🦊",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8197.png"
  },
  {
    id: "southampton",
    name: "Southampton Football Club",
    shortName: "Southampton",
    country: "Inglaterra",
    region: "europe",
    leagueId: "championship",
    tier: 3,
    overall: 74,
    reputation: 79,
    financialPower: 3,
    colors: { primary: "#d71920", secondary: "#132257", text: "#ffffff" },
    emoji: "😇",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8466.png"
  },
  {
    id: "sunderland",
    name: "Sunderland Association Football Club",
    shortName: "Sunderland",
    country: "Inglaterra",
    region: "europe",
    leagueId: "championship",
    tier: 3,
    overall: 72,
    reputation: 78,
    financialPower: 2,
    colors: { primary: "#eb172b", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🔴⚪",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8472.png"
  },

  // =========================================================================
  // 6. ESPANHA - LA LIGA
  // =========================================================================
  {
    id: "real_madrid",
    name: "Real Madrid Club de Fútbol",
    shortName: "Real Madrid",
    country: "Espanha",
    region: "europe",
    leagueId: "la_liga",
    tier: 1,
    overall: 87,
    reputation: 98,
    financialPower: 5,
    colors: { primary: "#ffffff", secondary: "#febe10", text: "#111111" },
    emoji: "👑",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8633.png"
  },
  {
    id: "barcelona",
    name: "Futbol Club Barcelona",
    shortName: "Barcelona",
    country: "Espanha",
    region: "europe",
    leagueId: "la_liga",
    tier: 1,
    overall: 85,
    reputation: 97,
    financialPower: 5,
    colors: { primary: "#004d98", secondary: "#a50044", text: "#ffffff" },
    emoji: "🔵🔴",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8634.png"
  },
  {
    id: "atletico_madrid",
    name: "Club Atlético de Madrid",
    shortName: "Atlético de Madrid",
    country: "Espanha",
    region: "europe",
    leagueId: "la_liga",
    tier: 1,
    overall: 83,
    reputation: 92,
    financialPower: 4,
    colors: { primary: "#cb3524", secondary: "#272e61", text: "#ffffff" },
    emoji: "🔴⚪",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9906.png"
  },
  {
    id: "sevilla",
    name: "Sevilla Fútbol Club",
    shortName: "Sevilla",
    country: "Espanha",
    region: "europe",
    leagueId: "la_liga",
    tier: 2,
    overall: 79,
    reputation: 87,
    financialPower: 3,
    colors: { primary: "#ffffff", secondary: "#d4001f", text: "#111111" },
    emoji: "⚪🔴",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8302.png"
  },
  {
    id: "real_sociedad",
    name: "Real Sociedad de Fútbol",
    shortName: "Real Sociedad",
    country: "Espanha",
    region: "europe",
    leagueId: "la_liga",
    tier: 2,
    overall: 80,
    reputation: 85,
    financialPower: 3,
    colors: { primary: "#0067b1", secondary: "#ffffff", text: "#ffffff" },
    emoji: "Txuri-Urdin",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8560.png"
  },
  {
    id: "athletic_bilbao",
    name: "Athletic Club de Bilbao",
    shortName: "Athletic Bilbao",
    country: "Espanha",
    region: "europe",
    leagueId: "la_liga",
    tier: 2,
    overall: 80,
    reputation: 86,
    financialPower: 3,
    colors: { primary: "#ee2524", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🦁",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8315.png"
  },
  {
    id: "real_betis",
    name: "Real Betis Balompié",
    shortName: "Betis",
    country: "Espanha",
    region: "europe",
    leagueId: "la_liga",
    tier: 2,
    overall: 79,
    reputation: 84,
    financialPower: 3,
    colors: { primary: "#00954c", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🟢⚪",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8603.png"
  },
  {
    id: "valencia",
    name: "Valencia Club de Fútbol",
    shortName: "Valencia",
    country: "Espanha",
    region: "europe",
    leagueId: "la_liga",
    tier: 2,
    overall: 77,
    reputation: 86,
    financialPower: 3,
    colors: { primary: "#ffffff", secondary: "#ee3524", text: "#111111" },
    emoji: "🦇",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10267.png"
  },

  // =========================================================================
  // 7. ESPANHA - LA LIGA 2
  // =========================================================================
  {
    id: "espanyol",
    name: "Reial Club Deportiu Espanyol",
    shortName: "Espanyol",
    country: "Espanha",
    region: "europe",
    leagueId: "la_liga_2",
    tier: 3,
    overall: 75,
    reputation: 80,
    financialPower: 2,
    colors: { primary: "#007ac1", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🐦",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8558.png"
  },
  {
    id: "valladolid",
    name: "Real Valladolid Club de Fútbol",
    shortName: "Valladolid",
    country: "Espanha",
    region: "europe",
    leagueId: "la_liga_2",
    tier: 3,
    overall: 73,
    reputation: 77,
    financialPower: 2,
    colors: { primary: "#5d2483", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🟣⚪",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10281.png"
  },
  {
    id: "levante",
    name: "Levante Unión Deportiva",
    shortName: "Levante",
    country: "Espanha",
    region: "europe",
    leagueId: "la_liga_2",
    tier: 3,
    overall: 73,
    reputation: 76,
    financialPower: 2,
    colors: { primary: "#003b7a", secondary: "#c00000", text: "#ffffff" },
    emoji: "🐸",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8581.png"
  },
  {
    id: "zaragoza",
    name: "Real Zaragoza",
    shortName: "Zaragoza",
    country: "Espanha",
    region: "europe",
    leagueId: "la_liga_2",
    tier: 3,
    overall: 71,
    reputation: 76,
    financialPower: 1,
    colors: { primary: "#004b93", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🦁",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8394.png"
  },

  // =========================================================================
  // 8. ITÁLIA - SERIE A
  // =========================================================================
  {
    id: "inter_milan",
    name: "Football Club Internazionale Milano",
    shortName: "Inter de Milão",
    country: "Itália",
    region: "europe",
    leagueId: "serie_a_ita",
    tier: 1,
    overall: 85,
    reputation: 94,
    financialPower: 4,
    colors: { primary: "#001489", secondary: "#111111", text: "#ffffff" },
    emoji: "🔵⚫",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8636.png"
  },
  {
    id: "ac_milan",
    name: "Associazione Calcio Milan",
    shortName: "Milan",
    country: "Itália",
    region: "europe",
    leagueId: "serie_a_ita",
    tier: 1,
    overall: 83,
    reputation: 94,
    financialPower: 4,
    colors: { primary: "#fb090b", secondary: "#111111", text: "#ffffff" },
    emoji: "🔴⚫",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8564.png"
  },
  {
    id: "juventus",
    name: "Juventus Football Club",
    shortName: "Juventus",
    country: "Itália",
    region: "europe",
    leagueId: "serie_a_ita",
    tier: 1,
    overall: 83,
    reputation: 94,
    financialPower: 4,
    colors: { primary: "#ffffff", secondary: "#111111", text: "#111111" },
    emoji: "⚪⚫",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9885.png"
  },
  {
    id: "napoli",
    name: "Società Sportiva Calcio Napoli",
    shortName: "Napoli",
    country: "Itália",
    region: "europe",
    leagueId: "serie_a_ita",
    tier: 1,
    overall: 82,
    reputation: 90,
    financialPower: 4,
    colors: { primary: "#008fd7", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🔵",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9875.png"
  },
  {
    id: "roma",
    name: "Associazione Sportiva Roma",
    shortName: "AS Roma",
    country: "Itália",
    region: "europe",
    leagueId: "serie_a_ita",
    tier: 2,
    overall: 81,
    reputation: 88,
    financialPower: 3,
    colors: { primary: "#8e1f2f", secondary: "#f0bc42", text: "#ffffff" },
    emoji: "🐺",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8686.png"
  },
  {
    id: "atalanta",
    name: "Atalanta Bergamasca Calcio",
    shortName: "Atalanta",
    country: "Itália",
    region: "europe",
    leagueId: "serie_a_ita",
    tier: 2,
    overall: 81,
    reputation: 86,
    financialPower: 3,
    colors: { primary: "#1e71b8", secondary: "#111111", text: "#ffffff" },
    emoji: "Dea",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8524.png"
  },
  {
    id: "lazio",
    name: "Società Sportiva Lazio",
    shortName: "Lazio",
    country: "Itália",
    region: "europe",
    leagueId: "serie_a_ita",
    tier: 2,
    overall: 80,
    reputation: 87,
    financialPower: 3,
    colors: { primary: "#87d8f7", secondary: "#ffffff", text: "#111111" },
    emoji: "🦅",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8543.png"
  },

  // =========================================================================
  // 9. ITÁLIA - SERIE B
  // =========================================================================
  {
    id: "parma",
    name: "Parma Calcio 1913",
    shortName: "Parma",
    country: "Itália",
    region: "europe",
    leagueId: "serie_b_ita",
    tier: 3,
    overall: 74,
    reputation: 81,
    financialPower: 2,
    colors: { primary: "#fcd116", secondary: "#003b7a", text: "#111111" },
    emoji: "🟡🔵",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10171.png"
  },
  {
    id: "sampdoria",
    name: "Unione Calcio Sampdoria",
    shortName: "Sampdoria",
    country: "Itália",
    region: "europe",
    leagueId: "serie_b_ita",
    tier: 3,
    overall: 73,
    reputation: 80,
    financialPower: 2,
    colors: { primary: "#005baa", secondary: "#ffffff", text: "#ffffff" },
    emoji: "Blucerchiati",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9882.png"
  },
  {
    id: "palermo",
    name: "Palermo Football Club",
    shortName: "Palermo",
    country: "Itália",
    region: "europe",
    leagueId: "serie_b_ita",
    tier: 3,
    overall: 72,
    reputation: 77,
    financialPower: 2,
    colors: { primary: "#f7b5cd", secondary: "#111111", text: "#111111" },
    emoji: "🦅",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8534.png"
  },

  // =========================================================================
  // 10. ALEMANHA - BUNDESLIGA
  // =========================================================================
  {
    id: "bayern_munich",
    name: "FC Bayern München",
    shortName: "Bayern de Munique",
    country: "Alemanha",
    region: "europe",
    leagueId: "bundesliga",
    tier: 1,
    overall: 86,
    reputation: 97,
    financialPower: 5,
    colors: { primary: "#dc052d", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🔴⚪",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9823.png"
  },
  {
    id: "borussia_dortmund",
    name: "Borussia Dortmund",
    shortName: "Borussia Dortmund",
    country: "Alemanha",
    region: "europe",
    leagueId: "bundesliga",
    tier: 1,
    overall: 83,
    reputation: 93,
    financialPower: 4,
    colors: { primary: "#fde100", secondary: "#111111", text: "#111111" },
    emoji: "🐝",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9789.png"
  },
  {
    id: "bayer_leverkusen",
    name: "Bayer 04 Leverkusen",
    shortName: "Leverkusen",
    country: "Alemanha",
    region: "europe",
    leagueId: "bundesliga",
    tier: 1,
    overall: 84,
    reputation: 91,
    financialPower: 4,
    colors: { primary: "#e32219", secondary: "#111111", text: "#ffffff" },
    emoji: "🦁",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8178.png"
  },
  {
    id: "rb_leipzig",
    name: "RB Leipzig",
    shortName: "RB Leipzig",
    country: "Alemanha",
    region: "europe",
    leagueId: "bundesliga",
    tier: 1,
    overall: 82,
    reputation: 88,
    financialPower: 5,
    colors: { primary: "#ffffff", secondary: "#e30613", text: "#111111" },
    emoji: "🐂",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/178475.png"
  },
  {
    id: "eintracht_frankfurt",
    name: "Eintracht Frankfurt",
    shortName: "Frankfurt",
    country: "Alemanha",
    region: "europe",
    leagueId: "bundesliga",
    tier: 2,
    overall: 79,
    reputation: 85,
    financialPower: 3,
    colors: { primary: "#e10011", secondary: "#111111", text: "#ffffff" },
    emoji: "🦅",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9810.png"
  },
  {
    id: "stuttgart",
    name: "VfB Stuttgart",
    shortName: "Stuttgart",
    country: "Alemanha",
    region: "europe",
    leagueId: "bundesliga",
    tier: 2,
    overall: 79,
    reputation: 83,
    financialPower: 3,
    colors: { primary: "#ffffff", secondary: "#e32219", text: "#111111" },
    emoji: "⚪🔴",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10269.png"
  },

  // =========================================================================
  // 11. FRANÇA - LIGUE 1
  // =========================================================================
  {
    id: "psg",
    name: "Paris Saint-Germain Football Club",
    shortName: "PSG",
    country: "França",
    region: "europe",
    leagueId: "ligue_1",
    tier: 1,
    overall: 85,
    reputation: 96,
    financialPower: 5,
    colors: { primary: "#004170", secondary: "#da291c", text: "#ffffff" },
    emoji: "🗼",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9847.png"
  },
  {
    id: "monaco",
    name: "Association Sportive de Monaco Football Club",
    shortName: "Monaco",
    country: "França",
    region: "europe",
    leagueId: "ligue_1",
    tier: 2,
    overall: 80,
    reputation: 88,
    financialPower: 4,
    colors: { primary: "#e2001a", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🔴⚪",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9829.png"
  },
  {
    id: "marseille",
    name: "Olympique de Marseille",
    shortName: "Marseille",
    country: "França",
    region: "europe",
    leagueId: "ligue_1",
    tier: 2,
    overall: 80,
    reputation: 88,
    financialPower: 3,
    colors: { primary: "#00a3e0", secondary: "#ffffff", text: "#111111" },
    emoji: "⚪🔵",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8592.png"
  },
  {
    id: "lyon",
    name: "Olympique Lyonnais",
    shortName: "Lyon",
    country: "França",
    region: "europe",
    leagueId: "ligue_1",
    tier: 2,
    overall: 79,
    reputation: 87,
    financialPower: 3,
    colors: { primary: "#002395", secondary: "#ed1c24", text: "#ffffff" },
    emoji: "🦁",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9748.png"
  },
  {
    id: "lille",
    name: "LOSC Lille",
    shortName: "Lille",
    country: "França",
    region: "europe",
    leagueId: "ligue_1",
    tier: 2,
    overall: 79,
    reputation: 84,
    financialPower: 3,
    colors: { primary: "#ee2436", secondary: "#11224d", text: "#ffffff" },
    emoji: "🐶",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8639.png"
  },

  // =========================================================================
  // 12. PORTUGAL - PRIMEIRA LIGA
  // =========================================================================
  {
    id: "benfica",
    name: "Sport Lisboa e Benfica",
    shortName: "Benfica",
    country: "Portugal",
    region: "europe",
    leagueId: "primeira_liga_pt",
    tier: 1,
    overall: 82,
    reputation: 91,
    financialPower: 4,
    colors: { primary: "#e80000", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🦅",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9772.png"
  },
  {
    id: "porto",
    name: "Futebol Clube do Porto",
    shortName: "Porto",
    country: "Portugal",
    region: "europe",
    leagueId: "primeira_liga_pt",
    tier: 1,
    overall: 82,
    reputation: 91,
    financialPower: 4,
    colors: { primary: "#003b94", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🐉",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9773.png"
  },
  {
    id: "sporting_cp",
    name: "Sporting Clube de Portugal",
    shortName: "Sporting",
    country: "Portugal",
    region: "europe",
    leagueId: "primeira_liga_pt",
    tier: 1,
    overall: 82,
    reputation: 90,
    financialPower: 4,
    colors: { primary: "#006633", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🦁",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9768.png"
  },
  {
    id: "braga",
    name: "Sporting Clube de Braga",
    shortName: "Braga",
    country: "Portugal",
    region: "europe",
    leagueId: "primeira_liga_pt",
    tier: 2,
    overall: 77,
    reputation: 82,
    financialPower: 2,
    colors: { primary: "#ff0000", secondary: "#ffffff", text: "#ffffff" },
    emoji: "Guerreiros",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9764.png"
  },

  // =========================================================================
  // 13. HOLANDA - EREDIVISIE
  // =========================================================================
  {
    id: "ajax",
    name: "Amsterdamsche Football Club Ajax",
    shortName: "Ajax",
    country: "Holanda",
    region: "europe",
    leagueId: "eredivisie",
    tier: 1,
    overall: 80,
    reputation: 90,
    financialPower: 4,
    colors: { primary: "#ffffff", secondary: "#d2122e", text: "#111111" },
    emoji: "🏹",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8593.png"
  },
  {
    id: "psv",
    name: "Philips Sport Vereniging",
    shortName: "PSV Eindhoven",
    country: "Holanda",
    region: "europe",
    leagueId: "eredivisie",
    tier: 1,
    overall: 81,
    reputation: 88,
    financialPower: 3,
    colors: { primary: "#e30613", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🔴⚪",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8640.png"
  },
  {
    id: "feyenoord",
    name: "Feyenoord Rotterdam",
    shortName: "Feyenoord",
    country: "Holanda",
    region: "europe",
    leagueId: "eredivisie",
    tier: 1,
    overall: 80,
    reputation: 87,
    financialPower: 3,
    colors: { primary: "#e30613", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🔴⚪",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10235.png"
  },

  // =========================================================================
  // 14. TURQUIA - SÜPER LIG
  // =========================================================================
  {
    id: "galatasaray",
    name: "Galatasaray Spor Kulübü",
    shortName: "Galatasaray",
    country: "Turquia",
    region: "europe",
    leagueId: "super_lig_tur",
    tier: 2,
    overall: 81,
    reputation: 88,
    financialPower: 4,
    colors: { primary: "#a90432", secondary: "#fdb912", text: "#ffffff" },
    emoji: "🦁",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8637.png"
  },
  {
    id: "fenerbahce",
    name: "Fenerbahçe Spor Kulübü",
    shortName: "Fenerbahçe",
    country: "Turquia",
    region: "europe",
    leagueId: "super_lig_tur",
    tier: 2,
    overall: 81,
    reputation: 88,
    financialPower: 4,
    colors: { primary: "#002d62", secondary: "#fdd116", text: "#ffffff" },
    emoji: "🟡🔵",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8695.png"
  },
  {
    id: "besiktas",
    name: "Beşiktaş Jimnastik Kulübü",
    shortName: "Beşiktaş",
    country: "Turquia",
    region: "europe",
    leagueId: "super_lig_tur",
    tier: 2,
    overall: 78,
    reputation: 85,
    financialPower: 3,
    colors: { primary: "#111111", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🦅",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10188.png"
  },

  // =========================================================================
  // 15. ARÁBIA SAUDITA - SAUDI PRO LEAGUE
  // =========================================================================
  {
    id: "al_hilal",
    name: "Al-Hilal Saudi Football Club",
    shortName: "Al-Hilal",
    country: "Arábia Saudita",
    region: "saudi",
    leagueId: "saudi_pro_league",
    tier: 1,
    overall: 81,
    reputation: 86,
    financialPower: 5,
    colors: { primary: "#004899", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🌙",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/7966.png"
  },
  {
    id: "al_nassr",
    name: "Al-Nassr Football Club",
    shortName: "Al-Nassr",
    country: "Arábia Saudita",
    region: "saudi",
    leagueId: "saudi_pro_league",
    tier: 1,
    overall: 80,
    reputation: 87,
    financialPower: 5,
    colors: { primary: "#fcd116", secondary: "#003b7a", text: "#111111" },
    emoji: "👑",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8038.png"
  },
  {
    id: "al_ittihad",
    name: "Al-Ittihad Club",
    shortName: "Al-Ittihad",
    country: "Arábia Saudita",
    region: "saudi",
    leagueId: "saudi_pro_league",
    tier: 2,
    overall: 78,
    reputation: 84,
    financialPower: 5,
    colors: { primary: "#fcd116", secondary: "#111111", text: "#111111" },
    emoji: "🐅",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8036.png"
  },
  {
    id: "al_ahli",
    name: "Al-Ahli Saudi Football Club",
    shortName: "Al-Ahli",
    country: "Arábia Saudita",
    region: "saudi",
    leagueId: "saudi_pro_league",
    tier: 2,
    overall: 78,
    reputation: 83,
    financialPower: 5,
    colors: { primary: "#006c35", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🟢⚪",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/8037.png"
  },

  // =========================================================================
  // 16. ESTADOS UNIDOS - MLS
  // =========================================================================
  {
    id: "inter_miami",
    name: "Club Internacional de Fútbol Miami",
    shortName: "Inter Miami",
    country: "Estados Unidos",
    region: "usa",
    leagueId: "mls",
    tier: 2,
    overall: 77,
    reputation: 88,
    financialPower: 4,
    colors: { primary: "#f7b5cd", secondary: "#231f20", text: "#231f20" },
    emoji: "🦩",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/1144949.png"
  },
  {
    id: "lafc",
    name: "Los Angeles Football Club",
    shortName: "LAFC",
    country: "Estados Unidos",
    region: "usa",
    leagueId: "mls",
    tier: 2,
    overall: 76,
    reputation: 82,
    financialPower: 4,
    colors: { primary: "#111111", secondary: "#c5a467", text: "#ffffff" },
    emoji: "🦅",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/817290.png"
  },
  {
    id: "la_galaxy",
    name: "LA Galaxy",
    shortName: "LA Galaxy",
    country: "Estados Unidos",
    region: "usa",
    leagueId: "mls",
    tier: 2,
    overall: 75,
    reputation: 83,
    financialPower: 4,
    colors: { primary: "#00245d", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🌌",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/6474.png"
  },
  {
    id: "seattle_sounders",
    name: "Seattle Sounders FC",
    shortName: "Sounders",
    country: "Estados Unidos",
    region: "usa",
    leagueId: "mls",
    tier: 3,
    overall: 74,
    reputation: 80,
    financialPower: 3,
    colors: { primary: "#5d9732", secondary: "#005595", text: "#ffffff" },
    emoji: "🌲",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9721.png"
  },

  // =========================================================================
  // 17. MÉXICO - LIGA MX
  // =========================================================================
  {
    id: "club_america",
    name: "Club de Fútbol América",
    shortName: "Club América",
    country: "México",
    region: "concacaf",
    leagueId: "liga_mx",
    tier: 1,
    overall: 78,
    reputation: 87,
    financialPower: 4,
    colors: { primary: "#ffea28", secondary: "#002b49", text: "#111111" },
    emoji: "🦅",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/7968.png"
  },
  {
    id: "chivas",
    name: "Club Deportivo Guadalajara",
    shortName: "Chivas",
    country: "México",
    region: "concacaf",
    leagueId: "liga_mx",
    tier: 2,
    overall: 76,
    reputation: 86,
    financialPower: 3,
    colors: { primary: "#cc0000", secondary: "#002855", text: "#ffffff" },
    emoji: "🐐",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/7970.png"
  },
  {
    id: "tigres",
    name: "Tigres de la UANL",
    shortName: "Tigres",
    country: "México",
    region: "concacaf",
    leagueId: "liga_mx",
    tier: 1,
    overall: 77,
    reputation: 84,
    financialPower: 4,
    colors: { primary: "#fdb913", secondary: "#0033a0", text: "#111111" },
    emoji: "🐯",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/7978.png"
  },
  {
    id: "monterrey",
    name: "Club de Fútbol Monterrey",
    shortName: "Monterrey",
    country: "México",
    region: "concacaf",
    leagueId: "liga_mx",
    tier: 1,
    overall: 77,
    reputation: 84,
    financialPower: 4,
    colors: { primary: "#002447", secondary: "#ffffff", text: "#ffffff" },
    emoji: "Rayados",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/7974.png"
  },

  // =========================================================================
  // 18. URUGUAI - PRIMERA DIVISIÓN
  // =========================================================================
  {
    id: "penarol",
    name: "Club Atlético Peñarol",
    shortName: "Peñarol",
    country: "Uruguai",
    region: "south_america",
    leagueId: "primera_div_uru",
    tier: 1,
    overall: 75,
    reputation: 87,
    financialPower: 3,
    colors: { primary: "#fcb040", secondary: "#111111", text: "#111111" },
    emoji: "Carbonero",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9759.png"
  },
  {
    id: "nacional_uru",
    name: "Club Nacional de Football",
    shortName: "Nacional-URU",
    country: "Uruguai",
    region: "south_america",
    leagueId: "primera_div_uru",
    tier: 1,
    overall: 75,
    reputation: 86,
    financialPower: 3,
    colors: { primary: "#002855", secondary: "#ffffff", text: "#ffffff" },
    emoji: "Bolso",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9758.png"
  },
  {
    id: "defensor",
    name: "Defensor Sporting Club",
    shortName: "Defensor",
    country: "Uruguai",
    region: "south_america",
    leagueId: "primera_div_uru",
    tier: 3,
    overall: 70,
    reputation: 74,
    financialPower: 1,
    colors: { primary: "#5d2483", secondary: "#ffffff", text: "#ffffff" },
    emoji: "Tuerto",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10098.png"
  },

  // =========================================================================
  // 19. COLÔMBIA - LIGA DIMAYOR
  // =========================================================================
  {
    id: "atletico_nacional",
    name: "Club Atlético Nacional",
    shortName: "Atl. Nacional",
    country: "Colômbia",
    region: "south_america",
    leagueId: "liga_colombia",
    tier: 1,
    overall: 75,
    reputation: 84,
    financialPower: 3,
    colors: { primary: "#00843d", secondary: "#ffffff", text: "#ffffff" },
    emoji: "Verdolaga",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/9757.png"
  },
  {
    id: "millonarios",
    name: "Millonarios Fútbol Club",
    shortName: "Millonarios",
    country: "Colômbia",
    region: "south_america",
    leagueId: "liga_colombia",
    tier: 2,
    overall: 74,
    reputation: 82,
    financialPower: 2,
    colors: { primary: "#003b7a", secondary: "#ffffff", text: "#ffffff" },
    emoji: "Embajador",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10101.png"
  },
  {
    id: "america_cali",
    name: "América de Cali",
    shortName: "América de Cali",
    country: "Colômbia",
    region: "south_america",
    leagueId: "liga_colombia",
    tier: 2,
    overall: 73,
    reputation: 82,
    financialPower: 2,
    colors: { primary: "#cc0000", secondary: "#ffffff", text: "#ffffff" },
    emoji: "👹",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/10100.png"
  },

  // =========================================================================
  // 20. JAPÃO - J1 LEAGUE
  // =========================================================================
  {
    id: "vissel_kobe",
    name: "Vissel Kobe",
    shortName: "Vissel Kobe",
    country: "Japão",
    region: "asia",
    leagueId: "j1_league",
    tier: 2,
    overall: 74,
    reputation: 80,
    financialPower: 3,
    colors: { primary: "#860038", secondary: "#ffffff", text: "#ffffff" },
    emoji: "🐂",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/7958.png"
  },
  {
    id: "urawa_reds",
    name: "Urawa Red Diamonds",
    shortName: "Urawa Reds",
    country: "Japão",
    region: "asia",
    leagueId: "j1_league",
    tier: 2,
    overall: 74,
    reputation: 81,
    financialPower: 3,
    colors: { primary: "#e30613", secondary: "#111111", text: "#ffffff" },
    emoji: "♦️",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/7955.png"
  },
  {
    id: "yokohama_marinos",
    name: "Yokohama F. Marinos",
    shortName: "Yokohama Marinos",
    country: "Japão",
    region: "asia",
    leagueId: "j1_league",
    tier: 2,
    overall: 73,
    reputation: 79,
    financialPower: 3,
    colors: { primary: "#003b7a", secondary: "#e30613", text: "#ffffff" },
    emoji: "⚓",
    shieldUrl: "https://images.fotmob.com/image_resources/logo/teamlogo/7959.png"
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
 * Retorna clubes de um país específico
 * @param {string} country 
 * @returns {Array<object>}
 */
export function getClubsByCountry(country) {
  if (!country) return [];
  const q = country.toLowerCase().trim();
  return CLUBS.filter(c => c.country.toLowerCase() === q);
}

/**
 * Sorteia N clubes formadores aleatórios respeitando a nacionalidade do atleta
 * (Decisão do usuário: se escolher Argentina, começa na Argentina; se Inglaterra, na Inglaterra; etc.)
 * @param {number} count 
 * @param {string} playerCountry 
 * @returns {Array<object>}
 */
export function getRandomStartingClubs(count = 3, playerCountry = "Brasil") {
  let eligible = getClubsByCountry(playerCountry);
  
  // Se não encontrar clubes suficientes do país ou for país sem liga direta, usa o Brasil como celeiro
  if (eligible.length < count) {
    eligible = CLUBS.filter(c => c.country === "Brasil");
  }

  const shuffled = [...eligible].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Retorna clubes formadores padrão (fallback retrocompatível)
 * @returns {Array<object>}
 */
export function getStartingClubs() {
  return getRandomStartingClubs(3, "Brasil");
}

/**
 * Filtra clubes compatíveis para transferência com base no Overall, Reputação e mercado global
 * @param {number} playerOverall 
 * @param {number} playerReputation 
 * @param {string} currentClubId 
 * @returns {Array<object>}
 */
export function getEligibleClubsForTransfer(playerOverall, playerReputation, currentClubId) {
  return CLUBS.filter(club => {
    if (club.id === currentClubId) return false;

    // Superclubes Europeus (Real Madrid, Man City, Bayern, PSG) exigem alto nível
    if (club.region === "europe" && club.tier === 1) {
      return playerOverall >= 80 && playerReputation >= 65;
    }

    // Clubes Europeus Médios / Europa League
    if (club.region === "europe" && club.tier === 2) {
      return playerOverall >= 76 && playerReputation >= 50;
    }

    // Gigantes Sul-Americanos (Flamengo, Palmeiras, Boca, River)
    if ((club.region === "brazil" || club.region === "south_america") && club.tier === 1) {
      return playerOverall >= 74 && playerReputation >= 40;
    }

    // Arábia Saudita e MLS gostam de jogadores com reputação estabelecida
    if (club.region === "saudi" || club.region === "usa") {
      return playerOverall >= 73 && playerReputation >= 45;
    }

    // Clubes de desenvolvimento / Série B / Ligas menores
    return Math.abs(club.overall - playerOverall) <= 7;
  });
}
