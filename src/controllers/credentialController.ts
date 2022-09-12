import { Request, Response } from "express";
import { users, credentials } from "@prisma/client";

import { CredentialInitial, CreateCredential } from "../types/credentialInterface.js";
import credentialService from "../services/credentialService.js";
import passwordUtils from "../utils/passwordUtils.js";

async function createCredential(req: Request, res: Response) {
  const { url, username, password, title }: CredentialInitial = req.body;
  const email: users['email'] = res.locals.userEmail;

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

  const userId = await credentialService.getUserIdByEmail(email);
  const allCredentials = await credentialService.getAllCredentials(userId);


  res.status(200).send(allCredentials);
}

async function getCredentialById(req: Request, res: Response) {
  const { id }: any = req.params;
  const idCredential = parseInt(id, 10);
  const email: users['email'] = res.locals.userEmail;

  await credentialService.checkIfCredentialExists(idCredential);
  await credentialService.checkIfCredentialIsFromUser(idCredential, email);
  const credential = await credentialService.getCredentialById(idCredential);

  res.status(200).send(credential);
}

async function deleteCredentialById(req: Request, res: Response) {
  const { id }: any = req.params;
  const idCredential = parseInt(id, 10);
  const email: users['email'] = res.locals.userEmail;

  await credentialService.checkIfCredentialExists(idCredential);
  await credentialService.checkIfCredentialIsFromUser(idCredential, email);
  await credentialService.deleteCredentialById(idCredential);

  res.status(200).send("Credential deleted");
}

const credentialController = {
  createCredential,
  getAllCredentials,
  getCredentialById,
  deleteCredentialById
};

export default credentialController;