import {
    AfterFind,
    AllowNull,
    AutoIncrement,
    BelongsTo,
    Column,
    CreatedAt,
    DataType,
    Default,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
    Unique,
    UpdatedAt,
} from 'sequelize-typescript';
import IUserAccount from './userAccount.model';
import { UserAccountType } from './userAccountType.enum';
import EmployeeDBModel from '../employee/employeeDBModel.model';
import IEmployee from '../employee/employee.model';
import { UserAccountStatus } from './UserAccountStatus.enum';

@Table({
    tableName: 'user_account',
})
export default class UserAccountDBModel extends Model<IUserAccount> {
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Unique
    @ForeignKey(() => EmployeeDBModel)
    @Column({
        field: 'employee_id',
        type: DataType.INTEGER,
    })
    employeeId: number;

    @AllowNull(false)
    @Unique
    @Column({
        field: 'email_address',
        type: DataType.STRING,
    })
    emailAddress: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    password: string;

    @AllowNull(false)
    @Column({
        field: 'account_type',
        type: DataType.ENUM(UserAccountType.ADMIN, UserAccountType.USER),
    })
    accountType: UserAccountType;

    @AllowNull(false)
    @Default(UserAccountStatus.PENDING_APPROVAL)
    @Column({
        field: 'account_status',
        type: DataType.ENUM(
            UserAccountStatus.ACTIVE,
            UserAccountStatus.PENDING_APPROVAL,
            UserAccountStatus.DISABLED,
        ),
    })
    accountStatus: UserAccountStatus;

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
        instances: UserAccountDBModel[] | UserAccountDBModel | null,
    ) {
        if (instances === null) {
            return;
        }

        if (Array.isArray(instances)) {
            return instances.map((instance) => {
                const employee = instance.employeeDBModel?.dataValues;

                instance.employee = employee;
                instance.dataValues.employee = employee;

                instance.dataValues.employeeDBModel = undefined;

                return instance;
            });
        } else {
            const employee = instances.employeeDBModel?.dataValues;

            instances.employee = employee;
            instances.dataValues.employee = employee;
            instances.dataValues.employeeDBModel = undefined;

            return instances;
        }
    }
}
