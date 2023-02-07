'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Enrollment.belongsTo(models.Course,
        {
          as: 'course',
          foreignKey: 'courseId'
        }
      );
      Enrollment.belongsTo(models.Student,
        {
          as: 'student',
          foreignKey: 'studentId'
        }
      );

    }
  }
  Enrollment.init({
    studentId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    courseId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Enrollment',
  });
  return Enrollment;
};