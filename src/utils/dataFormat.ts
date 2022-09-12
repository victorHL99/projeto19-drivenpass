import { credentials,cards } from "@prisma/client";
import cryptr from "cryptr";

import passwordUtils from "./passwordUtils.js";

export function credentialWithCleanPassword(credetial: credentials) {
  const newPassword = passwordUtils.decryptPasswordByCryptr(credetial.password);

  const newCredential = {
    ...credetial,
    password: newPassword,
  };

  return newCredential;
}

export function cardWithCleanPassword(card: cards ) {
  const newPassword = passwordUtils.decryptPasswordByCryptr(card.password);

  const newCard = {
    ...card,
    password: newPassword,
  };

  return newCard;
}

const dataFormat = {
  credentialWithCleanPassword,
  cardWithCleanPassword
}

export default dataFormat;