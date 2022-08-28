import { genSaltSync, hashSync } from "bcryptjs";
import { Request, Response } from "express";
import { generateToken } from "../../../../middleware";
import { User } from "../../../../models";


export const registerUser = async (req: Request, res: Response) => {
    const { username, password, role } = req.body;

    // Check Empty
    if(!username) {
        res.status(400);
        res.json({
            message: "Please enter username."
        });
        return;
    }
    if(!password) {
        res.status(400);
        res.json({
            message: "Please enter password."
        });
        return;
    }
    if(!role) {
        res.status(400);
        res.json({
            message: "Please enter username."
        });
        return;
    }

    // Validate Role
    const roles: string[] = ["Admin", "User"];
    if(!roles.includes(role)) {
        res.status(400);
        res.json({
            message: `Invalid Role, Choose between ${roles}`
        });
        return;
    }

    // Check Existing Username
    const existUser = await User.findOne({ username });
    if(existUser) {
        res.status(400);
        res.json({
            message: `Username ${username} already exist. Please enter another Username.`
        });
        return;
    }

    // Hash Password
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    // Insert to Database
    const newUser = await User.create({
        username,
        password: hashedPassword,
        role
    });

    if(newUser) {
        res.status(201);
        res.json({
            id: newUser.id,
            username: newUser.username,
            role: newUser.role,
            token: generateToken({ id: newUser.id, role: newUser.role })
        });
        return
    } else {
        res.status(400);
        res.json({
            message: "Failed to create User."
        });
        return;
    }
}