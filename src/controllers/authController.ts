import { Request, Response } from 'express';

// import services
import authService from '../services/authService.js'

// import interfaces
import { CreateAuthUser } from '../types/authInterface.js';

async function createUser(req: Request, res: Response) {
  const { email, password }: CreateAuthUser = req.body;
  console.log(email, password);


  await authService.verifyEmailExists(email); // verify if email already exists
  const hashPassword = await authService.encryptPassword(password); // encrypt password 
  await authService.createUserDatabase(email, hashPassword);// create user


  res.status(201).send("User created");
}

const authController = {
  createUser
}

export default authController;