import { RequestHandler } from 'express';
import StandardResponse from '../../models/response/standardResponse.model';
import { ITimeSlot } from '../../models/timeSlot/timeSlot.model';
import NumberChecker from '../../utils/numberChecker';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import {
    IEmployeeDefaultWeeklySimplifiedTimeSlots,
    IUpdateEmployeeDefaultWeeklyTimeSlotsRequest,
} from '../../models/timeSlot/employeeTimeSlot.model';
import TimeSlotVerificationService from '../../service/timeSlot/timeSlotVerification.service';

export default class TimeSlotMiddleware {
    static verifyTimeSlotId: RequestHandler<
        { id: string },
        StandardResponse<ITimeSlot>
    > = (req, res, next) => {
        const { id: idInString } = req.params;

        if (!NumberChecker.isStringValidNumber(idInString)) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Time slot ID must be integer and greater than 0',
            );
        }

        next();
    };

    static verifyUpdateTimeSlotBody: RequestHandler<
        { employeeId: string },
        StandardResponse<IEmployeeDefaultWeeklySimplifiedTimeSlots>,
        IUpdateEmployeeDefaultWeeklyTimeSlotsRequest
    > = async (req, res, next) => {
        const { body } = req;

        if (!TimeSlotVerificationService.updateRequestBodyVerification(body)) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Invalid request body',
            );
        }

        next();
    };
}
