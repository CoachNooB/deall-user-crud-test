import { Request, Response } from "express";
import { User } from "../../../../models";


export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findOneAndDelete({ _id: id });
        if(!deletedUser) {
            res.status(400);
            res.json({
                message: `No User with ID ${id}.`
            });
            return;
        }

        res.status(200);
        res.json({
            message: `User ID ${id} Deleted.`,
            deletedUser
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(400);
        res.json({
            message: `Failed to delete User ID ${id}.`,
            error
        });
        return;
    }
}