import {
    AllowNull,
    AutoIncrement,
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
import IEmployee from './employee.model';
import EmploymentType from './employmentType.enum';
import EmployeeRole from './employeeRole.enum';
import TimeSlotDBModel from '../timeSlot/timeSlotDBModel.model';

@Table({
    tableName: 'employee',
})
export default class EmployeeDBModel extends Model<IEmployee> {
    @AllowNull(false)
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column(DataType.STRING(50))
    name: string;

    @AllowNull(false)
    @Column({
        field: 'employment_type',
        type: DataType.ENUM('Full Time', 'Part Time'),
    })
    employmentType: EmploymentType;

    @AllowNull(false)
    @Column(
        DataType.ENUM(
            'Lead Service Crew',
            'Service Crew',
            'Junior Service Crew',
        ),
    )
    role: EmployeeRole;

    @AllowNull(false)
    @Column({
        field: 'contact_number',
        type: DataType.INTEGER,
    })
    contactNumber: number;

    @AllowNull(false)
    @Default(true)
    @Column({
        type: DataType.INTEGER,
        field: 'is_active',
    })
    isActive: boolean;

    @AllowNull(true)
    @Default(null)
    @ForeignKey(() => TimeSlotDBModel)
    @Column({
        field: 'mon_availability_time_slot_id',
        type: DataType.INTEGER,
    })
    monAvailabilityTimeSlotId: number | null;

    @AllowNull(true)
    @Default(null)
    @ForeignKey(() => TimeSlotDBModel)
    @Column({
        field: 'tue_availability_time_slot_id',
        type: DataType.INTEGER,
    })
    tueAvailabilityTimeSlotId: number | null;

    @AllowNull(true)
    @Default(null)
    @ForeignKey(() => TimeSlotDBModel)
    @Column({
        field: 'wed_availability_time_slot_id',
        type: DataType.INTEGER,
    })
    wedAvailabilityTimeSlotId: number | null;

    @AllowNull(true)
    @Default(null)
    @ForeignKey(() => TimeSlotDBModel)
    @Column({
        field: 'thu_availability_time_slot_id',
        type: DataType.INTEGER,
    })
    thuAvailabilityTimeSlotId: number | null;

    @AllowNull(true)
    @Default(null)
    @ForeignKey(() => TimeSlotDBModel)
    @Column({
        field: 'fri_availability_time_slot_id',
        type: DataType.INTEGER,
    })
    friAvailabilityTimeSlotId: number | null;

    @AllowNull(true)
    @Default(null)
    @ForeignKey(() => TimeSlotDBModel)
    @Column({
        field: 'sat_availability_time_slot_id',
        type: DataType.INTEGER,
    })
    satAvailabilityTimeSlotId: number | null;

    @AllowNull(true)
    @Default(null)
    @ForeignKey(() => TimeSlotDBModel)
    @Column({
        field: 'sun_availability_time_slot_id',
        type: DataType.INTEGER,
    })
    sunAvailabilityTimeSlotId: number | null;

    @CreatedAt
    @Column({ type: DataType.DATE, field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ type: DataType.DATE, field: 'updated_at' })
    updatedAt: Date;
}
