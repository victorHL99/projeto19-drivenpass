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

  // verify if card number already exists
  await cardService.verifyIfCardNumberAlreadyExists(card.number);

  // verify if card label already exists
  await cardService.verifyIfCardLabelAlreadyExists(card.label);

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

const cardController = {
  createCard,
  getAllCards

}

export default cardController;