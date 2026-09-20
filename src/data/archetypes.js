/**
 * CARREIRA FC - BANCO DE DADOS: POSIÇÕES E ARQUÉTIPOS
 * Define as 10 posições táticas do futebol moderno e seus arquétipos com modificadores matemáticos.
 */

export const POSITIONS = {
  GOL: {
    code: "GOL",
    name: "Goleiro",
    short: "GOL",
    category: "defesa",
    icon: "🧤",
    description: "Guardião da meta. Decisivo em cobranças de pênaltis e milagres no mano a mano.",
    pitchCoords: { top: 86, left: 50 } // Coordenadas percentuais no campo
  },
  ZAG: {
    code: "ZAG",
    name: "Zagueiro",
    short: "ZAG",
    category: "defesa",
    icon: "🛡️",
    description: "Pilar defensivo central. Desarmes pontuais, imposição física e presença na bola aérea.",
    pitchCoords: { top: 72, left: 50 }
  },
  LD: {
    code: "LD",
    name: "Lateral-Direito",
    short: "LD",
    category: "defesa",
    icon: "🏃‍♂️",
    description: "Dono do corredor direito. Apoio veloz ao ataque, cruzamentos na área e cobertura na linha de fundo.",
    pitchCoords: { top: 68, left: 82 }
  },
  LE: {
    code: "LE",
    name: "Lateral-Esquerdo",
    short: "LE",
    category: "defesa",
    icon: "🏃‍♂️",
    description: "Dono do corredor esquerdo. Arrancadas fulminantes, tabelas ofensivas e recuperação defensiva.",
    pitchCoords: { top: 68, left: 18 }
  },
  VOL: {
    code: "VOL",
    name: "Primeiro Volante",
    short: "VOL",
    category: "meio",
    icon: "🧱",
    description: "O cão de guarda da cabeça de área. Desarmes implacáveis, proteção à zaga e vigor incansável.",
    pitchCoords: { top: 55, left: 50 }
  },
  MC: {
    code: "MC",
    name: "Meia Central",
    short: "MC",
    category: "meio",
    icon: "⚙️",
    description: "O motor do time. Ditador de ritmo, transição veloz da defesa ao ataque e passes de ruptura.",
    pitchCoords: { top: 43, left: 34 }
  },
  MEI: {
    code: "MEI",
    name: "Meia-Atacante (Armador)",
    short: "MEI",
    category: "meio",
    icon: "🎯",
    description: "O camisa 10 clássico. Visão de jogo, assistências açucaradas e chutes perigosos de média distância.",
    pitchCoords: { top: 35, left: 66 }
  },
  PE: {
    code: "PE",
    name: "Ponta-Esquerda",
    short: "PE",
    category: "ataque",
    icon: "⚡",
    description: "Extremo agudo pela esquerda. Dribles no mano a mano, infiltrações diagonais e finalizações perigosas.",
    pitchCoords: { top: 20, left: 20 }
  },
  PD: {
    code: "PD",
    name: "Ponta-Direita",
    short: "PD",
    category: "ataque",
    icon: "⚡",
    description: "Extremo agudo pela direita. Velocidade terminal, linha de fundo, cruzamentos venenosos e cortes para o meio.",
    pitchCoords: { top: 20, left: 80 }
  },
  CA: {
    code: "CA",
    name: "Centroavante (Camisa 9)",
    short: "CA",
    category: "ataque",
    icon: "⚽",
    description: "A referência letal da área. Faro apurado de gol, oportunismo de finalização e presença física entre os zagueiros.",
    pitchCoords: { top: 12, left: 50 }
  }
};

export const ARCHETYPES = [
  // ==========================================
  // 1. GOLEIRO (GOL)
  // ==========================================
  {
    id: "paredao",
    position: "GOL",
    name: "Paredão Debaixo das Traves",
    shortDesc: "Reflexos apurados em chutes à queima-roupa e segurança nas defesas difíceis.",
    modifiers: { goalMult: 0.0, assistMult: 0.05, ratingBaseBonus: 0.35, physicalBonus: 5, injuryRisk: 0.85 }
  },
  {
    id: "pegador_penaltis",
    position: "GOL",
    name: "Pegador de Pênaltis",
    shortDesc: "Especialista frio em decisões por pênaltis e confrontos eliminatórios de mata-mata.",
    modifiers: { goalMult: 0.0, assistMult: 0.05, ratingBaseBonus: 0.30, physicalBonus: 3, injuryRisk: 0.85 }
  },
  {
    id: "goleiro_artilheiro",
    position: "GOL",
    name: "Goleiro-Linha / Cobrador de Faltas",
    shortDesc: "Estilo Rogério Ceni: excelente jogo de pés e autor de gols raros de falta e pênalti.",
    modifiers: { goalMult: 1.0, assistMult: 0.35, ratingBaseBonus: 0.25, physicalBonus: 0, injuryRisk: 0.95 }
  },

  // ==========================================
  // 2. ZAGUEIRO (ZAG)
  // ==========================================
  {
    id: "xerife",
    position: "ZAG",
    name: "Xerife Imponente",
    shortDesc: "Comandante da zaga, liderança nata e imposição física absoluta pelo chão.",
    modifiers: { goalMult: 0.85, assistMult: 0.50, ratingBaseBonus: 0.35, physicalBonus: 7, injuryRisk: 0.85 }
  },
  {
    id: "zag_artilheiro",
    position: "ZAG",
    name: "Zagueiro Artilheiro (Bola Aérea)",
    shortDesc: "Ameaça aérea constante em bolas paradas e escanteios no segundo pau.",
    modifiers: { goalMult: 1.80, assistMult: 0.70, ratingBaseBonus: 0.25, physicalBonus: 3, injuryRisk: 0.95 }
  },
  {
    id: "libero_tecnico",
    position: "ZAG",
    name: "Zagueiro Construtor (Líbero)",
    shortDesc: "Elegante na saída de bola, lançamentos longos milimétricos e cobertura inteligente.",
    modifiers: { goalMult: 0.70, assistMult: 1.25, ratingBaseBonus: 0.28, physicalBonus: 0, injuryRisk: 0.95 }
  },

  // ==========================================
  // 3 & 4. LATERAIS (LD e LE)
  // ==========================================
  {
    id: "lateral_ofensivo_ld",
    position: "LD",
    name: "Lateral Ofensivo / Ala Agudo",
    shortDesc: "Incansável no apoio ao ataque, tabelas velozes e enxurrada de assistências.",
    modifiers: { goalMult: 1.10, assistMult: 1.60, ratingBaseBonus: 0.20, physicalBonus: 3, injuryRisk: 1.05 }
  },
  {
    id: "lateral_construtor_ld",
    position: "LD",
    name: "Lateral Construtor / Invertido",
    shortDesc: "Corta por dentro na armação das jogadas com visão refinada e regularidade tática.",
    modifiers: { goalMult: 0.80, assistMult: 1.30, ratingBaseBonus: 0.28, physicalBonus: 1, injuryRisk: 0.95 }
  },
  {
    id: "lateral_ofensivo_le",
    position: "LE",
    name: "Lateral Ofensivo / Ala Agudo",
    shortDesc: "Incansável no apoio ao ataque, cruzamentos venenosos e assistências decisivas.",
    modifiers: { goalMult: 1.10, assistMult: 1.60, ratingBaseBonus: 0.20, physicalBonus: 3, injuryRisk: 1.05 }
  },
  {
    id: "lateral_defensivo_le",
    position: "LE",
    name: "Lateral Defensivo / Raçudo",
    shortDesc: "Fecha a linha de quatro, anula os pontas adversários e nunca perde um desarme.",
    modifiers: { goalMult: 0.50, assistMult: 0.90, ratingBaseBonus: 0.32, physicalBonus: 6, injuryRisk: 0.90 }
  },

  // ==========================================
  // 5. PRIMEIRO VOLANTE (VOL)
  // ==========================================
  {
    id: "volante_cao_guarda",
    position: "VOL",
    name: "Cão de Guarda / Triturador",
    shortDesc: "Dono absoluto da cabeça de área, desarmes limpos e raça que incendeia as arquibancadas.",
    modifiers: { goalMult: 0.45, assistMult: 0.70, ratingBaseBonus: 0.35, physicalBonus: 8, injuryRisk: 0.85 }
  },
  {
    id: "volante_passador",
    position: "VOL",
    name: "Volante de Saída Qualificada",
    shortDesc: "O primeiro passe elegante do time. Vira o jogo com precisão e dita o ritmo inicial.",
    modifiers: { goalMult: 0.70, assistMult: 1.20, ratingBaseBonus: 0.28, physicalBonus: 2, injuryRisk: 0.95 }
  },

  // ==========================================
  // 6. MEIA CENTRAL (MC)
  // ==========================================
  {
    id: "box_to_box_mc",
    position: "MC",
    name: "Meia Box-to-Box Incansável",
    shortDesc: "Corre a área adversária para chutar e volta correndo para marcar. Fôlego de aço.",
    modifiers: { goalMult: 1.15, assistMult: 1.20, ratingBaseBonus: 0.25, physicalBonus: 6, injuryRisk: 0.95 }
  },
  {
    id: "maestro_mc",
    position: "MC",
    name: "Ditador de Ritmo / Cadenciador",
    shortDesc: "Controle absoluto da posse de bola, passes entre linhas e inteligência posicional.",
    modifiers: { goalMult: 0.75, assistMult: 1.45, ratingBaseBonus: 0.30, physicalBonus: -2, injuryRisk: 0.95 }
  },

  // ==========================================
  // 7. MEIA-ATACANTE / ARMADOR (MEI)
  // ==========================================
  {
    id: "camisa_10_mei",
    position: "MEI",
    name: "Camisa 10 Clássico (Maestro)",
    shortDesc: "Toques de calcanhar, passes açucarados, cobranças de falta e magia pura.",
    modifiers: { goalMult: 1.15, assistMult: 1.65, ratingBaseBonus: 0.22, physicalBonus: -4, injuryRisk: 1.05 }
  },
  {
    id: "meia_infiltrador_mei",
    position: "MEI",
    name: "Meia-Atacante Infiltrador",
    shortDesc: "Surge como elemento surpresa dentro da área para finalizar cruzamentos.",
    modifiers: { goalMult: 1.35, assistMult: 1.15, ratingBaseBonus: 0.20, physicalBonus: 2, injuryRisk: 1.00 }
  },

  // ==========================================
  // 8. PONTA-ESQUERDA (PE)
  // ==========================================
  {
    id: "ponta_invertido_pe",
    position: "PE",
    name: "Extremo Invertido / Finalizador",
    shortDesc: "Corta da ponta para o pé direito e chuta colocado na gaveta oposta.",
    modifiers: { goalMult: 1.35, assistMult: 1.15, ratingBaseBonus: 0.18, physicalBonus: -2, injuryRisk: 1.10 }
  },
  {
    id: "ponta_agudo_pe",
    position: "PE",
    name: "Ponta Driblador & Assistente",
    shortDesc: "Dribles elásticos, linha de fundo e cruzamentos perfeitos na cabeça do 9.",
    modifiers: { goalMult: 0.95, assistMult: 1.55, ratingBaseBonus: 0.15, physicalBonus: 0, injuryRisk: 1.15 }
  },

  // ==========================================
  // 9. PONTA-DIREITA (PD)
  // ==========================================
  {
    id: "ponta_invertido_pd",
    position: "PD",
    name: "Extremo Canhoto / Finalizador",
    shortDesc: "Velocidade explosiva, corte para dentro com a canhota e chutes cruzados letais.",
    modifiers: { goalMult: 1.35, assistMult: 1.15, ratingBaseBonus: 0.18, physicalBonus: -2, injuryRisk: 1.10 }
  },
  {
    id: "ponta_agudo_pd",
    position: "PD",
    name: "Ponta Veloz & Cruzador",
    shortDesc: "Ganha na velocidade pura dos zagueiros e serve gols feitos aos atacantes.",
    modifiers: { goalMult: 0.95, assistMult: 1.55, ratingBaseBonus: 0.15, physicalBonus: 0, injuryRisk: 1.15 }
  },

  // ==========================================
  // 10. CENTROAVANTE (CA)
  // ==========================================
  {
    id: "matador_ca",
    position: "CA",
    name: "Matador de Área (Camisa 9 Puro)",
    shortDesc: "Um toque, um gol. Frieza cirúrgica, posicionamento de predador e faro artilheiro.",
    modifiers: { goalMult: 1.45, assistMult: 0.60, ratingBaseBonus: 0.18, physicalBonus: 2, injuryRisk: 1.00 }
  },
  {
    id: "pivo_ca",
    position: "CA",
    name: "Centroavante Pivô & Cabeceador",
    shortDesc: "Imposição física nas costas dos zagueiros, segurando a bola e voando nas bolas aéreas.",
    modifiers: { goalMult: 1.25, assistMult: 1.10, ratingBaseBonus: 0.22, physicalBonus: 7, injuryRisk: 0.90 }
  },
  {
    id: "avancado_movel_ca",
    position: "CA",
    name: "Centroavante Móvel",
    shortDesc: "Sai da área para dialogar com os pontas, atrai marcadores e decide com velocidade.",
    modifiers: { goalMult: 1.15, assistMult: 1.30, ratingBaseBonus: 0.22, physicalBonus: 0, injuryRisk: 1.05 }
  }
];

/**
 * Retorna arquétipos compatíveis com a posição informada
 * @param {string} positionCode 
 * @returns {Array<object>}
 */
export function getArchetypesByPosition(positionCode) {
  return ARCHETYPES.filter(a => a.position === positionCode);
}

/**
 * Busca arquétipo por ID
 * @param {string} id 
 * @returns {object|null}
 */
export function getArchetypeById(id) {
  return ARCHETYPES.find(a => a.id === id) || null;
}
