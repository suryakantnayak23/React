import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export interface CrudItemAttributes {
  id: string;
  userId: string;
  value: number;
  txHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CrudItemCreationAttributes extends Optional<CrudItemAttributes, 'id'> {}

export interface CrudItemInstance extends Model<CrudItemAttributes, CrudItemCreationAttributes>, CrudItemAttributes {}

export default function defineCrudItemModel(sequelize: Sequelize) {
  const CrudItem = sequelize.define<CrudItemInstance>(
    'CrudItem',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        }
      },
      value: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      txHash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return CrudItem;
} 