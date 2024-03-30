import express, { Express, Request, Response, NextFunction } from 'express';
import http, { Server } from 'http';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { DBConnection } from './Connections/index.connection';
import router from './Routes/index.routes';



const app: Express = express();
const server: Server = http.createServer(app);


app.use(cors());
app.use(express.json());


app.use((req: Request, res: Response, next: NextFunction) => {
    const timeout = 20000;
    res.setTimeout(timeout, () => {
        res.status(503).json({ message: 'Request timed out' });
    });
    next();
});

DBConnection(server);
app.use(router);