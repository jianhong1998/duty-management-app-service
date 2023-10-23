import { WeekDay } from '../../service/monthlyDutySchedule/monthlyDutyScheduleDB.service';

export default class DateUtil {
    static convertMomentWeekdayToEnumWeekDay(momentWeekday: number): WeekDay {
        switch (momentWeekday) {
            case 0:
                return WeekDay.SUNDAY;
            case 1:
                return WeekDay.MONDAY;
            case 2:
                return WeekDay.TUESDAY;
            case 3:
                return WeekDay.WEDNESDAY;
            case 4:
                return WeekDay.THURSDAY;
            case 5:
                return WeekDay.FRIDAY;
            case 6:
                return WeekDay.SATURDAY;
            default:
                throw new Error('Unexpected moment weekday');
        }
    }
}
