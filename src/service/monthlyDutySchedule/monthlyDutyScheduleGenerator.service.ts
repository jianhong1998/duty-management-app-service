import moment from 'moment';
import IEmployee from '../../models/employee/employee.model';
import MonthInfo from '../../models/monthlyDutySchedule/monthInfo.model';
import TimeSlotDBModel from '../../models/timeSlot/timeSlotDBModel.model';
import EmployeeService from '../employee/employeeDB.service';
import { WeekDay } from './monthlyDutyScheduleDB.service';
import { ITimeSlot } from '../../models/timeSlot/timeSlot.model';
import { IMonthlyDutyScheduleCreation } from '../../models/monthlyDutySchedule/monthlyDutySchedule.model';
import DateUtil from '../../utils/date/DateUtil';
import TimeSlotService from '../timeSlot/timeSlotDB.service';
import EmployeeRole from '../../models/employee/employeeRole.enum';
import {
    MAX_EMPLOYEE_PER_DAY,
    MIN_EMPLOYEE_EARLIEST_SHIFT,
} from '../../constants/systemConfig';
import ArrayUtil from '../../utils/array/ArrayUtil';
import NumberUtil from '../../utils/number/NumberUtil';

export default class MonthlyDutyScheduleGeneratorService {
    public static async generateMonthlyDutySchedule(
        monthInfo: MonthInfo,
    ): Promise<IMonthlyDutyScheduleCreation[]> {
        const twoDigitMonthString = monthInfo.month.toString().padStart(2, '0');

        const firstDayDateString = `${monthInfo.year}-${twoDigitMonthString}-01`;

        const resultArray: IMonthlyDutyScheduleCreation[] = [];

        const employees = await EmployeeService.getEmployees(
            {
                isActive: true,
            },
            {
                include: [
                    {
                        model: TimeSlotDBModel,
                        as: 'monAvailabilityTimeSlotDBModel',
                    },
                    {
                        model: TimeSlotDBModel,
                        as: 'tueAvailabilityTimeSlotDBModel',
                    },
                    {
                        model: TimeSlotDBModel,
                        as: 'wedAvailabilityTimeSlotDBModel',
                    },
                    {
                        model: TimeSlotDBModel,
                        as: 'thuAvailabilityTimeSlotDBModel',
                    },
                    {
                        model: TimeSlotDBModel,
                        as: 'friAvailabilityTimeSlotDBModel',
                    },
                    {
                        model: TimeSlotDBModel,
                        as: 'satAvailabilityTimeSlotDBModel',
                    },
                    {
                        model: TimeSlotDBModel,
                        as: 'sunAvailabilityTimeSlotDBModel',
                    },
                ],
            },
        );

        const employeeMap = this.convertEmployeesToEmployeeMap(employees);
        const availabilityMap = this.generateEmployeeAvailabilityMap(employees);
        const timeSlotMap = await this.generateTimeSlotMap();

        for (
            const date = moment(firstDayDateString);
            date.month() === monthInfo.month - 1;
            date.add(1, 'd')
        ) {
            const weekday = DateUtil.convertMomentWeekdayToEnumWeekDay(
                date.weekday(),
            );

            const availableEmployeeMap = availabilityMap.get(weekday);

            if (availableEmployeeMap.size === 0) {
                continue;
            }

            const timeSlotIds = [...availableEmployeeMap.keys()].sort(
                (a, b) => {
                    const startTimeA = moment(
                        timeSlotMap.get(a).startTime.toISOString(),
                    );
                    const startTimeB = moment(
                        timeSlotMap.get(b).startTime.toISOString(),
                    );

                    return startTimeA.isAfter(startTimeB) ? 1 : -1;
                },
            );

            const dutyEmployeesForTheDay: IMonthlyDutyScheduleCreation[] = [];

            const employeeIdsAvailableForFirstShift = availableEmployeeMap.get(
                timeSlotIds[0],
            );

            const {
                dutyScheduleCreationArrayForFirstShift,
                pickedEmployeeIds,
            } = this.generateEmployeesForFirstShift({
                date: date.toDate(),
                availableEmployeeIds: employeeIdsAvailableForFirstShift,
                employeeMap,
                firstShiftTimeSlotId: timeSlotIds[0],
                numberOfEmployeeNeeded: MIN_EMPLOYEE_EARLIEST_SHIFT,
            });

            dutyEmployeesForTheDay.push(
                ...dutyScheduleCreationArrayForFirstShift,
            );

            const availableEmployeeIds: Array<{
                employeeId: number;
                timeSlotId: number;
            }> = [];

            availableEmployeeMap.forEach((ids, timeSlotId) =>
                availableEmployeeIds.push(
                    ...ids.map((id) => ({ employeeId: id, timeSlotId })),
                ),
            );

            availableEmployeeIds.filter(({ employeeId }) =>
                pickedEmployeeIds.includes(employeeId),
            );

            while (
                dutyEmployeesForTheDay.length < MAX_EMPLOYEE_PER_DAY &&
                availableEmployeeIds.length > 0
            ) {
                const index = NumberUtil.generateRandomInteger(
                    0,
                    availableEmployeeIds.length - 1,
                );

                ArrayUtil.swap<{ employeeId: number; timeSlotId: number }>(
                    availableEmployeeIds,
                    0,
                    index,
                );

                const {
                    timeSlotId: pickedTimeSlotId,
                    employeeId: pickedEmployeeId,
                } = availableEmployeeIds.shift();

                dutyEmployeesForTheDay.push({
                    date: date.toDate(),
                    employeeId: pickedEmployeeId,
                    timeSlotId: pickedTimeSlotId,
                });
            }

            resultArray.push(...dutyEmployeesForTheDay);
        }

        return resultArray;
    }

    private static convertEmployeesToEmployeeMap(
        employees: IEmployee[],
    ): Map<IEmployee['id'], IEmployee> {
        return new Map(employees.map((employee) => [employee.id, employee]));
    }

    private static generateEmployeeAvailabilityMap(
        employees: IEmployee[],
    ): Map<WeekDay, Map<ITimeSlot['id'], Array<IEmployee['id']>>> {
        const employeeMap = new Map<number, IEmployee>();
        const employeeAvailabilityMap = new Map<
            WeekDay,
            Map<ITimeSlot['id'], Array<IEmployee['id']>>
        >([
            [WeekDay.MONDAY, new Map()],
            [WeekDay.TUESDAY, new Map()],
            [WeekDay.WEDNESDAY, new Map()],
            [WeekDay.THURSDAY, new Map()],
            [WeekDay.FRIDAY, new Map()],
            [WeekDay.SATURDAY, new Map()],
            [WeekDay.SUNDAY, new Map()],
        ]);

        employees.forEach((employee) => {
            employeeMap.set(employee.id, employee);

            this.fillUpEmployeeAvailabilityMap(
                employee,
                employeeAvailabilityMap,
            );
        });

        return employeeAvailabilityMap;
    }

    private static fillUpEmployeeAvailabilityMap(
        employee: IEmployee,
        availabilityMap: Map<
            WeekDay,
            Map<ITimeSlot['id'], Array<IEmployee['id']>>
        >,
    ): void {
        const {
            monAvailabilityTimeSlot,
            tueAvailabilityTimeSlot,
            wedAvailabilityTimeSlot,
            thuAvailabilityTimeSlot,
            friAvailabilityTimeSlot,
            satAvailabilityTimeSlot,
            sunAvailabilityTimeSlot,
        } = employee;

        if (monAvailabilityTimeSlot) {
            if (!availabilityMap.has(WeekDay.MONDAY)) {
                availabilityMap.set(
                    WeekDay.MONDAY,
                    new Map([[monAvailabilityTimeSlot.id, [employee.id]]]),
                );
            }

            if (
                availabilityMap.has(WeekDay.MONDAY) &&
                availabilityMap
                    .get(WeekDay.MONDAY)
                    .has(monAvailabilityTimeSlot.id)
            ) {
                availabilityMap
                    .get(WeekDay.MONDAY)
                    .get(monAvailabilityTimeSlot.id)
                    .push(employee.id);
            }

            if (
                availabilityMap.has(WeekDay.MONDAY) &&
                !availabilityMap
                    .get(WeekDay.MONDAY)
                    .has(monAvailabilityTimeSlot.id)
            ) {
                availabilityMap
                    .get(WeekDay.MONDAY)
                    .set(monAvailabilityTimeSlot.id, [employee.id]);
            }
        }

        if (tueAvailabilityTimeSlot) {
            if (!availabilityMap.has(WeekDay.TUESDAY)) {
                availabilityMap.set(
                    WeekDay.TUESDAY,
                    new Map([[tueAvailabilityTimeSlot.id, [employee.id]]]),
                );
            }

            if (
                availabilityMap.has(WeekDay.TUESDAY) &&
                availabilityMap
                    .get(WeekDay.TUESDAY)
                    .has(tueAvailabilityTimeSlot.id)
            ) {
                availabilityMap
                    .get(WeekDay.TUESDAY)
                    .get(tueAvailabilityTimeSlot.id)
                    .push(employee.id);
            }

            if (
                availabilityMap.has(WeekDay.TUESDAY) &&
                !availabilityMap
                    .get(WeekDay.TUESDAY)
                    .has(tueAvailabilityTimeSlot.id)
            ) {
                availabilityMap
                    .get(WeekDay.TUESDAY)
                    .set(tueAvailabilityTimeSlot.id, [employee.id]);
            }
        }

        if (wedAvailabilityTimeSlot) {
            if (!availabilityMap.has(WeekDay.WEDNESDAY)) {
                availabilityMap.set(
                    WeekDay.WEDNESDAY,
                    new Map([[wedAvailabilityTimeSlot.id, [employee.id]]]),
                );
            }

            if (
                availabilityMap.has(WeekDay.WEDNESDAY) &&
                availabilityMap
                    .get(WeekDay.WEDNESDAY)
                    .has(wedAvailabilityTimeSlot.id)
            ) {
                availabilityMap
                    .get(WeekDay.WEDNESDAY)
                    .get(wedAvailabilityTimeSlot.id)
                    .push(employee.id);
            }

            if (
                availabilityMap.has(WeekDay.WEDNESDAY) &&
                !availabilityMap
                    .get(WeekDay.WEDNESDAY)
                    .has(wedAvailabilityTimeSlot.id)
            ) {
                availabilityMap
                    .get(WeekDay.WEDNESDAY)
                    .set(wedAvailabilityTimeSlot.id, [employee.id]);
            }
        }

        if (thuAvailabilityTimeSlot) {
            if (!availabilityMap.has(WeekDay.THURSDAY)) {
                availabilityMap.set(
                    WeekDay.THURSDAY,
                    new Map([[thuAvailabilityTimeSlot.id, [employee.id]]]),
                );
            }

            if (
                availabilityMap.has(WeekDay.THURSDAY) &&
                availabilityMap
                    .get(WeekDay.THURSDAY)
                    .has(thuAvailabilityTimeSlot.id)
            ) {
                availabilityMap
                    .get(WeekDay.THURSDAY)
                    .get(thuAvailabilityTimeSlot.id)
                    .push(employee.id);
            }

            if (
                availabilityMap.has(WeekDay.THURSDAY) &&
                !availabilityMap
                    .get(WeekDay.THURSDAY)
                    .has(thuAvailabilityTimeSlot.id)
            ) {
                availabilityMap
                    .get(WeekDay.THURSDAY)
                    .set(thuAvailabilityTimeSlot.id, [employee.id]);
            }
        }

        if (friAvailabilityTimeSlot) {
            if (!availabilityMap.has(WeekDay.FRIDAY)) {
                availabilityMap.set(
                    WeekDay.FRIDAY,
                    new Map([[friAvailabilityTimeSlot.id, [employee.id]]]),
                );
            }

            if (
                availabilityMap.has(WeekDay.FRIDAY) &&
                availabilityMap
                    .get(WeekDay.FRIDAY)
                    .has(friAvailabilityTimeSlot.id)
            ) {
                availabilityMap
                    .get(WeekDay.FRIDAY)
                    .get(friAvailabilityTimeSlot.id)
                    .push(employee.id);
            }

            if (
                availabilityMap.has(WeekDay.FRIDAY) &&
                !availabilityMap
                    .get(WeekDay.FRIDAY)
                    .has(friAvailabilityTimeSlot.id)
            ) {
                availabilityMap
                    .get(WeekDay.FRIDAY)
                    .set(friAvailabilityTimeSlot.id, [employee.id]);
            }
        }

        if (satAvailabilityTimeSlot) {
            if (!availabilityMap.has(WeekDay.SATURDAY)) {
                availabilityMap.set(
                    WeekDay.SATURDAY,
                    new Map([[satAvailabilityTimeSlot.id, [employee.id]]]),
                );
            }

            if (
                availabilityMap.has(WeekDay.SATURDAY) &&
                availabilityMap
                    .get(WeekDay.SATURDAY)
                    .has(satAvailabilityTimeSlot.id)
            ) {
                availabilityMap
                    .get(WeekDay.SATURDAY)
                    .get(satAvailabilityTimeSlot.id)
                    .push(employee.id);
            }

            if (
                availabilityMap.has(WeekDay.SATURDAY) &&
                !availabilityMap
                    .get(WeekDay.SATURDAY)
                    .has(satAvailabilityTimeSlot.id)
            ) {
                availabilityMap
                    .get(WeekDay.SATURDAY)
                    .set(satAvailabilityTimeSlot.id, [employee.id]);
            }
        }

        if (sunAvailabilityTimeSlot) {
            if (!availabilityMap.has(WeekDay.SUNDAY)) {
                availabilityMap.set(
                    WeekDay.SUNDAY,
                    new Map([[sunAvailabilityTimeSlot.id, [employee.id]]]),
                );
            }

            if (
                availabilityMap.has(WeekDay.SUNDAY) &&
                availabilityMap
                    .get(WeekDay.SUNDAY)
                    .has(sunAvailabilityTimeSlot.id)
            ) {
                availabilityMap
                    .get(WeekDay.SUNDAY)
                    .get(sunAvailabilityTimeSlot.id)
                    .push(employee.id);
            }

            if (
                availabilityMap.has(WeekDay.SUNDAY) &&
                !availabilityMap
                    .get(WeekDay.SUNDAY)
                    .has(sunAvailabilityTimeSlot.id)
            ) {
                availabilityMap
                    .get(WeekDay.SUNDAY)
                    .set(sunAvailabilityTimeSlot.id, [employee.id]);
            }
        }
    }

    private static countTotalAvailableEmployeeInMap(
        availabilityMap: Map<ITimeSlot['id'], Array<IEmployee['id']>>,
    ): number {
        let totalEmployeeNumber = 0;

        availabilityMap.forEach((employeeIds) => {
            totalEmployeeNumber += employeeIds.length;
        });

        return totalEmployeeNumber;
    }

    private static generateEmployeesForFirstShift(params: {
        numberOfEmployeeNeeded: number;
        availableEmployeeIds: number[];
        employeeMap: Map<IEmployee['id'], IEmployee>;
        date: Date;
        firstShiftTimeSlotId: number;
    }): {
        dutyScheduleCreationArrayForFirstShift: IMonthlyDutyScheduleCreation[];
        pickedEmployeeIds: number[];
    } {
        const dutyScheduleCreationArrayForFirstShift: IMonthlyDutyScheduleCreation[] =
            [];
        const pickedEmployeeIds: number[] = [];

        const {
            availableEmployeeIds,
            employeeMap,
            numberOfEmployeeNeeded,
            date,
            firstShiftTimeSlotId,
        } = params;

        let index = 0;

        while (
            index < availableEmployeeIds.length &&
            dutyScheduleCreationArrayForFirstShift.length === 0
        ) {
            const employee = employeeMap.get(availableEmployeeIds[index]);

            if (employee.role === EmployeeRole.LEAD) {
                pickedEmployeeIds.push(employee.id);
                dutyScheduleCreationArrayForFirstShift.push({
                    date,
                    timeSlotId: firstShiftTimeSlotId,
                    employeeId: employee.id,
                });

                ArrayUtil.swap<number>(availableEmployeeIds, 0, index);

                availableEmployeeIds.shift();
            }

            index++;
        }

        while (
            dutyScheduleCreationArrayForFirstShift.length <
            numberOfEmployeeNeeded
        ) {
            index = NumberUtil.generateRandomInteger(
                0,
                availableEmployeeIds.length - 1,
            );

            ArrayUtil.swap<number>(availableEmployeeIds, 0, index);

            const employeeId = availableEmployeeIds.shift();

            dutyScheduleCreationArrayForFirstShift.push({
                date,
                employeeId,
                timeSlotId: firstShiftTimeSlotId,
            });

            pickedEmployeeIds.push(employeeId);
        }

        return {
            dutyScheduleCreationArrayForFirstShift,
            pickedEmployeeIds,
        };
    }

    private static async generateTimeSlotMap(): Promise<
        Map<ITimeSlot['id'], ITimeSlot>
    > {
        const timeSlots = await TimeSlotService.getTimeSlots({
            isDeleted: false,
        });

        const map = new Map<ITimeSlot['id'], ITimeSlot>();

        timeSlots.forEach((timeSlot) => {
            map.set(timeSlot.id, timeSlot);
        });

        return map;
    }
}
