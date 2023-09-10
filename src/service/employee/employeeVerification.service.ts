import {
    IEmployeeCreation,
    IEmployeeUpdate,
} from '../../models/employee/employee.model';
import EmployeeRole from '../../models/employee/employeeRole.enum';
import EmploymentType from '../../models/employee/employmentType.enum';

export default class EmployeeVerificationService {
    public static isIEmployeeUpdate(
        object: unknown,
    ): object is IEmployeeUpdate {
        if (typeof object !== 'object') {
            return false;
        }

        const hasName = 'name' in object && typeof object.name === 'string';

        const hasEmploymentType =
            'employmentType' in object &&
            this.isEmploymentType(object.employmentType);

        const hasRole = 'role' in object && this.isEmployeeRole(object.role);

        const hasContactNumber =
            'contactNumber' in object &&
            typeof object.contactNumber === 'number';

        const hasIsActive =
            'isActive' in object && typeof object.isActive === 'boolean';

        return (
            hasName ||
            hasEmploymentType ||
            hasRole ||
            hasContactNumber ||
            hasIsActive
        );
    }

    public static isEmployeeCreation(
        object: unknown,
    ): object is IEmployeeCreation {
        if (typeof object !== 'object') {
            return false;
        }

        const hasName = 'name' in object && typeof object.name === 'string';

        const hasEmploymentType =
            'employmentType' in object &&
            this.isEmploymentType(object.employmentType);

        const hasRole = 'role' in object && this.isEmployeeRole(object.role);

        const hasContactNumber =
            'contactNumber' in object &&
            typeof object.contactNumber === 'number';

        return hasName && hasEmploymentType && hasRole && hasContactNumber;
    }

    public static isEmploymentType(value: unknown): value is EmploymentType {
        if (typeof value !== 'string') {
            return false;
        }
        return Object.values(EmploymentType).includes(value as EmploymentType);
    }

    public static isEmployeeRole(value: unknown): value is EmployeeRole {
        if (typeof value !== 'string') {
            return false;
        }

        return Object.values(EmployeeRole).includes(value as EmployeeRole);
    }
}
