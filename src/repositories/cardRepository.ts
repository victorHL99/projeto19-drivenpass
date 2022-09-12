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

const cardRepository = {
  getUserIdByEmail,
  verifyIfCardNumberAlreadyExists,
  verifyIfCardLabelAlreadyExists,
  createCard
}

export default cardRepository;