import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 's2ro2axay'; // This should be the same in both places

// Function to generate token
export const generateToken = (email: string) => {
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: '8h' });
};

// Function to verify token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);  // Same secret used here
  } catch (error) {
    return null;
  }
};
