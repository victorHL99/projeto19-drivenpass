import { users } from '@prisma/client';
import Cryptr from 'cryptr'

function encryptPasswordByCryptr(password: users["password"]) {
  const CRYPT_KEY = process.env.SECRET_KEY_CRYPTR
  const cryptr = new Cryptr(CRYPT_KEY)

  return cryptr.encrypt(password)
}

function decryptPasswordByCryptr(hashPassword: users["password"]) {
  const CRYPT_KEY = process.env.SECRET_KEY_CRYPTR
  const cryptr = new Cryptr(CRYPT_KEY)

  return cryptr.decrypt(hashPassword)
}

const passwordUtils = {
  encryptPasswordByCryptr,
  decryptPasswordByCryptr

}

export default passwordUtils