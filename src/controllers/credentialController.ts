import { Request, Response } from "express";
import { users } from "@prisma/client";

import { CredentialInitial } from "../types/credentialInterface";

async function createCredential(req: Request, res: Response) {
  const { url, username, password, title }: CredentialInitial = req.body;
  const email: users['email'] = JSON.stringify(res.locals.userEmail);

  console.log(email, "controller");

  // find userId by userEmail

  res.status(201).send("Credential created");
}

const credentialController = {
  createCredential,
};

export default credentialController;