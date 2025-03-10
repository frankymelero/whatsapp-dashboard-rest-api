import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 's2ro2axay'; 

export const generateToken = (email: string) => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '8h' });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET); 
  } catch (error) {
    return null;
  }
};
