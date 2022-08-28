import { Request, Response } from "express";
import { User } from "../../../../models";


export const getUsers = async (req: Request, res: Response) => {
    const users = await User.find().select("-password");

    res.status(200);
    res.json({
        message: "Success Get all Users.",
        data: users
    });
}

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const userData = await User.findById(id).select("-password");
    if(!userData) {
        res.status(404);
        res.json({
            message: `Cannot find user with ID ${id}.`
        });
        return;
    }

    res.status(200);
    res.json({
        message: "Success Get User.",
        data: userData
    });
}