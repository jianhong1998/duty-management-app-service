import { RequestHandler } from 'express';
import StandardResponse from '../../models/response/standardResponse.model';
import IUserAccount from '../../models/userAccount/userAccount.model';
import IUserRegisterFormData from '../../models/userAccount/userRegisterFormData.model';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import EmployeeService from '../../service/employee/employeeDB.service';
import UserAccountService from '../../service/userAccount/userAccountDB.service';
import PasswordUtil from '../../utils/passwordUtil';
import { UniqueConstraintError } from 'sequelize';

export default class UserAccountController {
    static createUserAccount: RequestHandler<
        undefined,
        StandardResponse<IUserAccount>,
        IUserRegisterFormData,
        undefined
    > = async (req, res) => {
        const creationData = req.body;

        try {
            const { id: employeeId } = await EmployeeService.createEmployee({
                name: creationData.name,
                employmentType: creationData.employmentType,
                role: creationData.role,
                contactNumber: creationData.contactNumber,
            });

            const generatedPassword = PasswordUtil.generateNewPassword(10);
            const hashedPassword =
                PasswordUtil.encryptPassword(generatedPassword);

            const createdUser = await UserAccountService.createUserAccount({
                employeeId,
                emailAddress: creationData.emailAddress,
                password: hashedPassword,
                accountType: creationData.accountType,
            });

            console.log('User account created, password: ', generatedPassword);

            res.status(200).send({
                isSuccess: true,
                data: createdUser,
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
}
