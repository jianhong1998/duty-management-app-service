import { RequestHandler } from 'express';
import StandardResponse from '../../models/response/standardResponse.model';
import IUserAccount from '../../models/userAccount/userAccount.model';
import IUserRegisterFormData from '../../models/userAccount/userRegisterFormData.model';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import EmployeeService from '../../service/employee/employeeDB.service';
import UserAccountService from '../../service/userAccount/userAccountDB.service';
import PasswordUtil from '../../utils/passwordUtil';

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

            const createdUser = await UserAccountService.createUserAccount({
                employeeId,
                emailAddress: creationData.emailAddress,
                password: PasswordUtil.encryptPassword(creationData.password),
                accountType: creationData.accountType,
            });

            res.status(200).send({
                isSuccess: true,
                data: createdUser,
            });
        } catch (error) {
            const errorMessage = ErrorHandler.getErrorMessage(error);
            ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    };
}
