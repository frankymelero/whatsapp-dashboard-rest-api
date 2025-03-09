import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.handle'; // Ajusta la ruta según sea necesario

const checkJwt = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(403).json({ message: 'No token provided' });
    return;
  }

  const token = authHeader.split(' ')[1]; // Extrae el token real
  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: 'Invalid or expired token' });
    return;
  }

  next();
};

export { checkJwt };
