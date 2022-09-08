import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default async function tokenValidate(req:Request, res:Response, next:NextFunction){
  const token = req.headers.authorization
  console.log(token)

  next()
}
