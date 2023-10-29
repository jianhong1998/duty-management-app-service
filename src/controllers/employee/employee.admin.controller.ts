import { Request, Response } from 'express';
import StandardResponse from '../../models/response/standardResponse.model';
import IEmployee, {
    IEmployeeCreation,
    IEmployeeResponse,
    IEmployeeUpdate,
} from '../../models/employee/employee.model';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';
import EmployeeService from '../../service/employee/employeeDB.service';
import { WhereOptions } from 'sequelize';
import EmployeeConvertorService from '../../service/employee/employeeConvertor.service';
import db from '../../sequelize/sequelize';
import UserAccountService from '../../service/userAccount/userAccountDB.service';

export default class AdminEmployeeController {
    public static async getAllEmployeesHandler(
        req: Request<undefined, any, undefined, { isActive?: string }>,
        res: Response<StandardResponse<IEmployeeResponse[]>>,
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
            case undefined:
                isActive = undefined;
                break;
            default:
                return ErrorHandler.sendErrorResponse(
                    res,
                    400,
                    "Value of isActive is invalid. Must be either 'true' or 'false'.",
                );
        }

        try {
            if (typeof isActive !== 'undefined') {
                const employees = await EmployeeService.getEmployees({
                    isActive,
                });

                const employeeResponses: IEmployeeResponse[] = employees.map(
                    (employee) => {
                        return EmployeeConvertorService.convertToIEmployeeResponse(
                            employee,
                        );
                    },
                );

                return res.status(200).send({
                    data: employeeResponses,
                    isSuccess: true,
                });
            }

            const employees = await EmployeeService.getAllEmployees();

            return res.status(200).send({
                data: employees.map((employee) =>
                    EmployeeConvertorService.convertToIEmployeeResponse(
                        employee,
                    ),
                ),
                isSuccess: true,
            });
        } catch (error) {
            const errorMessage = ErrorHandler.getErrorMessage(error);
            return ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    }

    public static async getEmployeeHandler(
        req: Request<{ employeeId: string }>,
        res: Response<StandardResponse<IEmployeeResponse>>,
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
                data: EmployeeConvertorService.convertToIEmployeeResponse(
                    employees[0],
                ),
                isSuccess: true,
            });
        } catch (error) {
            const errorMessage = ErrorHandler.getErrorMessage(error);
            return ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    }

    public static async createEmployeeHandler(
        req: Request<undefined, any, IEmployeeCreation>,
        res: Response<StandardResponse<IEmployeeResponse>>,
    ) {
        try {
            const employeeCreationRequestBody = req.body;

            const newEmployee = await EmployeeService.createEmployee(
                employeeCreationRequestBody,
            );

            return res.status(200).send({
                data: EmployeeConvertorService.convertToIEmployeeResponse(
                    newEmployee,
                ),
                isSuccess: true,
            });
        } catch (error) {
            const errorMessage = ErrorHandler.getErrorMessage(error);
            return ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    }

    public static async updateEmployeesHandler(
        req: Request<{ employeeId: string }, any, IEmployeeUpdate>,
        res: Response<StandardResponse<IEmployeeResponse[]>>,
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
                data: employees.map((employee) =>
                    EmployeeConvertorService.convertToIEmployeeResponse(
                        employee,
                    ),
                ),
                isSuccess: true,
            });
        } catch (error) {
            const errorMessage = ErrorHandler.getErrorMessage(error);
            return ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    }

    public static async deleteEmployeeHandler(
        req: Request<{ employeeId: string }>,
        res: Response<StandardResponse<IEmployeeResponse[]>>,
    ) {
        const employeeId = Number.parseInt(req.params.employeeId);

        const transaction = await db.getInstance().transaction();

        try {
            const employees = await EmployeeService.deleteEmployees(
                {
                    id: employeeId,
                },
                transaction,
            );

            if (employees.length === 0) {
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'Employee not found',
                );
            }

            for (const employee of employees) {
                if (employee) {
                    const id = employee.id;

                    await UserAccountService.deleteUserAccounts(
                        {
                            id,
                        },
                        transaction,
                    );
                }
            }

            await transaction.commit();

            return res.status(200).send({
                data: employees.map((employee) =>
                    EmployeeConvertorService.convertToIEmployeeResponse(
                        employee,
                    ),
                ),
                isSuccess: true,
            });
        } catch (error) {
            await transaction.rollback();
            const errorMessage = ErrorHandler.getErrorMessage(error);

            return ErrorHandler.sendErrorResponse(res, 500, errorMessage);
        }
    }

    public static async reactivateEmployeeHandler(
        req: Request<{ employeeId: string }>,
        res: Response<StandardResponse<IEmployeeResponse>>,
    ) {
        const employeeId = Number.parseInt(req.params.employeeId);

        const transaction = await db.getInstance().transaction();

        try {
            const employees = await EmployeeService.getEmployees({
                id: employeeId,
            });

            if (employees.length !== 1) {
                await transaction.rollback();
                return ErrorHandler.sendErrorResponse(
                    res,
                    404,
                    'Employee not found',
                );
            }

            const [employee] = employees;

            if (employee.isActive) {
                await transaction.rollback();
                return ErrorHandler.sendErrorResponse(
                    res,
                    409,
                    'Employee is already active',
                );
            }

            const updatedEmployees = await EmployeeService.updateEmployees(
                { id: employeeId },
                { isActive: true },
                transaction,
            );

            if (updatedEmployees.length !== 1) {
                throw new Error(
                    'Employee is more than one fulfilled the employeeId. Something went wrong. Update rollbacked.',
                );
            }

            for (const employee of updatedEmployees) {
                await UserAccountService.reactivateUserAccunts({
                    employeeId: employee.id,
                });
            }

            await transaction.commit();

            res.status(200).send({
                isSuccess: true,
                data: EmployeeConvertorService.convertToIEmployeeResponse(
                    (
                        await EmployeeService.getEmployees({
                            id: employeeId,
                        })
                    )[0],
                ),
            });
        } catch (error) {
            await transaction.rollback();

            ErrorHandler.sendErrorResponse(
                res,
                500,
                ErrorHandler.getErrorMessage(error),
            );
        }
    }
}
