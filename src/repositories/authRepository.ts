import { users } from '@prisma/client';
import client from "../config/database.js";


async function getEmail(email: users['email']) {
  return client.users.findUnique({
    where: {
      email
    }
  });
}

const authRepository = {
  getEmail
}

export default authRepository