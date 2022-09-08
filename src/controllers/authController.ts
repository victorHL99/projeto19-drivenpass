import { Request, Response } from 'express';
import { users } from '@prisma/client';
import jwt from 'jsonwebtoken';

// import services
import authService from '../services/authService.js'

// import interfaces
import { CreateAuthUser } from '../types/authInterface.js';
import { TypeAction } from "../types/authInterface";

async function createUser(req: Request, res: Response) {
  const { email, password }: CreateAuthUser = req.body;
  const action:TypeAction = "signup";

  await authService.verifyEmailExists(email,action); // verify if email already exists
  const hashPassword: users['password'] = await authService.encryptPassword(password); // encrypt password 
  await authService.createUserDatabase(email, hashPassword);// create user

  res.status(201).send("User created");
}

async function login(req: Request, res: Response) {
  const { email, password }: CreateAuthUser = req.body;
  const action:TypeAction = "login";
  
  const infoUser = await authService.verifyEmailExists(email,action); // verify if email exists
  await authService.comparePassword(password,infoUser?.password); // compare password
  const token = jwt.sign({ email: infoUser?.email}, process.env.JWT_SECRET_KEY); // generate token

  res.status(200).send("User logged");
}

const authController = {
  createUser,
  login
}

export default authController;