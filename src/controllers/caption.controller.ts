import { Request, Response } from 'express';
import { addCaption } from '../services/caption.service';
import { handleHttp } from '../utils/error.handle';
import { Caption } from '../interfaces/caption.interface';


const addCaptionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { url, title, urltype } = req.body as Caption;
    const responseCaption = await addCaption({ url, title, urltype });

    if (responseCaption === 'URL_ALREADY_ADDED') {
      res.status(400).json({ message: 'Url already exists' });
      return;
    }
    res.status(201).json(responseCaption);
  } catch (error) {
    handleHttp(res, 'ERROR_ADDING_CAPTION', error); 
  }
};

export { addCaptionController };