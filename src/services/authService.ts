import { IAuthUser } from "../interfaces/authInterface";

// import repositories
import authRepository from "../repositories/authRepository.js";

async function verifyEmailExists(email:IAuthUser['email']) {
  const resultEmail = await authRepository.getEmail(email);
  if(resultEmail.rows.length > 0){
    throw {
      type: 'conflict',
      message: 'Email already exists',
    }
  }
  return resultEmail;
}

const authService = {
  verifyEmailExists
}

export default authService