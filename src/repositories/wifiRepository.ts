import { users } from '@prisma/client';
import client from "../config/database.js";
import { CreateWifi } from '../types/wifiInterface.js';


async function getUserIdByEmail(email: users['email']) {
  return client.users.findUnique({
    where: {
      email
    }
  })
}

async function createWifi(network: CreateWifi) {
  return client.network.create({
    data: network
  })
}

async function getAllWifi(userId: users['id']) {
  return client.network.findMany({
    where: {
      userId
    }
  })
}

async function getWifiById(id: number) {
  return client.network.findUnique({
    where: {
      id
    }
  })
}

async function deleteWifiById(id: number) {
  return client.network.delete({
    where: {
      id
    }
  })
}

const wifiRepository = {
  getUserIdByEmail,
  createWifi,
  getAllWifi,
  getWifiById,
  deleteWifiById
}

export default wifiRepository;