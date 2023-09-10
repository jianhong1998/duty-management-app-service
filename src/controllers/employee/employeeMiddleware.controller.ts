import { Request, Response, NextFunction } from 'express';
import StandardResponse from '../../models/response/standardResponse.model';
import IEmployee, {
    IEmployeeCreation,
    IEmployeeUpdate,
} from '../../models/employee/employee.model';
import NumberChecker from '../../utils/numberChecker';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import EmployeeVerificationService from '../../service/employee/employeeVerification.service';
import EmploymentType from '../../models/employee/employmentType.enum';

export default class EmployeeMiddleware {
    public static async verifyEmployeeId(
        req: Request<{ employeeId: string }>,
        res: Response<StandardResponse<IEmployee>>,
        next: NextFunction,
    ) {
        const { employeeId: employeeIdInString } = req.params;

        if (!NumberChecker.isStringValidNumber(employeeIdInString)) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Employee ID must be integer and greater than 0',
            );
        }

        return next();
    }

    public static async verifyRequestBody(
        req: Request<any, any, IEmployeeCreation | IEmployeeUpdate>,
        res: Response<StandardResponse<IEmployee>>,
        next: NextFunction,
    ) {
        if (req.method === 'GET' || req.method === 'DELETE') {
            return next();
        }

        const { body } = req;

        if (req.method === 'POST') {
            if (
                !EmployeeVerificationService.isEmploymentType(
                    body.employmentType,
                )
            ) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    400,
                    'Invalid employmentType',
                );
            }

            if (!EmployeeVerificationService.isEmployeeRole(body.role)) {
                return ErrorHandler.sendErrorResponse(res, 400, 'Invalid role');
            }

            if (!EmployeeVerificationService.isEmployeeCreation(body)) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    400,
                    'Invalid input. Input must contain name, employmentType, role and contactNumber with valid type.',
                );
            }
        }

        if (req.method === 'PUT') {
            if (
                'employmentType' in body &&
                !EmployeeVerificationService.isEmploymentType(
                    body.employmentType,
                )
            ) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    400,
                    'Invalid employmentType',
                );
            }

            if (
                'role' in body &&
                !EmployeeVerificationService.isEmployeeRole(body.role)
            ) {
                return ErrorHandler.sendErrorResponse(res, 400, 'Invalid role');
            }

            if (!EmployeeVerificationService.isIEmployeeUpdate(body)) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    400,
                    'Invalid input. Input must contain at least name, employmentType, role or contactNumber with valid type.',
                );
            }
        }

        return next();
    }
}
