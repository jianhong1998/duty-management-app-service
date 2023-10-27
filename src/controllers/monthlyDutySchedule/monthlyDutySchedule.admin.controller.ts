import { RequestHandler } from 'express';
import MonthlyDutyScheduleService from '../../service/monthlyDutySchedule/monthlyDutyScheduleDB.service';
import MonthInfo from '../../models/monthlyDutySchedule/monthInfo.model';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import DateUtil from '../../utils/date/dateUtil';
import IMonthlyDutySchedule, {
    IMonthlyDutyScheduleResponse,
} from '../../models/monthlyDutySchedule/monthlyDutySchedule.model';
import StandardResponse from '../../models/response/standardResponse.model';
import db from '../../sequelize/sequelize';
import { Op } from 'sequelize';
import MonthlyDutyScheduleUtil from '../../service/monthlyDutySchedule/monthlyDutyScheduleUtil.service';
import EmployeeConvertorService from '../../service/employee/employeeConvertor.service';
import moment from 'moment';

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

            const employees = (
                await MonthlyDutyScheduleUtil.getEmployeesFromMonthlyDutySchedules(
                    monthlyDutySchedules,
                )
            ).map((employee) =>
                EmployeeConvertorService.convertToIEmployeeResponse(employee),
            );

            const timeSlots =
                await MonthlyDutyScheduleUtil.getTimeSlotsFromMonthlyDutySchedules(
                    monthlyDutySchedules,
                );

            res.status(200).send({
                isSuccess: true,
                data: {
                    monthInfo: {
                        month,
                        year,
                        totalDays: moment(endDate.toISOString()).date(),
                    },
                    employees,
                    timeSlots,
                    monthlyDutySchedules: monthlyDutySchedules.map(
                        (dutySchedule) => {
                            const date = DateUtil.convertDateObjectToDateString(
                                dutySchedule.date,
                            );

                            return {
                                ...dutySchedule,
                                date,
                            };
                        },
                    ),
                },
            });

            await transaction.commit();
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
        const month = Number.parseInt(req.query.month);
        const year = Number.parseInt(req.query.year);

        try {
            const monthlyDutySchedules =
                await MonthlyDutyScheduleService.getMonthlyDutySchedulesByMonth(
                    {
                        month,
                        year,
                    },
                );

            if (monthlyDutySchedules.length === 0) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'Monthly duty schedule is not generated yet. Please try to generate a new one.',
                );
            }

            const employees = (
                await MonthlyDutyScheduleUtil.getEmployeesFromMonthlyDutySchedules(
                    monthlyDutySchedules,
                )
            ).map((employee) =>
                EmployeeConvertorService.convertToIEmployeeResponse(employee),
            );

            const timeSlots =
                await MonthlyDutyScheduleUtil.getTimeSlotsFromMonthlyDutySchedules(
                    monthlyDutySchedules,
                );

            return res.status(200).send({
                isSuccess: true,
                data: {
                    monthInfo: {
                        month,
                        year,
                        totalDays: DateUtil.getMonthLastDay(year, month),
                    },
                    employees,
                    timeSlots,
                    monthlyDutySchedules: monthlyDutySchedules.map(
                        (dutySchedule) => {
                            const date = DateUtil.convertDateObjectToDateString(
                                dutySchedule.date,
                            );

                            return {
                                ...dutySchedule,
                                date,
                            };
                        },
                    ),
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
        const month = Number.parseInt(req.query.month);
        const year = Number.parseInt(req.query.year);

        const transaction = await db.getInstance().transaction();

        try {
            const monthlyDutySchedules =
                await MonthlyDutyScheduleService.getMonthlyDutySchedulesByMonth(
                    {
                        month,
                        year,
                    },
                );

            if (monthlyDutySchedules.length === 0) {
                await transaction.rollback();
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
                await transaction.rollback();
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
                await MonthlyDutyScheduleService.updateMonthlyDutySchedule({
                    condition: { date: { [Op.between]: [startDate, endDate] } },
                    data,
                    options: {
                        transaction,
                    },
                });

            const employees = (
                await MonthlyDutyScheduleUtil.getEmployeesFromMonthlyDutySchedules(
                    updatedMonthlyDutySchedules,
                )
            ).map((employee) =>
                EmployeeConvertorService.convertToIEmployeeResponse(employee),
            );

            const timeSlots =
                await MonthlyDutyScheduleUtil.getTimeSlotsFromMonthlyDutySchedules(
                    updatedMonthlyDutySchedules,
                );

            res.status(200).send({
                isSuccess: true,
                data: {
                    monthInfo: {
                        month,
                        year,
                        totalDays: moment(endDate.toISOString()).date(),
                    },
                    employees,
                    timeSlots,
                    monthlyDutySchedules: updatedMonthlyDutySchedules.map(
                        (dutySchedule) => {
                            const date = DateUtil.convertDateObjectToDateString(
                                dutySchedule.date,
                            );

                            return {
                                ...dutySchedule,
                                date,
                            };
                        },
                    ),
                },
            });

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            return ErrorHandler.sendErrorResponse(
                res,
                500,
                ErrorHandler.getErrorMessage(error),
            );
        }
    };

    static deleteMonthlyDutyScheduleByMonth: RequestHandler<
        undefined,
        StandardResponse<undefined>,
        undefined,
        { month: string; year: string }
    > = async (req, res) => {
        const transaction = await db.getInstance().transaction();

        try {
            const month = Number.parseInt(req.query.month);
            const year = Number.parseInt(req.query.year);

            const monthlyDutySchedules =
                await MonthlyDutyScheduleService.getMonthlyDutySchedulesByMonth(
                    {
                        month,
                        year,
                    },
                );

            if (monthlyDutySchedules.length === 0) {
                await transaction.commit();
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'Monthly Duty Schedules are not found.',
                );
            }

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

            const numberOfDeletedRecord =
                await MonthlyDutyScheduleService.deleteMonthlyDutySchedules(
                    {
                        date: {
                            [Op.between]: [startDate, endDate],
                        },
                    },
                    { transaction },
                );

            if (numberOfDeletedRecord !== monthlyDutySchedules.length) {
                throw new Error('Number of deleted records is not equal');
            }

            await transaction.commit();

            res.sendStatus(204);
        } catch (error) {
            await transaction.rollback();

            return ErrorHandler.sendErrorResponse(
                res,
                500,
                ErrorHandler.getErrorMessage(error),
            );
        }
    };
}
