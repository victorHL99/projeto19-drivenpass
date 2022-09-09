import { users } from '@prisma/client';
import client from "../config/database.js";


async function getEmail(email: users['email']) {
  return client.users.findUnique({
    where: {
      email
    }
  });
}

async function createUser(email: users['email'], password: users['password']) {
  return client.users.create({
    data: {
      email,
      password
    }
  });
}

async function getUserByEmail(email: users['email']) {
  return client.users.findUnique({
    where: {
      email
    }
  })
}

const authRepository = {
  getEmail,
  createUser,
  getUserByEmail
}

export default authRepository