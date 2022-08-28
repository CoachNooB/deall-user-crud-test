import * as jwt from "jsonwebtoken";
import { Config } from "../lib/config";

const config = new Config();

export const generateToken = (payload: { id: string, role: string }) => {
    return jwt.sign(payload, config.jwtSecret, { algorithm: "HS512", expiresIn: '1d' });
}
