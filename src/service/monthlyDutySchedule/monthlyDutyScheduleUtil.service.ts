import moment from 'moment';
import IEmployee from '../../models/employee/employee.model';
import IMonthlyDutySchedule from '../../models/monthlyDutySchedule/monthlyDutySchedule.model';
import EmployeeService from '../employee/employeeDB.service';

export default class MonthlyDutyScheduleUtil {
    public static isMonthlyDutyScheduleConfirm(
        monthlyDutySchedule: IMonthlyDutySchedule[] | IMonthlyDutySchedule,
    ): boolean {
        if (Array.isArray(monthlyDutySchedule)) {
            const isConfirmedArray = monthlyDutySchedule.map(
                (dutySchedule) => dutySchedule.isConfirmed,
            );

            return !isConfirmedArray.includes(false);
        }

        return monthlyDutySchedule.isConfirmed;
    }

    public static async getEmployeesFromMonthlyDutySchedules(
        monthlyDutySchedules: IMonthlyDutySchedule[],
    ): Promise<IEmployee[]> {
        const employeeMap = new Map<IEmployee['id'], IEmployee>();

        for (const schedule of monthlyDutySchedules) {
            if (!employeeMap.has(schedule.employeeId)) {
                const employee = await EmployeeService.getEmployees({
                    id: schedule.employeeId,
                });

                if (employee.length !== 1) {
                    const dateString = moment(schedule.date).format(
                        'DD-MM-YYYY',
                    );

                    throw new Error(
                        `Employee ID ${schedule.employeeId} in duty schedule for ${dateString} is not exist.`,
                    );
                }

                employeeMap.set(employee[0].id, employee[0]);
            }
        }

        const employees = [...employeeMap.values()].sort((a, b) => a.id - b.id);

        return employees;
    }
}
