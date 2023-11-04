import { IncludeOptions, Order, Transaction, WhereOptions } from 'sequelize';
import IEmployee, {
    IEmployeeCreation,
    IEmployeeUpdate,
} from '../../models/employee/employee.model';
import EmployeeDBModel from '../../models/employee/employeeDBModel.model';
import { IPagination } from '../../models/request/paginationRequest.model';
import { ISorting } from '../../models/request/sortingRequest.model';

export default class EmployeeService {
    /**
     * Get all employees
     * @returns IEmployee Array
     */
    public static async getAllEmployees(options?: {
        pagination?: IPagination;
        sort?: ISorting;
        transaction?: Transaction;
    }): Promise<IEmployee[]> {
        const pageNumber = options?.pagination?.pageNumber;
        const pageSize = options?.pagination?.pageSize;

        const offset =
            typeof pageNumber === 'number'
                ? (pageNumber - 1) * pageSize
                : undefined;

        const order: Order = options?.sort
            ? [[options?.sort.sortBy, options?.sort.sortOrder]]
            : ['id'];

        const employees = await EmployeeDBModel.findAll({
            order,
            offset,
            limit: pageSize,
            transaction: options?.transaction,
        });

        return employees.map((employee) => employee.dataValues);
    }

    /**
     * Get specifics employees
     * @param condition an object contains where clause condition
     * @returns IEmployee Array
     */
    public static async getEmployees(
        condition: WhereOptions<IEmployee>,
        options?: {
            include?: IncludeOptions[];
            pagination?: IPagination;
            sort?: ISorting;
            transaction?: Transaction;
        },
    ): Promise<IEmployee[]> {
        const pageNumber = options?.pagination?.pageNumber;
        const pageSize = options?.pagination?.pageSize;

        const offset =
            typeof pageNumber === 'number'
                ? (pageNumber - 1) * pageSize
                : undefined;
        const order: Order = options?.sort
            ? [[options?.sort.sortBy, options?.sort.sortOrder]]
            : ['id'];

        const employees = await EmployeeDBModel.findAll({
            where: condition,
            include: options?.include,
            order,
            offset,
            limit: pageSize,
            transaction: options?.transaction,
        });

        return employees.map((employee) => employee.dataValues);
    }

    /**
     * Create employee
     * @param employeeDetail Employee creation params
     * @returns IEmployee
     */
    public static async createEmployee(
        employeeDetail: IEmployeeCreation,
        transaction?: Transaction,
    ): Promise<IEmployee> {
        const { name, employmentType, role, contactNumber } = employeeDetail;

        const newEmployee = await EmployeeDBModel.create(
            {
                name,
                employmentType,
                role,
                contactNumber,
            },
            {
                transaction,
            },
        );

        return newEmployee.dataValues;
    }

    /**
     * Update few employees based on the condition
     * @param condition an object contains where clause condition
     * @param data IEmployeeUpdate object, contains all params to be updated
     * @returns Array of Updated IEmployee
     */
    public static async updateEmployees(
        condition: WhereOptions<IEmployee>,
        data: IEmployeeUpdate,
        transaction?: Transaction,
    ): Promise<IEmployee[]> {
        await EmployeeDBModel.update(data, {
            where: condition,
            transaction,
        });

        const employees = await this.getEmployees(condition, {
            transaction,
        });

        return employees;
    }

    public static async deleteEmployees(
        condition: WhereOptions<IEmployee>,
        transaction?: Transaction,
    ): Promise<IEmployee[]> {
        let employees = await this.getEmployees(condition);

        for (const employee of employees) {
            if (!employee.isActive) {
                throw new Error(
                    `Employee ${employee.id} is already deleted before.`,
                );
            }
        }

        employees = await this.updateEmployees(
            condition,
            {
                isActive: false,
            },
            transaction,
        );

        return employees;
    }

    public static async countEmployees(options?: {
        condition?: WhereOptions<EmployeeDBModel>;
        transaction?: Transaction;
    }): Promise<number> {
        const numberOfEmplyees = await EmployeeDBModel.count({
            where: options?.condition,
            transaction: options?.transaction,
        });

        return numberOfEmplyees;
    }
}
