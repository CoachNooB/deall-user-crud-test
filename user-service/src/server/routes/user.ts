import { IRouter, Router } from "express";
import * as asyncHandler from "express-async-handler";
import { adminRouteSecurity, userRouteSecurity } from "../../middleware";
import { deleteUser, getUserById, getUsers, registerUser, updateUser } from "../controller/v1";


export const userRouter: IRouter = Router();

userRouter.get("/api/v1/users", adminRouteSecurity, asyncHandler(getUsers));
userRouter.get("/api/v1/users/:id", userRouteSecurity, asyncHandler(getUserById));
userRouter.post("/api/v1/users", adminRouteSecurity, asyncHandler(registerUser));
userRouter.put("/api/v1/users/:id", adminRouteSecurity, asyncHandler(updateUser));
userRouter.delete("/api/v1/users/:id", adminRouteSecurity, asyncHandler(deleteUser));