import { NextFunction, Request, Response } from 'express';
import StandardResponse from '../../models/response/standardResponse.model';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';

export default class MonthlyDutyScheduleMiddleware {
    public static async verifyYearMonthQuery(
        req: Request<
            any,
            StandardResponse<any>,
            any,
            { year: string; month: string }
        >,
        res: Response<StandardResponse<any>>,
        next: NextFunction,
    ) {
        const { month: monthInString, year: yearInString } = req.query;

        const month = Number.parseInt(monthInString);
        const year = Number.parseInt(yearInString);

        if (
            Number.isNaN(month) ||
            Number.isNaN(year) ||
            month <= 0 ||
            month > 12 ||
            year <= 0
        ) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Year or month in query is invalid',
            );
        }

        next();
    }

    public static async verifyYearMonthBody(
        req: Request<
            any,
            StandardResponse<any>,
            { year: number; month: number },
            any
        >,
        res: Response<StandardResponse<any>>,
        next: NextFunction,
    ) {
        if (
            !('year' in req.body) ||
            !('month' in req.body) ||
            typeof req.body.month !== 'number' ||
            typeof req.body.year !== 'number' ||
            req.body.month <= 0 ||
            req.body.month > 12 ||
            req.body.year <= 0
        ) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Year or month in body is invalid',
            );
        }

        next();
    }
}
