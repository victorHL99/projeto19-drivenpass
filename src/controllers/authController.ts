import { Request, Response } from 'express';

// import interfaces
import { IUser } from '../types/authInterface.js'

async function createUser(req:Request, res:Response){
  const { email, password }:IUser = req.body;
  console.log(email, password);


  res.send("Ok")
}

const authController = {
  createUser
}

export default authController;