import { Response } from "express"
import { CustomRequest } from "../types/CustomReqest";

export const checkAuth = async (req: CustomRequest, res: Response) => {
    try {
        res.status(200).json(req.user)
    }
    catch(err) {
        console.error("Error in check auth controller", err);
        res.status(401).json({
            message: "User not found"
        })
    }
}