
import express from 'express';

import { sourcesController } from '../../Controllers/index.controller';



const sourcesRouter = express.Router();


sourcesRouter.get('/', sourcesController.fetchSources);



export default sourcesRouter;