import {
    AfterFind,
    AllowNull,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import IEmployeeMonthlyAvailability from './employeeMonthlyAvailability.model';
import EmployeeDBModel from '../employee/employeeDBModel.model';
import TimeSlotDBModel from '../timeSlot/timeSlotDBModel.model';
import IEmployee from '../employee/employee.model';
import { ITimeSlot } from '../timeSlot/timeSlot.model';

@Table({
    tableName: 'employee_monthly_availability',
})
export default class EmployeeMonthlyAvailabilityDBModel extends Model<IEmployeeMonthlyAvailability> {
    @AllowNull(false)
    @PrimaryKey
    @Column(DataType.DATEONLY)
    date: Date;

    @AllowNull(false)
    @PrimaryKey
    @ForeignKey(() => EmployeeDBModel)
    @Column({
        field: 'employee_id',
        type: DataType.INTEGER,
    })
    employeeId: number;

    @AllowNull(true)
    @ForeignKey(() => TimeSlotDBModel)
    @Column({
        field: 'time_slot_id',
        type: DataType.INTEGER,
    })
    timeSlotId: number;

    @CreatedAt
    @AllowNull(false)
    @Column({
        field: 'created_at',
        type: DataType.DATE,
    })
    createdAt?: Date;

    @UpdatedAt
    @AllowNull(false)
    @Column({
        field: 'updated_at',
        type: DataType.DATE,
    })
    updatedAt?: Date;

    @BelongsTo(() => EmployeeDBModel)
    employeeDBModel?: EmployeeDBModel;

    @BelongsTo(() => TimeSlotDBModel)
    timeSlotDBModel?: TimeSlotDBModel;

    employee?: IEmployee;
    timeSlot?: ITimeSlot;

    @AfterFind
    static convertDate(
        instances:
            | EmployeeMonthlyAvailabilityDBModel[]
            | EmployeeMonthlyAvailabilityDBModel
            | null,
    ) {
        if (instances === null) {
            return;
        }

        if (Array.isArray(instances)) {
            return instances.map((instance) => {
                const date = new Date(instance.date);

                instance.date = date;
                instance.dataValues.date = date;

                return instance;
            });
        } else {
            const date = new Date(instances.date);

            instances.date = date;
            instances.dataValues.date = date;

            return instances;
        }
    }

    @AfterFind
    static fillInAllData(
        instances:
            | EmployeeMonthlyAvailabilityDBModel[]
            | EmployeeMonthlyAvailabilityDBModel
            | null,
    ) {
        if (instances === null) {
            return;
        }

        if (Array.isArray(instances)) {
            return instances.map((instance) => {
                if (typeof instance.employeeDBModel !== 'undefined') {
                    const employeeData = instance.employeeDBModel.dataValues;

                    instance.employee = employeeData;
                    instance.dataValues.employee = employeeData;

                    instance.dataValues.employeeDBModel = undefined;
                }

                if (typeof instance.timeSlotDBModel !== 'undefined') {
                    const timeSlotData = instance.timeSlotDBModel.dataValues;

                    instance.timeSlot = timeSlotData;
                    instance.dataValues.timeSlot = timeSlotData;

                    instance.dataValues.timeSlotDBModel = undefined;
                }

                return instance;
            });
        } else {
            if (typeof instances.employeeDBModel !== 'undefined') {
                const employeeData = instances.employeeDBModel.dataValues;

                instances.employee = employeeData;
                instances.dataValues.employee = employeeData;

                instances.dataValues.employeeDBModel = undefined;
            }

            if (typeof instances.timeSlotDBModel !== 'undefined') {
                const timeSlotData = instances.timeSlotDBModel.dataValues;

                instances.timeSlot = timeSlotData;
                instances.dataValues.timeSlot = timeSlotData;

                instances.dataValues.timeSlotDBModel = undefined;
            }

            return instances;
        }
    }
}
