import { Request, Response } from "express";

async function createCredential(req: Request, res: Response) {
  res.status(201).send("Credential created");
}

const credentialController = {
  createCredential,
};

export default credentialController;