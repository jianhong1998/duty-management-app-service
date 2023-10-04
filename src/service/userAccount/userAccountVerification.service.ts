import {
    UserAccountStatus,
    UserAccountType,
} from '../../models/userAccount/userAccount.enum';
import { IUserAccountCreation } from '../../models/userAccount/userAccount.model';
import IUserRegisterFormData from '../../models/userAccount/userRegisterFormData.model';
import EmployeeVerificationService from '../employee/employeeVerification.service';

export default class UserAccountVerificationService {
    public static isUserAccountCreation(
        object: unknown,
    ): object is IUserAccountCreation {
        if (typeof object !== 'object' || object === null) {
            return false;
        }

        const hasEmployeeId =
            'employeeId' in object && typeof object.employeeId === 'number';

        const hasEmailAddress =
            'emailAddress' in object && typeof object.emailAddress === 'string';

        const hasPassword =
            'password' in object && typeof object.password === 'string';

        const hasAccountType =
            'accountType' in object &&
            this.isUserAccountType(object.accountType);

        return (
            hasEmployeeId && hasEmailAddress && hasPassword && hasAccountType
        );
    }

    public static isUserRegisterFormData(
        object: unknown,
    ): object is IUserRegisterFormData {
        if (typeof object !== 'object') {
            return false;
        }

        const hasName = 'name' in object && typeof object.name === 'string';

        const hasEmploymentType =
            'employmentType' in object &&
            EmployeeVerificationService.isEmploymentType(object.employmentType);

        const hasRole =
            'role' in object &&
            EmployeeVerificationService.isEmployeeRole(object.role);

        const hasContactNumber =
            'contactNumber' in object &&
            typeof object.contactNumber === 'number';

        const hasEmailAddress =
            'emailAddress' in object && typeof object.emailAddress === 'string';

        const hasPassword =
            'password' in object && typeof object.password === 'string';

        const hasAccountType =
            'accountType' in object &&
            this.isUserAccountType(object.accountType);

        return (
            hasName &&
            hasEmploymentType &&
            hasRole &&
            hasContactNumber &&
            hasEmailAddress &&
            hasPassword &&
            hasAccountType
        );
    }

    public static isUserAccountType(value: unknown): value is UserAccountType {
        if (typeof value !== 'string') {
            return false;
        }

        return Object.values(UserAccountType).includes(
            value as UserAccountType,
        );
    }

    public static isUserAccountStatus(
        value: unknown,
    ): value is UserAccountStatus {
        if (typeof value !== 'string') {
            return false;
        }

        return Object.values(UserAccountStatus).includes(
            value as UserAccountStatus,
        );
    }
}
