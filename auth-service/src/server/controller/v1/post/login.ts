import { compareSync } from "bcryptjs";
import { Request, Response } from "express";
import { generateToken } from "../../../../middleware";
import { User } from "../../../../models";


export const loginHandler = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Check Empty
    if(!username) {
        res.status(400);
        res.json({
            message: "Username cannot be Empty."
        });
        return;
    }
    if(!password) {
        res.status(400);
        res.json({
            message: "Password cannot be Empty."
        });
        return;
    }

    // Check Username
    const userExist = await User.findOne({ username });
    if(!userExist) {
        res.status(400);
        res.json({
            message: `Cannot find username ${username}`,
        });
        return;
    }

    // Compare password
    if(!compareSync(password, userExist.password)) {
        res.status(400);
        res.json({
            message: `Invalid password.`
        });
        return;
    }

    res.status(200);
    res.json({
        message: "Login Success.",
        token: generateToken({ id: userExist.id, role: userExist.role })
    });
}