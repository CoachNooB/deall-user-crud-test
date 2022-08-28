import { genSaltSync, hashSync } from "bcryptjs";
import { Request, Response } from "express";
import { User } from "../../../../models";


export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, password, role } = req.body;

    // Hash Password
    const salt = genSaltSync(10);
    const hashedPassword = !password ? password : hashSync(password, salt);

    // Validate Role
    const roles: string[] = ["Admin", "User"];
    if(role && !roles.includes(role)) {
        res.status(400);
        res.json({
            message: `Invalid Role, Choose between ${roles}`
        });
        return;
    }

    try {
        const updatedUser = await User.findOneAndUpdate({ _id: id }, { username, password: hashedPassword, role }, { new: true }).select("-password");
        if(!updatedUser) {
            res.status(400);
            res.json({
                message: `No User with ID ${id}.`
            });
            return;
        }

        res.status(200);
        res.json({
            message: `Success Updating User ID ${id}.`,
            data: updatedUser
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json({
            message: `Failed to Update User ID ${id}.`,
            error
        });
        return;
    }
}