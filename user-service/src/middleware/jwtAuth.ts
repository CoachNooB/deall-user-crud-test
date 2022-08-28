import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { Config } from "../lib/config";

const config = new Config();

export const generateToken = (payload: { id: string, role: string }) => {
    return jwt.sign(payload, config.jwtSecret, { algorithm: "HS512", expiresIn: '1d' });
}

export const adminRouteSecurity = async (req: Request, res: Response, next: NextFunction) => {
    let token: string;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token) {
        res.status(401);
        res.json({
            message: "Not Authorized, please provide authorization token."
        });
        return;
    }
    const decoded: any = jwt.verify(token, config.jwtSecret);
    if(decoded.role !== "Admin") {
        res.status(401);
        res.json({
            message: "You are not authorized to access this API."
        });
        return;
    }
    next();
}

export const userRouteSecurity = async (req: Request, res: Response, next: NextFunction) => {
    let token: string;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if(!token) {
        res.status(401);
        res.json({
            message: "Not Authorized, please provide authorization token."
        });
        return;
    }
    const decoded: any = jwt.verify(token, config.jwtSecret);
    if(decoded.role !== "Admin") {
        if(decoded.id !== req.params.id) {
            res.status(401);
            res.json({
                message: "You are not authorized to access this API."
            });
            return;
        }
    }
    next();
}