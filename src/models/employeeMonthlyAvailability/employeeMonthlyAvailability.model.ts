import IEmployee from '../employee/employee.model';
import EmployeeDBModel from '../employee/employeeDBModel.model';
import { ITimeSlot } from '../timeSlot/timeSlot.model';
import TimeSlotDBModel from '../timeSlot/timeSlotDBModel.model';

export default interface IEmployeeMonthlyAvailability {
    date: Date;
    employeeId: number;
    timeSlotId: number;
    createdAt?: Date;
    updatedAt?: Date;
    employee?: IEmployee;
    timeSlot?: ITimeSlot;
    employeeDBModel?: EmployeeDBModel;
    timeSlotDBModel?: TimeSlotDBModel;
}
