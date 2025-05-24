import { Request, Response } from "express"
import cloudinary from "../utils/cloudinary";
import User from "../models/user.model";
import multer from "multer";

interface CustomRequest extends Request {
    user?: any;
}

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

export const uploadMiddleware = upload.single('profilePic');

export const updateProfile = async (req: CustomRequest, res: Response) => {
    try {
        const userId = req.user._id

        if (!req.file) {
            return res.status(401).json({
                message: "Profile pic not found"
            })
        }

        const profilePic = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
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