// middlewares/session.ts
import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/jwt.handle';

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || '';
    const jwt = jwtByUser.startsWith('Bearer ') ? jwtByUser.split(' ')[1] : jwtByUser;
    
    const isUser = verifyToken(jwt);
    if (!isUser) {
      return res.status(401).json({ message: 'INVALID_TOKEN' });
    }
    
    req.user = isUser; // Opcional: pasa el usuario decodificado al siguiente middleware
    next();
  } catch (error) {
    res.status(400).json({ message: 'INVALID_SESSION' });
  }
};

export { checkJwt };