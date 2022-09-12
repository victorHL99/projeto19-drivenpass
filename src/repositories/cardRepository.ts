import { users, cards } from '@prisma/client';
import { CreateCard } from "../types/cardInterface.js";
import client from '../config/database.js';


async function getUserIdByEmail(email: users['email']) {
  return client.users.findUnique({
    where: {
      email
    }
  })
}

async function verifyIfCardNumberAlreadyExists(number: string) {
  return client.cards.findFirst({
    where: {
      number
    }
  })
}

async function verifyIfCardLabelAlreadyExists(label: string) {
  return client.cards.findFirst({
    where: {
      label
    }
  })
}

async function createCard(card: CreateCard) {
  return client.cards.create({
    data: card
  })
}

async function getAllCards(userId: number) {
  return client.cards.findMany({
    where: {
      userId
    }
  })
}

async function checkIfCardExists(idCard: number) {
  return client.cards.findUnique({
    where: {
      id: idCard
    }
  })
}

async function getCardById(idCard: number) {
  return client.cards.findUnique({
    where: {
      id: idCard
    }
  })
}

async function verifyIfCardLabelAlreadyExistsWithUserId(label: string, userId: number) {
  return client.cards.findFirst({
    where: {
      label,
      userId
    }
  })
}
const cardRepository = {
  getUserIdByEmail,
  verifyIfCardNumberAlreadyExists,
  verifyIfCardLabelAlreadyExists,
  createCard,
  getAllCards,
  checkIfCardExists,
  getCardById,
  verifyIfCardLabelAlreadyExistsWithUserId
}

export default cardRepository;