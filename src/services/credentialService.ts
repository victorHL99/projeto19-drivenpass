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

async function getCredentialById(id: number) {
  const credential = await credentialRepository.getCredentialById(id);

  const credentialWithNewPassword = credentialWithCleanPassword(credential);

  return credentialWithNewPassword;
}

async function checkIfCredentialIsFromUser(id: number, email: users['email']) {
  const credential = await credentialRepository.getCredentialById(id);

  const userId = await getUserIdByEmail(email);

  if (credential.userId !== userId) {
    throw {
      type: 'forbidden',
      message: 'This credential is not from this user'
    }
  }
}

async function checkIfCredentialExists(id: number) {
  const credential = await credentialRepository.getCredentialById(id);

  if (!credential) {
    throw {
      type: 'not_found',
      message: 'Credential not found'
    }
  }
}
const CredentialService = {
  getUserIdByEmail,
  createCredential,
  verifyIfCredentialTitleAlreadyExists,
  getAllCredentials,
  getCredentialById,
  checkIfCredentialIsFromUser,
  checkIfCredentialExists
}

export default CredentialService;