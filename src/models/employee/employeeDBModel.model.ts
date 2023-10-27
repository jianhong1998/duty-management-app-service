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
    UpdatedAt,
} from 'sequelize-typescript';
import IEmployee from './employee.model';
import EmploymentType from './employmentType.enum';
import EmployeeRole from './employeeRole.enum';
import TimeSlotDBModel from '../timeSlot/timeSlotDBModel.model';
import { ITimeSlot } from '../timeSlot/timeSlot.model';

@Table({
    tableName: 'employee',
})
export default class EmployeeDBModel
    extends Model<IEmployee>
    implements IEmployee
{
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

    @BelongsTo(() => TimeSlotDBModel, 'monAvailabilityTimeSlotId')
    monAvailabilityTimeSlotDBModel?: TimeSlotDBModel;

    @BelongsTo(() => TimeSlotDBModel, 'tueAvailabilityTimeSlotId')
    tueAvailabilityTimeSlotDBModel?: TimeSlotDBModel;

    @BelongsTo(() => TimeSlotDBModel, 'wedAvailabilityTimeSlotId')
    wedAvailabilityTimeSlotDBModel?: TimeSlotDBModel;

    @BelongsTo(() => TimeSlotDBModel, 'thuAvailabilityTimeSlotId')
    thuAvailabilityTimeSlotDBModel?: TimeSlotDBModel;

    @BelongsTo(() => TimeSlotDBModel, 'friAvailabilityTimeSlotId')
    friAvailabilityTimeSlotDBModel?: TimeSlotDBModel;

    @BelongsTo(() => TimeSlotDBModel, 'satAvailabilityTimeSlotId')
    satAvailabilityTimeSlotDBModel?: TimeSlotDBModel;

    @BelongsTo(() => TimeSlotDBModel, 'sunAvailabilityTimeSlotId')
    sunAvailabilityTimeSlotDBModel?: TimeSlotDBModel;

    monAvailabilityTimeSlot?: ITimeSlot;
    tueAvailabilityTimeSlot?: ITimeSlot;
    wedAvailabilityTimeSlot?: ITimeSlot;
    thuAvailabilityTimeSlot?: ITimeSlot;
    friAvailabilityTimeSlot?: ITimeSlot;
    satAvailabilityTimeSlot?: ITimeSlot;
    sunAvailabilityTimeSlot?: ITimeSlot;

    @AfterFind
    static joinAvailabilityTimeSlot(
        instances: EmployeeDBModel[] | EmployeeDBModel | null,
    ) {
        if (!instances) return null;

        if (Array.isArray(instances)) {
            return instances.map((instance) => {
                const monTimeSlot =
                    instance.monAvailabilityTimeSlotDBModel?.dataValues;
                const tueTimeSlot =
                    instance.tueAvailabilityTimeSlotDBModel?.dataValues;
                const wedTimeSlot =
                    instance.wedAvailabilityTimeSlotDBModel?.dataValues;
                const thuTimeSlot =
                    instance.thuAvailabilityTimeSlotDBModel?.dataValues;
                const friTimeSlot =
                    instance.friAvailabilityTimeSlotDBModel?.dataValues;
                const satTimeSlot =
                    instance.satAvailabilityTimeSlotDBModel?.dataValues;
                const sunTimeSlot =
                    instance.sunAvailabilityTimeSlotDBModel?.dataValues;

                instance.monAvailabilityTimeSlotDBModel = undefined;
                instance.tueAvailabilityTimeSlotDBModel = undefined;
                instance.wedAvailabilityTimeSlotDBModel = undefined;
                instance.thuAvailabilityTimeSlotDBModel = undefined;
                instance.friAvailabilityTimeSlotDBModel = undefined;
                instance.satAvailabilityTimeSlotDBModel = undefined;
                instance.sunAvailabilityTimeSlotDBModel = undefined;

                instance.dataValues.monAvailabilityTimeSlotDBModel = undefined;
                instance.dataValues.tueAvailabilityTimeSlotDBModel = undefined;
                instance.dataValues.wedAvailabilityTimeSlotDBModel = undefined;
                instance.dataValues.thuAvailabilityTimeSlotDBModel = undefined;
                instance.dataValues.friAvailabilityTimeSlotDBModel = undefined;
                instance.dataValues.satAvailabilityTimeSlotDBModel = undefined;
                instance.dataValues.sunAvailabilityTimeSlotDBModel = undefined;

                instance.monAvailabilityTimeSlot = monTimeSlot;
                instance.tueAvailabilityTimeSlot = tueTimeSlot;
                instance.wedAvailabilityTimeSlot = wedTimeSlot;
                instance.thuAvailabilityTimeSlot = thuTimeSlot;
                instance.friAvailabilityTimeSlot = friTimeSlot;
                instance.satAvailabilityTimeSlot = satTimeSlot;
                instance.sunAvailabilityTimeSlot = sunTimeSlot;

                instance.dataValues.monAvailabilityTimeSlot = monTimeSlot;
                instance.dataValues.tueAvailabilityTimeSlot = tueTimeSlot;
                instance.dataValues.wedAvailabilityTimeSlot = wedTimeSlot;
                instance.dataValues.thuAvailabilityTimeSlot = thuTimeSlot;
                instance.dataValues.friAvailabilityTimeSlot = friTimeSlot;
                instance.dataValues.satAvailabilityTimeSlot = satTimeSlot;
                instance.dataValues.sunAvailabilityTimeSlot = sunTimeSlot;

                return instance;
            });
        } else {
            const monTimeSlot =
                instances.monAvailabilityTimeSlotDBModel?.dataValues;
            const tueTimeSlot =
                instances.tueAvailabilityTimeSlotDBModel?.dataValues;
            const wedTimeSlot =
                instances.wedAvailabilityTimeSlotDBModel?.dataValues;
            const thuTimeSlot =
                instances.thuAvailabilityTimeSlotDBModel?.dataValues;
            const friTimeSlot =
                instances.friAvailabilityTimeSlotDBModel?.dataValues;
            const satTimeSlot =
                instances.satAvailabilityTimeSlotDBModel?.dataValues;
            const sunTimeSlot =
                instances.sunAvailabilityTimeSlotDBModel?.dataValues;

            instances.monAvailabilityTimeSlotDBModel = undefined;
            instances.tueAvailabilityTimeSlotDBModel = undefined;
            instances.wedAvailabilityTimeSlotDBModel = undefined;
            instances.thuAvailabilityTimeSlotDBModel = undefined;
            instances.friAvailabilityTimeSlotDBModel = undefined;
            instances.satAvailabilityTimeSlotDBModel = undefined;
            instances.sunAvailabilityTimeSlotDBModel = undefined;

            instances.dataValues.monAvailabilityTimeSlotDBModel = undefined;
            instances.dataValues.tueAvailabilityTimeSlotDBModel = undefined;
            instances.dataValues.wedAvailabilityTimeSlotDBModel = undefined;
            instances.dataValues.thuAvailabilityTimeSlotDBModel = undefined;
            instances.dataValues.friAvailabilityTimeSlotDBModel = undefined;
            instances.dataValues.satAvailabilityTimeSlotDBModel = undefined;
            instances.dataValues.sunAvailabilityTimeSlotDBModel = undefined;

            instances.monAvailabilityTimeSlot = monTimeSlot;
            instances.tueAvailabilityTimeSlot = tueTimeSlot;
            instances.wedAvailabilityTimeSlot = wedTimeSlot;
            instances.thuAvailabilityTimeSlot = thuTimeSlot;
            instances.friAvailabilityTimeSlot = friTimeSlot;
            instances.satAvailabilityTimeSlot = satTimeSlot;
            instances.sunAvailabilityTimeSlot = sunTimeSlot;

            instances.dataValues.monAvailabilityTimeSlot = monTimeSlot;
            instances.dataValues.tueAvailabilityTimeSlot = tueTimeSlot;
            instances.dataValues.wedAvailabilityTimeSlot = wedTimeSlot;
            instances.dataValues.thuAvailabilityTimeSlot = thuTimeSlot;
            instances.dataValues.friAvailabilityTimeSlot = friTimeSlot;
            instances.dataValues.satAvailabilityTimeSlot = satTimeSlot;
            instances.dataValues.sunAvailabilityTimeSlot = sunTimeSlot;

            return instances;
        }
    }
}
