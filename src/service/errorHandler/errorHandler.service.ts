import { Response } from 'express';
import StandardResponse from '../../models/response/standardResponse.model';

export default class ErrorHandler {
    static sendErrorResponse(
        response: Response<StandardResponse<any>>,
        statusCode: number,
        message: string,
    ): Response<StandardResponse<any>> {
        return response
            .status(statusCode)
            .send({ errorMessage: message, isSuccess: false });
    }

    static getErrorMessage(error: unknown): string {
        if (error instanceof Error) {
            return error.message;
        }

        return JSON.stringify(error);
    }
}
