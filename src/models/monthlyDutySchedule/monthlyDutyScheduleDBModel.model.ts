import {
    AfterFind,
    AllowNull,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import IMonthlyDutySchedule from './monthlyDutySchedule.model';
import EmployeeDBModel from '../employee/employeeDBModel.model';
import TimeSlotDBModel from '../timeSlot/timeSlotDBModel.model';
import IEmployee from '../employee/employee.model';
import { ITimeSlot } from '../timeSlot/timeSlot.model';

@Table({
    tableName: 'monthly_duty_schedule',
})
export default class MonthlyDutyScheduleDBModel extends Model<IMonthlyDutySchedule> {
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

    @AllowNull(false)
    @ForeignKey(() => TimeSlotDBModel)
    @Column({
        field: 'time_slot_id',
        type: DataType.INTEGER,
    })
    timeSlotId: number;

    // @AllowNull(false)
    // @PrimaryKey
    // @AutoIncrement
    // @Column(DataType.INTEGER)
    // version: number;

    @AllowNull(false)
    @Default(false)
    @Column({
        field: 'is_confirmed',
        type: DataType.BOOLEAN,
    })
    isConfirmed: boolean;

    @CreatedAt
    @AllowNull(false)
    @Column({
        field: 'created_at',
        type: DataType.DATE,
    })
    createdAt: Date;

    @UpdatedAt
    @AllowNull(false)
    @Column({
        field: 'updated_at',
        type: DataType.DATE,
    })
    updatedAt: Date;

    @BelongsTo(() => EmployeeDBModel)
    employeeDBModel?: EmployeeDBModel;

    @BelongsTo(() => TimeSlotDBModel)
    timeSlotDBModel?: TimeSlotDBModel;

    employee?: IEmployee;
    timeSlot?: ITimeSlot;

    @AfterFind
    static convertDate(
        instances:
            | MonthlyDutyScheduleDBModel[]
            | MonthlyDutyScheduleDBModel
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
    static fillInDataValues(
        instances:
            | MonthlyDutyScheduleDBModel[]
            | MonthlyDutyScheduleDBModel
            | null,
    ) {
        if (instances === null) {
            return;
        }

        if (Array.isArray(instances)) {
            return instances.map((instance) => {
                if (instance.employeeDBModel) {
                    const employee = instance.employeeDBModel.dataValues;

                    instance.employee = employee;
                    instance.dataValues.employee = employee;

                    instance.dataValues.employeeDBModel = undefined;
                }

                if (instance.timeSlotDBModel) {
                    const timeSlot = instance.timeSlotDBModel.dataValues;

                    instance.timeSlot = timeSlot;
                    instance.dataValues.timeSlot = timeSlot;

                    instance.dataValues.timeSlotDBModel = undefined;
                }

                return instance;
            });
        } else {
            if (instances.employeeDBModel) {
                const employee = instances.employeeDBModel.dataValues;

                instances.employee = employee;
                instances.dataValues.employee = employee;

                instances.dataValues.employeeDBModel = undefined;
            }

            if (instances.timeSlotDBModel) {
                const timeSlot = instances.timeSlotDBModel.dataValues;

                instances.timeSlot = timeSlot;
                instances.dataValues.timeSlot = timeSlot;

                instances.dataValues.timeSlotDBModel = undefined;
            }

            return instances;
        }
    }
}
