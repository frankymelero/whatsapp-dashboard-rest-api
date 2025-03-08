
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';
import { Caption } from '../interfaces/caption.interface';

class CaptionModel extends Model<Caption> implements Caption {
  public id!: number;
  public url!: string;
  public title!: string;
  public urltype!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CaptionModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    urltype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Caption',
    tableName: 'captions',
    timestamps: true,
  }
);

export default CaptionModel;