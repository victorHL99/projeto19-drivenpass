import { users } from '@prisma/client';
import { CreateCard } from "../types/cardInterface.js";
import cardRepository from '../repositories/cardRepository.js';

import { cardWithCleanPassword } from "../utils/dataFormat.js";

async function getUserIdByEmail(email: users['email']) {
  const result = await cardRepository.getUserIdByEmail(email);

  return result.id;
}

async function verifyIfCardNumberAlreadyExists(number: string) {
  const card = await cardRepository.verifyIfCardNumberAlreadyExists(number);

  if (card) {
    throw {
      type: 'conflict',
      message: 'Card Number already exists'
    }
  }
}

async function verifyIfCardLabelAlreadyExists(label: string) {
  const card = await cardRepository.verifyIfCardLabelAlreadyExists(label);

  if (card) {
    throw {
      type: 'conflict',
      message: 'Card Label already exists'
    }
  }
}

async function createCard(card: CreateCard) {
  return cardRepository.createCard(card);
}

async function getAllCards(userId: number) {
  const cards = await cardRepository.getAllCards(userId);
  const cardsWithoutPassword = cards.map(cardWithCleanPassword)
  return cardsWithoutPassword;
}


const cardService = {
  getUserIdByEmail,
  verifyIfCardNumberAlreadyExists,
  verifyIfCardLabelAlreadyExists,
  createCard,
  getAllCards
}

export default cardService;