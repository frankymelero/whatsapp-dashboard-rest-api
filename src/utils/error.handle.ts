import { Response } from 'express';

export const handleHttp = (res: Response, message: string, error?: unknown): Response => {
  console.error(message, error);
  return res.status(500).json({ error: message });
};
