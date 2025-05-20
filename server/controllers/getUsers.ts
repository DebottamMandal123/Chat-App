import { Response } from "express"
import { CustomRequest } from "../types/CustomReqest"
import User from "../models/user.model";

export const getUsers = async (req: CustomRequest, res: Response) => {
    try {
        const loggedInUserId = req.user._id;
        const users = await User.find({ _id: { $ne: loggedInUserId }}).select("-password");
        res.status(200).json(users);
    }
    catch(err) {
        console.error("Error fetching the user for the sidebar ", err);
        res.status(500).json({
            message: "Error fethcing the users for the sidebar"
        })
    }
}