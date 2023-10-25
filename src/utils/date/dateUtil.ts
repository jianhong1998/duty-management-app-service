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

    static generateDateObject(dateAttribute: {
        date: number;
        month: number;
        year: number;
    }): Date {
        const { date, month, year } = dateAttribute;

        const dateInString = date.toString().padStart(2, '0');

        const monthInString = month.toString().padStart(2, '0');

        return new Date(`${year}-${monthInString}-${dateInString}`);
    }

    static getMonthLastDay(year: number, month: number): number {
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            case 2:
                return year % 4 === 0 ? 29 : 28;
            default:
                throw new Error('Invalid Month');
        }
    }
}
