import { RequestHandler } from 'express';
import StandardResponse from '../../models/response/standardResponse.model';
import { IPaginationRequestQuery } from '../../models/request/paginationRequest.model';
import ErrorHandler from '../../service/errorHandler/errorHandler.service';

export default class PaginationMiddleware {
    public static verifyPaginationQuery: RequestHandler<
        any,
        StandardResponse<any>,
        undefined,
        IPaginationRequestQuery
    > = (req, res, next) => {
        const pageNumberInString = req.query.pageNumber;
        const pageSizeInString = req.query.pageSize;

        if (
            typeof pageNumberInString === 'undefined' ||
            typeof pageSizeInString === 'undefined'
        ) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Page number and page size are required',
            );
        }

        const pageNumber = Number.parseInt(pageNumberInString);
        const pageSize = Number.parseInt(pageSizeInString);

        if (Number.isNaN(pageNumber) || Number.isNaN(pageSize)) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Invalid page number or page size',
            );
        }

        if (pageNumber <= 0) {
            return ErrorHandler.sendErrorResponse(
                res,
                416,
                'Page number out of bounds',
            );
        }

        if (pageSize <= 0) {
            return ErrorHandler.sendErrorResponse(
                res,
                400,
                'Invalid page size',
            );
        }

        next();
    };
}
