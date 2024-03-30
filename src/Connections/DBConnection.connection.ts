
import mongoose from 'mongoose';
import { Server } from 'http';

import { startingApp } from '../Config/index.config';



const DB_URL = String(process.env.DB_URL);


const DBConnection = (server: Server) => {
    mongoose.connect(DB_URL, {
    }).then(() => {
        console.log("Database Connected....");
        startingApp(server);
    }).catch((err: Error) => { console.log(err) });
};



export default DBConnection;