import { users } from '@prisma/client';

// import repositories
import authRepository from "../repositories/authRepository.js";

async function verifyEmailExists(email: users['email']) {
  const resultEmail = await authRepository.getEmail(email);
  if (resultEmail) {
    throw {
      type: 'conflict',
      message: 'Email already exists',
    }
  }
  return resultEmail;
}

const authService = {
  verifyEmailExists
}

export default authService