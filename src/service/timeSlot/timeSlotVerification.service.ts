import { IUpdateEmployeeDefaultWeeklyTimeSlotsRequest } from '../../models/timeSlot/employeeTimeSlot.model';

export default class TimeSlotVerificationService {
    static updateRequestBodyVerification(
        body: unknown,
    ): body is IUpdateEmployeeDefaultWeeklyTimeSlotsRequest {
        if (typeof body !== 'object' || body === null) {
            return false;
        }

        const isMonValid =
            'mon' in body &&
            (typeof body.mon === 'number' || body.mon === null);

        const isTueValid =
            'tue' in body &&
            (typeof body.tue === 'number' || body.tue === null);

        const isWedValid =
            'wed' in body &&
            (typeof body.wed === 'number' || body.wed === null);

        const isThuValid =
            'thu' in body &&
            (typeof body.thu === 'number' || body.thu === null);

        const isFriValid =
            'fri' in body &&
            (typeof body.fri === 'number' || body.fri === null);

        const isSatValid =
            'sat' in body &&
            (typeof body.sat === 'number' || body.sat === null);

        const isSunValid =
            'sun' in body &&
            (typeof body.sun === 'number' || body.sun === null);

        return (
            isMonValid &&
            isTueValid &&
            isWedValid &&
            isThuValid &&
            isFriValid &&
            isSatValid &&
            isSunValid
        );
    }
}
