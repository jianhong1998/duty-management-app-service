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
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IEmployeeCreation {
    name: string;
    employmentType: EmploymentType;
    role: EmployeeRole;
    contactNumber: number;
}

export interface IEmployeeUpdate extends Partial<IEmployee> {
    // name?: string;
    // employmentType?: EmploymentType;
    // role?: EmployeeRole;
    // contactNumber?: number;
    // isActive?: boolean;
    // monAvailabilityTimeSlotId?: number | null;
    // tueAvailabilityTimeSlotId?: number | null;
    // wedAvailabilityTimeSlotId?: number | null;
    // thuAvailabilityTimeSlotId?: number | null;
    // friAvailabilityTimeSlotId?: number | null;
    // satAvailabilityTimeSlotId?: number | null;
    // sunAvailabilityTimeSlotId?: number | null;
}

export interface IEmployeeResponse {
    id: number;
    name: string;
    employmentType: EmploymentType;
    role: EmployeeRole;
    contactNumber: number;
    isActive: boolean;
    weeklyAvailabilityTimeSlotIds: {
        mon: number | null;
        tue: number | null;
        wed: number | null;
        thu: number | null;
        fri: number | null;
        sat: number | null;
        sun: number | null;
    };
    createdAt?: Date;
    updatedAt?: Date;
}
