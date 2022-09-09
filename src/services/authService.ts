import { users } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { TypeAction } from '../types/authInterface.js';

// import repositories
import authRepository from "../repositories/authRepository.js";

async function verifyEmailExists(email: users['email'], action: TypeAction) {
  const resultEmail = await authRepository.getEmail(email);
  if (action === "signup") {
    if (resultEmail) {
      throw {
        type: 'conflict',
        message: 'Email already exists',
      }
    }
  }

  if (action === "login") {
    if (!resultEmail) {
      throw {
        type: 'unauthorized',
        message: 'Email not exists',
      }
    }
  }

  return resultEmail;
}

async function encryptPassword(password: users['password']) {
  const salt = 10

  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
}

async function comparePassword(password: users['password'], hashPassword: users['password']) {
  const result = await bcrypt.compare(password, hashPassword)
  if (!result) {
    throw {
      type: 'unauthorized',
      message: 'Password not match',
    }
  }
  return result;
}

async function createUserDatabase(email: users['email'], password: users['password']) {
  const result = await authRepository.createUser(email, password);

  return result;
}

async function generateToken(email: users['email'], JWT_KEY: string) {
  const token = jwt.sign({ email }, JWT_KEY)
  return token
}

async function saveTokenDatabase(userId: users['id'], token: string) {
  const result = await authRepository.saveToken(userId, token);

  return result;
}

const authService = {
  verifyEmailExists,
  encryptPassword,
  createUserDatabase,
  comparePassword,
  generateToken,
  saveTokenDatabase
}

export default authService