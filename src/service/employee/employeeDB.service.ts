import { Sequelize, WhereOptions } from 'sequelize';
import IEmployee, {
    IEmployeeCreation,
    IEmployeeUpdate,
} from '../../models/employee/employee.model';
import EmployeeDBModel from '../../models/employee/employeeDBModel.model';

export default class EmployeeService {
    /**
     * Get all employees
     * @returns IEmployee Array
     */
    public static async getAllEmployees(): Promise<IEmployee[]> {
        const employees = await EmployeeDBModel.findAll({
            order: ['id'],
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
    ): Promise<IEmployee[]> {
        const employees = await EmployeeDBModel.findAll({
            where: condition,
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
    ): Promise<IEmployee> {
        const { name, employmentType, role, contactNumber } = employeeDetail;

        const newEmployee = await EmployeeDBModel.create({
            name,
            employmentType,
            role,
            contactNumber,
        });

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
    ): Promise<IEmployee[]> {
        await EmployeeDBModel.update(data, {
            where: condition,
        });

        const employees = await this.getEmployees(condition);

        for (let employee of employees) {
            const compareEmployee: IEmployee = {
                id: 0,
                name: data.name || employee.name,
                role: data.role || employee.role,
                employmentType: data.employmentType || employee.employmentType,
                isActive: data.isActive || employee.isActive,
                contactNumber: data.contactNumber || employee.contactNumber,
            };

            const result = this.compareEmployee({
                employee1: employee,
                employee2: compareEmployee,
                compareName: true,
                compareContactNumber: true,
                compareEmploymentType: true,
                compareIsActive: true,
                compareRole: true,
            });

            if (!result) {
                throw new Error(`Employee ${employee.id} is not changed!`);
            }
        }

        return employees;
    }

    public static async deleteEmployees(
        condition: WhereOptions<IEmployee>,
    ): Promise<IEmployee[]> {
        let employees = await this.getEmployees(condition);

        for (let employee of employees) {
            if (!employee.isActive) {
                throw new Error(
                    `Employee ${employee.id} is already deleted before.`,
                );
            }
        }

        employees = await this.updateEmployees(condition, {
            isActive: false,
        });

        return employees;
    }

    protected static compareEmployee(options: {
        employee1: IEmployee;
        employee2: IEmployee;
        compareId?: boolean;
        compareName?: boolean;
        compareEmploymentType?: boolean;
        compareRole?: boolean;
        compareContactNumber?: boolean;
        compareIsActive?: boolean;
    }): boolean {
        const {
            employee1,
            employee2,
            compareContactNumber,
            compareEmploymentType,
            compareId,
            compareIsActive,
            compareName,
            compareRole,
        } = options;

        if (compareId && employee1.id !== employee2.id) {
            console.log('id');
            return false;
        }

        if (
            compareContactNumber &&
            employee1.contactNumber !== employee2.contactNumber
        ) {
            console.log('contact number');
            return false;
        }

        if (
            compareEmploymentType &&
            employee1.employmentType !== employee2.employmentType
        ) {
            console.log('employment type');
            return false;
        }

        if (compareIsActive && employee1.isActive !== employee2.isActive) {
            console.log('is active');
            return false;
        }

        if (compareName && employee1.name !== employee2.name) {
            console.log('name');
            return false;
        }

        if (compareRole && employee1.role !== employee2.role) {
            console.log('role');
            return false;
        }

        return true;
    }
}
