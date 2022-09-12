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

async function verifyIfCardLabelAlreadyExistsWithUserId(label: string, userId: number) {
  const card = await cardRepository.verifyIfCardLabelAlreadyExistsWithUserId(label, userId);

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
  const cardsInfo = await cardRepository.getAllCards(userId);

  const cardsWithoutPassword = cardsInfo.map(cardWithCleanPassword)

  return cardsWithoutPassword;
}

async function checkIfCardExists(idCard: number) {
  const card = await cardRepository.checkIfCardExists(idCard);

  if (!card) {
    throw {
      type: 'not_found',
      message: 'Card not found'
    }
  }
}

async function checkIfCardIsFromUser(idCard: number, email: users['email']) {
  const card = await cardRepository.getCardById(idCard);

  const userId = await getUserIdByEmail(email);

  if (card.userId !== userId) {
    throw {
      type: 'forbidden',
      message: 'This Card is not from this user'
    }
  }
}

async function getCardById(idCard: number) {
  const card = await cardRepository.getCardById(idCard);

  return cardWithCleanPassword(card);
}

async function deleteCardById(idCard: number) {
  return cardRepository.deleteCardById(idCard);
}


const cardService = {
  getUserIdByEmail,
  verifyIfCardNumberAlreadyExists,
  verifyIfCardLabelAlreadyExists,
  createCard,
  getAllCards,
  checkIfCardExists,
  checkIfCardIsFromUser,
  getCardById,
  verifyIfCardLabelAlreadyExistsWithUserId,
  deleteCardById
}

export default cardService;