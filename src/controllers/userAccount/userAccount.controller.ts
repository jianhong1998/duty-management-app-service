import { RequestHandler } from 'express';
import StandardResponse from '../../models/response/standardResponse.model';
import IUserRegisterFormData from '../../models/userAccount/userRegisterFormData.model';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import EmployeeService from '../../service/employee/employeeDB.service';
import UserAccountService from '../../service/userAccount/userAccountDB.service';
import PasswordUtil from '../../utils/passwordUtil';
import { UniqueConstraintError } from 'sequelize';
import {
    IGetUserAccountResponse,
    IUpdateUserAccountResponse,
} from '../../models/response/userAccount/userAccountResponse.model';
import IUpdateUserFormData from '../../models/userAccount/updateUserFormData.model';
import NumberChecker from '../../utils/numberChecker';
import EmployeeDBModel from '../../models/employee/employeeDBModel.model';

export default class UserAccountController {
    static getUserAccountByEmployeeId: RequestHandler<
        { employeeId: string },
        StandardResponse<IGetUserAccountResponse>,
        undefined
    > = async (req, res) => {
        const { employeeId: employeeIdInString } = req.params;

        if (!NumberChecker.isStringValidNumber(employeeIdInString)) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Invalid employee ID',
            );
        }

        const employeeId = Number.parseInt(employeeIdInString);

        try {
            const userAccount = await UserAccountService.getUserAccount(
                {
                    employeeId,
                },
                [
                    {
                        model: EmployeeDBModel,
                    },
                ],
            );

            if (
                userAccount === null ||
                (userAccount !== null &&
                    typeof userAccount.employee === 'undefined')
            ) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'Employee is not found',
                );
            }

            res.status(200).send({
                isSuccess: true,
                data: {
                    name: userAccount.employee.name,
                    contactNumber: userAccount.employee.contactNumber,
                    emailAddress: userAccount.emailAddress,
                    accountType: userAccount.accountType,
                    employmentType: userAccount.employee.employmentType,
                    role: userAccount.employee.role,
                },
            });
        } catch (error) {
            ErrorHandler.sendErrorResponse(
                res,
                500,
                ErrorHandler.getErrorMessage(error),
            );
        }
    };

    static createUserAccount: RequestHandler<
        undefined,
        StandardResponse<string>,
        IUserRegisterFormData,
        undefined
    > = async (req, res) => {
        const creationData = req.body;

        try {
            const { id: createdEmployeeId, name } =
                await EmployeeService.createEmployee({
                    name: creationData.name,
                    employmentType: creationData.employmentType,
                    role: creationData.role,
                    contactNumber: creationData.contactNumber,
                });

            const generatedPassword = PasswordUtil.generateNewPassword(10);
            const hashedPassword =
                PasswordUtil.encryptPassword(generatedPassword);

            await UserAccountService.createUserAccount({
                employeeId: createdEmployeeId,
                emailAddress: creationData.emailAddress,
                password: hashedPassword,
                accountType: creationData.accountType,
            });

            console.log('User account created, password: ', generatedPassword);

            res.status(200).send({
                isSuccess: true,
                data: `Successfully created employee and user account for '${name}'.`,
            });
        } catch (error) {
            if (error instanceof UniqueConstraintError) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    409,
                    error.errors[0].message,
                );
            }

            const errorMessage = ErrorHandler.getErrorMessage(error);
            ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    };

    static updateUserAccount: RequestHandler<
        { employeeId: string },
        StandardResponse<IUpdateUserAccountResponse>,
        IUpdateUserFormData,
        undefined
    > = async (req, res) => {
        const { employeeId: employeeIdInString } = req.params;

        if (!NumberChecker.isStringValidNumber(employeeIdInString)) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Invalid employee ID',
            );
        }

        const employeeId = Number.parseInt(employeeIdInString);

        try {
            const employees = await EmployeeService.getEmployees({
                id: employeeId,
            });

            if (employees.length === 0) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'Employee not found',
                );
            }

            const account = await UserAccountService.getUserAccount({
                employeeId,
            });

            if (account === null) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'User account not found',
                );
            }

            const {
                id: userAccountId,
                accountType: currentAccountType,
                emailAddress: currentEmailAddress,
            } = account;

            const {
                name: curerntName,
                contactNumber: currentContactNumber,
                employmentType: currentEmploymentType,
                role: currentRole,
            } = employees[0];

            const {
                name,
                contactNumber,
                emailAddress,
                role,
                accountType,
                employmentType,
            } = req.body;

            if (
                name === curerntName &&
                contactNumber === currentContactNumber &&
                emailAddress === currentEmailAddress &&
                role === currentRole &&
                accountType === currentAccountType &&
                employmentType === currentEmploymentType
            ) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    304,
                    'Data received no change with current data',
                );
            }

            const updatedEmployees = await EmployeeService.updateEmployees(
                {
                    id: employeeId,
                },
                {
                    name,
                    contactNumber,
                    employmentType,
                    role,
                },
            );

            const updatedUserAccounts =
                await UserAccountService.updateUserAccounts(
                    {
                        id: userAccountId,
                    },
                    {
                        emailAddress,
                        accountType,
                    },
                );

            if (updatedEmployees.length !== 1) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    500,
                    'Employee is not updated',
                );
            }

            if (updatedUserAccounts.length !== 1) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    500,
                    'User account is not updated',
                );
            }

            const updatedEmployee = updatedEmployees[0];
            const updatedUserAccount = updatedUserAccounts[0];

            res.status(200).send({
                isSuccess: true,
                data: {
                    name: updatedEmployee.name,
                    contactNumber: updatedEmployee.contactNumber,
                    emailAddress: updatedUserAccount.emailAddress,
                    accountType: updatedUserAccount.accountType,
                    employmentType: updatedEmployee.employmentType,
                    role: updatedEmployee.role,
                },
            });
        } catch (error) {
            const errorMessage = ErrorHandler.getErrorMessage(error);

            return ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    };
}
