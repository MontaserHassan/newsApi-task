
import express from 'express';

import { userController } from '../../Controllers/index.controller';
import validation from '../../Validations/validationHandler.validation';
import { userAuthValidator } from '../../Validations/user.validation';



const authRouter = express.Router();


authRouter.post('/register', validation(userAuthValidator.registerUser), userController.registerUser);
authRouter.post('/login', validation(userAuthValidator.loginUser), userController.loginUser);



export default authRouter;