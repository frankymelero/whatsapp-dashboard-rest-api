import { Caption } from "../interfaces/caption.interface";
import CaptionRepository from "../repositories/caption.repository";

const addCaption = async ({ url, title, urltype }: Caption) => {
  const existingCaption = await CaptionRepository.findByUrl(url);
  if (existingCaption) return "URL_ALREADY_ADDED";

  return await CaptionRepository.create({ url, title, urltype });
};

const getAllCaptions = async () => {
  return await CaptionRepository.findAll();
};

const getCaptionsByUrlType = async (urltype: string) => {
  return await CaptionRepository.findByUrlType(urltype);
};

const getMostRecentCaptions = async (startDate: Date, endDate: Date) => {
  return await CaptionRepository.findMostRecent;
};

const updateCaption = async (id: number, data: Partial<Caption>) => {
  return await CaptionRepository.update(id, data);
};

const deleteCaption = async (id: number) => {
  return await CaptionRepository.delete(id);
};

export { addCaption, getAllCaptions, getCaptionsByUrlType, getMostRecentCaptions, updateCaption, deleteCaption };