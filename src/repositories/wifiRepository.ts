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

const wifiRepository = {
  getUserIdByEmail,
  createWifi
}

export default wifiRepository;