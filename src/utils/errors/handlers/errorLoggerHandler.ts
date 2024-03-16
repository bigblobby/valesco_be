import logger from '@/utils/logger';
import { NextFunction, Request, Response } from 'express';

function errorLoggerHandler(err, req: Request, res: Response, next: NextFunction) {
    logger.error(err.stack);
    next(err);
}

export default errorLoggerHandler;