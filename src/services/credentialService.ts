import { users } from "@prisma/client";
import { CreateCredential } from "../types/credentialInterface";
import credentialRepository from "../repositories/credentialRepository.js";

import { credentialWithCleanPassword } from "../utils/dataFormat.js";

async function getUserIdByEmail(email: users['email']) {
  const userInfo = await credentialRepository.getUserIdByEmail(email);
  return userInfo.id
}

async function createCredential(credential: CreateCredential) {
  const newCredential = await credentialRepository.createCredential(credential);
  return newCredential;
}

async function verifyIfCredentialTitleAlreadyExists(title: CreateCredential['title'], userId: CreateCredential['userId']) {
  const credential = await credentialRepository.verifyIfCredentialTitleAlreadyExists(title, userId);
  if (credential) {
    throw {
      type: 'conflict',
      message: 'Credential title already exists'
    }
  }
}

async function getAllCredentials(userId: CreateCredential['userId']) {
  const credentials = await credentialRepository.getAllCredentials(userId);

  const credentialWithNewPassword = credentials.map(credentialWithCleanPassword)

  return credentialWithNewPassword;
}

const CredentialService = {
  getUserIdByEmail,
  createCredential,
  verifyIfCredentialTitleAlreadyExists,
  getAllCredentials
}

export default CredentialService;