import connection from "../config/database.js";
import { IAuthUser } from "../interfaces/authInterface.js";


async function getEmail(email:IAuthUser['email']){
  return connection.query<IAuthUser>(`SELECT * FROM users WHERE email = $1`, [email]);
}

const authRepository = {
  getEmail
}

export default authRepository