
import express, { Request, Response } from 'express';

import errorHandler from '../Middlewares/error.middleware';
import user from './User/user.routes';
import source from './Source/source.routes';



const router = express.Router();

router.get('/', (req: Request, res: Response) => { res.status(200).send({ message: 'Welcome from Montaser' }); });
router.use('/user', user);
router.use('/sources', source)
router.use('*', (req: Request, res: Response) => res.status(404).send({ message: `This url not found ${req.originalUrl}` }));
router.use(errorHandler);



export default router;
