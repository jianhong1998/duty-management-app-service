import IEmployee, {
    IEmployeeResponse,
} from '../../models/employee/employee.model';

export default class EmployeeConvertorService {
    static convertToIEmployeeResponse(employee: IEmployee): IEmployeeResponse {
        const {
            id,
            name,
            employmentType,
            role,
            contactNumber,
            isActive,
            monAvailabilityTimeSlotId,
            tueAvailabilityTimeSlotId,
            wedAvailabilityTimeSlotId,
            thuAvailabilityTimeSlotId,
            friAvailabilityTimeSlotId,
            satAvailabilityTimeSlotId,
            sunAvailabilityTimeSlotId,
            createdAt,
            updatedAt,
        } = employee;

        return {
            id,
            name,
            employmentType,
            role,
            contactNumber,
            isActive,
            weeklyAvailabilityTimeSlotIds: {
                mon: monAvailabilityTimeSlotId,
                tue: tueAvailabilityTimeSlotId,
                wed: wedAvailabilityTimeSlotId,
                thu: thuAvailabilityTimeSlotId,
                fri: friAvailabilityTimeSlotId,
                sat: satAvailabilityTimeSlotId,
                sun: sunAvailabilityTimeSlotId,
            },
            createdAt,
            updatedAt,
        };
    }
}
