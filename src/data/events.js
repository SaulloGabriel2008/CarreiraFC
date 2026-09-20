/**
 * CARREIRA FC - BANCO DE DADOS: EVENTOS & DILEMAS DINÂMICOS
 * Dilemas futebolísticos, éticos e extracampo inspirados na identidade brasileira e no 7 a 0.
 */

export const EVENTS = [
  {
    id: "camarote_carnaval",
    title: "Camarote na Sapucaí antes do Clássico",
    category: "extracampo",
    categoryName: "🎭 Dilema Extracampo",
    description: "Você foi convidado para a área VIP mais disputada do Carnaval a 48 horas do clássico mais tenso do ano. A diretoria pediu discrição e a imprensa está de plantão.",
    triggerCondition: (player) => player.age <= 34,
    choices: [
      {
        id: "cair_no_samba",
        text: "Cair na folia! 'Quem não gosta de samba, bom sujeito não é.'",
        riskLabel: "Alto Risco / Alta Moral",
        outcome: {
          successProb: 0.45,
          success: {
            morale: +15,
            reputation: +6,
            physical: -2,
            text: "Você driblou os fotógrafos, sambou até as 3h e ninguém flagrou nada! O astral foi para a estratosfera."
          },
          failure: {
            morale: -12,
            reputation: -15,
            physical: -8,
            text: "Um vídeo seu de óculos escuros às 5h da manhã vazou no TikTok. A torcida pichou o muro com 'Baladeiro FC'!"
          }
        }
      },
      {
        id: "ficar_concentrado",
        text: "Recusar e dormir às 22h focado na partida.",
        riskLabel: "Zero Risco / Foco Profissional",
        outcome: {
          successProb: 1.0,
          success: {
            morale: +4,
            reputation: +8,
            physical: +4,
            text: "Profissional exemplar. Você descansou, chegou no vestiário focado e ganhou respeito da comissão."
          }
        }
      }
    ]
  },
  {
    id: "podcast_polemico",
    title: "Podcast Sem Filtro na Folga",
    category: "extracampo",
    categoryName: "🎙️ Mídia & Polêmica",
    description: "O maior podcast esportivo do país chamou você para uma conversa ao vivo de 3 horas com cerveja e sem assessoria de imprensa liberando as perguntas.",
    triggerCondition: (player) => player.reputation >= 25,
    choices: [
      {
        id: "ir_e_falar_tudo",
        text: "Ir e abrir o coração sobre a panela do vestiário e os juízes.",
        riskLabel: "Risco Crítico / Explosão de Fama",
        outcome: {
          successProb: 0.50,
          success: {
            morale: +10,
            reputation: +20,
            money: 25000,
            text: "Cortes seus viralizaram com 10 milhões de views! Você virou o 'homem mais sincero do Brasil'."
          },
          failure: {
            morale: -15,
            reputation: -10,
            money: -15000,
            text: "Você falou demais, a diretoria te multou em 20% do salário e o técnico te colocou no banco por indisciplina!"
          }
        }
      },
      {
        id: "ir_com_discurso_treinado",
        text: "Ir mas responder apenas com frases prontas de boleiro.",
        riskLabel: "Seguro / Ganho de Mídia Neutro",
        outcome: {
          successProb: 1.0,
          success: {
            morale: 0,
            reputation: +6,
            text: "Você disse 'o importante são os três pontos' 14 vezes. Entrevista morna, mas zero problemas com a diretoria."
          }
        }
      }
    ]
  },
  {
    id: "infiltracao_na_final",
    title: "Fisgada na Coxa na Véspera da Final",
    category: "campo",
    categoryName: "⚽ Decisão de Campo",
    description: "No último treino antes da grande decisão, você sentiu uma pontada na posterior da coxa. O médico diz que dá para jogar no sacrifício com infiltração, mas com risco de estourar.",
    triggerCondition: (player) => player.physical >= 40,
    choices: [
      {
        id: "jogar_no_sacrificio",
        text: "Tomar infiltração e ir para o jogo. Final não se assiste da maca!",
        riskLabel: "Risco de Lesão Grave / Glória Heroica",
        outcome: {
          successProb: 0.55,
          success: {
            morale: +20,
            reputation: +18,
            overall: +1,
            text: "Você jogou com raça inigualável, calou a dor e foi o herói da partida! A torcida gritou seu nome."
          },
          failure: {
            morale: -10,
            physical: -14,
            text: "A coxa estourou aos 20 minutos do primeiro tempo. Você saiu chorando e vai parar por semanas no DM."
          }
        }
      },
      {
        id: "pedir_para_ser_poupado",
        text: "Ser honesto com o médico e dar a vaga para o companheiro 100%.",
        riskLabel: "Preservação Física",
        outcome: {
          successProb: 1.0,
          success: {
            morale: -4,
            physical: +6,
            reputation: -3,
            text: "Você se preservou e evitou uma cirurgia. Alguns torcedores te chamaram de pipoqueiro, mas seu corpo agradeceu."
          }
        }
      }
    ]
  },
  {
    id: "penalti_aos_49",
    title: "Pênalti Decisivo aos 49 do Segundo Tempo",
    category: "campo",
    categoryName: "⚽ Tensão Máxima",
    description: "O árbitro aponta a marca da cal no último lance do clássico empatado. O cobrador oficial sentiu a pressão e entregou a bola nas suas mãos com 50 mil pessoas em silêncio.",
    triggerCondition: (player) => player.position !== "GOL" || player.archetype === "goleiro_artilheiro",
    choices: [
      {
        id: "bater_com_cavadinha",
        text: "Bater com cavadinha no meio do gol como um verdadeiro deboche.",
        riskLabel: "Arrogância Total / Loucura",
        outcome: {
          successProb: 0.40,
          success: {
            morale: +25,
            reputation: +25,
            overall: +1,
            text: "GOLAÇO HISTÓRICO! O goleiro foi no canto e a bola caiu mansa no meio. Você é oficialmente uma lenda da marra!"
          },
          failure: {
            morale: -20,
            reputation: -25,
            text: "O goleiro nem se mexeu e segurou a bola com uma mão só em pé. Vergonha nacional nos jornais de segunda-feira!"
          }
        }
      },
      {
        id: "bater_com_forca",
        text: "Encher o pé no canto com força e segurança.",
        riskLabel: "Probabilidade Favorável",
        outcome: {
          successProb: 0.78,
          success: {
            morale: +12,
            reputation: +10,
            text: "Bola de um lado, goleiro do outro! A rede estufou e o estádio veio abaixo em comemoração!"
          },
          failure: {
            morale: -10,
            reputation: -8,
            text: "A bola bateu no travessão e subiu. Que azar cruel nos acréscimos!"
          }
        }
      }
    ]
  },
  {
    id: "treino_extra_falta",
    title: "Treino Noturno de Faltas",
    category: "campo",
    categoryName: "🏋️ Dedicação & Trabalho",
    description: "O treino coletivo acabou e todos foram embora. Você olha para a barreira de metal e a cesta de bolas sob os refletores apagando.",
    triggerCondition: (player) => true,
    choices: [
      {
        id: "ficar_chutando",
        text: "Ficar mais 1 hora calibrando o pé até o segurança mandar fechar.",
        riskLabel: "Cansaço Leve / Ganho Técnico",
        outcome: {
          successProb: 0.85,
          success: {
            overall: +1,
            morale: +5,
            physical: -2,
            text: "Sua pontaria ficou afiada como lâmina! O técnico viu da janela e anotou seu nome como batedor titular."
          },
          failure: {
            physical: -5,
            morale: -2,
            text: "Você forçou demais o músculo adutor e acabou com uma contratura boba. Valeu o esforço, mas dói."
          }
        }
      },
      {
        id: "ir_para_o_vestiario",
        text: "Recuperar na banheira de gelo e descansar para o jogo.",
        riskLabel: "Seguro",
        outcome: {
          successProb: 1.0,
          success: {
            physical: +3,
            morale: +2,
            text: "Descanso muscular regenerativo perfeito para a semana intensa."
          }
        }
      }
    ]
  },
  {
    id: "panela_do_vestiario",
    title: "A Panela contra o Técnico",
    category: "vestiario",
    categoryName: "🤫 Bastidores & Vestiário",
    description: "Os líderes do elenco te chamam em uma sala fechada. Eles querem fazer corpo mole no próximo jogo para derrubar o treinador gringo que cobra dois períodos.",
    triggerCondition: (player) => player.age >= 20,
    choices: [
      {
        id: "fechar_com_a_panela",
        text: "Apoiar os medalhões. Quem manda no vestiário são os boleiros.",
        riskLabel: "Risco Ético",
        outcome: {
          successProb: 0.60,
          success: {
            morale: +8,
            reputation: -3,
            text: "O técnico caiu após a goleada sofrida e assumiu um interino 'brother' que liberou as folgas na terça-feira."
          },
          failure: {
            morale: -14,
            reputation: -12,
            text: "A diretoria descobriu o motim e afastou você e os veteranos para treinar separado às 7 da manhã!"
          }
        }
      },
      {
        id: "jogar_pela_camisa",
        text: "Recusar o complô e correr o dobro em campo pela honra da camisa.",
        riskLabel: "Coragem / Rixa Interna",
        outcome: {
          successProb: 0.75,
          success: {
            morale: +15,
            reputation: +15,
            overall: +1,
            text: "Você comeu a grama, fez dois gols e salvou o emprego do treinador. A torcida te aclamou como exemplo de lealdade!"
          },
          failure: {
            morale: -8,
            text: "Os veteranos pararam de te passar a bola em campo. O clima no vestiário virou uma guerra fria."
          }
        }
      }
    ]
  },
  {
    id: "comprar_carro_ostentacao",
    title: "O Primeiro Bicho Milionário",
    category: "extracampo",
    categoryName: "💰 Finanças & Vaidade",
    description: "Caiu na sua conta a bonificação pela classificação na Copa. Você está com dinheiro sobrando como nunca na vida.",
    triggerCondition: (player) => player.finances >= 60000,
    choices: [
      {
        id: "comprar_esportivo",
        text: "Comprar um esportivo importado amarelo que ronca alto.",
        riskLabel: "Status Imediato / Risco de Crítica",
        outcome: {
          successProb: 0.70,
          success: {
            morale: +16,
            reputation: +10,
            money: -45000,
            text: "Você chegou no CT acelerando a máquina. Os garotos da base pediram autógrafo e sua autoestima explodiu!"
          },
          failure: {
            morale: -5,
            reputation: -8,
            money: -45000,
            text: "No primeiro dia de chuva você ralou a roda no meio-fio e os comentaristas de mesa redonda te chamaram de imaturo."
          }
        }
      },
      {
        id: "investir_imoveis",
        text: "Comprar uma casa para a mãe e aplicar o resto em renda fixa.",
        riskLabel: "Maturidade / Cabeça no Lugar",
        outcome: {
          successProb: 1.0,
          success: {
            morale: +12,
            reputation: +12,
            money: +15000,
            text: "Sua família chorou de alegria, você conquistou estabilidade e a imprensa te elogiou como garoto exemplar."
          }
        }
      }
    ]
  },
  {
    id: "proposta_irrecusavel_arabia",
    title: "Proposta dos Sonhos do Mundo Árabe",
    category: "contrato",
    categoryName: "💼 Mercado & Dinheiro",
    description: "Um sheik oferece 4 vezes o seu salário para você ir jogar no deserto. É a independência de 3 gerações da sua família, mas você sai dos radares da Seleção.",
    triggerCondition: (player) => player.age >= 21 && player.overall >= 74,
    choices: [
      {
        id: "aceitar_petrodolares",
        text: "Garantir o futuro da família e fechar contrato de ouro.",
        riskLabel: "Dinheiro Rápido / Perda de Vitrine",
        outcome: {
          successProb: 1.0,
          success: {
            morale: +10,
            reputation: -6,
            money: +200000,
            text: "Conta bancária abarrotada de petrodólares! Você vive como um rei, embora jogue para públicos menores."
          }
        }
      },
      {
        id: "ficar_pelo_sonho",
        text: "Recusar os milhões. Seu foco é glória esportiva e títulos grandes.",
        riskLabel: "Ambição de Elite",
        outcome: {
          successProb: 1.0,
          success: {
            morale: +8,
            reputation: +15,
            overall: +1,
            text: "Você provou que seu coração não está à venda. Clubes gigantes da Europa e a Seleção continuam de olho em você!"
          }
        }
      }
    ]
  }
];

/**
 * Retorna um evento aleatório elegível para o jogador
 * @param {Player} player 
 * @param {Array<string>} excludeIds IDs de eventos já ocorridos recentemente
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
