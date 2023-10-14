import { RequestHandler } from 'express';
import StandardResponse from '../../models/response/standardResponse.model';
import { IEmployeeDefaultWeeklySimplifiedTimeSlots } from '../../models/timeSlot/employeeTimeSlot.model';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import EmployeeTimeSlotService from '../../service/timeSlot/employeeTimeSlot.service';
import EmployeeService from '../../service/employee/employeeDB.service';

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
}
