import { Router } from 'express';
import {
  addCaptionController,
  getAllCaptionsController,
  getCaptionsByUrlTypeController,
  getMostRecentCaptionsController,
  updateCaptionController,
  deleteCaptionController,
} from '../controllers/caption.controller';
import { checkJwt } from '../middlewares/session';

const router = Router();

router.post('/add', checkJwt, addCaptionController);

router.get('/', checkJwt, getAllCaptionsController);

router.get('/urltype/:urltype', checkJwt, getCaptionsByUrlTypeController);

router.get('/recent', checkJwt, getMostRecentCaptionsController);

router.put('/:id', checkJwt, updateCaptionController);

router.delete('/:id', checkJwt, deleteCaptionController);

export { router };
