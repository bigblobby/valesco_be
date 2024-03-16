import { AnyZodObject } from 'zod';
import { NextFunction, Request, Response } from 'express';

export const validate = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        } catch (error) {
            return res.status(422).json({ error: error });
        }
    };

}
