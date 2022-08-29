import "dotenv/config";
import * as express from "express";
import { Config, dbConnect } from "../lib";
import { errorCatcher } from "../middleware";
import { userRouter } from "./routes";



export const initApp = async (): Promise<{ app: express.Application, config: Config }> => {
    const app = express();
    const config = new Config();
    dbConnect(config);

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(errorCatcher);

    // Routes
    app.use(userRouter);

    return { app, config };
}