import { credentials } from "@prisma/client";
import cryptr from "cryptr";

import passwordUtils from "./passwordUtils.js";

export function credentialWithCleanPassword(credetial: credentials) {
  const newPassword = passwordUtils.decryptPasswordByCryptr(credetial.password);

  const newCredential = {
    ...credetial,
    password: newPassword,
  };

  return newCredential;
}

const dataFormat = {
  credentialWithCleanPassword
}

export default dataFormat;