import Joi from 'joi';


const userAuthValidator = {
    registerUser: {
        body: Joi.object().keys({
            fullName: Joi.string().required().trim().min(8).max(30),
            email: Joi.string().required().trim().email().message('Please enter a valid email.'),
            password: Joi.string().required().min(8).max(20).regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$~%?^&*_.\-=+])[A-Za-z\d!?@#$~%^&*_.\-=+]{8,20}$/).message('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (!?@#$~%^&*_.\\-=+).'),
        }),
    },
    loginUser: {
        body: Joi.object().keys({
            email: Joi.string().required().email().message('Please enter a valid email.').trim(),
            password: Joi.string().required(),
        }),
    },
};



export {
    userAuthValidator,
};