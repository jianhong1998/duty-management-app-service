import { Request, Response } from 'express';
import { IEmployeeResponse } from '../../models/employee/employee.model';
import TokenService from '../../service/login/token.service';
import UserAccountService from '../../service/userAccount/userAccountDB.service';
import EmployeeDBModel from '../../models/employee/employeeDBModel.model';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import StandardResponse from '../../models/response/standardResponse.model';
import { UserAccountStatus } from '../../models/userAccount/userAccount.enum';
import { Op } from 'sequelize';

export default class EmployeeController {
    public static async getEmployeeDetails(
        req: Request,
        res: Response<StandardResponse<IEmployeeResponse>>,
    ) {
        try {
            const token = req.headers.authorization.split(' ')[1];

            const { userId } = TokenService.decodeToken(token);

            const { employee } = await UserAccountService.getUserAccount(
                {
                    id: userId,
                    accountStatus: {
                        [Op.or]: [
                            UserAccountStatus.ACTIVE,
                            UserAccountStatus.RESETING_PASSWORD,
                        ],
                    },
                },
                [
                    {
                        model: EmployeeDBModel,
                    },
                ],
            );

            if (typeof employee === 'undefined' || !employee.isActive) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'This account do not have any employee available',
                );
            }

            const employeeResponse: IEmployeeResponse = {
                id: employee.id,
                name: employee.name,
                contactNumber: employee.contactNumber,
                employmentType: employee.employmentType,
                isActive: employee.isActive,
                role: employee.role,
                weeklyAvailabilityTimeSlotIds: {
                    mon: employee.monAvailabilityTimeSlotId,
                    tue: employee.tueAvailabilityTimeSlotId,
                    wed: employee.wedAvailabilityTimeSlotId,
                    thu: employee.thuAvailabilityTimeSlotId,
                    fri: employee.friAvailabilityTimeSlotId,
                    sat: employee.satAvailabilityTimeSlotId,
                    sun: employee.sunAvailabilityTimeSlotId,
                },
            };

            res.status(200).send({
                isSuccess: true,
                data: employeeResponse,
            });
        } catch (error) {
            ErrorHandler.sendErrorResponse(
                res,
                500,
                ErrorHandler.getErrorMessage(error),
            );
        }
    }
}
