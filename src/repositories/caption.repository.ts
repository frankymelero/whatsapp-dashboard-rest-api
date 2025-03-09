import CaptionModel from "../models/caption.model";
import { Caption } from "../interfaces/caption.interface";

class CaptionRepository {
  async findByUrl(url: string): Promise<Caption | null> {
    return await CaptionModel.findOne({ where: { url } });
  }

  async create(caption: Omit<Caption, "id" | "createdAt" | "updatedAt">): Promise<Caption> {
    return await CaptionModel.create(caption);
  }

  async findAll(): Promise<Caption[]> {
    return await CaptionModel.findAll();
  }

  async findByUrlType(urltype: string): Promise<Caption[]> {
    return await CaptionModel.findAll({ where: { urltype } });
  }

  async findMostRecent(): Promise<Caption[]> {
    return await CaptionModel.findAll({
      order: [['shareddate', 'DESC']],  
    });
  }
  async update(id: number, data: Partial<Caption>): Promise<[affectedCount: number]> {
    return await CaptionModel.update(data, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    return await CaptionModel.destroy({ where: { id } });
  }
}

export default new CaptionRepository();
