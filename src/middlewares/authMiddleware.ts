import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { NextFunction, Request, Response } from 'express';
dotenv.config();

export async function verifyJWT(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).send("Invalid token");
        }
    
        const payload = jwt.verify(token, process.env.SECRET);
        const userIdFromToken = typeof payload !== "string" && payload.username;

        if (!userIdFromToken) {
            return res.sendStatus(400);
        }

        req.headers['user'] = JSON.stringify({username: payload.username, email: payload.email});
        return next()
    } catch (error) {
        return res.sendStatus(401);
    }

}