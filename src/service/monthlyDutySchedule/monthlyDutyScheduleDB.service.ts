import { IncludeOptions, Op, Transaction, WhereOptions } from 'sequelize';
import MonthInfo from '../../models/monthlyDutySchedule/monthInfo.model';
import IMonthlyDutySchedule from '../../models/monthlyDutySchedule/monthlyDutySchedule.model';
import MonthlyDutyScheduleDBModel from '../../models/monthlyDutySchedule/monthlyDutyScheduleDBModel.model';
import MonthlyDutyScheduleGeneratorService from './monthlyDutyScheduleGenerator.service';
import DateUtil from '../../utils/date/DateUtil';
import EmployeeDBModel from '../../models/employee/employeeDBModel.model';

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
        // ) {
        const monthlyDutyScheduleCreations =
            await MonthlyDutyScheduleGeneratorService.generateMonthlyDutySchedule(
                monthInfo,
            );

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

        return monthlyDutySchedules;
    }

    static async updateMonthlyDutySchedule(
        condition: WhereOptions<MonthlyDutyScheduleDBModel>,
        data: Partial<IMonthlyDutySchedule>,
    ): Promise<IMonthlyDutySchedule[]> {
        const result = await MonthlyDutyScheduleDBModel.update(data, {
            where: condition,
            returning: true,
        });

        return result[1];
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
