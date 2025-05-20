import { Request, Response } from "express"
import cloudinary from "../utils/cloudinary";
import User from "../models/user.model";

interface CustomRequest extends Request {
    user?: any;
}

export const updateProfile = async (req: CustomRequest, res: Response) => {
    try {
        const { profilePic } = req.body
        const userId = req.user._id

        if (!profilePic) {
            return res.status(401).json({
                message: "Profile pic not found"
            })
        }

        const uploadedProfilePic = await cloudinary.uploader.upload(profilePic)
        const updateUser = await User.findByIdAndUpdate(userId, {
            profilePic: uploadedProfilePic.secure_url
        }, {
            new: true
        })

        res.status(200).json({
            updatedUser: updateUser
        })
    }
    catch(err) {
        console.error("Error in update profile controller ", err);
        res.status(500).json({
            message: "Error updating profile pic"
        })
    }
}