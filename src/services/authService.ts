import { users } from '@prisma/client';
import bcrypt from 'bcrypt';

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

async function encryptPassword(password: users['password']) {
  const hashPassword = await bcrypt.hash(password, 10);

  return hashPassword;
}

async function createUserDatabase(email: users['email'], password: users['password']) {
  const result = await authRepository.createUser(email, password);

  return result;
}

const authService = {
  verifyEmailExists,
  encryptPassword,
  createUserDatabase
}

export default authService