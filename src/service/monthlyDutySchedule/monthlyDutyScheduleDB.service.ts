import MonthInfo from '../../models/monthlyDutySchedule/monthInfo.model';
import MonthlyDutyScheduleGeneratorService from './monthlyDutyScheduleGenerator.service';

export enum WeekDay {
    MONDAY = 'mon',
    TUESDAY = 'tue',
    WEDNESDAY = 'wed',
    THURSDAY = 'thu',
    FRIDAY = 'fri',
    SATURDAY = 'sat',
    SUNDAY = 'sun',
}

export default class MonthlyDutyScheduleService {
    static async createMonthlyDutySchedule(monthInfo: MonthInfo) {
        const result =
            await MonthlyDutyScheduleGeneratorService.generateMonthlyDutySchedule(
                monthInfo,
            );

        return result;
    }
}
