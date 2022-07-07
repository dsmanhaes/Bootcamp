import { NextFunction, Request, Response } from "express";

import { AppError } from "../errors/AppError";

export function appErrorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: 'error',
            error: error.message
        });
    }
    if (error instanceof Error) {
        return response.status(500).json({
            status: 'error',
            error: error.message
        });
    }
    return response.status(500).json({
        status: 'error',
        error: "Internal serer error."
    });
}
