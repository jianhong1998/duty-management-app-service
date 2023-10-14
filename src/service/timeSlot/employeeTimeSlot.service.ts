import { IEmployeeDefaultWeeklySimplifiedTimeSlots } from '../../models/timeSlot/employeeTimeSlot.model';
import { ISimplifiedTimeSlotResponse } from '../../models/timeSlot/timeSlot.model';
import TimeUtil from '../../utils/time/timeUtil';
import EmployeeService from '../employee/employeeDB.service';
import TimeSlotService from './timeSlotDB.service';

export default class EmployeeTimeSlotService {
    static async getEmployeeDefaultWeeklyTimeSlots(
        employeeId: number,
    ): Promise<IEmployeeDefaultWeeklySimplifiedTimeSlots> {
        const employee = (
            await EmployeeService.getEmployees({
                id: employeeId,
            })
        )[0];

        if (typeof employee === 'undefined') {
            throw new Error('Employee Not Found');
        }

        const {
            monAvailabilityTimeSlotId,
            tueAvailabilityTimeSlotId,
            wedAvailabilityTimeSlotId,
            thuAvailabilityTimeSlotId,
            friAvailabilityTimeSlotId,
            satAvailabilityTimeSlotId,
            sunAvailabilityTimeSlotId,
        } = employee;

        const result: IEmployeeDefaultWeeklySimplifiedTimeSlots = {
            mon: null,
            tue: null,
            wed: null,
            thu: null,
            fri: null,
            sat: null,
            sun: null,
        };

        if (monAvailabilityTimeSlotId) {
            result.mon = await this.getTimeSlotById(monAvailabilityTimeSlotId);
        }

        if (tueAvailabilityTimeSlotId) {
            result.tue = await this.getTimeSlotById(tueAvailabilityTimeSlotId);
        }

        if (wedAvailabilityTimeSlotId) {
            result.wed = await this.getTimeSlotById(wedAvailabilityTimeSlotId);
        }

        if (thuAvailabilityTimeSlotId) {
            result.thu = await this.getTimeSlotById(thuAvailabilityTimeSlotId);
        }

        if (friAvailabilityTimeSlotId) {
            result.fri = await this.getTimeSlotById(friAvailabilityTimeSlotId);
        }

        if (satAvailabilityTimeSlotId) {
            result.sat = await this.getTimeSlotById(satAvailabilityTimeSlotId);
        }

        if (sunAvailabilityTimeSlotId) {
            result.sun = await this.getTimeSlotById(sunAvailabilityTimeSlotId);
        }

        return result;
    }

    private static async getTimeSlotById(
        id: number,
    ): Promise<ISimplifiedTimeSlotResponse | null> {
        const timeSlots = await TimeSlotService.getTimeSlots({
            id,
        });

        if (timeSlots.length === 0) {
            return null;
        }

        return {
            id: timeSlots[0].id,
            startTime: TimeUtil.convertDateObjectToTimeString(
                timeSlots[0].startTime,
            ),
            endTime: TimeUtil.convertDateObjectToTimeString(
                timeSlots[0].endTime,
            ),
        };
    }
}
