import { DataTypes, Model, CreationOptional } from 'sequelize';
import sequelize from '../config/sequelize';
import { Caption } from '../interfaces/caption.interface';

class CaptionModel extends Model<Caption> {
  declare id: CreationOptional<number>;
  declare url: string;
  declare title: string;
  declare urltype: string;
  declare shareddate: Date;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
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
    shareddate: {
      type: DataTypes.DATE, // Campo personalizado sharedDate
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Caption',
    tableName: 'captions', // Nombre correcto de la tabla
    timestamps: true, // Esto asegura que `createdAt` y `updatedAt` sean gestionados por Sequelize
  }
);

export default CaptionModel;
