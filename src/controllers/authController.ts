import { Request, Response } from 'express';

// import services
import authService from '../services/authService.js'

// import interfaces
import { CreateAuthUser } from '../types/authInterface.js';

async function createUser(req: Request, res: Response) {
  const { email, password }: CreateAuthUser = req.body;
  console.log(email, password);

  // verify if email already exists
  await authService.verifyEmailExists(email);

  // encrypt password
  const hashPassword = await authService.encryptPassword(password);




  res.sendStatus(201);
}

const authController = {
  createUser
}

export default authController;