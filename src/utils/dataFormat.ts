import { credentials, cards, network } from "@prisma/client";
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

export function cardWithCleanPassword(card: cards) {
  const newPassword = passwordUtils.decryptPasswordByCryptr(card.password);

  const newCard = {
    ...card,
    password: newPassword,
  };

  return newCard;
}

export function wifiWithCleanPassword(wifi: network) {
  const newPassword = passwordUtils.decryptPasswordByCryptr(wifi.password);

  const newWifi = {
    ...wifi,
    password: newPassword,
  };

  return newWifi;
}

const dataFormat = {
  credentialWithCleanPassword,
  cardWithCleanPassword,
  wifiWithCleanPassword
}

export default dataFormat;