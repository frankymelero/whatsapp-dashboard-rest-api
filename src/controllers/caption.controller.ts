import { Request, Response } from 'express';
import { addCaption, getAllCaptions, getCaptionsByUrlType, getMostRecentCaptions, updateCaption, deleteCaption } from '../services/caption.service';
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

const getAllCaptionsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const captions = await getAllCaptions();
    res.status(200).json(captions);
  } catch (error) {
    handleHttp(res, 'ERROR_FETCHING_CAPTIONS', error);
  }
};

const getCaptionsByUrlTypeController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { urltype } = req.params;
    const captions = await getCaptionsByUrlType(urltype);
    if (!captions || captions.length === 0) {
      res.status(404).json({ message: 'No captions found for this URL type' });
      return;
    }
    res.status(200).json(captions);
  } catch (error) {
    handleHttp(res, 'ERROR_FETCHING_CAPTIONS_BY_URL_TYPE', error);
  }
};

const getMostRecentCaptionsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      res.status(400).json({ message: 'Start date and end date are required' });
      return;
    }

    const captions = await getMostRecentCaptions(new Date(startDate as string), new Date(endDate as string));
    if (!captions || captions.length === 0) {
      res.status(404).json({ message: 'No captions found within the specified date range' });
      return;
    }
    res.status(200).json(captions);
  } catch (error) {
    handleHttp(res, 'ERROR_FETCHING_MOST_RECENT_CAPTIONS', error);
  }
};

const updateCaptionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data: Partial<Caption> = req.body;
    const updatedCaption = await updateCaption(Number(id), data);
    if (!updatedCaption) {
      res.status(404).json({ message: 'Caption not found' });
      return;
    }
    res.status(200).json(updatedCaption);
  } catch (error) {
    handleHttp(res, 'ERROR_UPDATING_CAPTION', error);
  }
};

const deleteCaptionController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedCaption = await deleteCaption(Number(id));
    if (!deletedCaption) {
      res.status(404).json({ message: 'Caption not found' });
      return;
    }
    res.status(200).json({ message: 'Caption deleted successfully' });
  } catch (error) {
    handleHttp(res, 'ERROR_DELETING_CAPTION', error);
  }
};

export {
  addCaptionController,
  getAllCaptionsController,
  getCaptionsByUrlTypeController,
  getMostRecentCaptionsController,
  updateCaptionController,
  deleteCaptionController,
};
