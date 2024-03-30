import Joi from "joi";



type ValidationSchema = {
    params?: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
    body?: Joi.ObjectSchema;
};



export default ValidationSchema;