import { users } from "@prisma/client";
import client from "../config/database.js";

async function getUserIdByEmail(email: users['email']) {
  return client.users.findUnique({
    where: {
      email
    }
  })

}

const credentialRepository = {
  getUserIdByEmail
};

export default credentialRepository;