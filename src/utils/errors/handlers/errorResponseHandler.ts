import { Request, Response, NextFunction } from 'express';

function errorResponseHandler(err, req: Request, res: Response, next: NextFunction) {
    const name = err.name || 'UnhandledException';
    const status = err.statusCode || 500;
    const message = err.message || 'Something is broken';

    res
        .status(status)
        .json({
            error: name,
            statusCode: status,
            message: message
        });
}

export default errorResponseHandler;