import { users } from "@prisma/client";
import client from "../config/database.js";

import { CreateCredential } from "../types/credentialInterface.js";

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

async function getAllCredentials(userId: CreateCredential['userId']) {
  return client.credentials.findMany({
    where: {
      userId
    }
  })
}

async function getCredentialById(id: number) {
  return client.credentials.findUnique({
    where: {
      id
    }
  })
}

async function deleteCredentialById(id: number) {
  return client.credentials.delete({
    where: {
      id
    }
  })
}

const credentialRepository = {
  getUserIdByEmail,
  createCredential,
  verifyIfCredentialTitleAlreadyExists,
  getAllCredentials,
  getCredentialById,
  deleteCredentialById

};

export default credentialRepository;