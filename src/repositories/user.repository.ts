import UserModel from '../models/user.model';
import { User } from '../interfaces/user.interface';

class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return await UserModel.findOne({ where: { email } });
  }

  async create(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return await UserModel.create(user);
  }

  async findById(id: number): Promise<User | null> {
    return await UserModel.findByPk(id);
  }

  async update(id: number, data: Partial<User>): Promise<[affectedCount: number]> {
    return await UserModel.update(data, { where: { id } });
  }

  async delete(id: number): Promise<number> {
    return await UserModel.destroy({ where: { id } });
  }
}

export default new UserRepository();
