import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IMenu } from '../models/Menu';
import Logging from '../library/Logging';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            Logging.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    menu: {
        update: Joi.object<IMenu>({
            name: Joi.string(),
            active: Joi.string(),
            color: Joi.string(),
            room: Joi.string()
        })
    }
};