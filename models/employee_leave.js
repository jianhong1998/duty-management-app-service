'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class employee_leave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  employee_leave.init({
    employeeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'employee_leave',
  });
  return employee_leave;
};