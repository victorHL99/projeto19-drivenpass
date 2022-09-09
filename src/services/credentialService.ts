import { users } from "@prisma/client";
import credentialRepository from "../repositories/credentialRepository.js";

async function getUserIdByEmail(email: users['email']) {
  const userInfo = await credentialRepository.getUserIdByEmail(email);
  return userInfo.id
}

const CredentialService = {
  getUserIdByEmail
}

export default CredentialService;