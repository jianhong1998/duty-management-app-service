import { ISimplifiedTimeSlotResponse } from './timeSlot.model';

export interface IEmployeeDefaultWeeklySimplifiedTimeSlots {
    mon: ISimplifiedTimeSlotResponse | null;
    tue: ISimplifiedTimeSlotResponse | null;
    wed: ISimplifiedTimeSlotResponse | null;
    thu: ISimplifiedTimeSlotResponse | null;
    fri: ISimplifiedTimeSlotResponse | null;
    sat: ISimplifiedTimeSlotResponse | null;
    sun: ISimplifiedTimeSlotResponse | null;
}

export interface IUpdateEmployeeDefaultWeeklyTimeSlotsRequest {
    mon: number | null;
    tue: number | null;
    wed: number | null;
    thu: number | null;
    fri: number | null;
    sat: number | null;
    sun: number | null;
}
