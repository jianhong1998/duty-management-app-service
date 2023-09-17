export interface ITimeSlot {
    id: number;
    startTime: Date;
    endTime: Date;
    isDeleted: boolean;
    isAvailableForMon: boolean;
    isAvailableForTue: boolean;
    isAvailableForWed: boolean;
    isAvailableForThu: boolean;
    isAvailableForFri: boolean;
    isAvailableForSat: boolean;
    isAvailableForSun: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
