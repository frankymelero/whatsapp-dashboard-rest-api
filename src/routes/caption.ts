// src/routes/auth.ts
import { Router } from 'express';
import { addCaptionController } from '../controllers/caption.controller';

const router = Router();

router.post('/add', addCaptionController);

export { router }; 