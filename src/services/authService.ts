import { users } from '@prisma/client';
import bcrypt from 'bcrypt';

import { TypeAction } from '../types/authInterface.js';

// import repositories
import authRepository from "../repositories/authRepository.js";

async function verifyEmailExists(email: users['email'], action:TypeAction ) {
  const resultEmail = await authRepository.getEmail(email);
  if(action === "signup") {
    if(resultEmail){
      throw {
        type: 'conflict',
        message: 'Email already exists',
      }
    }
  }

  if(action === "login") {
    if(!resultEmail){
      throw {
        type: 'unauthorized',
        message: 'Email not exists',
      }
    }
  }

  return resultEmail;
}

async function encryptPassword(password: users['password']) {
  const hashPassword = await bcrypt.hash(password, 10);

  return hashPassword;
}

async function comparePassword(password:users['password'],hashPassword:users['password']) {
  const result = await bcrypt.compare(password, hashPassword)
  if(!result) {
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


const authService = {
  verifyEmailExists,
  encryptPassword,
  createUserDatabase,
  comparePassword
}

export default authService