/**
 * CARREIRA FC - BANCO DE DADOS: EVENTOS & DILEMAS DINÂMICOS
 * Banco expandido com ~28 eventos futebolísticos autênticos.
 * Cada escolha possui Ganhos Base e Perdas Base explícitas,
 * com suporte à mecânica de 'Sorteio / Arriscar Tudo' vs 'Ir no Garantido' (Push Your Luck).
 */

export const EVENTS = [
  // =========================================================================
  // 1. CAMAROTE NO CARNAVAL (EXTRACAMPO / BALADA)
  // =========================================================================
  {
    id: "camarote_carnaval",
    title: "Camarote na Sapucaí antes do Clássico",
    category: "extracampo",
    categoryName: "🎭 Dilema Extracampo",
    description: "Você foi convidado para a área VIP mais disputada do Carnaval a 48 horas do clássico. A imprensa e os paparazzi estão em cada esquina.",
    triggerCondition: (player) => player.age <= 34,
    choices: [
      {
        id: "cair_no_samba",
        text: "Cair no samba até o amanhecer!",
        desc: "Festa raiz com os amigos. Pode ser a noite da sua vida ou o início de uma crise.",
        baseGain: { morale: 12, reputation: 6 },
        baseLoss: { physical: -4 },
        hasGamble: true,
        gamble: {
          winChance: 0.55,
          gambleLabel: "55% de Sorte: Noite mágica sem flagra (+25 Moral) | 45% de Azar: Vídeo vazado no TikTok (-15 Reputação, -10 Físico)",
          jackpotGain: { morale: 25, reputation: 12 },
          disasterLoss: { reputation: -18, physical: -10, morale: -10 },
          winTitle: "DEU BOM DEMAIS! 🔥",
          winText: "Você sambou com celebridades, bebeu água de coco e nenhum fotógrafo te pegou! Moral e autoestima nas nuvens!",
          lossTitle: "DEU RUIM! 💥",
          lossText: "Um vídeo seu de óculos escuros às 5h viralizou! A torcida organizada foi ao CT com faixas de 'Baladeiro FC'!"
        }
      },
      {
        id: "dormir_cedo",
        text: "Recusar a pulseira VIP e dormir às 22h.",
        desc: "Profissionalismo cirúrgico focado 100% no clássico.",
        baseGain: { physical: 4, reputation: 6 },
        baseLoss: { morale: -2 },
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 2. PODCAST POLÊMICO (MÍDIA)
  // =========================================================================
  {
    id: "podcast_polemico",
    title: "Podcast ao Vivo Sem Filtro",
    category: "extracampo",
    categoryName: "🎙️ Mídia & Polêmica",
    description: "Convidado para o maior podcast esportivo do país ao vivo, sem assessoria para barrar perguntas ácidas sobre o técnico e a diretoria.",
    triggerCondition: (player) => player.reputation >= 20,
    choices: [
      {
        id: "abrir_o_coracao",
        text: "Ir e mandar a real sobre bastidores e arbitragem!",
        desc: "Falar o que o torcedor quer ouvir sem medo de retaliação.",
        baseGain: { reputation: 12, money: 20000 },
        baseLoss: { morale: -4 },
        hasGamble: true,
        gamble: {
          winChance: 0.50,
          gambleLabel: "50% de Sorte: Cortes épicos de 15M de views (+30 Reputação) | 50% de Azar: Multa de 30% e banco (-15 Moral)",
          jackpotGain: { reputation: 30, money: 50000, morale: 15 },
          disasterLoss: { reputation: -15, money: -25000, morale: -15 },
          winTitle: "FENÔMENO DE AUDIÊNCIA! 🔥",
          winText: "Você viralizou no Brasil inteiro! Chamado de 'o homem mais sincero da bola', sua popularidade explodiu!",
          lossTitle: "MULTADO E QUEIMADO! 💥",
          lossText: "A diretoria não engoliu suas críticas. Você levou multa salarial pesada e o treinador te deixou no banco!"
        }
      },
      {
        id: "respostas_padrao",
        text: "Ir com o discurso treinado de boleiro.",
        desc: "Dizer apenas 'o importante são os 3 pontos' e não criar problemas.",
        baseGain: { reputation: 5, money: 10000 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 3. CAVADINHA AOS 49 DO 2º TEMPO (CAMPO / TENSÃO)
  // =========================================================================
  {
    id: "penalti_aos_49",
    title: "Pênalti aos 49' do Segundo Tempo",
    category: "campo",
    categoryName: "⚽ Tensão Máxima",
    description: "Clássico empatado aos 49 do 2º tempo. Pênalti marcado e o cobrador oficial pipocou. A bola está nas suas mãos com 50 mil pessoas em silêncio.",
    triggerCondition: (player) => player.position !== "GOL",
    choices: [
      {
        id: "bater_cavadinha",
        text: "Bater de cavadinha no meio do gol!",
        desc: "Marra pura de quem não tem medo de nada.",
        baseGain: { morale: 15, reputation: 15 },
        baseLoss: {},
        hasGamble: true,
        gamble: {
          winChance: 0.45,
          gambleLabel: "45% de Sorte: Gol antológico (+35 Reputação, +1 Overall) | 55% de Azar: Goleiro pega em pé e vergonha (-30 Reputação)",
          jackpotGain: { reputation: 35, morale: 30, overall: 1 },
          disasterLoss: { reputation: -30, morale: -25 },
          winTitle: "HISTÓRICO! CAVADINHA DE GÊNIO! 🏆",
          winText: "O goleiro voou no canto e a bola caiu mansa no meio da rede! Você foi carregado nos braços da torcida!",
          lossTitle: "VERGONHA NACIONAL! 💀",
          lossText: "O goleiro nem pulou, segurou a bola de pé e mandou você calar a boca. Meme eterno na internet!"
        }
      },
      {
        id: "bater_com_forca",
        text: "Bater com força no canto de segurança.",
        desc: "Finalização firme sem firula.",
        baseGain: { morale: 10, reputation: 10 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 4. INFILTRAÇÃO NA COXA PARA A FINAL (CAMPO / FÍSICO)
  // =========================================================================
  {
    id: "infiltracao_na_final",
    title: "Fisgada na Coxa na Véspera da Final",
    category: "campo",
    categoryName: "⚽ Sacrifício de Campo",
    description: "Você sentiu uma fisgada no adutor no último treino antes da grande decisão. O médico propõe infiltração com agulha para anestesiar a dor.",
    triggerCondition: (player) => player.physical >= 40,
    choices: [
      {
        id: "jogar_no_sacrificio",
        text: "Tomar a injeção e entrar no sacrifício!",
        desc: "Final não se assiste da maca. Raça absoluta.",
        baseGain: { reputation: 14, morale: 12 },
        baseLoss: { physical: -5 },
        hasGamble: true,
        gamble: {
          winChance: 0.58,
          gambleLabel: "58% de Sorte: Atuação heroica com título (+25 Reputação, +1 OVR) | 42% de Azar: Lesão grave (-18 Físico)",
          jackpotGain: { reputation: 25, morale: 22, overall: 1 },
          disasterLoss: { physical: -18, morale: -15 },
          winTitle: "O GUERREIRO DO TÍTULO! 🛡️",
          winText: "A anestesia segurou a dor, você fez a partida da sua vida e ergueu a taça como ídolo eterno!",
          lossTitle: "O MÚSCULO ESTOUROU! 🚑",
          lossText: "Aos 18 minutos do 1º tempo o músculo rasgou. Você saiu de maca chorando e vai direto para a mesa de cirurgia!"
        }
      },
      {
        id: "preservar_corpo",
        text: "Pedir para não jogar e ser honesto com o DM.",
        desc: "Evitar o risco de uma lesão de 6 meses.",
        baseGain: { physical: 6 },
        baseLoss: { reputation: -4, morale: -3 },
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 5. MALA BRANCA / BICHO TRIPLO (ÉTICA / DINHEIRO)
  // =========================================================================
  {
    id: "mala_branca",
    title: "Mala Branca na Última Rodada",
    category: "vestiario",
    categoryName: "💰 Ética & Dinheiro",
    description: "Um emissário de outro clube oferece R$ 80 mil em dinheiro vivo para cada jogador se vocês vencerem o rival deles na rodada decisiva.",
    triggerCondition: (player) => player.age >= 19,
    choices: [
      {
        id: "aceitar_mala_branca",
        text: "Aceitar a mala branca! 'Incentivo para vencer não é crime.'",
        desc: "Bolada no bolso para correr até o último pingo de suor.",
        baseGain: { money: 80000, physical: -3 },
        baseLoss: {},
        hasGamble: true,
        gamble: {
          winChance: 0.60,
          gambleLabel: "60% de Sorte: Vitória maiúscula e bolso cheio (+R$ 150 mil) | 40% de Azar: Vaza o áudio no WhatsApp (-20 Reputação)",
          jackpotGain: { money: 150000, morale: 15 },
          disasterLoss: { reputation: -22, morale: -12, money: -30000 },
          winTitle: "CONTA BANCÁRIA GORDA! 💵",
          winText: "Vocês amassaram o adversário, receberam o PIX e ninguém nunca descobriu a fonte!",
          lossTitle: "ESCÂNDALO NA IMPRENSA! 🚨",
          lossText: "Um print do grupo do time vazou no GE.com! O Ministério Público abriu investigação esportiva!"
        }
      },
      {
        id: "recusar_mala",
        text: "Recusar a proposta e jogar apenas pelo próprio clube.",
        desc: "Ética e honra inegociáveis.",
        baseGain: { reputation: 10, morale: 5 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 6. CARRINHO NO ÚLTIMO HOMEM (CAMPO / TÁTICO)
  // =========================================================================
  {
    id: "carrinho_salvador",
    title: "Carrinho no Atacante Rival aos 44' do 2º Tempo",
    category: "campo",
    categoryName: "⚽ Decisão Tática",
    description: "O atacante adversário roubou a bola e ia sair na cara do gol para empatar o jogo. Você é o último homem em perseguição.",
    triggerCondition: (player) => player.position !== "GOL",
    choices: [
      {
        id: "dar_o_carrinho",
        text: "Passar a foice por trás no contra-ataque!",
        desc: "Falta tática no sacrifício para salvar o time.",
        baseGain: { morale: 8, reputation: 6 },
        baseLoss: { physical: -2 },
        hasGamble: true,
        gamble: {
          winChance: 0.50,
          gambleLabel: "50% de Sorte: Desarme limpo genial na bola (+20 Reputação) | 50% de Azar: Cartão Vermelho direto e 2 jogos de gancho",
          jackpotGain: { reputation: 22, morale: 18, overall: 1 },
          disasterLoss: { reputation: -10, morale: -8 },
          winTitle: "DESARME DE PLACA! 🛡️",
          winText: "Você acertou apenas a bola em um desarme milimétrico de cinema! Aplaudido de pé no estádio!",
          lossTitle: "VERMELHO DIRETO! 🟥",
          lossText: "Você acertou o tornozelo do atacante e foi expulso direto! O time teve que segurar a pressão com um a menos!"
        }
      },
      {
        id: "apenas_cercar",
        text: "Apenas cercar e confiar no goleiro.",
        desc: "Evitar a expulsão e manter-se em campo.",
        baseGain: { physical: 1 },
        baseLoss: { morale: -3 },
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 7. SIMULAR PÊNALTI / CAVAR FALTA (CAMPO / MARRA)
  // =========================================================================
  {
    id: "cavar_penalti",
    title: "Mergulho na Área aos 40' do 2º Tempo",
    category: "campo",
    categoryName: "⚽ Malandragem Brasileira",
    description: "Você invadiu a grande área e o zagueiro esticou a perna sem tocar em você. Dá tempo de dar aquele mergulho teatral.",
    triggerCondition: (player) => ["PE", "PD", "CA", "MEI"].includes(player.position),
    choices: [
      {
        id: "mergulhar",
        text: "Mergulhar com estilo de piscina olímpica!",
        desc: "Malandragem futebolística pura para cavar a vitória.",
        baseGain: { morale: 8 },
        baseLoss: {},
        hasGamble: true,
        gamble: {
          winChance: 0.52,
          gambleLabel: "52% de Sorte: Árbitro cai na conversa e apita pênalti | 48% de Azar: Cartão amarelo por simulação e vaias",
          jackpotGain: { morale: 18, reputation: 10 },
          disasterLoss: { reputation: -14, morale: -10 },
          winTitle: "CAVOU COM SUCESSO! 🎯",
          winText: "O árbitro apontou a marca da cal sem pestanejar! A torcida comemorou e os rivais ficaram loucos de ódio!",
          lossTitle: "PEGOU NO PULO! 🟨",
          lossText: "O árbitro puxou o amarelo na hora por simulação e o narrador te chamou de ator da novela das oito!"
        }
      },
      {
        id: "ficar_de_pe",
        text: "Ficar de pé e tentar o chute mesmo desequilibrado.",
        desc: "Buscar o gol na bola sem apelar para o teatro.",
        baseGain: { reputation: 6, overall: 1 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 8. DANCINHA DO TIKTOK NA COMEMORAÇÃO (MÍDIA / TORCIDA)
  // =========================================================================
  {
    id: "dancinha_tiktok",
    title: "Dancinha Coreografada na Bandeirinha",
    category: "extracampo",
    categoryName: "🕺 Redes Sociais & Marra",
    description: "Você fez um gol no clássico e prometeu para seus seguidores fazer a dancinha do momento na bandeirinha de escanteio do rival.",
    triggerCondition: (player) => player.age <= 26,
    choices: [
      {
        id: "fazer_a_coreografia",
        text: "Metar a dança com passinho na frente da torcida rival!",
        desc: "Puro deboche futebolístico moderno.",
        baseGain: { morale: 10, reputation: 12 },
        baseLoss: {},
        hasGamble: true,
        gamble: {
          winChance: 0.55,
          gambleLabel: "55% de Sorte: Viraliza com 30M de views e vira trend (+25 Reputação) | 45% de Azar: Zagueiro rival vem te pegar no vestiário (-10 Moral)",
          jackpotGain: { reputation: 25, morale: 18, money: 35000 },
          disasterLoss: { morale: -12, reputation: -8, physical: -3 },
          winTitle: "VIRAL MUNDIAL NO TIKTOK! 📱",
          winText: "Até jogadores da Europa copiaram sua comemoração! 500 mil novos seguidores em 24 horas!",
          lossTitle: "CONFUSÃO GENERALIZADA! 🥊",
          lossText: "Os rivais acharam desrespeito e armaram um empurra-empurra generalizado. Você levou amarelo e bronca da diretoria!"
        }
      },
      {
        id: "comemorar_com_a_torcida",
        text: "Comemorar com a própria torcida abraçando a arquibancada.",
        desc: "Futebol tradicional de comunhão com a massa.",
        baseGain: { reputation: 10, morale: 8 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 9. COBRANÇA PÚBLICA DE SALÁRIOS ATRASADOS (VESTIÁRIO / POLÍTICA)
  // =========================================================================
  {
    id: "reclamar_salario_atrasado",
    title: "Três Meses de Salário Atrasado no Clube",
    category: "vestiario",
    categoryName: "💼 Vestiário & Finanças",
    description: "A diretoria prometeu pagar os direitos de imagem na semana passada e sumiu do CT. Os garotos da base e os roupeiros estão passando sufoco.",
    triggerCondition: (player) => player.reputation >= 30,
    choices: [
      {
        id: "soltar_o_verbo",
        text: "Dar entrevista coletiva denunciando os atrasos!",
        desc: "Liderar a tropa e peitar os cartolas em rede nacional.",
        baseGain: { morale: 14, reputation: 10 },
        baseLoss: { money: -15000 },
        hasGamble: true,
        gamble: {
          winChance: 0.50,
          gambleLabel: "50% de Sorte: Diretoria pressionada paga todo mundo no dia seguinte | 50% de Azar: Presidente te ameaça de rescisão unilateral",
          jackpotGain: { morale: 22, reputation: 20, money: 60000 },
          disasterLoss: { reputation: -12, morale: -15 },
          winTitle: "VITÓRIA DOS JOGADORES! ✊",
          winText: "A vergonha pública foi tão grande que o presidente apareceu com os cheques 24h depois! O elenco te reverencia!",
          lossTitle: "GUERRA POLÍTICA DECLARADA! 💣",
          lossText: "A diretoria soltou nota oficial te acusando de mercenário e plantou fake news contra você na imprensa amiga!"
        }
      },
      {
        id: "reuniao_fechada",
        text: "Marcar conversa fechada com o presidente na sala dele.",
        desc: "Diplomacia sem escândalo público.",
        baseGain: { money: 20000, reputation: 4 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 10. PASSEIO DE JET-SKI NA FOLGA (EXTRACAMPO / PERIGO)
  // =========================================================================
  {
    id: "moto_jetski_folga",
    title: "Manobras Radicais de Jet-Ski na Folga",
    category: "extracampo",
    categoryName: "🌊 Adrenalina & Perigo",
    description: "Você alugou um jet-ski de alta cilindrada em Angra dos Reis na folga de segunda-feira. Os amigos pedem para acelerar fundo nas ondas.",
    triggerCondition: (player) => player.finances >= 40000,
    choices: [
      {
        id: "acelerar_fundo",
        text: "Acelerar tudo e saltar as ondas do mar aberto!",
        desc: "Adrenalina pura para desligar a cabeça do futebol.",
        baseGain: { morale: 15 },
        baseLoss: { physical: -2 },
        hasGamble: true,
        gamble: {
          winChance: 0.65,
          gambleLabel: "65% de Sorte: Dia incrível de descanso e alegria (+22 Moral) | 35% de Azar: Capotagem na onda e dor no ombro (-12 Físico)",
          jackpotGain: { morale: 25 },
          disasterLoss: { physical: -12, morale: -8 },
          winTitle: "DIA PERFEITO NO MAR! 🏖️",
          winText: "Você zerou a mente, pegou um bronzeado e voltou com a energia renovada para o resto da temporada!",
          lossTitle: "CAPOTOU NA ONDA! 💥",
          lossText: "Você perdeu o controle numa marola e foi arremessado na água. Luxação leve no ombro e bronca brava do preparador físico!"
        }
      },
      {
        id: "ficar_na_areia",
        text: "Ficar na cadeira de praia tomando água de coco.",
        desc: "Segurança total sem risco aos ligamentos.",
        baseGain: { physical: 3, morale: 4 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 11. TATUAGEM GIGANTE ANTES DA PARTIDA (EXTRACAMPO / FÍSICO)
  // =========================================================================
  {
    id: "tatuagem_proibida",
    title: "Fechar as Costas com Tatuagem de Leão",
    category: "extracampo",
    categoryName: "🎨 Estilo & Vaidade",
    description: "Um tatuador famoso tem horário livre para fechar suas costas com um leão de olhos dourados. Faltam 48 horas para a partida do fim de semana.",
    triggerCondition: (player) => player.age <= 28,
    choices: [
      {
        id: "tatuar_tudo",
        text: "Tatuar as costas inteiras de uma vez só!",
        desc: "Estilo de craque sul-americano não espera.",
        baseGain: { reputation: 8, morale: 10 },
        baseLoss: { physical: -4 },
        hasGamble: true,
        gamble: {
          winChance: 0.55,
          gambleLabel: "55% de Sorte: Tatuagem cicatrizada e estilosa (+15 Reputação) | 45% de Azar: Inflamação e dor insuportável no jogo (-10 Físico)",
          jackpotGain: { reputation: 18, morale: 15 },
          disasterLoss: { physical: -10, morale: -8 },
          winTitle: "VISUAL DE CRAQUE! 🦁",
          winText: "A tatuagem ficou uma obra de arte! Quando você tirou a camisa no gol, as fotos correram o mundo!",
          lossTitle: "INFLAMOU GERAL! 🩹",
          lossText: "O suor do treino infeccionou a pele. Você jogou parecendo uma estátua de dor e foi substituído no intervalo!"
        }
      },
      {
        id: "adiar_tatuagem",
        text: "Esperar as férias de fim de ano para tatuar.",
        desc: "Juízo com o corpo que paga seus boletos.",
        baseGain: { physical: 2, reputation: 3 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 12. CASINO EM LAS VEGAS NA PRÉ-TEMPORADA (EXTRACAMPO / DINHEIRO)
  // =========================================================================
  {
    id: "noite_cassino",
    title: "Noite de Roleta no Cassino dos EUA",
    category: "extracampo",
    categoryName: "🎰 Sorte & Apostas",
    description: "Em excursão de pré-temporada nos Estados Unidos, os companheiros chamam você para uma rodada no cassino do hotel após o jantar.",
    triggerCondition: (player) => player.finances >= 50000,
    choices: [
      {
        id: "apostar_alto",
        text: "Colocar fichas pesadas no vermelho e na roleta!",
        desc: "Emoção de alta voltagem com o dinheiro do bicho.",
        baseGain: { morale: 8 },
        baseLoss: { money: -20000 },
        hasGamble: true,
        gamble: {
          winChance: 0.48,
          gambleLabel: "48% de Sorte: JACKPOT! Quebrou a banca do cassino (+R$ 120 mil) | 52% de Azar: Perdeu R$ 60 mil na mesa de poker",
          jackpotGain: { money: 120000, morale: 20, reputation: 10 },
          disasterLoss: { money: -60000, morale: -14 },
          winTitle: "JACKPOT HISTÓRICO! 💰💰💰",
          winText: "A bolinha parou no seu número! O cassino tocou a sirene e você pagou o jantar de todo o elenco!",
          lossTitle: "LIMPARAM SUA CARTEIRA! 💸",
          lossText: "A sorte te abandonou. Você perdeu todo o dinheiro que levou e teve que pedir Pix emprestado pro lateral!"
        }
      },
      {
        id: "ficar_apenas_olhando",
        text: "Apenas pedir um suco e acompanhar a zoeira dos amigos.",
        desc: "Controle financeiro e cabeça fria.",
        baseGain: { morale: 4 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 13. REUNIÃO DE VESTIÁRIO: DERRUBAR TÉCNICO (VESTIÁRIO)
  // =========================================================================
  {
    id: "panela_do_vestiario",
    title: "A Panela contra o Treinador",
    category: "vestiario",
    categoryName: "🤫 Bastidores & Vestiário",
    description: "Os medalhões do elenco te chamam em uma sala trancada: querem fazer corpo mole no domingo para derrubar o técnico que exige treinos táticos cansativos.",
    triggerCondition: (player) => player.age >= 20,
    choices: [
      {
        id: "fechar_com_a_panela",
        text: "Apoiar a panela de veteranos e derrubar o chefe.",
        desc: "Ficar bem com quem manda no vestiário há anos.",
        baseGain: { morale: 6 },
        baseLoss: { reputation: -4 },
        hasGamble: true,
        gamble: {
          winChance: 0.55,
          gambleLabel: "55% de Sorte: O técnico cai e assume um interino 'brother' | 45% de Azar: Diretoria descobre e te manda treinar separado às 6h",
          jackpotGain: { morale: 15, reputation: 5 },
          disasterLoss: { reputation: -18, morale: -15, physical: -5 },
          winTitle: "O TÉCNICO CAIU! 🚪",
          winText: "O time perdeu de 3 a 0, o treinador foi demitido e o interino liberou folga nas segundas e terças!",
          lossTitle: "O TIRO SAIU PELA CULATRA! ⚠️",
          lossText: "A diretoria descobriu o complô, bancou o treinador e afastou você e os líderes para treinar com a base!"
        }
      },
      {
        id: "jogar_pela_camisa",
        text: "Recusar a panela e correr o dobro em campo!",
        desc: "Honrar o contrato e a torcida que paga ingresso.",
        baseGain: { reputation: 14, morale: 10, overall: 1 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 14. COMPRAR CARRO ESPORTIVO IMPORTADO (FINANÇAS)
  // =========================================================================
  {
    id: "comprar_carro_ostentacao",
    title: "Comprar Esportivo Alemão com Primeiro Bicho",
    category: "extracampo",
    categoryName: "🏎️ Finanças & Ostentação",
    description: "Caiu o primeiro grande bicho de classificação na sua conta. Você está numa concessionária olhando uma máquina que faz 0 a 100 em 3 segundos.",
    triggerCondition: (player) => player.finances >= 70000,
    choices: [
      {
        id: "comprar_esportivo",
        text: "Comprar à vista acelerando o ronco do motor!",
        desc: "Chegar no CT parecendo um astro de cinema.",
        baseGain: { morale: 14, reputation: 8 },
        baseLoss: { money: -50000 },
        hasGamble: true,
        gamble: {
          winChance: 0.60,
          gambleLabel: "60% de Sorte: A máquina vira atração e símbolo de sucesso | 40% de Azar: Rala a roda na calçada e comentaristas te detonam",
          jackpotGain: { reputation: 18, morale: 20 },
          disasterLoss: { reputation: -10, morale: -8, money: -15000 },
          winTitle: "O REI DA PISTA! 🏎️",
          winText: "Você chegou voando no treino, os seguranças aplaudiram e os jornais colocaram sua foto de capa!",
          lossTitle: "PREJUÍZO E CRÍTICA! 🔧",
          lossText: "No 2º dia você deu ré num poste do CT. O vídeo viralizou e os comentaristas de domingo te chamaram de deslumbrado!"
        }
      },
      {
        id: "investir_imoveis",
        text: "Comprar apartamentos e aplicar em renda fixa.",
        desc: "Construir patrimônio sólido para o pós-carreira.",
        baseGain: { money: 20000, reputation: 10, morale: 8 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 15. PROPOSTA MILIONÁRIA DO MUNDO ÁRABE (CONTRATO)
  // =========================================================================
  {
    id: "proposta_irrecusavel_arabia",
    title: "Caminhão de Petrodólares da Arábia Saudita",
    category: "contrato",
    categoryName: "💼 Carreira & Milhões",
    description: "Um clube árabe oferece multiplicar seu salário por 4 com mansão e carro de luxo. Mas você ficará distante dos holofotes da Seleção.",
    triggerCondition: (player) => player.age >= 21 && player.overall >= 74,
    choices: [
      {
        id: "aceitar_petrodolares",
        text: "Assinar o contrato e garantir o futuro de 3 gerações!",
        desc: "Independência financeira definitiva imediata.",
        baseGain: { money: 250000, morale: 10 },
        baseLoss: { reputation: -8 },
        hasGamble: false
      },
      {
        id: "ficar_pelo_sonho",
        text: "Recusar os milhões para seguir sonhando com Seleção e Europa.",
        desc: "Ambicionar a Bola de Ouro e títulos de maior peso histórico.",
        baseGain: { reputation: 16, morale: 8, overall: 1 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 16. COBRANÇA DE FALTA NO ÚLTIMO MINUTO (CAMPO)
  // =========================================================================
  {
    id: "falta_no_angulo",
    title: "Falta Frontal aos 48' do 2º Tempo",
    category: "campo",
    categoryName: "⚽ Bola Parada Decisiva",
    description: "Falta marcada a 28 metros do gol no último lance. Você pode chutar direto por cima da barreira ou cruzar na área para o bate-rebate.",
    triggerCondition: (player) => player.position !== "GOL",
    choices: [
      {
        id: "chutar_no_angulo",
        text: "Bater direto na gaveta com curva!",
        desc: "Confiar na sua pontaria para resolver sozinho.",
        baseGain: { morale: 10, reputation: 12 },
        baseLoss: {},
        hasGamble: true,
        gamble: {
          winChance: 0.48,
          gambleLabel: "48% de Sorte: GOLAÇO DE FALTA NO ÂNGULO (+30 Reputação, +1 OVR) | 52% de Azar: Bola explode na barreira e acaba o jogo",
          jackpotGain: { reputation: 30, morale: 25, overall: 1 },
          disasterLoss: { morale: -8, reputation: -6 },
          winTitle: "GOLAÇO DE FALTA ESPETACULAR! ⚽🎯",
          winText: "A bola fez a curva perfeita por fora da barreira e beijou a forquilha! O narrador ficou rouco!",
          lossTitle: "NA BARREIRA! 🧱",
          lossText: "A bola bateu no peito do zagueiro rival e o árbitro apitou o fim do jogo. Fim da oportunidade."
        }
      },
      {
        id: "cruzar_na_area",
        text: "Cruzar fechado na primeira trave para a cabeçada.",
        desc: "Jogada coletiva mais segura para encontrar um companheiro.",
        baseGain: { morale: 6, reputation: 6 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 17. PATROCÍNIO POLÊMICO DE CASA DE APOSTAS (MÍDIA)
  // =========================================================================
  {
    id: "patrocinio_apostas",
    title: "Contrato Milionário de Casa de Apostas",
    category: "extracampo",
    categoryName: "💰 Marketing & Patrocínio",
    description: "Uma nova casa de apostas quer colocar sua cara em outdoors pelo país e te pagar R$ 120 mil por mês para postar palpites no Instagram.",
    triggerCondition: (player) => player.reputation >= 30,
    choices: [
      {
        id: "aceitar_patrocinio",
        text: "Assinar o patrocínio e encher a conta bancária!",
        desc: "Renda extra massiva fora das quatro linhas.",
        baseGain: { money: 120000, morale: 8 },
        baseLoss: { reputation: -4 },
        hasGamble: true,
        gamble: {
          winChance: 0.60,
          gambleLabel: "60% de Sorte: Campanhas de TV de sucesso (+R$ 200 mil) | 40% de Azar: A empresa se envolve em escândalo (-15 Reputação)",
          jackpotGain: { money: 200000, reputation: 8 },
          disasterLoss: { reputation: -18, morale: -10 },
          winTitle: "CONTRATO LUCRATIVO! 💼",
          winText: "Os comerciais foram um sucesso e você faturou alto sem arranhar sua imagem!",
          lossTitle: "ESCÂNDALO JURÍDICO! ⚖️",
          lossText: "A casa de aposta foi suspensa pelo governo e seu nome apareceu no Jornal Nacional em reportagem de investigação!"
        }
      },
      {
        id: "recusar_apostas",
        text: "Recusar e esperar marcas de artigos esportivos tradicionais.",
        desc: "Cuidar da imagem limpa e focada exclusivamente no esporte.",
        baseGain: { reputation: 12, morale: 6 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 18. TRETA COM O CAPITÃO NO INTERVALO (VESTIÁRIO)
  // =========================================================================
  {
    id: "treta_capitao",
    title: "Discussão Quente no Vestiário no Intervalo",
    category: "vestiario",
    categoryName: "🤬 Vestiário em Chamas",
    description: "O time está perdendo de 1 a 0. O capitão veterano aponta o dedo na sua cara na frente de todo mundo e grita que você não está voltando para marcar.",
    triggerCondition: (player) => player.age <= 25,
    choices: [
      {
        id: "bater_de_frente",
        text: "Bater boca de volta e mandar ele jogar bola!",
        desc: "Personalidade forte: não aceitar ser bode expiatório.",
        baseGain: { morale: 10 },
        baseLoss: { reputation: -5 },
        hasGamble: true,
        gamble: {
          winChance: 0.50,
          gambleLabel: "50% de Sorte: O time acorda, empata e ele te pede desculpas | 50% de Azar: Briga física no vestiário e você sai no intervalo",
          jackpotGain: { morale: 20, reputation: 14, overall: 1 },
          disasterLoss: { morale: -16, reputation: -10, physical: -3 },
          winTitle: "CHOQUE DE GIGANTES! 🔥",
          winText: "A discussão acordou o elenco! Vocês viraram o jogo para 2 a 1 e o capitão te deu um abraço emocionado no apito final!",
          lossTitle: "CLIMA DE GUERRA! 🥊",
          lossText: "Seguranças tiveram que separar vocês no vestiário. O técnico te tirou no intervalo para evitar tragédia!"
        }
      },
      {
        id: "ouvir_e_falar_na_bola",
        text: "Ouvir calado e responder com dois gols no segundo tempo.",
        desc: "Maturidade de campeão: responder dentro de campo.",
        baseGain: { reputation: 12, overall: 1, morale: 8 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 19. BRIGAR PELA BOLA COM O BATEDOR OFICIAL (CAMPO / MARRA)
  // =========================================================================
  {
    id: "briga_batedor_oficial",
    title: "Disputa pela Cobrança de Pênalti",
    category: "campo",
    categoryName: "⚽ Hierarquia do Elenco",
    description: "Você sofreu o pênalti após driblar 3 adversários. O batedor oficial mais velho pega a bola para cobrar, mas você quer fazer o gol para a artilharia.",
    triggerCondition: (player) => ["CA", "PE", "PD", "MEI"].includes(player.position),
    choices: [
      {
        id: "arrancar_a_bola",
        text: "Tirar a bola da mão dele e assumir a responsabilidade!",
        desc: "Marra de quem quer ser o camisa 10 do projeto.",
        baseGain: { morale: 12, reputation: 8 },
        baseLoss: {},
        hasGamble: true,
        gamble: {
          winChance: 0.58,
          gambleLabel: "58% de Sorte: Gol com convicção e festa (+20 Reputação) | 42% de Azar: Goleiro defende e o time inteiro te fuzila com os olhos",
          jackpotGain: { reputation: 20, morale: 18, overall: 1 },
          disasterLoss: { morale: -18, reputation: -16 },
          winTitle: "ASSUMIU E DECIDIU! ⚽",
          winText: "Você encheu o pé na gaveta! Até o companheiro teve que bater palma pela coragem!",
          lossTitle: "PIPOCADA HISTÓRICA! ❌",
          lossText: "Você chutou fraco no meio e o goleiro agarrou sem rebote. O batedor oficial te olhou com ódio puro!"
        }
      },
      {
        id: "respeitar_hierarquia",
        text: "Entregar a bola respeitando a ordem do treinador.",
        desc: "Espírito de grupo e hierarquia tática.",
        baseGain: { reputation: 8, morale: 5 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 20. PROPOSTA DE FOFOCA EM REDE SOCIAL (EXTRACAMPO)
  // =========================================================================
  {
    id: "fofoca_influencer",
    title: "Affair com Celebridade no Instagram",
    category: "extracampo",
    categoryName: "❤️ Romance & Fofoca",
    description: "A influenciadora mais famosa do país te mandou direct após o jogo e combinou um jantar secreto no restaurante mais badalado da capital.",
    triggerCondition: (player) => player.age <= 29 && player.reputation >= 35,
    choices: [
      {
        id: "assumir_o_romance",
        text: "Ir ao jantar de mãos dadas sem ligar para os flashes!",
        desc: "Viver a vida de celebridade ao lado de quem você gosta.",
        baseGain: { morale: 14, reputation: 12 },
        baseLoss: {},
        hasGamble: true,
        gamble: {
          winChance: 0.60,
          gambleLabel: "60% de Sorte: Casal mais amado do Brasil (+25 Reputação) | 40% de Azar: Discussão pública no restaurante e capa de fofoca",
          jackpotGain: { reputation: 25, morale: 20, money: 40000 },
          disasterLoss: { reputation: -12, morale: -10 },
          winTitle: "O NOVO CASAL DO MOMENTO! ✨",
          winText: "Vocês viraram o casal sensação da internet! Marcas de moda esportiva querem fechar contratos com ambos!",
          lossTitle: "TRETA COM PAPARAZZI! 📸",
          lossText: "Houve confusão com fotógrafos na saída do restaurante e o caso foi parar nas manchetes de fofoca sensacionalista!"
        }
      },
      {
        id: "discricao_total",
        text: "Manter o encontro 100% sigiloso em casa sem celular.",
        desc: "Preservar a intimidade e a cabeça limpa para treinar no dia seguinte.",
        baseGain: { morale: 8, physical: 2 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 21. PROCESSO CONTRA COMENTARISTA (MÍDIA / TRIBUNAIS)
  // =========================================================================
  {
    id: "processar_jornalista",
    title: "Comentarista da TV te chamou de 'Pereba'",
    category: "extracampo",
    categoryName: "⚖️ Honra & Mídia",
    description: "No programa de debate de segunda-feira, um comentarista polêmico disse que você 'não jogaria na várzea de chinelo'. Seus advogados sugerem um processo por danos morais.",
    triggerCondition: (player) => player.reputation >= 25,
    choices: [
      {
        id: "processar_na_justica",
        text: "Processar o comentarista e pedir R$ 100 mil de indenização!",
        desc: "Limpar sua honra e ensinar limites à imprensa.",
        baseGain: { morale: 8 },
        baseLoss: { money: -10000 },
        hasGamble: true,
        gamble: {
          winChance: 0.52,
          gambleLabel: "52% de Sorte: Vitória no tribunal e retratação ao vivo (+R$ 100 mil) | 48% de Azar: Juiz indefere e a imprensa cai matando em você",
          jackpotGain: { money: 100000, reputation: 12, morale: 15 },
          disasterLoss: { reputation: -14, morale: -10, money: -20000 },
          winTitle: "JUSTIÇA FEITA! ⚖️",
          winText: "O comentarista teve que ler uma carta de desculpas de 2 minutos ao vivo e pagar a indenização na sua conta!",
          lossTitle: "DERROTA JURÍDICA! 📑",
          lossText: "O juiz entendeu como 'crítica ácida de futebol'. A bancada inteira do programa passou a te detonar toda rodada!"
        }
      },
      {
        id: "responder_no_campo",
        text: "Ignorar o processo e calar a boca dele com gols no domingo.",
        desc: "A melhor resposta de um jogador é o balançar das redes.",
        baseGain: { reputation: 12, overall: 1, morale: 10 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  },

  // =========================================================================
  // 22. GOL COM A MÃO DUVIDOSO (CAMPO / ÉTICA)
  // =========================================================================
  {
    id: "gol_de_mao_duvidoso",
    title: "Gol 'La Mano de Dios' nos Acréscimos",
    category: "campo",
    categoryName: "⚽ Fair Play vs Glória",
    description: "A bola bateu no seu braço sutilmente antes de entrar no gol aos 50 do 2º tempo. O árbitro confirmou o gol porque a visão dele estava encoberta.",
    triggerCondition: (player) => player.position !== "GOL",
    choices: [
      {
        id: "comemorar_efusivo",
        text: "Comemorar como se nada tivesse acontecido!",
        desc: "Se o juiz deu, é gol! Futebol sul-americano em sua essência.",
        baseGain: { morale: 15 },
        baseLoss: {},
        hasGamble: true,
        gamble: {
          winChance: 0.55,
          gambleLabel: "55% de Sorte: Gol validado e vitória garantida (+20 Reputação) | 45% de Azar: Câmera lenta mostra e o país te chama de desonesto",
          jackpotGain: { morale: 22, reputation: 18 },
          disasterLoss: { reputation: -25, morale: -10 },
          winTitle: "GOL DA VITÓRIA VALIDADO! ⚽",
          winText: "A súmula fechou com o gol no seu nome! O rival reclamou até o ano seguinte, mas os 3 pontos são seus!",
          lossTitle: "MASSACRADO NO VAR DOS JORNAIS! 📺",
          lossText: "As imagens em 4K no domingo mostraram o braço descarado. Você foi capa de todos os jornais com 'Malandro FC'!"
        }
      },
      {
        id: "confessar_ao_arbitro",
        text: "Confessar ao árbitro que tocou com a mão.",
        desc: "Exemplo histórico de Fair Play mundial.",
        baseGain: { reputation: 25, morale: 10 },
        baseLoss: {},
        hasGamble: false
      }
    ]
  }
];

/**
 * Retorna um evento aleatório elegível para o jogador
 * @param {Player} player 
 * @param {Array<string>} excludeIds 
 * @returns {object|null}
 */
export function getRandomEligibleEvent(player, excludeIds = []) {
  const eligible = EVENTS.filter(e => {
    if (excludeIds.includes(e.id)) return false;
    return typeof e.triggerCondition === "function" ? e.triggerCondition(player) : true;
  });

  if (eligible.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * eligible.length);
  return eligible[randomIndex];
}
