
import express from 'express';

import { userController } from '../../Controllers/index.controller';



const authUserRouter = express.Router();

authUserRouter.get('/profile', userController.getProfile);
authUserRouter.get('/home', userController.getHomeInfo);
authUserRouter.post('/logout', userController.logoutUser);



export default authUserRouter;