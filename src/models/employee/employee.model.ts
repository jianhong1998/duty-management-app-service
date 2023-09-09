import EmploymentType from './employmentType.enum';

export default interface IEmployee {
    id: number;
    name: string;
    employmentType: EmploymentType;
    role: EmployeeRole;
    contactNumber: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
