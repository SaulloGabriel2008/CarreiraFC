/**
 * CARREIRA FC - BANCO DE DADOS: POSIÇÕES E ARQUÉTIPOS
 * Define as 4 posições fundamentais e seus arquétipos táticos com modificadores matemáticos.
 */

export const POSITIONS = {
  GOL: {
    code: "GOL",
    name: "Goleiro",
    icon: "🧤",
    description: "Último homem e guardião da meta. Decisivo em cobranças de pênalti e confrontos de copas."
  },
  ZAG: {
    code: "ZAG",
    name: "Zagueiro",
    icon: "🛡️",
    description: "Pilar defensivo. Desarmes pontuais, imposição física e presença em bolas paradas aéreas."
  },
  MEI: {
    code: "MEI",
    name: "Meio-Campista",
    icon: "🎯",
    description: "O cérebro da equipe. Distribuição de passes, assistências milimétricas e controle de ritmo."
  },
  ATA: {
    code: "ATA",
    name: "Atacante",
    icon: "⚡",
    description: "A esperança do gol. Finalização clínica, velocidade pelas pontas e poder de decisão nos clássicos."
  }
};

export const ARCHETYPES = [
  // ==========================================
  // ARQUÉTIPOS: ATACANTE (ATA)
  // ==========================================
  {
    id: "matador",
    position: "ATA",
    name: "Matador de Área",
    shortDesc: "Puro faro de gol e frieza na cara do goleiro.",
    modifiers: {
      goalMult: 1.30,
      assistMult: 0.70,
      ratingBaseBonus: 0.15,
      physicalBonus: 0,
      injuryRisk: 1.0,
      fanPopularityMult: 1.25 // Mais manchetes de jornal
    }
  },
  {
    id: "ponta_veloz",
    position: "ATA",
    name: "Ponta Veloz & Driblador",
    shortDesc: "Arrancadas fulminantes, dribles desconcertantes e assistências.",
    modifiers: {
      goalMult: 0.95,
      assistMult: 1.40,
      ratingBaseBonus: 0.10,
      physicalBonus: -3,
      injuryRisk: 1.15, // Mais caçado em campo
      fanPopularityMult: 1.20
    }
  },
  {
    id: "guerreiro_tatico",
    position: "ATA",
    name: "Atacante Tático / Rompedor",
    shortDesc: "Muita entrega física, pressão na zaga adversária e regularidade.",
    modifiers: {
      goalMult: 1.05,
      assistMult: 1.00,
      ratingBaseBonus: 0.25,
      physicalBonus: 6,
      injuryRisk: 0.90,
      fanPopularityMult: 1.05
    }
  },

  // ==========================================
  // ARQUÉTIPOS: MEIO-CAMPO (MEI)
  // ==========================================
  {
    id: "camisa_10",
    position: "MEI",
    name: "Camisa 10 Clássico (Maestro)",
    shortDesc: "Visão periférica transcendental, passes de calcanhar e cobranças de falta.",
    modifiers: {
      goalMult: 1.15,
      assistMult: 1.55,
      ratingBaseBonus: 0.20,
      physicalBonus: -4,
      injuryRisk: 1.05,
      fanPopularityMult: 1.30
    }
  },
  {
    id: "volante_racudo",
    position: "MEI",
    name: "Volante Cão de Guarda",
    shortDesc: "Desarmes na bola, raça indiscutível e dono da cabeça de área.",
    modifiers: {
      goalMult: 0.50,
      assistMult: 0.75,
      ratingBaseBonus: 0.30, // Garante notas sólidas mesmo sem gols
      physicalBonus: 8,
      injuryRisk: 0.85,
      fanPopularityMult: 1.00
    }
  },
  {
    id: "box_to_box",
    position: "MEI",
    name: "Meia Box-to-Box Moderno",
    shortDesc: "Chega na área para finalizar e volta para defender com vigor.",
    modifiers: {
      goalMult: 1.10,
      assistMult: 1.15,
      ratingBaseBonus: 0.22,
      physicalBonus: 4,
      injuryRisk: 1.00,
      fanPopularityMult: 1.10
    }
  },

  // ==========================================
  // ARQUÉTIPOS: ZAGUEIRO (ZAG)
  // ==========================================
  {
    id: "xerife",
    position: "ZAG",
    name: "Xerife Imponente",
    shortDesc: "Comandante da zaga, imposição física no mano a mano e liderança nata.",
    modifiers: {
      goalMult: 0.90,
      assistMult: 0.60,
      ratingBaseBonus: 0.35,
      physicalBonus: 7,
      injuryRisk: 0.85,
      fanPopularityMult: 1.10
    }
  },
  {
    id: "zag_artilheiro",
    position: "ZAG",
    name: "Zagueiro Artilheiro (Bola Aérea)",
    shortDesc: "Perigoso nas cobranças de escanteio e cabeceios no segundo pau.",
    modifiers: {
      goalMult: 1.80, // Faz 3 a 7 gols por ano
      assistMult: 0.80,
      ratingBaseBonus: 0.25,
      physicalBonus: 2,
      injuryRisk: 1.00,
      fanPopularityMult: 1.20
    }
  },
  {
    id: "libero_tecnico",
    position: "ZAG",
    name: "Zagueiro Construtor (Líbero)",
    shortDesc: "Excelente saída de bola, lançamentos longos e cobertura inteligente.",
    modifiers: {
      goalMult: 0.70,
      assistMult: 1.30,
      ratingBaseBonus: 0.28,
      physicalBonus: 0,
      injuryRisk: 0.95,
      fanPopularityMult: 1.05
    }
  },

  // ==========================================
  // ARQUÉTIPOS: GOLEIRO (GOL)
  // ==========================================
  {
    id: "paredao",
    position: "GOL",
    name: "Paredão Debaixo das Traves",
    shortDesc: "Reflexos sobre-humanos em chutes à queima-roupa e milagres constantes.",
    modifiers: {
      goalMult: 0.00,
      assistMult: 0.10,
      ratingBaseBonus: 0.40,
      physicalBonus: 5,
      injuryRisk: 0.80,
      fanPopularityMult: 1.25
    }
  },
  {
    id: "pegador_penaltis",
    position: "GOL",
    name: "Pegador de Pênaltis",
    shortDesc: "Frieza psicológica imbatível nas decisões eliminatórias por pênaltis.",
    modifiers: {
      goalMult: 0.00,
      assistMult: 0.10,
      ratingBaseBonus: 0.35,
      physicalBonus: 3,
      injuryRisk: 0.80,
      cupDecisivenessBonus: 0.25, // Bônus em mata-mata
      fanPopularityMult: 1.30
    }
  },
  {
    id: "goleiro_artilheiro",
    position: "GOL",
    name: "Goleiro-Linha / Cobrador de Faltas",
    shortDesc: "Estilo Rogério Ceni: excelente jogo de pés e bate faltas e pênaltis.",
    modifiers: {
      goalMult: 1.00, // Permite 1 a 4 gols raros no ano
      assistMult: 0.40,
      ratingBaseBonus: 0.30,
      physicalBonus: 0,
      injuryRisk: 0.90,
      fanPopularityMult: 1.40
    }
  }
];

/**
 * Retorna os arquétipos disponíveis para uma determinada posição
 * @param {'GOL' | 'ZAG' | 'MEI' | 'ATA'} positionCode 
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
