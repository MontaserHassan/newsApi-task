import express from 'express';

import getUser from '../../Middlewares/auth.middleware';
import authRouter from './auth.routes';
import authUserRouter from './authUser.routes';



const user = express.Router();

user.use('/auth', authRouter);
user.use(getUser());
user.use('/', authUserRouter);



export default user;