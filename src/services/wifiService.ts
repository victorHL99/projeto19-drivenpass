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

async function checkIfWifiExists(id: number) {
  const wifi = await wifiRepository.getWifiById(id);

  if (!wifi) {
    throw {
      type: "not_found",
      message: "Wifi not found",
    };
  }
}

async function checkIfWifiBelongsToUser(id: number, email: users['email']) {
  const userId = await getUserIdByEmail(email);
  const wifi = await wifiRepository.getWifiById(id);

  if (wifi.userId !== userId) {
    throw {
      type: "not_found",
      message: "Wifi does not belong to the user",
    };
  }
}

async function getWifiById(id: number) {
  const wifi = await wifiRepository.getWifiById(id);
  return wifiWithCleanPassword(wifi);
}

async function deleteWifiById(id: number) {
  return wifiRepository.deleteWifiById(id);
}

const wifiService = {
  getUserIdByEmail,
  createWifi,
  getAllWifi,
  checkIfWifiExists,
  checkIfWifiBelongsToUser,
  getWifiById,
  deleteWifiById
}

export default wifiService;