/**
 * CARREIRA FC - GERENCIADOR CENTRAL DE ASSETS (ASSET MANAGER)
 * Gerencia o carregamento de sprites, molduras de cards colecionáveis,
 * taças 3D, prêmios individuais, badges de arquétipos e logos com fallback resiliente.
 */

export const ASSET_PATHS = {
  // Ícones de Atributos e Mecânicas de UI
  ui: {
    morale: 'assets/images/ui/stat_morale.png',
    reputation: 'assets/images/ui/stat_reputation.png',
    physical: 'assets/images/ui/stat_physical.png',
    money: 'assets/images/ui/stat_money.png',
    potential: 'assets/images/ui/stat_potential.png',
    gamble: 'assets/images/ui/dice_gamble.png',
    guaranteed: 'assets/images/ui/shield_guaranteed.png',
  },

  // Molduras de Cards de Atleta por Nível de Overall
  cards: {
    bronze: 'assets/images/cards/card_frame_bronze.png',     // OVR < 68
    silver: 'assets/images/cards/card_frame_silver.png',     // OVR 68 a 74
    gold: 'assets/images/cards/card_frame_gold.png',         // OVR 75 a 84
    special: 'assets/images/cards/card_frame_special.png',   // OVR 85+ (Lenda / TOTY)
  },

  // Badges dos 10 Arquétipos Táticos
  archetypes: {
    // Goleiros
    paredao: 'assets/images/archetypes/arch_goleiro_paredao.png',
    pegador_penaltis: 'assets/images/archetypes/arch_goleiro_paredao.png',
    goleiro_artilheiro: 'assets/images/archetypes/arch_goleiro_paredao.png',
    // Zagueiros
    xerife: 'assets/images/archetypes/arch_zagueiro_xerife.png',
    zag_artilheiro: 'assets/images/archetypes/arch_zagueiro_xerife.png',
    libero_tecnico: 'assets/images/archetypes/arch_zagueiro_xerife.png',
    // Laterais
    lateral_ofensivo_ld: 'assets/images/archetypes/arch_lateral_ofensivo.png',
    lateral_construtor_ld: 'assets/images/archetypes/arch_lateral_ofensivo.png',
    lateral_ofensivo_le: 'assets/images/archetypes/arch_lateral_ofensivo.png',
    lateral_defensivo_le: 'assets/images/archetypes/arch_lateral_ofensivo.png',
    // Volantes
    volante_cao_guarda: 'assets/images/archetypes/arch_volante_destruidor.png',
    volante_passador: 'assets/images/archetypes/arch_volante_destruidor.png',
    // Meias Centrais
    box_to_box_mc: 'assets/images/archetypes/arch_meia_ritmista.png',
    maestro_mc: 'assets/images/archetypes/arch_meia_ritmista.png',
    // Meias Armadores
    camisa_10_mei: 'assets/images/archetypes/arch_meia_camisa10.png',
    meia_infiltrador_mei: 'assets/images/archetypes/arch_meia_camisa10.png',
    // Pontas
    ponta_invertido_pe: 'assets/images/archetypes/arch_ponta_driblador.png',
    ponta_agudo_pe: 'assets/images/archetypes/arch_ponta_driblador.png',
    ponta_invertido_pd: 'assets/images/archetypes/arch_ponta_driblador.png',
    ponta_agudo_pd: 'assets/images/archetypes/arch_ponta_driblador.png',
    // Centroavantes
    matador_ca: 'assets/images/archetypes/arch_atacante_matador.png',
    pivo_ca: 'assets/images/archetypes/arch_atacante_matador.png',
    avancado_movel_ca: 'assets/images/archetypes/arch_atacante_matador.png',
  },

  // Taças e Troféus Oficiais (Pronto para centenas de ligas futuras)
  trophies: {
    // Estaduais
    paulistao: 'assets/images/trophies/trophy_estadual.png',
    carioca: 'assets/images/trophies/trophy_estadual.png',
    estadual_geral: 'assets/images/trophies/trophy_estadual.png',
    copa_america: 'assets/images/trophies/trophy_estadual.png',
    // Copas Nacionais
    copa_do_brasil: 'assets/images/trophies/trophy_copa_brasil.png',
    fa_cup: 'assets/images/trophies/trophy_copa_brasil.png',
    // Ligas Nacionais
    brasileirao_serie_a: 'assets/images/trophies/trophy_brasileirao.png',
    brasileirao_serie_b: 'assets/images/trophies/trophy_brasileirao.png',
    brasileirao: 'assets/images/trophies/trophy_brasileirao.png',
    premier_league: 'assets/images/trophies/trophy_brasileirao.png',
    la_liga: 'assets/images/trophies/trophy_brasileirao.png',
    // Torneios Continentais
    libertadores: 'assets/images/trophies/trophy_libertadores.png',
    sul_americana: 'assets/images/trophies/trophy_libertadores.png',
    champions_league: 'assets/images/trophies/trophy_libertadores.png',
    // Mundiais e Seleções
    mundial_clubes: 'assets/images/trophies/trophy_mundial_clubes.png',
    copa_do_mundo: 'assets/images/trophies/trophy_copa_do_mundo.png',
  },

  // Prêmios Individuais
  awards: {
    ballon_dor: 'assets/images/awards/award_ballon_dor.png',
    golden_boot: 'assets/images/awards/award_golden_boot.png',
    golden_glove: 'assets/images/awards/award_golden_glove.png',
    rei_da_america: 'assets/images/awards/award_rei_da_america.png',
    best_player_league: 'assets/images/awards/award_ballon_dor.png',
  },

  // Banners Ilustrados de Eventos Narrativos
  events: {
    camarote_carnaval: 'assets/images/events/event_noitada_pagode.webp',
    noite_cassino: 'assets/images/events/event_noitada_pagode.webp',
    proposta_irrecusavel_arabia: 'assets/images/events/event_mundo_arabe.webp',
    patrocinio_apostas: 'assets/images/events/event_mundo_arabe.webp',
    infiltracao_na_final: 'assets/images/events/event_lesao_joelho.webp',
    moto_jetski_folga: 'assets/images/events/event_lesao_joelho.webp',
    podcast_polemico: 'assets/images/events/event_polemica_social.webp',
    fofoca_influencer: 'assets/images/events/event_polemica_social.webp',
    processar_jornalista: 'assets/images/events/event_polemica_social.webp',
    dancinha_tiktok: 'assets/images/events/event_polemica_social.webp',
    treta_capitao: 'assets/images/events/event_briga_tunel.webp',
    panela_do_vestiario: 'assets/images/events/event_briga_tunel.webp',
    briga_batedor_oficial: 'assets/images/events/event_briga_tunel.webp',
    carrinho_salvador: 'assets/images/events/event_briga_tunel.webp',
    penalti_aos_49: 'assets/images/events/event_briga_tunel.webp',
    mala_branca: 'assets/images/events/event_empresario_luxo.webp',
    comprar_carro_ostentacao: 'assets/images/events/event_carro_ostentacao.webp',
    reclamar_salario_atrasado: 'assets/images/events/event_empresario_luxo.webp',
    tatuagem_proibida: 'assets/images/events/event_noitada_pagode.webp',
  },

  // Cutscenes de Momentos Críticos de Partida
  moments: {
    last_minute_goal: 'assets/images/moments/moment_last_minute_goal.webp',
    penalty_kickoff: 'assets/images/moments/moment_penalty_kickoff.webp',
    tackle_duel: 'assets/images/moments/moment_tackle_duel.webp',
    freekick_topcorner: 'assets/images/moments/moment_freekick_topcorner.webp',
    goalkeeper_save: 'assets/images/moments/moment_goalkeeper_save.webp',
  },

  // Telas e Pôsteres de Glória & Desfecho
  glory: {
    champion_trophy_lift: 'assets/images/glory/glory_champion_trophy_lift.webp',
    ballon_dor_gala: 'assets/images/glory/glory_ballon_dor_gala.webp',
    elimination_heartbreak: 'assets/images/glory/glory_elimination_heartbreak.webp',
    retirement_locker: 'assets/images/glory/glory_retirement_locker.webp',
  },

  // Fundos de Imersão e Atmosfera
  backgrounds: {
    tunnel_stadium: 'assets/images/backgrounds/bg_tunnel_stadium_night.webp',
    tactical_locker_room: 'assets/images/backgrounds/bg_tactical_locker_room.webp',
    pitch_floodlights_rain: 'assets/images/backgrounds/bg_pitch_floodlights_rain.webp',
  }
};

export class AssetManager {
  /**
   * Retorna o caminho de imagem de momento crítico de partida
   * @param {string} key 
   * @returns {string}
   */
  static getMomentImage(key) {
    return ASSET_PATHS.moments[key] || '';
  }

  /**
   * Retorna o caminho de pôster de celebração ou glória
   * @param {string} key 
   * @returns {string}
   */
  static getGloryImage(key) {
    return ASSET_PATHS.glory[key] || '';
  }
  /**
   * Retorna o caminho do ícone de atributo ou UI
   * @param {string} key 'morale' | 'reputation' | 'physical' | 'money' | 'potential' | 'gamble' | 'guaranteed'
   * @returns {string}
   */
  static getUiIcon(key) {
    return ASSET_PATHS.ui[key] || '';
  }

  /**
   * Retorna a moldura de card esportivo adequada para o Overall do jogador
   * @param {number} overall 
   * @returns {string} Caminho da moldura PNG com centro vazado
   */
  static getCardFrame(overall) {
    if (overall >= 85) return ASSET_PATHS.cards.special;
    if (overall >= 75) return ASSET_PATHS.cards.gold;
    if (overall >= 68) return ASSET_PATHS.cards.silver;
    return ASSET_PATHS.cards.bronze;
  }

  /**
   * Retorna a classe CSS correspondente ao tier do card
   * @param {number} overall 
   * @returns {string} 'card-tier-bronze' | 'card-tier-silver' | 'card-tier-gold' | 'card-tier-special'
   */
  static getCardTierClass(overall) {
    if (overall >= 85) return 'card-tier-special';
    if (overall >= 75) return 'card-tier-gold';
    if (overall >= 68) return 'card-tier-silver';
    return 'card-tier-bronze';
  }

  /**
   * Retorna o nome amigável do tier do card
   * @param {number} overall 
   * @returns {string}
   */
  static getCardTierName(overall) {
    if (overall >= 85) return 'Lenda Mundial / TOTY';
    if (overall >= 75) return 'Ouro Prime';
    if (overall >= 68) return 'Prata Pro';
    return 'Bronze Base';
  }

  /**
   * Retorna a badge de arquétipo tático correspondente
   * @param {string} archetypeId 
   * @returns {string|null}
   */
  static getArchetypeBadge(archetypeId) {
    return ASSET_PATHS.archetypes[archetypeId] || null;
  }

  /**
   * Retorna a taça 3D de um torneio
   * @param {string} tournamentId ID do torneio (ex: 'libertadores', 'paulistao')
   * @returns {string} Caminho do troféu ou fallback genérico
   */
  static getTrophyImage(tournamentId) {
    return ASSET_PATHS.trophies[tournamentId] || 'assets/images/trophies/trophy_brasileirao.png';
  }

  /**
   * Retorna o prêmio individual
   * @param {string} awardId ID do prêmio (ex: 'ballon_dor', 'golden_boot')
   * @returns {string}
   */
  static getAwardImage(awardId) {
    return ASSET_PATHS.awards[awardId] || 'assets/images/awards/award_ballon_dor.png';
  }

  /**
   * Retorna o banner ilustrado de um evento narrativo
   * @param {string} eventId 
   * @returns {string|null}
   */
  static getEventBanner(eventId) {
    return ASSET_PATHS.events[eventId] || null;
  }

  /**
   * Retorna o elemento HTML da logo oficial de um clube com fallback triplo imediato
   * Prioridade 1: CDN Oficial de Alta Resolução (club.shieldUrl)
   * Prioridade 2: Brasão Vetorial Esportivo com Cores Primária/Secundária e Iniciais Oficiais
   * Prioridade 3: Emoji Temático do Clube
   * @param {object} club Objeto do clube
   * @param {number} size Tamanho em pixels (largura/altura)
   * @returns {string} Snippet HTML
   */
  static renderClubBadgeHtml(club, size = 32) {
    if (!club) return `<span class="club-badge-placeholder" style="width:${size}px; height:${size}px;">⚽</span>`;
    
    const clubId = club.id || 'default';
    const fallbackEmoji = club.emoji || '🛡️';
    const shortName = club.shortName || club.name || 'Clube';
    const initials = (shortName.replace(/[^a-zA-Z0-9]/g, '').substring(0, 3) || 'FC').toUpperCase();
    const primaryColor = club.colors?.primary || '#222222';
    const secondaryColor = club.colors?.secondary || '#00e676';
    const textColor = club.colors?.text || '#ffffff';
    const imgSrc = club.shieldUrl || `assets/images/clubs/${clubId}.png`;

    return `
      <span class="club-crest-wrapper" style="width:${size}px; height:${size}px; position:relative; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;" title="${shortName}" aria-label="Escudo do ${shortName}">
        <img 
          src="${imgSrc}" 
          alt="${shortName}" 
          class="club-crest-img"
          style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.35));"
          loading="lazy"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        />
        <span class="club-crest-fallback" style="display:none; width:100%; height:100%; align-items:center; justify-content:center; background:${primaryColor}; border:2px solid ${secondaryColor}; color:${textColor}; border-radius:50%; font-size:${Math.max(9, Math.round(size * 0.32))}px; font-weight:800; text-align:center; box-shadow: 0 2px 6px rgba(0,0,0,0.4); line-height:1;">
          ${initials}
        </span>
      </span>
    `;
  }
}
