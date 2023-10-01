import { RequestHandler } from 'express';
import { ITimeSlot } from '../../models/timeSlot/timeSlot.model';
import TimeSlotService from '../../service/timeSlot/timeSlotDB.service';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import StandardResponse from '../../models/response/standardResponse.model';

export default class TimeSlotController {
    static getTimeSlot: RequestHandler<
        { id: string },
        StandardResponse<Omit<ITimeSlot, 'createAt' & 'updatedAt'>>
    > = async (req, res) => {
        try {
            const { id: idInString } = req.params;

            const id = Number.parseInt(idInString);

            const timeSlots = await TimeSlotService.getTimeSlots({ id });

            if (timeSlots.length !== 1) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'Timeslot is not exists.',
                );
            }

            const {
                id: timeSlotId,
                startTime,
                endTime,
                isDeleted,
                isAvailableForFri,
                isAvailableForMon,
                isAvailableForSat,
                isAvailableForSun,
                isAvailableForThu,
                isAvailableForTue,
                isAvailableForWed,
            } = timeSlots[0];

            res.status(200).send({
                isSuccess: true,
                data: {
                    id: timeSlotId,
                    startTime,
                    endTime,
                    isDeleted,
                    isAvailableForMon,
                    isAvailableForTue,
                    isAvailableForWed,
                    isAvailableForThu,
                    isAvailableForFri,
                    isAvailableForSat,
                    isAvailableForSun,
                },
            });
        } catch (error) {
            const errorMessage = ErrorHandler.getErrorMessage(error);

            ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    };
}
