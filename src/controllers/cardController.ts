import { users } from '@prisma/client';
import { Request, Response } from "express";
import { CreateCard, CardInitial } from "../types/cardInterface";

import cardService from "../services/cardService.js";
import passwordUtils from '../utils/passwordUtils.js';

async function createCard(req: Request, res: Response) {
  const { number, label, name, expirationDate, securityCode, password, isVirtual, type }: CardInitial = req.body;
  const email: users['email'] = res.locals.userEmail;

  // find userId by userEmail
  const userId: number = await cardService.getUserIdByEmail(email);

  // encrypt password by cryptr
  const hashPassword: CardInitial['password'] = await passwordUtils.encryptPasswordByCryptr(password);

  // create object card
  const card = {
    number,
    label,
    name,
    expirationDate,
    securityCode,
    password: hashPassword,
    isVirtual,
    type,
    userId,
  };

  // TODO - add condition with userId
  // verify if card number already exists
  /* await cardService.verifyIfCardNumberAlreadyExists(card.number); */

  // veirfy if card label already exists with userId
  await cardService.verifyIfCardLabelAlreadyExistsWithUserId(card.label, userId);

  // create card
  await cardService.createCard(card);

  res.status(201).json({
    message: 'Card created successfully',
  });
}

async function getAllCards(req: Request, res: Response) {
  const email: users['email'] = res.locals.userEmail;

  const userId: number = await cardService.getUserIdByEmail(email);
  const allCards = await cardService.getAllCards(userId);

  res.status(200).json(allCards);
}

async function getCardById(req: Request, res: Response) {
  const { id }: any = req.params;
  const idCard = parseInt(id, 10);
  const email: users['email'] = res.locals.userEmail;

  await cardService.checkIfCardExists(idCard);
  await cardService.checkIfCardIsFromUser(idCard, email);
  const card = await cardService.getCardById(idCard);

  res.status(200).json(card);
}

async function deleteCardById(req: Request, res: Response) {
  const { id }: any = req.params;
  const idCard = parseInt(id, 10);
  const email: users['email'] = res.locals.userEmail;

  await cardService.checkIfCardExists(idCard);
  await cardService.checkIfCardIsFromUser(idCard, email);
  await cardService.deleteCardById(idCard);

  res.status(200).json({
    message: 'Card deleted successfully',
  });
}

const cardController = {
  createCard,
  getAllCards,
  getCardById,
  deleteCardById

}

export default cardController;