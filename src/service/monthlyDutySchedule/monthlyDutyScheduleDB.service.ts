import { IncludeOptions, Op, Transaction, WhereOptions } from 'sequelize';
import MonthInfo from '../../models/monthlyDutySchedule/monthInfo.model';
import IMonthlyDutySchedule from '../../models/monthlyDutySchedule/monthlyDutySchedule.model';
import MonthlyDutyScheduleDBModel from '../../models/monthlyDutySchedule/monthlyDutyScheduleDBModel.model';
import DateUtil from '../../utils/date/dateUtil';
import EmployeeDBModel from '../../models/employee/employeeDBModel.model';
import MonthlyDutyScheduleGeneratorService from './monthlyDutyScheduleGenerator_2.service';
import EmployeeService from '../employee/employeeDB.service';
import TimeSlotService from '../timeSlot/timeSlotDB.service';

export enum WeekDay {
    MONDAY = 'mon',
    TUESDAY = 'tue',
    WEDNESDAY = 'wed',
    THURSDAY = 'thu',
    FRIDAY = 'fri',
    SATURDAY = 'sat',
    SUNDAY = 'sun',
}

export default class MonthlyDutyScheduleService {
    static async createMonthlyDutySchedule(
        monthInfo: MonthInfo,
        options?: {
            transaction?: Transaction;
        },
    ): Promise<IMonthlyDutySchedule[]> {
        const employees = await EmployeeService.getEmployees(
            {
                isActive: true,
            },
            { transaction: options.transaction },
        );
        const timeSlots = await TimeSlotService.getTimeSlots(
            {
                isDeleted: false,
            },
            {
                transaction: options.transaction,
            },
        );

        const monthlyDutyScheduleGeneratorService =
            new MonthlyDutyScheduleGeneratorService({
                employees,
                monthInfo,
                timeSlots,
                transaction: options.transaction,
            });

        const monthlyDutyScheduleCreations =
            monthlyDutyScheduleGeneratorService.generateMonthlyDutySchedule();

        const createdMonthlyDutySchedules =
            await MonthlyDutyScheduleDBModel.bulkCreate(
                monthlyDutyScheduleCreations,
                {
                    transaction: options.transaction,
                },
            );

        return createdMonthlyDutySchedules.map(
            (createdMonthlyDutySchedule) =>
                createdMonthlyDutySchedule.dataValues,
        );
    }

    static async hasRecordsInBetweenDates(
        start: Date,
        end: Date,
    ): Promise<boolean> {
        const count = await MonthlyDutyScheduleDBModel.count({
            where: {
                date: {
                    [Op.between]: [start, end],
                },
            },
        });

        return count > 0;
    }

    static async getMonthlyDutySchedulesByMonth(
        monthInfo: MonthInfo,
        options?: {
            includeEmployee?: boolean;
        },
    ): Promise<IMonthlyDutySchedule[]> {
        const { year, month } = monthInfo;

        const startDate = DateUtil.generateDateObject({
            date: 1,
            month,
            year,
        });

        const endDate = DateUtil.generateDateObject({
            date: DateUtil.getMonthLastDay(year, month),
            month,
            year,
        });

        const includeModels: IncludeOptions[] = [
            options?.includeEmployee
                ? {
                      model: EmployeeDBModel,
                  }
                : undefined,
        ];

        const monthlyDutySchedules = await MonthlyDutyScheduleDBModel.findAll({
            where: {
                date: {
                    [Op.between]: [startDate, endDate],
                },
            },
            include: includeModels.filter(
                (option) => typeof option !== 'undefined',
            ),
        });

        return monthlyDutySchedules.map(
            (monthlyDutySchedule) => monthlyDutySchedule.dataValues,
        );
    }

    static async updateMonthlyDutySchedule(params: {
        condition: WhereOptions<MonthlyDutyScheduleDBModel>;
        data: Partial<IMonthlyDutySchedule>;
        options?: {
            transaction: Transaction;
        };
    }): Promise<IMonthlyDutySchedule[]> {
        const { condition, data, options } = params;

        await MonthlyDutyScheduleDBModel.update(data, {
            where: condition,
            transaction: options?.transaction,
        });

        return (
            await MonthlyDutyScheduleDBModel.findAll({
                where: condition,
                transaction: options?.transaction,
            })
        ).map((dutySchedule) => dutySchedule.dataValues);
    }

    static async deleteMonthlyDutySchedules(
        condition: WhereOptions<MonthlyDutyScheduleDBModel>,
        options?: {
            transaction?: Transaction;
        },
    ): Promise<number> {
        const numberOfDeletedRecord = await MonthlyDutyScheduleDBModel.destroy({
            where: condition,
            transaction: options?.transaction,
        });

        return numberOfDeletedRecord;
    }
}
