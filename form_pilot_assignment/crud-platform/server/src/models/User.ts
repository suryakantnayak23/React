import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export interface UserAttributes {
  id: string;
  email: string;
  name: string;
  apiKey: string;
  credits: number;
  isRecharged: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'apiKey' | 'credits' | 'isRecharged'> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {}

export default function defineUserModel(sequelize: Sequelize) {
  const User = sequelize.define<UserInstance>(
    'User',
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      apiKey: {
        type: DataTypes.UUID,
        defaultValue: () => uuidv4(),
        unique: true,
      },
      credits: {
        type: DataTypes.INTEGER,
        defaultValue: 4,
      },
      isRecharged: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return User;
} 