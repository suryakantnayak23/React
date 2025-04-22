import { Sequelize } from 'sequelize';
import defineUserModel from './User';
import defineCrudItemModel from './CrudItem';

export const initializeModels = (sequelize: Sequelize) => {
  const User = defineUserModel(sequelize);
  const CrudItem = defineCrudItemModel(sequelize);

  // Define relationships
  User.hasMany(CrudItem, { foreignKey: 'userId', as: 'crudItems' });
  CrudItem.belongsTo(User, { foreignKey: 'userId' });

  return {
    User,
    CrudItem
  };
};

export default initializeModels; 