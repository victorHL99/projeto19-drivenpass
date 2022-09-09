import { Request, Response } from "express";
import { users } from "@prisma/client";

import { CredentialInitial } from "../types/credentialInterface.js";
import CredentialService from "../services/credentialService.js";

async function createCredential(req: Request, res: Response) {
  const { url, username, password, title }: CredentialInitial = req.body;
  const email: users['email'] = res.locals.userEmail;

  console.log(email, "controller");

  // find userId by userEmail
  const userId = await CredentialService.getUserIdByEmail(email);
  console.log(userId, "controller");

  res.status(201).send("Credential created");
}

const credentialController = {
  createCredential,
};

export default credentialController;