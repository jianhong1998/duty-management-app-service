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
import db from '../../sequelize/sequelize';
import EmailUtil from '../../utils/email/emailUtil';
import EmailTemplateType from '../../utils/email/emailTemplateType.enum';
import EmailValidationUtil from '../../utils/email/emailVerificationUtil';

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

        const transaction = await db.getInstance().transaction();

        try {
            if (
                await UserAccountService.isEmailAddressRegistered(
                    creationData.emailAddress,
                )
            ) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    409,
                    'Email address is already being registered.',
                );
            }

            const { id: createdEmployeeId, name } =
                await EmployeeService.createEmployee(
                    {
                        name: creationData.name,
                        employmentType: creationData.employmentType,
                        role: creationData.role,
                        contactNumber: creationData.contactNumber,
                    },
                    transaction,
                );

            const generatedPassword = PasswordUtil.generateNewPassword(10);
            const hashedPassword =
                PasswordUtil.encryptPassword(generatedPassword);

            const createdUserAccount =
                await UserAccountService.createUserAccount(
                    {
                        employeeId: createdEmployeeId,
                        emailAddress: creationData.emailAddress,
                        password: hashedPassword,
                        accountType: creationData.accountType,
                    },
                    transaction,
                );

            const emailSendingResult = await EmailUtil.sendEmail(
                createdUserAccount.emailAddress,
                EmailTemplateType.CREATE_ACCOUNT,
                {
                    name,
                    password: generatedPassword,
                },
            );

            console.log(emailSendingResult);

            await transaction.commit();

            res.status(200).send({
                isSuccess: true,
                data: `Successfully created employee and user account for '${name}'.`,
            });
        } catch (error) {
            await transaction.rollback();

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

        const transaction = await db.getInstance().transaction();

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
                transaction,
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
                    transaction,
                );

            if (updatedEmployees.length !== 1) {
                throw new Error('Employee is not updated');
            }

            if (updatedUserAccounts.length !== 1) {
                throw new Error('User account is not updated');
            }

            const updatedEmployee = updatedEmployees[0];
            const updatedUserAccount = updatedUserAccounts[0];

            await transaction.commit();

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
            await transaction.rollback();

            const errorMessage = ErrorHandler.getErrorMessage(error);

            return ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    };

    static forgetPasswordHandler: RequestHandler<
        undefined,
        StandardResponse<{ message: string }>,
        { email: string }
    > = async (req, res) => {
        const email = req.body.email.trim();

        const isEmailValid = EmailValidationUtil.isEmailValid(email);

        if (!isEmailValid) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Invalid email address',
            );
        }

        const transaction = await db.getInstance().transaction();

        try {
            const isEmailRegistered =
                await UserAccountService.isEmailAddressRegistered(email);

            if (!isEmailRegistered) {
                await transaction.rollback();

                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'Email is not registered',
                );
            }

            const userAccount = await UserAccountService.getUserAccount(
                {
                    emailAddress: email,
                },
                [
                    {
                        model: EmployeeDBModel,
                    },
                ],
            );

            const generatedPassword = PasswordUtil.generateNewPassword(10);
            const hashedPassword =
                PasswordUtil.encryptPassword(generatedPassword);

            await UserAccountService.updateUserAccounts(
                {
                    emailAddress: email,
                },
                {
                    password: hashedPassword,
                },
                transaction,
            );

            const emailSendingResult = await EmailUtil.sendEmail(
                email,
                EmailTemplateType.FORGET_PASSWORD,
                {
                    name: userAccount.employee.name,
                    password: generatedPassword,
                },
            );

            console.log(emailSendingResult);

            await transaction.commit();

            res.status(200).send({
                isSuccess: true,
                data: {
                    message: 'Email sent.',
                },
            });
        } catch (error) {
            await transaction.rollback();

            ErrorHandler.sendErrorResponse(
                res,
                500,
                ErrorHandler.getErrorMessage(error),
            );
        }
    };
}
