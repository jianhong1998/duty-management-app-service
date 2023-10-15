import { RequestHandler } from 'express';
import StandardResponse from '../../models/response/standardResponse.model';
import { ITimeSlotResponse } from '../../models/timeSlot/timeSlot.model';
import TimeSlotService from '../../service/timeSlot/timeSlotDB.service';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import TimeUtil from '../../utils/time/timeUtil';

export default class TimeSlotController {
    static getAllTimeSlots: RequestHandler<
        undefined,
        StandardResponse<ITimeSlotResponse[]>
    > = async (req, res) => {
        try {
            const timeSlots = await TimeSlotService.getTimeSlots({
                isDeleted: false,
            });

            const resultTimeSlots: ITimeSlotResponse[] = timeSlots.map(
                (timeSlot) => {
                    const {
                        endTime,
                        id,
                        isAvailableForFri,
                        isAvailableForMon,
                        isAvailableForSat,
                        isAvailableForSun,
                        isAvailableForThu,
                        isAvailableForTue,
                        isAvailableForWed,
                        isDeleted,
                        startTime,
                    } = timeSlot;

                    return {
                        id,
                        isDeleted,
                        startTime:
                            TimeUtil.convertDateObjectToTimeString(startTime),
                        endTime:
                            TimeUtil.convertDateObjectToTimeString(endTime),
                        isAvailableFor: {
                            mon: isAvailableForMon,
                            tue: isAvailableForTue,
                            wed: isAvailableForWed,
                            thu: isAvailableForThu,
                            fri: isAvailableForFri,
                            sat: isAvailableForSat,
                            sun: isAvailableForSun,
                        },
                    };
                },
            );

            res.status(200).send({
                isSuccess: true,
                data: resultTimeSlots,
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
