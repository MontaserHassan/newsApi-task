import express from 'express';

import { sourcesController } from '../../Controllers/index.controller';



const authSourcesRouter = express.Router();


authSourcesRouter.post('/:source', sourcesController.subscribeSource);
authSourcesRouter.delete('/:source', sourcesController.unSubscribeSource);



export default authSourcesRouter;