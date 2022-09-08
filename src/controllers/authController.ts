import { Request, Response } from 'express';
import { users } from '@prisma/client';
import jwt from 'jsonwebtoken';

// import services
import authService from '../services/authService.js'

// import interfaces
import { CreateAuthUser } from '../types/authInterface.js';

async function createUser(req: Request, res: Response) {
  const { email, password }: CreateAuthUser = req.body;

  await authService.verifyEmailExists(email); // verify if email already exists
  const hashPassword: users['password'] = await authService.encryptPassword(password); // encrypt password 
  await authService.createUserDatabase(email, hashPassword);// create user

  res.status(201).send("User created");
}

/* async function login(req: Request, res: Response) {
  const { email, password }: CreateAuthUser = req.body;

  // token creation


  res.status(200).send("User logged");
} */

const authController = {
  createUser
}

export default authController;