import { users } from '@prisma/client';
import { Request, Response } from "express";
import wifiService from '../services/wifiService.js';
import { WifiInitial } from "../types/wifiInterface.js";
import passwordUtils from '../utils/passwordUtils.js';

async function createWifi(req: Request, res: Response) {
  const { label, password } = req.body as WifiInitial;
  const email = res.locals.userEmail as users['email'];

  // find userId by userEmail
  const userId = await wifiService.getUserIdByEmail(email);

  // encrypt password by cryptr
  const hashPassword = await passwordUtils.encryptPasswordByCryptr(password) as WifiInitial['password'];

  // create object network
  const network = {
    label,
    password: hashPassword,
    userId,
  };

  // create network
  const wifi = await wifiService.createWifi(network);
  console.log(wifi);

  res.status(201).send("Network created");
}

async function getAllWifi(req: Request, res: Response) {
  const email = res.locals.userEmail as users['email'];
  const userId = await wifiService.getUserIdByEmail(email);
  const wifi = await wifiService.getAllWifi(userId);
  res.status(200).send(wifi);
}

async function getWifiById(req: Request, res: Response) {
  const { id }: any = req.params;
  const idWifi = parseInt(id, 10);
  const email: users['email'] = res.locals.userEmail;

  await wifiService.checkIfWifiExists(idWifi);
  await wifiService.checkIfWifiBelongsToUser(idWifi, email);
  const wifi = await wifiService.getWifiById(idWifi);
  res.status(200).send(wifi);
}


const wifiController = {
  createWifi,
  getAllWifi,
  getWifiById
}

export default wifiController;