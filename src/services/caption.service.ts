import { Caption } from "../interfaces/caption.interface";
import CaptionModel from "../models/caption.model";

const addCaption = async ({ url, title, urltype }: Caption) => {

   const checkIs = await CaptionModel.findOne({ where: { url } });
  if (checkIs) return "URL_ALREADY_ADDED"

  const addNewCaption = await CaptionModel.create({
    url,
    title,
    urltype,
  });

  return addNewCaption;
};


export { addCaption };