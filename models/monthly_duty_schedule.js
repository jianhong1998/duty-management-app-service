'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class monthly_duty_schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  monthly_duty_schedule.init({
    employee_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'monthly_duty_schedule',
  });
  return monthly_duty_schedule;
};