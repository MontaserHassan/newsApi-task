import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

import ValidationSchema from '../Types/joiSchema.type';



const validation = (schema: ValidationSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errorValidation: Joi.ValidationError[] = [];
        ['params', 'query', 'body'].forEach((key) => {
            if (schema[key]) {
                const validation: any = schema[key].validate(req[key], { abortEarly: false });
                if (validation.error) {
                    errorValidation.push(validation.error);
                };
            };
        });
        if (errorValidation.length > 0) {
            const errorMessages = errorValidation.map((error) => error.details[0].message);
            throw { status: 422, message: errorMessages };
        } else {
            next();
        };
    } catch (error) {
        res.status(error.status || 500).send({ error: error.message });
    }
};



export default validation;