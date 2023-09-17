import EmployeeDBModel from '../models/employee/employeeDBModel.model';
import EmployeeLeaveDBModel from '../models/employeeLeave/employeeLeaveDBModel.model';
import EmployeeMonthlyAvailabilityDBModel from '../models/employeeMonthlyAvailability/employeeMonthlyAvailabilityDBModel.model';
import MonthlyDutyScheduleDBModel from '../models/monthlyDutySchedule/monthlyDutyScheduleDBModel.model';
import TimeSlotDBModel from '../models/timeSlot/timeSlotDBModel.model';
import UserAccountDBModel from '../models/userAccount/userAccountDBModel.model';

export const dbModels = [
    EmployeeDBModel,
    TimeSlotDBModel,
    UserAccountDBModel,
    EmployeeLeaveDBModel,
    EmployeeMonthlyAvailabilityDBModel,
    MonthlyDutyScheduleDBModel,
];
