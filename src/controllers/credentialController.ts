import { Request, Response } from "express";
import { users } from "@prisma/client";

import { CredentialInitial, CreateCredential } from "../types/credentialInterface.js";
import credentialService from "../services/credentialService.js";
import passwordUtils from "../utils/passwordUtils.js";

async function createCredential(req: Request, res: Response) {
  const { url, username, password, title }: CredentialInitial = req.body;
  const email: users['email'] = res.locals.userEmail;

  console.log(email, "controller");

  // find userId by userEmail
  const userId = await credentialService.getUserIdByEmail(email);

  // encrypt password by cryptr
  const hashPassword: CredentialInitial['password'] = await passwordUtils.encryptPasswordByCryptr(password);

  // create object credential
  const credential = {
    url,
    username,
    password: hashPassword,
    title,
    userId,
  };

  // verify if credential title already exists
  await credentialService.verifyIfCredentialTitleAlreadyExists(credential.title, credential.userId);

  // create credential
  const newCredential: CreateCredential = await credentialService.createCredential(credential);

  res.status(201).send("Credential created");
}

async function getAllCredentials(req: Request, res: Response) {
  const email: users['email'] = res.locals.userEmail;
  console.log(email, "controller");

  const userId = await credentialService.getUserIdByEmail(email);
  const allCredentials = await credentialService.getAllCredentials(userId);

  res.status(200).send(allCredentials);
}

const credentialController = {
  createCredential,
  getAllCredentials
};

export default credentialController;