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

export interface ITimeSlotResponse extends Pick<ITimeSlot, 'id' | 'isDeleted'> {
    startTime: string;
    endTime: string;
    isAvailableFor: {
        mon: boolean;
        tue: boolean;
        wed: boolean;
        thu: boolean;
        fri: boolean;
        sat: boolean;
        sun: boolean;
    };
}

export type ISimplifiedTimeSlotResponse = Pick<
    ITimeSlotResponse,
    'id' | 'startTime' | 'endTime'
>;
