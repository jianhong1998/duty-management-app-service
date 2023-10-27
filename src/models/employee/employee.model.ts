import { ITimeSlot } from '../timeSlot/timeSlot.model';
import TimeSlotDBModel from '../timeSlot/timeSlotDBModel.model';
import EmployeeRole from './employeeRole.enum';
import EmploymentType from './employmentType.enum';

export default interface IEmployee {
    id: number;
    name: string;
    employmentType: EmploymentType;
    role: EmployeeRole;
    contactNumber: number;
    isActive: boolean;
    monAvailabilityTimeSlotId: number | null;
    tueAvailabilityTimeSlotId: number | null;
    wedAvailabilityTimeSlotId: number | null;
    thuAvailabilityTimeSlotId: number | null;
    friAvailabilityTimeSlotId: number | null;
    satAvailabilityTimeSlotId: number | null;
    sunAvailabilityTimeSlotId: number | null;
    monAvailabilityTimeSlotDBModel?: TimeSlotDBModel;
    tueAvailabilityTimeSlotDBModel?: TimeSlotDBModel;
    wedAvailabilityTimeSlotDBModel?: TimeSlotDBModel;
    thuAvailabilityTimeSlotDBModel?: TimeSlotDBModel;
    friAvailabilityTimeSlotDBModel?: TimeSlotDBModel;
    satAvailabilityTimeSlotDBModel?: TimeSlotDBModel;
    sunAvailabilityTimeSlotDBModel?: TimeSlotDBModel;
    monAvailabilityTimeSlot?: ITimeSlot;
    tueAvailabilityTimeSlot?: ITimeSlot;
    wedAvailabilityTimeSlot?: ITimeSlot;
    thuAvailabilityTimeSlot?: ITimeSlot;
    friAvailabilityTimeSlot?: ITimeSlot;
    satAvailabilityTimeSlot?: ITimeSlot;
    sunAvailabilityTimeSlot?: ITimeSlot;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IEmployeeCreation {
    name: string;
    employmentType: EmploymentType;
    role: EmployeeRole;
    contactNumber: number;
}

export interface IEmployeeUpdate extends Partial<IEmployee> {}

export interface IEmployeeResponse
    extends Pick<
        IEmployee,
        | 'id'
        | 'name'
        | 'employmentType'
        | 'role'
        | 'contactNumber'
        | 'isActive'
        | 'createdAt'
        | 'updatedAt'
    > {
    weeklyAvailabilityTimeSlotIds: {
        mon: number | null;
        tue: number | null;
        wed: number | null;
        thu: number | null;
        fri: number | null;
        sat: number | null;
        sun: number | null;
    };
}
