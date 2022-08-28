import { IRouter, Router } from "express";
import * as asyncHandler from "express-async-handler";
import { loginHandler } from "../controller/v1";

export const loginRouter: IRouter = Router();

loginRouter.post("/api/v1/login", asyncHandler(loginHandler));