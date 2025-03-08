import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";


const registerNewUser = async ({ email, password, name }: User) => {

  const checkIs = await UserModel.findOne({ where: { email } });
  if (checkIs) return "USER_EXISTS";
  
  const passHash = await encrypt(password);

  const registerNewUser = await UserModel.create({
    email,
    password: passHash,
    name,
  });

  return registerNewUser;
};


const loginUser = async ({ email, password }: Auth) => {

  const checkIs = await UserModel.findOne({ where: { email } });
  if (!checkIs) return "INVALID_DATA";

  const passwordHash = checkIs.password;
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect) return "PASSWORD_INCORRECTO";

  const token = generateToken(checkIs.email);

  const data = {
    token,
  };

  return data;
};

export { registerNewUser, loginUser };