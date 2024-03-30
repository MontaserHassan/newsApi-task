import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../Utils/index.util';


function errorHandler(err: CustomError, req: Request, res: Response, next: NextFunction) {
    return res.status(err.statusCode || 500).send({ path: err.path, statusCode: err.statusCode, message: err.message });
};



export default errorHandler;