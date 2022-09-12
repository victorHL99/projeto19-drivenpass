import { users } from '@prisma/client';
import { CreateCard } from "../types/cardInterface.js";
import cardRepository from '../repositories/cardRepository.js';

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


const cardService = {
  getUserIdByEmail,
  verifyIfCardNumberAlreadyExists,
  verifyIfCardLabelAlreadyExists,
  createCard
}

export default cardService;