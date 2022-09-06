import { Request, Response } from 'express';

async function createUser(req:Request, res:Response){
  console.log("teste")
  res.send("Ok")
}

const authController = {
  createUser
}

export default authController;