import { Request, Response } from 'express';
import { loginUser, registerNewUser } from '../services/auth.service';
import { handleHttp } from '../utils/error.handle';
import { User } from '../interfaces/user.interface';
import { Auth } from '../interfaces/auth.interface';

const registerController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name } = req.body as User;
    const responseUser = await registerNewUser({ email, password, name });

    if (responseUser === 'USER_EXISTS') {
      res.status(400).json({ message: 'User already exists' });
      return;
    }
    res.status(201).json(responseUser);
  } catch (error) {
    handleHttp(res, 'ERROR_REGISTER_USER', error); 
  }
};

const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as Auth;
    const responseUser = await loginUser({ email, password });

    if (responseUser === 'INVALID_DATA' || responseUser === 'PASSWORD_INCORRECTO') {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    res.json(responseUser);
  } catch (error) {
    handleHttp(res, 'ERROR_LOGIN_USER', error); 
  }
};

export { registerController, loginController };