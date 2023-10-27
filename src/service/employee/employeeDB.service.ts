import { IncludeOptions, Transaction, WhereOptions } from 'sequelize';
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
        options?: {
            include?: IncludeOptions[];
        },
    ): Promise<IEmployee[]> {
        const employees = await EmployeeDBModel.findAll({
            where: condition,
            include: options?.include,
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

        const employees = await this.getEmployees(condition);

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

    // protected static compareEmployee(options: {
    //     employee1: IEmployee;
    //     employee2: IEmployee;
    //     compareId?: boolean;
    //     compareName?: boolean;
    //     compareEmploymentType?: boolean;
    //     compareRole?: boolean;
    //     compareContactNumber?: boolean;
    //     compareIsActive?: boolean;
    //     compareAvailabilityTimeSlotIds?: boolean;
    // }): boolean {
    //     const {
    //         employee1,
    //         employee2,
    //         compareContactNumber,
    //         compareEmploymentType,
    //         compareId,
    //         compareIsActive,
    //         compareName,
    //         compareRole,
    //         compareAvailabilityTimeSlotIds,
    //     } = options;

    //     if (compareId && employee1.id !== employee2.id) {
    //         return false;
    //     }

    //     if (
    //         compareContactNumber &&
    //         employee1.contactNumber !== employee2.contactNumber
    //     ) {
    //         return false;
    //     }

    //     if (
    //         compareEmploymentType &&
    //         employee1.employmentType !== employee2.employmentType
    //     ) {
    //         return false;
    //     }

    //     if (compareIsActive && employee1.isActive !== employee2.isActive) {
    //         return false;
    //     }

    //     if (compareName && employee1.name !== employee2.name) {
    //         return false;
    //     }

    //     if (compareRole && employee1.role !== employee2.role) {
    //         return false;
    //     }

    //     if (compareAvailabilityTimeSlotIds) {
    //         if (
    //             employee1.monAvailabilityTimeSlotId !==
    //             employee2.monAvailabilityTimeSlotId
    //         ) {
    //             return false;
    //         }

    //         if (
    //             employee1.tueAvailabilityTimeSlotId !==
    //             employee2.tueAvailabilityTimeSlotId
    //         ) {
    //             return false;
    //         }

    //         if (
    //             employee1.wedAvailabilityTimeSlotId !==
    //             employee2.wedAvailabilityTimeSlotId
    //         ) {
    //             return false;
    //         }

    //         if (
    //             employee1.thuAvailabilityTimeSlotId !==
    //             employee2.thuAvailabilityTimeSlotId
    //         ) {
    //             return false;
    //         }

    //         if (
    //             employee1.friAvailabilityTimeSlotId !==
    //             employee2.friAvailabilityTimeSlotId
    //         ) {
    //             return false;
    //         }

    //         if (
    //             employee1.satAvailabilityTimeSlotId !==
    //             employee2.satAvailabilityTimeSlotId
    //         ) {
    //             return false;
    //         }

    //         if (
    //             employee1.sunAvailabilityTimeSlotId !==
    //             employee2.sunAvailabilityTimeSlotId
    //         ) {
    //             return false;
    //         }
    //     }

    //     return true;
    // }
}
