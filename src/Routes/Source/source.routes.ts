import express from 'express';

import getUser from '../../Middlewares/auth.middleware';
import sourcesRouter from './newsApi.routes';
import authSourcesRouter from './authSource.routes';



const user = express.Router();

user.use('/newsSources', sourcesRouter);
user.use(getUser());
user.use('/', authSourcesRouter);



export default user;