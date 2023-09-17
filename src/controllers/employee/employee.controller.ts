import { Request, Response } from 'express';
import StandardResponse from '../../models/response/standardResponse.model';
import IEmployee, {
    IEmployeeCreation,
    IEmployeeUpdate,
} from '../../models/employee/employee.model';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import EmployeeService from '../../service/employee/employeeDB.service';
import { WhereOptions } from 'sequelize';

export default class EmployeeController {
    public static async getAllEmployeesHandler(
        req: Request<undefined, any, undefined, { isActive?: string }>,
        res: Response<StandardResponse<IEmployee[]>>,
    ) {
        const { isActive: isActiveString } = req.query;

        let isActive: boolean | undefined;

        switch (isActiveString) {
            case 'true':
                isActive = true;
                break;
            case 'false':
                isActive = false;
                break;
            default:
                isActive = undefined;
                break;
        }

        try {
            if (typeof isActive !== 'undefined') {
                const employees = await EmployeeService.getEmployees({
                    isActive,
                });

                return res.status(200).send({
                    data: employees,
                    isSuccess: true,
                });
            }

            const employees = await EmployeeService.getAllEmployees();

            return res.status(200).send({
                data: employees,
                isSuccess: true,
            });
        } catch (error) {
            const errorMessage = ErrorHandler.getErrorMessage(error);
            return ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    }

    public static async getEmployeeHandler(
        req: Request<{ employeeId: string }>,
        res: Response<StandardResponse<IEmployee>>,
    ) {
        try {
            const employeeId = Number.parseInt(req.params.employeeId);

            const employees = await EmployeeService.getEmployees({
                id: employeeId,
            });

            if (employees.length === 0) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'Employee is not found',
                );
            }

            return res.status(200).send({
                data: employees[0],
                isSuccess: true,
            });
        } catch (error) {
            const errorMessage = ErrorHandler.getErrorMessage(error);
            return ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    }

    public static async createEmployeeHandler(
        req: Request<undefined, any, IEmployeeCreation>,
        res: Response<StandardResponse<IEmployee>>,
    ) {
        try {
            const employeeCreationRequestBody = req.body;

            const newEmployee = await EmployeeService.createEmployee(
                employeeCreationRequestBody,
            );

            // if (!newEmployee) {
            //     throw new Error(
            //         `Oops! Something wrong! NewEmployee is ${newEmployee}.`,
            //     );
            // }

            return res.status(200).send({
                data: newEmployee,
                isSuccess: true,
            });
        } catch (error) {
            const errorMessage = ErrorHandler.getErrorMessage(error);
            return ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    }

    public static async updateEmployeesHandler(
        req: Request<{ employeeId: string }, any, IEmployeeUpdate>,
        res: Response<StandardResponse<IEmployee[]>>,
    ) {
        const employeeId = Number.parseInt(req.params.employeeId);

        const condition: WhereOptions<IEmployee> = {
            id: employeeId,
        };

        try {
            const employees = await EmployeeService.updateEmployees(
                condition,
                req.body,
            );

            if (employees.length === 0) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'Employee not found',
                );
            }

            return res.status(200).send({
                data: employees,
                isSuccess: true,
            });
        } catch (error) {
            const errorMessage = ErrorHandler.getErrorMessage(error);
            return ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    }

    public static async deleteEmployeeHandler(
        req: Request<{ employeeId: string }>,
        res: Response<StandardResponse<IEmployee[]>>,
    ) {
        const employeeId = Number.parseInt(req.params.employeeId);

        try {
            const employees = await EmployeeService.deleteEmployees({
                id: employeeId,
            });

            if (employees.length === 0) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'Employee not found',
                );
            }

            return res.status(200).send({
                data: employees,
                isSuccess: true,
            });
        } catch (error) {
            const errorMessage = ErrorHandler.getErrorMessage(error);

            return ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    }
}
