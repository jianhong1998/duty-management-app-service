import { RequestHandler } from 'express';
import StandardResponse from '../../models/response/standardResponse.model';
import {
    IEmployeeDefaultWeeklySimplifiedTimeSlots,
    IUpdateEmployeeDefaultWeeklyTimeSlotsRequest,
} from '../../models/timeSlot/employeeTimeSlot.model';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import EmployeeTimeSlotService from '../../service/timeSlot/employeeTimeSlot.service';
import EmployeeService from '../../service/employee/employeeDB.service';
import { IEmployeeUpdate } from '../../models/employee/employee.model';

export default class EmployeeTimeSlotController {
    static getEmployeeDefaultWeeklyTimeSlotsHanlder: RequestHandler<
        { employeeId: string },
        StandardResponse<IEmployeeDefaultWeeklySimplifiedTimeSlots>
    > = async (req, res) => {
        const { employeeId: employeeIdInString } = req.params;

        const employeeId = Number.parseInt(employeeIdInString);

        if (isNaN(employeeId)) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Employee ID is not number',
            );
        }

        try {
            const employees = await EmployeeService.getEmployees({
                id: employeeId,
            });

            if (employees.length !== 1) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'Employee not found',
                );
            }

            const timeSlots =
                await EmployeeTimeSlotService.getEmployeeDefaultWeeklyTimeSlots(
                    employeeId,
                );

            res.status(200).send({
                isSuccess: true,
                data: timeSlots,
            });
        } catch (error) {
            return ErrorHandler.sendErrorResponse(
                res,
                500,
                ErrorHandler.getErrorMessage(error),
            );
        }
    };

    static updateEmployeeDefaultWeeklyTimeSlotsHandler: RequestHandler<
        {
            employeeId: string;
        },
        StandardResponse<IEmployeeDefaultWeeklySimplifiedTimeSlots>,
        IUpdateEmployeeDefaultWeeklyTimeSlotsRequest
    > = async (req, res) => {
        const { body } = req;

        const { employeeId: employeeIdInString } = req.params;

        const employeeId = Number.parseInt(employeeIdInString);

        if (Number.isNaN(employeeId)) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Invalid employeeId',
            );
        }

        try {
            const existingEmployee =
                await EmployeeTimeSlotService.getEmployeeDefaultWeeklyTimeSlots(
                    employeeId,
                );

            let hasDifference = false;

            for (const key of Object.keys(existingEmployee)) {
                if (body[key] === null && existingEmployee[key] === null) {
                    continue;
                }

                if (body[key] === null || existingEmployee[key] === null) {
                    hasDifference = true;
                    break;
                }

                if (body[key] !== existingEmployee[key].id) {
                    hasDifference = true;
                    break;
                }
            }

            if (!hasDifference) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    304,
                    'No difference detected in time slots',
                );
            }

            const partialEmployee: IEmployeeUpdate = {
                monAvailabilityTimeSlotId: body.mon,
                tueAvailabilityTimeSlotId: body.tue,
                wedAvailabilityTimeSlotId: body.wed,
                thuAvailabilityTimeSlotId: body.thu,
                friAvailabilityTimeSlotId: body.fri,
                satAvailabilityTimeSlotId: body.sat,
                sunAvailabilityTimeSlotId: body.sun,
            };

            const updatedTimeSlots =
                await EmployeeTimeSlotService.updateEmployeeDefaultWeeklyTimeSlots(
                    employeeId,
                    partialEmployee,
                );

            res.status(200).send({
                isSuccess: true,
                data: updatedTimeSlots,
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
