import { RequestHandler } from 'express';
import MonthlyDutyScheduleService from '../../service/monthlyDutySchedule/monthlyDutyScheduleDB.service';
import MonthInfo from '../../models/monthlyDutySchedule/monthInfo.model';

export default class AdminMonthlyDutyScheduleController {
    static generateNewMonthlyDutySchedule: RequestHandler<
        undefined,
        any,
        MonthInfo
    > = async (req, res) => {
        const { month, year } = req.body;

        const result =
            await MonthlyDutyScheduleService.createMonthlyDutySchedule({
                month,
                year,
            });

        res.status(200).send(result);
    };
}
