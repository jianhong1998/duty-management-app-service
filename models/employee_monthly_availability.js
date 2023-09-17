'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class employee_monthly_availability extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    employee_monthly_availability.init(
        {
            employeeId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'employee_monthly_availability',
        },
    );
    return employee_monthly_availability;
};
