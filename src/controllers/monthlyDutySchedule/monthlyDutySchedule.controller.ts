import { RequestHandler } from 'express';
import { IMonthlyDutyScheduleResponse } from '../../models/monthlyDutySchedule/monthlyDutySchedule.model';
import StandardResponse from '../../models/response/standardResponse.model';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import MonthlyDutyScheduleService from '../../service/monthlyDutySchedule/monthlyDutyScheduleDB.service';
import EmployeeConvertorService from '../../service/employee/employeeConvertor.service';
import MonthlyDutyScheduleUtil from '../../service/monthlyDutySchedule/monthlyDutyScheduleUtil.service';
import DateUtil from '../../utils/date/dateUtil';

export default class MonthlyDutyScheduleController {
    static getMonthlyDutySchedulesByMonth: RequestHandler<
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

            const isNotConfirmed = monthlyDutySchedules
                .map((dutySchedule) => dutySchedule.isConfirmed)
                .filter((isConfirmed) => !isConfirmed)
                .includes(false);

            if (monthlyDutySchedules.length === 0 || isNotConfirmed) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'Monthly duty schedule is not generated or confirmed yet.',
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
            ErrorHandler.sendErrorResponse(
                res,
                500,
                ErrorHandler.getErrorMessage(error),
            );
        }
    };
}
