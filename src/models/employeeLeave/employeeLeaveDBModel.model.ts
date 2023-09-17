import {
    AfterFind,
    AllowNull,
    AutoIncrement,
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
import IEmployeeLeave from './employeeLeave.model';
import { EmployeeLeaveApprovalStatus } from './employeeLeaveApprovalStatus.enum';
import EmployeeDBModel from '../employee/employeeDBModel.model';
import IEmployee from '../employee/employee.model';

@Table({
    tableName: 'employee_leave',
})
export default class EmployeeLeaveDBModel extends Model<IEmployeeLeave> {
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @ForeignKey(() => EmployeeDBModel)
    @Column({
        field: 'employee_id',
        type: DataType.INTEGER,
    })
    employeeId: number;

    @AllowNull(false)
    @Column(DataType.DATEONLY)
    date: Date;

    @AllowNull(true)
    @Column({
        field: 'apply_reason',
        type: DataType.TEXT,
    })
    applyReason: string;

    @AllowNull(false)
    @Column({
        field: 'approval_status',
        type: DataType.ENUM(
            EmployeeLeaveApprovalStatus.APPROVED,
            EmployeeLeaveApprovalStatus.PENDING,
            EmployeeLeaveApprovalStatus.REJECTED,
        ),
    })
    approvalStatus: EmployeeLeaveApprovalStatus;

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

    employee?: IEmployee;

    @AfterFind
    static convertEmployee(
        instancens: EmployeeLeaveDBModel[] | EmployeeLeaveDBModel,
    ) {
        if (Array.isArray(instancens)) {
            return instancens.map((instance) => {
                const employee = (instance.employee as EmployeeDBModel)
                    .dataValues;

                instance.employee = employee;
                instance.dataValues.employee = employee;

                instance.dataValues.employeeDBModel = undefined;

                return employee;
            });
        } else {
            instancens.employee = instancens.employeeDBModel.dataValues;
            instancens.dataValues.employee =
                instancens.employeeDBModel.dataValues;

            instancens.dataValues.employeeDBModel = undefined;

            return instancens;
        }
    }
}
