/**
 * CARREIRA FC - MÓDULO: MERCADO DA BOLA (TRANSFER)
 * Gera propostas realistas de transferência com base em Overall, idade,
 * reputação e desempenho do atleta, calculando salários e luvas.
 */

import { CLUBS, getClubById, getEligibleClubsForTransfer } from '../data/clubs.js';

export class TransferMarket {
  /**
   * Gera ofertas de transferência para o atleta ao final de uma temporada
   * @param {Player} player 
   * @returns {object} { offers: Array<object>, currentClubOffer: object }
   */
  static generateTransferOffers(player) {
    const currentClub = getClubById(player.currentClubId) || { id: "livre", name: "Sem Clube", wage: 10000 };
    const eligibleClubs = getEligibleClubsForTransfer(player.overall, player.reputation, player.currentClubId);
    
    // Sorteia de 1 a 3 clubes interessados
    const shuffled = [...eligibleClubs].sort(() => 0.5 - Math.random());
    const selectedClubs = shuffled.slice(0, Math.min(3, shuffled.length));

    const offers = selectedClubs.map(club => {
      // Salário base calculado por Overall e poder financeiro do clube comprador
      const wageBase = Math.round(Math.pow(player.overall / 50, 4.5) * 8000 * (club.financialPower / 3));
      
      // Proposta salarial (clubes europeus e árabes pagam muito mais)
      let wageMultiplier = 1.0;
      if (club.region === "europe") wageMultiplier = 2.8;
      else if (club.region === "saudi") wageMultiplier = 4.5;
      else if (club.region === "usa") wageMultiplier = 1.8;

      const offeredWage = Math.round((wageBase * wageMultiplier) / 1000) * 1000;
      const signingBonus = Math.round(offeredWage * 4); // Luvas de assinatura

      // Projeção de status no elenco
      const ovrDiff = player.overall - club.overall;
      let squadRole = "Disputa de Posição";
      if (ovrDiff >= 3) squadRole = "Estrela / Titular Absoluto";
      else if (ovrDiff <= -4) squadRole = "Aposta para Composição";

      return {
        clubId: club.id,
        clubName: club.shortName || club.name,
        country: club.country,
        region: club.region,
        emoji: club.emoji,
        tier: club.tier,
        clubOverall: club.overall,
        wage: offeredWage,
        signingBonus,
        squadRole
      };
    });

    // Proposta de renovação do clube atual (com aumento de 10% a 35%)
    const renewalRaise = 1.15 + (player.overall > currentClub.overall ? 0.20 : 0.05);
    const renewalWage = Math.round((player.wage * renewalRaise) / 1000) * 1000;
    const currentClubOffer = {
      clubId: currentClub.id,
      clubName: currentClub.shortName || currentClub.name,
      wage: renewalWage,
      signingBonus: Math.round(renewalWage * 2),
      squadRole: "Renovação de Vínculo"
    };

    return {
      offers,
      currentClubOffer
    };
  }

  /**
   * Efetua a transferência do atleta para o novo clube
   * @param {Player} player 
   * @param {object} offer 
   */
  static acceptOffer(player, offer) {
    player.currentClubId = offer.clubId;
    player.wage = offer.wage;
    player.finances += (offer.signingBonus || 0);

    // Se foi para Europa ou Arábia, ganha bônus de reputação
    if (offer.region === "europe") {
      player.reputation = Math.min(100, player.reputation + 15);
    } else if (offer.region === "saudi") {
      player.reputation = Math.max(1, player.reputation - 5); // Perda leve de prestígio esportivo
    }

    player.marketValue = player.calculateMarketValue();
  }
}
