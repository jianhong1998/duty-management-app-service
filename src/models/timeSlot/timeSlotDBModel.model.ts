import {
    AfterFind,
    AllowNull,
    AutoIncrement,
    BeforeCreate,
    Column,
    CreatedAt,
    DataType,
    Default,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt,
} from 'sequelize-typescript';
import { ITimeSlot } from './timeSlot.model';

@Table({ tableName: 'time_slot' })
export default class TimeSlotDBModel extends Model<ITimeSlot> {
    @AllowNull(false)
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    id: number;

    @AllowNull(false)
    @Column({
        field: 'start_time',
        type: DataType.TIME,
    })
    startTime: Date;

    @AllowNull(false)
    @Column({
        field: 'end_time',
        type: DataType.TIME,
    })
    endTime: Date;

    @AllowNull(false)
    @Default(false)
    @Column({
        field: 'is_deleted',
        type: DataType.BOOLEAN,
    })
    isDeleted: boolean;

    @AllowNull(false)
    @Column({
        field: 'is_available_for_mon',
        type: DataType.BOOLEAN,
    })
    isAvailableForMon: boolean;

    @AllowNull(false)
    @Column({
        field: 'is_available_for_tue',
        type: DataType.BOOLEAN,
    })
    isAvailableForTue: boolean;

    @AllowNull(false)
    @Column({
        field: 'is_available_for_wed',
        type: DataType.BOOLEAN,
    })
    isAvailableForWed: boolean;

    @AllowNull(false)
    @Column({
        field: 'is_available_for_thu',
        type: DataType.BOOLEAN,
    })
    isAvailableForThu: boolean;

    @AllowNull(false)
    @Column({
        field: 'is_available_for_fri',
        type: DataType.BOOLEAN,
    })
    isAvailableForFri: boolean;

    @AllowNull(false)
    @Column({
        field: 'is_available_for_sat',
        type: DataType.BOOLEAN,
    })
    isAvailableForSat: boolean;

    @AllowNull(false)
    @Column({
        field: 'is_available_for_sun',
        type: DataType.BOOLEAN,
    })
    isAvailableForSun: boolean;

    @CreatedAt
    @Column
    createdAt?: Date;

    @UpdatedAt
    @Column
    updatedAt?: Date;

    @AfterFind
    static convertTimeToDateObject(
        instances: TimeSlotDBModel | TimeSlotDBModel[] | null,
    ) {
        if (instances === null) {
            return;
        }

        if (Array.isArray(instances)) {
            instances = instances.map((instance) => {
                const startTime = `2023-01-01T${
                    instance.startTime as unknown as string
                }+08:00`;
                const endTime = `2023-01-01T${
                    instance.endTime as unknown as string
                }+08:00`;

                instance.startTime = new Date(startTime);
                instance.dataValues.startTime = new Date(startTime);
                instance.endTime = new Date(endTime);
                instance.dataValues.endTime = new Date(endTime);

                return instance;
            });
        } else {
            const startTime = `2023-01-01T${
                instances.startTime as unknown as string
            }+08:00`;
            const endTime = `2023-01-01T${
                instances.endTime as unknown as string
            }+08:00`;

            instances.startTime = new Date(startTime);
            instances.dataValues.startTime = new Date(startTime);
            instances.endTime = new Date(endTime);
            instances.dataValues.endTime = new Date(endTime);

            return instances;
        }
    }

    @BeforeCreate
    static convertDateObjectToTime(instance: TimeSlotDBModel) {
        const startTime = `${instance.startTime
            .getHours()
            .toString()
            .padStart(2, '0')}:${instance.startTime
            .getMinutes()
            .toString()
            .padStart(2, '0')}:00`;

        const endTime = `${instance.endTime
            .getHours()
            .toString()
            .padStart(2, '0')}:${instance.endTime
            .getMinutes()
            .toString()
            .padStart(2, '0')}:00`;

        instance.startTime = startTime as unknown as Date;
        instance.endTime = endTime as unknown as Date;

        return instance;
    }
}
