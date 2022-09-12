import { users } from '@prisma/client';

import wifiRepository from "../repositories/wifiRepository.js";
import { CreateWifi } from '../types/wifiInterface.js';

async function getUserIdByEmail(email: users['email']) {
  const userInfo = await wifiRepository.getUserIdByEmail(email);
  return userInfo.id
}

async function createWifi(network: CreateWifi) {
  const wifi = await wifiRepository.createWifi(network);
  return wifi;
}
const wifiService = {
  getUserIdByEmail,
  createWifi
}

export default wifiService;