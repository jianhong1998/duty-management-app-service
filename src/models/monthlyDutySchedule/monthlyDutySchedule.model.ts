import IEmployee from '../employee/employee.model';
import EmployeeDBModel from '../employee/employeeDBModel.model';
import { ITimeSlot } from '../timeSlot/timeSlot.model';
import TimeSlotDBModel from '../timeSlot/timeSlotDBModel.model';

export default interface IMonthlyDutySchedule {
    date: Date;
    employeeId: number;
    timeSlotId: number;
    version: number;
    isConfirmed: boolean;
    createdAt: Date;
    updatedAt: Date;
    employeeDBModel?: EmployeeDBModel;
    timeSlotDBModel?: TimeSlotDBModel;
    employee?: IEmployee;
    timeSlot?: ITimeSlot;
}

export type IMonthlyDutyScheduleCreation = Pick<
    IMonthlyDutySchedule,
    'date' | 'employeeId' | 'timeSlotId'
>;
