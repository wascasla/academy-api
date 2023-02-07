'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Parent.belongsTo(models.Student,
        {
          as: 'student',
          foreignKey: 'studentId'
        }
      );
      Parent.belongsTo(models.Student,
        {
          as: 'parent',
          foreignKey: 'parentId'
        }
      );
    }
  }
  Parent.init({
    studentId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    parentId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Parent',
  });
  return Parent;
};