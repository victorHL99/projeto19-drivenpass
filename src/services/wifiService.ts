import { users } from '@prisma/client';

import wifiRepository from "../repositories/wifiRepository.js";
import { CreateWifi } from '../types/wifiInterface.js';
import { wifiWithCleanPassword } from '../utils/dataFormat.js';

async function getUserIdByEmail(email: users['email']) {
  const userInfo = await wifiRepository.getUserIdByEmail(email);
  return userInfo.id
}

async function createWifi(network: CreateWifi) {
  const wifi = await wifiRepository.createWifi(network);
  return wifi;
}

async function getAllWifi(userId: users['id']) {
  const wifi = await wifiRepository.getAllWifi(userId);

  const wifiWithoutPassword = wifi.map(wifiWithCleanPassword)

  return wifiWithoutPassword;
}

const wifiService = {
  getUserIdByEmail,
  createWifi,
  getAllWifi
}

export default wifiService;