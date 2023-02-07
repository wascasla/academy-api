'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Student.hasMany(models.Enrollment, { foreignKey: 'studentId' });
      Student.hasMany(models.Parent, { foreignKey: 'studentId' });
    }
  }
  Student.init({
    name: DataTypes.STRING,
    surename: DataTypes.STRING,
    birthday: DataTypes.DATE,
    dni: DataTypes.INTEGER,
    email: DataTypes.STRING,
    gender: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Student',
  });
  return Student;
};