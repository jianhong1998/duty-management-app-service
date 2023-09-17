import IEmployee from '../employee/employee.model';
import EmployeeDBModel from '../employee/employeeDBModel.model';
import { EmployeeLeaveApprovalStatus } from './employeeLeaveApprovalStatus.enum';

export default interface IEmployeeLeave {
    id: number;
    employeeId: number;
    date: Date;
    applyReason: string;
    approvalStatus: EmployeeLeaveApprovalStatus;
    createdAt?: Date;
    updatedAt?: Date;
    employeeDBModel?: EmployeeDBModel;
    employee?: IEmployee;
}
