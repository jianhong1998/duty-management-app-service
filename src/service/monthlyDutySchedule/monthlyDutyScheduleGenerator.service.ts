import { Transaction } from 'sequelize';
import IEmployee from '../../models/employee/employee.model';
import EmployeeRole from '../../models/employee/employeeRole.enum';
import EmploymentType from '../../models/employee/employmentType.enum';
import { ITimeSlot } from '../../models/timeSlot/timeSlot.model';
import { WeekDay } from './monthlyDutyScheduleDB.service';
import MonthInfo from '../../models/monthlyDutySchedule/monthInfo.model';
import moment, { Moment } from 'moment';
import DateUtil from '../../utils/date/dateUtil';
import { IMonthlyDutyScheduleCreation } from '../../models/monthlyDutySchedule/monthlyDutySchedule.model';
import { MAX_EMPLOYEE_PER_DAY } from '../../constants/systemConfig';
import ArrayUtil from '../../utils/array/ArrayUtil';
import NumberUtil from '../../utils/number/NumberUtil';

export default class MonthlyDutyScheduleGeneratorService {
    private readonly employeeMap = new Map<number, IEmployee>();

    // All Lead Service Crew
    private readonly leadEmployeeIdArray: number[] = [];

    // Full Time Service Crew except Lead Service Crew
    private readonly fullTimeEmployeeIdArray: number[] = [];

    // Part Time Service Crew except Lead Service Crew
    private readonly partTimeEmployeeIdArray: number[] = [];

    // Employee map - Key (weekday), Value ({employeeId, timeSlotId})
    private readonly employeeAvailabilityMap = new Map<
        WeekDay,
        Array<{ employeeId: number; timeSlotId: number }>
    >();

    private readonly timeSlotMap = new Map<number, ITimeSlot>();
    private readonly timeSlotAvailableMap = new Map<WeekDay, number[]>();

    private readonly firstDate: Moment;
    private readonly lastDate: Moment;

    private readonly transaction?: Transaction;

    constructor({
        employees,
        timeSlots,
        transaction,
        monthInfo,
    }: {
        employees: IEmployee[];
        timeSlots: ITimeSlot[];
        transaction?: Transaction;
        monthInfo: MonthInfo;
    }) {
        this.transaction = transaction;

        const monthString = monthInfo.month.toString().padStart(2, '0');
        const lastDate = DateUtil.getMonthLastDay(
            monthInfo.year,
            monthInfo.month,
        );

        const firstDate = moment(`${monthInfo.year}-${monthString}-01`);
        this.firstDate = firstDate;
        this.lastDate = moment(`${monthInfo.year}-${monthString}-${lastDate}`);

        this.initialiseEmployeeMap(employees);
        this.initialiseTimeSlotMap(timeSlots);
    }

    public generateMonthlyDutySchedule(): IMonthlyDutyScheduleCreation[] {
        const resultArray: IMonthlyDutyScheduleCreation[] = [];

        for (
            let date = this.firstDate;
            date.isSameOrBefore(this.lastDate);
            date.add(1, 'day')
        ) {
            const weekday = DateUtil.convertMomentWeekdayToEnumWeekDay(
                date.weekday(),
            );

            const employeeArrayForThisDate: IMonthlyDutyScheduleCreation[] = [];

            const availableEmployees =
                this.employeeAvailabilityMap.get(weekday);

            const leadEmployees =
                availableEmployees?.filter(({ employeeId }) =>
                    this.leadEmployeeIdArray.includes(employeeId),
                ) || [];

            const fullTimeEmployees =
                availableEmployees?.filter(({ employeeId }) =>
                    this.fullTimeEmployeeIdArray.includes(employeeId),
                ) || [];

            const partTimeEmployees =
                availableEmployees?.filter(({ employeeId }) =>
                    this.partTimeEmployeeIdArray.includes(employeeId),
                ) || [];

            while (
                employeeArrayForThisDate.length < MAX_EMPLOYEE_PER_DAY &&
                (leadEmployees.length > 0 ||
                    fullTimeEmployees.length > 0 ||
                    partTimeEmployees.length > 0)
            ) {
                if (leadEmployees.length > 0) {
                    const randomIndex = NumberUtil.generateRandomInteger(
                        0,
                        leadEmployees.length,
                    );

                    ArrayUtil.swap(leadEmployees, 0, randomIndex);

                    const { employeeId, timeSlotId } = leadEmployees.shift();

                    employeeArrayForThisDate.push({
                        date: date.toDate(),
                        employeeId,
                        timeSlotId,
                    });
                } else if (fullTimeEmployees.length > 0) {
                    const randomIndex = NumberUtil.generateRandomInteger(
                        0,
                        fullTimeEmployees.length,
                    );

                    ArrayUtil.swap(fullTimeEmployees, 0, randomIndex);

                    const { employeeId, timeSlotId } =
                        fullTimeEmployees.shift();

                    employeeArrayForThisDate.push({
                        date: date.toDate(),
                        employeeId,
                        timeSlotId,
                    });
                } else {
                    const randomIndex = NumberUtil.generateRandomInteger(
                        0,
                        partTimeEmployees.length,
                    );

                    ArrayUtil.swap(partTimeEmployees, 0, randomIndex);

                    const { employeeId, timeSlotId } =
                        partTimeEmployees.shift();

                    employeeArrayForThisDate.push({
                        date: date.toDate(),
                        employeeId,
                        timeSlotId,
                    });
                }
            }

            resultArray.push(...employeeArrayForThisDate);
        }

        return resultArray;
    }

    private initialiseEmployeeMap(employees: IEmployee[]): void {
        employees.forEach((employee) => {
            if (employee.role === EmployeeRole.LEAD) {
                this.leadEmployeeIdArray.push(employee.id);
            } else if (employee.employmentType === EmploymentType.FULL_TIME) {
                this.fullTimeEmployeeIdArray.push(employee.id);
            } else {
                this.partTimeEmployeeIdArray.push(employee.id);
            }

            if (employee.monAvailabilityTimeSlotId) {
                this.setEmployeeIntoAvaialbilityMap(
                    WeekDay.MONDAY,
                    employee.id,
                    employee.monAvailabilityTimeSlotId,
                );
            }

            if (employee.tueAvailabilityTimeSlotId) {
                this.setEmployeeIntoAvaialbilityMap(
                    WeekDay.TUESDAY,
                    employee.id,
                    employee.tueAvailabilityTimeSlotId,
                );
            }

            if (employee.wedAvailabilityTimeSlotId) {
                this.setEmployeeIntoAvaialbilityMap(
                    WeekDay.WEDNESDAY,
                    employee.id,
                    employee.wedAvailabilityTimeSlotId,
                );
            }

            if (employee.thuAvailabilityTimeSlotId) {
                this.setEmployeeIntoAvaialbilityMap(
                    WeekDay.THURSDAY,
                    employee.id,
                    employee.thuAvailabilityTimeSlotId,
                );
            }

            if (employee.friAvailabilityTimeSlotId) {
                this.setEmployeeIntoAvaialbilityMap(
                    WeekDay.FRIDAY,
                    employee.id,
                    employee.friAvailabilityTimeSlotId,
                );
            }

            if (employee.satAvailabilityTimeSlotId) {
                this.setEmployeeIntoAvaialbilityMap(
                    WeekDay.SATURDAY,
                    employee.id,
                    employee.satAvailabilityTimeSlotId,
                );
            }

            if (employee.sunAvailabilityTimeSlotId) {
                this.setEmployeeIntoAvaialbilityMap(
                    WeekDay.SUNDAY,
                    employee.id,
                    employee.sunAvailabilityTimeSlotId,
                );
            }

            this.employeeMap.set(employee.id, employee);
        });
    }

    private initialiseTimeSlotMap(timeSlots: ITimeSlot[]): void {
        timeSlots.forEach((timeSlot) => {
            this.timeSlotMap.set(timeSlot.id, timeSlot);

            if (timeSlot.isAvailableForMon) {
                this.setTimeSlotIdIntoAvailableMap(WeekDay.MONDAY, timeSlot.id);
            }

            if (timeSlot.isAvailableForTue) {
                this.setTimeSlotIdIntoAvailableMap(
                    WeekDay.TUESDAY,
                    timeSlot.id,
                );
            }

            if (timeSlot.isAvailableForWed) {
                this.setTimeSlotIdIntoAvailableMap(
                    WeekDay.WEDNESDAY,
                    timeSlot.id,
                );
            }

            if (timeSlot.isAvailableForThu) {
                this.setTimeSlotIdIntoAvailableMap(
                    WeekDay.THURSDAY,
                    timeSlot.id,
                );
            }

            if (timeSlot.isAvailableForFri) {
                this.setTimeSlotIdIntoAvailableMap(WeekDay.FRIDAY, timeSlot.id);
            }

            if (timeSlot.isAvailableForSat) {
                this.setTimeSlotIdIntoAvailableMap(
                    WeekDay.SATURDAY,
                    timeSlot.id,
                );
            }

            if (timeSlot.isAvailableForSun) {
                this.setTimeSlotIdIntoAvailableMap(WeekDay.SUNDAY, timeSlot.id);
            }
        });
    }

    private setTimeSlotIdIntoAvailableMap(
        weekday: WeekDay,
        timeSlotId: number,
    ): void {
        if (this.timeSlotAvailableMap.has(weekday)) {
            this.timeSlotAvailableMap.get(weekday).push(timeSlotId);
        } else {
            this.timeSlotAvailableMap.set(weekday, [timeSlotId]);
        }
    }

    private setEmployeeIntoAvaialbilityMap(
        weekday: WeekDay,
        employeeId: number,
        timeSlotId: number,
    ) {
        if (this.employeeAvailabilityMap.has(weekday)) {
            this.employeeAvailabilityMap.get(weekday).push({
                employeeId,
                timeSlotId,
            });
        } else {
            this.employeeAvailabilityMap.set(weekday, [
                { employeeId, timeSlotId },
            ]);
        }
    }
}
