import client from "../config/database.js";
import { IAuthUser } from "../interfaces/authInterface.js";


async function getEmail(email: IAuthUser['email']) {
  return client.users.findUnique({
    where: {
      email
    }
  });
}

const authRepository = {
  getEmail
}

export default authRepository