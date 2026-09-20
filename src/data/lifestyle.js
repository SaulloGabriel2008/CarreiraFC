/**
 * CARREIRA FC - DADOS: VIDA & FORTUNA (LIFESTYLE)
 * Catálogo de compras de estilo de vida, bens de luxo, staff esportivo,
 * investimentos e projetos sociais para o atleta usar seu dinheiro.
 */

export const LIFESTYLE_CATEGORIES = [
  { id: 'garage', name: '🏎️ Garagem & Mobilidade' },
  { id: 'housing', name: '🏰 Casas & Imóveis' },
  { id: 'staff', name: '🏋️ Staff & Performance' },
  { id: 'investments', name: '📈 Investimentos & Negócios' },
  { id: 'social', name: '🤝 Família & Legado' }
];

export const LIFESTYLE_ITEMS = [
  // =========================================================================
  // 1. GARAGEM & MOBILIDADE
  // =========================================================================
  {
    id: 'moto_160',
    name: 'Honda CG 160 Titan Turbinada',
    icon: '🏍️',
    category: 'garage',
    price: 18000,
    desc: 'O primeiro veículo do garoto da base. Escapamento estalando e liberdade para ir aos treinos.',
    benefitDesc: '+6 Moral imediata',
    moraleBonus: 6,
    reputationBonus: 1,
    legacyBonus: 10
  },
  {
    id: 'carro_turbo',
    name: 'Gol Quadrado 1.9 Forjado',
    icon: '🚗',
    category: 'garage',
    price: 48000,
    desc: 'Clássico da quebrada. Turbina espirrando no semáforo e respeito com a rapaziada da vila.',
    benefitDesc: '+10 Moral • +3 Reputação',
    moraleBonus: 10,
    reputationBonus: 3,
    legacyBonus: 25
  },
  {
    id: 'suv_blindado',
    name: 'SUV Blindado Importado (Land Rover)',
    icon: '🚙',
    category: 'garage',
    price: 320000,
    desc: 'O uniforme do jogador da Série A. Vidros nível 3-A, teto solar e conforto total para a família.',
    benefitDesc: '+14 Moral • +8 Reputação',
    moraleBonus: 14,
    reputationBonus: 8,
    legacyBonus: 60
  },
  {
    id: 'superesportivo',
    name: 'Superesportivo Italiano (Ferrari / Porsche)',
    icon: '🏎️',
    category: 'garage',
    price: 2200000,
    desc: 'O ronco do motor V8 ecoando no estacionamento do CT. Todos os olhares e holofotes em você.',
    benefitDesc: '+18 Moral • +15 Reputação',
    moraleBonus: 18,
    reputationBonus: 15,
    legacyBonus: 140
  },
  {
    id: 'iate_luxo',
    name: 'Iate de 60 Pés em Balneário Camboriú',
    icon: '🛥️',
    category: 'garage',
    price: 8500000,
    desc: 'Festas de fim de ano em alto mar, champanhe com os parças e status supremo de celebridade.',
    benefitDesc: '+22 Moral • +20 Reputação',
    moraleBonus: 22,
    reputationBonus: 20,
    legacyBonus: 260
  },
  {
    id: 'jatinho_particular',
    name: 'Jatinho Executivo Particular',
    icon: '✈️',
    category: 'garage',
    price: 38000000,
    desc: 'Sem filas em aeroportos. Viaje para a Seleção ou para a Europa com as próprias asas de astro mundial.',
    benefitDesc: '+25 Moral • +25 Reputação • +3 Físico (viagens sem desgaste)',
    moraleBonus: 25,
    reputationBonus: 25,
    physicalBonus: 3,
    legacyBonus: 500,
    perkId: 'jatinho_descanso'
  },

  // =========================================================================
  // 2. CASAS & IMÓVEIS
  // =========================================================================
  {
    id: 'apto_confortavel',
    name: 'Apartamento Confortável no Centro',
    icon: '🏢',
    category: 'housing',
    price: 85000,
    desc: 'Seu primeiro cantinho próprio, perto do centro de treinamento. Conforto e tranquilidade após os jogos.',
    benefitDesc: '+8 Moral',
    moraleBonus: 8,
    reputationBonus: 2,
    legacyBonus: 20
  },
  {
    id: 'cobertura_orla',
    name: 'Cobertura Duplex na Orla da Praia',
    icon: '🏖️',
    category: 'housing',
    price: 1400000,
    desc: 'Vista panorâmica para o oceano, piscina aquecida na varanda e área gourmet para churrasco com o elenco.',
    benefitDesc: '+15 Moral • +10 Reputação',
    moraleBonus: 15,
    reputationBonus: 10,
    legacyBonus: 90
  },
  {
    id: 'mansao_alphaville',
    name: 'Mansão em Condomínio Fechado com Campo Society',
    icon: '🏡',
    category: 'housing',
    price: 6800000,
    desc: 'Campo society oficial, heliponto, cinema particular e segurança armada. O refúgio dos craques.',
    benefitDesc: '+22 Moral • +18 Reputação',
    moraleBonus: 22,
    reputationBonus: 18,
    legacyBonus: 220
  },
  {
    id: 'villa_europa',
    name: 'Villa Paradisíaca na Europa / Dubai',
    icon: '🏰',
    category: 'housing',
    price: 25000000,
    desc: 'Propriedade histórica em Milão, Barcelona ou Dubai. O ápice do luxo e do bom gosto internacional.',
    benefitDesc: '+25 Moral • +25 Reputação',
    moraleBonus: 25,
    reputationBonus: 25,
    legacyBonus: 450
  },

  // =========================================================================
  // 3. STAFF & PERFORMANCE PESSOAL
  // =========================================================================
  {
    id: 'personal_trainer',
    name: 'Personal Trainer Particular & Férias',
    icon: '🏃‍♂️',
    category: 'staff',
    price: 90000,
    desc: 'Treinos intensivos específicos mesmo durante as férias. Chegue na pré-temporada voando alto.',
    benefitDesc: '+4 Físico permanente • Melhora desenvolvimento em treinos',
    physicalBonus: 4,
    legacyBonus: 40,
    perkId: 'personal_trainer'
  },
  {
    id: 'chef_nutricao',
    name: 'Chef & Nutricionista Esportivo Particular',
    icon: '🥗',
    category: 'staff',
    price: 160000,
    desc: 'Alimentação sob medida para recuperação muscular acelerada e energia máxima nos 90 minutos.',
    benefitDesc: '+3 Físico permanente • +0.15 na Nota Média anual de partidas',
    physicalBonus: 3,
    legacyBonus: 60,
    perkId: 'chef_nutricao'
  },
  {
    id: 'psicologo_esportivo',
    name: 'Psicólogo Esportivo & Coach Mental',
    icon: '🧠',
    category: 'staff',
    price: 220000,
    desc: 'Blindagem contra pressão de torcida, clássicos decisivos e crises no vestiário.',
    benefitDesc: 'Moral mínima nunca cai abaixo de 65 • Reduz perdas em dilemas',
    moraleBonus: 10,
    legacyBonus: 70,
    perkId: 'coach_mental'
  },
  {
    id: 'fisio_elite',
    name: 'Fisioterapeuta de Elite & Câmara Hiperbárica',
    icon: '🩺',
    category: 'staff',
    price: 650000,
    desc: 'A mesma tecnologia de ponta usada por Cristiano Ronaldo e LeBron James para longevidade corporal.',
    benefitDesc: 'Reduz em 60% o declínio de Físico após os 30 anos • Evita lesões',
    physicalBonus: 5,
    legacyBonus: 150,
    perkId: 'fisio_elite'
  },

  // =========================================================================
  // 4. INVESTIMENTOS & NEGÓCIOS
  // =========================================================================
  {
    id: 'renda_fixa_cota',
    name: 'Cota de Fundos Imobiliários & Renda Fixa',
    icon: '📊',
    category: 'investments',
    price: 100000,
    isRepeatable: true,
    desc: 'Aporte financeiro seguro em ativos sólidos. Gera dividendos automáticos todo fim de ano.',
    benefitDesc: 'Gera 8% (R$ 8.000) de rendimento passivo por temporada',
    passiveIncome: 8000,
    legacyBonus: 25
  },
  {
    id: 'negocio_parca',
    name: 'Aporte no "Negócio dos Sonhos" do Parça',
    icon: '🎲',
    category: 'investments',
    price: 150000,
    isRepeatable: true,
    isGamble: true,
    desc: 'Seu amigo de infância jura de pé junto que descobriu um negócio milionário (cripto, barbearia ou grife).',
    benefitDesc: '50% de chance de lucrar R$ 450.000 | 50% de perder tudo e virar piada!',
    legacyBonus: 15
  },
  {
    id: 'comprar_clube',
    name: 'Comprar um Clube de Futebol Profissional',
    icon: '🏟️',
    category: 'investments',
    price: 45000000,
    desc: 'Inspirado em Ronaldo Fenômeno. Torne-se o dono majoritário de uma agremiação com estádio e torcida.',
    benefitDesc: '+30 Reputação • R$ 3.5 mi de lucro por ano • Título de Presidente',
    reputationBonus: 30,
    passiveIncome: 3500000,
    legacyBonus: 800,
    perkId: 'dono_de_clube'
  },

  // =========================================================================
  // 5. FAMÍLIA & LEGADO SOCIAL
  // =========================================================================
  {
    id: 'casa_mae',
    name: 'Comprar a Casa Própria da Mãe',
    icon: '❤️',
    category: 'social',
    price: 160000,
    desc: 'A primeira grande promessa de todo moleque bom de bola cumprida. Lágrimas de alegria na sala.',
    benefitDesc: '+25 Moral imediata • Título especial "Filho Exemplar"',
    moraleBonus: 25,
    reputationBonus: 8,
    legacyBonus: 100,
    perkId: 'casa_mae'
  },
  {
    id: 'instituto_social',
    name: 'Fundar o Instituto Social na Quebrada',
    icon: '🤝',
    category: 'social',
    price: 3500000,
    desc: 'Complexo esportivo, aulas e alimentação para milhares de jovens da comunidade onde você cresceu.',
    benefitDesc: '+25 Reputação • Imunidade a vaias • Título de "Ídolo do Povo"',
    reputationBonus: 25,
    moraleBonus: 20,
    legacyBonus: 350,
    perkId: 'instituto_social'
  }
];

/**
 * Retorna itens por categoria
 * @param {string} categoryId 
 * @returns {Array}
 */
export function getItemsByCategory(categoryId) {
  return LIFESTYLE_ITEMS.filter(item => item.category === categoryId);
}

/**
 * Busca um item pelo ID
 * @param {string} itemId 
 * @returns {object|undefined}
 */
export function getLifestyleItemById(itemId) {
  return LIFESTYLE_ITEMS.find(item => item.id === itemId);
}
