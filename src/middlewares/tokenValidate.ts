import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export default async function tokenValidate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  const JWT_KEY = process.env.JWT_SECRET_KEY;

  if (!token) {
    throw {
      type: 'unauthorized',
      message: 'Token Invalid'
    }
  }

  next()
}
