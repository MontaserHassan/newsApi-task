import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';



function getUser() {
    return async (req: Request, res: Response, next: NextFunction) => {
        let token: string;
        try {
            const headerToken = req.headers['authorization'];
            if (!headerToken?.startsWith(`${process.env.BEARER_SECRET} `)) return res.status(401).send({ path: 'token', message: "In-valid Header Token" });
            token = headerToken.split(" ")[1];
            if (!token || token?.length < 1) return res.status(401).send({ path: 'token', message: "In-valid Token" });
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) return res.status(401).send({ path: 'token', message: "In-valid Token Signature " });
            req.user = { userId: decoded.id };
            req.token = { secretKey: decoded.secretKey };
            next();
        } catch (error) {
            next(error)
        };
    };
};



export default getUser;