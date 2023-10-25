import { RequestHandler } from 'express';
import MonthlyDutyScheduleService from '../../service/monthlyDutySchedule/monthlyDutyScheduleDB.service';
import MonthInfo from '../../models/monthlyDutySchedule/monthInfo.model';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import DateUtil from '../../utils/date/DateUtil';
import IMonthlyDutySchedule, {
    IMonthlyDutyScheduleResponse,
} from '../../models/monthlyDutySchedule/monthlyDutySchedule.model';
import StandardResponse from '../../models/response/standardResponse.model';
import db from '../../sequelize/sequelize';
import { Op } from 'sequelize';
import MonthlyDutyScheduleUtil from '../../service/monthlyDutySchedule/monthlyDutyScheduleUtil.service';

export default class AdminMonthlyDutyScheduleController {
    static generateNewMonthlyDutySchedule: RequestHandler<
        undefined,
        StandardResponse<IMonthlyDutyScheduleResponse>,
        MonthInfo
    > = async (req, res) => {
        const { month, year } = req.body;

        const transaction = await db.getInstance().transaction();

        try {
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

            const hasRecordForTheMonth =
                await MonthlyDutyScheduleService.hasRecordsInBetweenDates(
                    startDate,
                    endDate,
                );

            if (hasRecordForTheMonth) {
                await transaction.rollback();
                return ErrorHandler.sendErrorResponse(
                    res,
                    409,
                    `Monthly duty schedule for ${month}/${year} is already being created.`,
                );
            }

            const monthlyDutySchedules =
                await MonthlyDutyScheduleService.createMonthlyDutySchedule(
                    {
                        month,
                        year,
                    },
                    {
                        transaction,
                    },
                );

            const employees =
                await MonthlyDutyScheduleUtil.getEmployeesFromMonthlyDutySchedules(
                    monthlyDutySchedules,
                );

            await transaction.commit();

            res.status(200).send({
                isSuccess: true,
                data: {
                    employees,
                    monthlyDutySchedules,
                },
            });
        } catch (error) {
            await transaction.rollback();

            console.log(error);

            return ErrorHandler.sendErrorResponse(
                res,
                500,
                ErrorHandler.getErrorMessage(error),
            );
        }
    };

    static getAllMonthlyDutySchedulesByMonth: RequestHandler<
        undefined,
        StandardResponse<IMonthlyDutyScheduleResponse>,
        undefined,
        { month: string; year: string }
    > = async (req, res) => {
        const { month: monthInString, year: yearInString } = req.query;

        const month = Number.parseInt(monthInString);
        const year = Number.parseInt(yearInString);

        if (
            Number.isNaN(month) ||
            Number.isNaN(year) ||
            month <= 0 ||
            year <= 0
        ) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Year and month must be positive number',
            );
        }

        try {
            const monthlyDutySchedules =
                await MonthlyDutyScheduleService.getMonthlyDutyScheduleByMonth({
                    month,
                    year,
                });

            if (monthlyDutySchedules.length === 0) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'Monthly duty schedule is not generated yet. Please try to generate a new one.',
                );
            }

            const employees =
                await MonthlyDutyScheduleUtil.getEmployeesFromMonthlyDutySchedules(
                    monthlyDutySchedules,
                );

            return res.status(200).send({
                isSuccess: true,
                data: {
                    employees,
                    monthlyDutySchedules,
                },
            });
        } catch (error) {
            console.log(error);

            return ErrorHandler.sendErrorResponse(
                res,
                500,
                ErrorHandler.getErrorMessage(error),
            );
        }
    };

    static confirmMonthlyDutyScheduleByMonth: RequestHandler<
        undefined,
        StandardResponse<IMonthlyDutyScheduleResponse>,
        undefined,
        { month: string; year: string }
    > = async (req, res) => {
        const { month: monthInStrig, year: yearInString } = req.query;

        const month = Number.parseInt(monthInStrig);
        const year = Number.parseInt(yearInString);

        if (
            Number.isNaN(month) ||
            Number.isNaN(year) ||
            month <= 0 ||
            year <= 0
        ) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Year and month must be positive integer',
            );
        }

        try {
            const monthlyDutySchedules =
                await MonthlyDutyScheduleService.getMonthlyDutyScheduleByMonth({
                    month,
                    year,
                });

            if (monthlyDutySchedules.length === 0) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'Monthly Duty Schedules are not found.',
                );
            }

            const isConfirmed =
                MonthlyDutyScheduleUtil.isMonthlyDutyScheduleConfirm(
                    monthlyDutySchedules,
                );

            if (isConfirmed) {
                return ErrorHandler.sendErrorResponse(res, 304, '');
            }

            const data: Partial<IMonthlyDutySchedule> = {
                isConfirmed: true,
            };

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

            const updatedMonthlyDutySchedules =
                await MonthlyDutyScheduleService.updateMonthlyDutySchedule(
                    { date: { [Op.between]: [startDate, endDate] } },
                    data,
                );

            const employees =
                await MonthlyDutyScheduleUtil.getEmployeesFromMonthlyDutySchedules(
                    updatedMonthlyDutySchedules,
                );

            return res.status(200).send({
                isSuccess: true,
                data: {
                    employees,
                    monthlyDutySchedules: updatedMonthlyDutySchedules,
                },
            });
        } catch (error) {
            return ErrorHandler.sendErrorResponse(
                res,
                500,
                ErrorHandler.getErrorMessage(error),
            );
        }
    };
}
