import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserRepository from "../repositories/user.repository"; // Ahora usa el repositorio
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const registerNewUser = async ({ email, password, name }: User) => {
  const existingUser = await UserRepository.findByEmail(email);
  if (existingUser) return "USER_EXISTS";

  const passHash = await encrypt(password);
  
  const newUser = await UserRepository.create({
    email,
    password: passHash,
    name,
  });

  return newUser;
};

const loginUser = async ({ email, password }: Auth) => {
  const user = await UserRepository.findByEmail(email);
  if (!user) return "INVALID_DATA";

  const isCorrect = await verified(password, user.password);
  if (!isCorrect) return "PASSWORD_INCORRECTO";

  const token = generateToken(user.email);

  return { token };
};

export { registerNewUser, loginUser };
