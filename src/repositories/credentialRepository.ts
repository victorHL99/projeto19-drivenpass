import { users } from "@prisma/client";
import client from "../config/database.js";

import {CreateCredential} from "../types/credentialInterface.js";

async function getUserIdByEmail(email: users['email']) {
  return client.users.findUnique({
    where: {
      email
    }
  })
}

async function createCredential(credential: CreateCredential) {
  return client.credentials.create({
    data: credential
  })
}

async function verifyIfCredentialTitleAlreadyExists(title: CreateCredential['title'], userId: CreateCredential['userId']) {
  return client.credentials.findFirst({
    where: {
        title,
        userId
      }
    })
  }

const credentialRepository = {
  getUserIdByEmail,
  createCredential,
  verifyIfCredentialTitleAlreadyExists
  
};

export default credentialRepository;