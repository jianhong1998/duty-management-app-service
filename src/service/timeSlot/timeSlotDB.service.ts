import { Transaction, WhereOptions } from 'sequelize';
import { ITimeSlot } from '../../models/timeSlot/timeSlot.model';
import TimeSlotDBModel from '../../models/timeSlot/timeSlotDBModel.model';

export default class TimeSlotService {
    static async getTimeSlots(
        condition: WhereOptions<TimeSlotDBModel>,
        options?: {
            transaction?: Transaction;
        },
    ): Promise<ITimeSlot[]> {
        const timeSlot = await TimeSlotDBModel.findAll({
            where: condition,
            transaction: options?.transaction,
        });

        return timeSlot;
    }
}
