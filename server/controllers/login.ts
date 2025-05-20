import { Request, Response } from "express"
import bcrypt from "bcryptjs"
import User from "../models/user.model";
import generateJWTandSetCookie from "../utils/generateJWT&SetCookie";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({
                message: "User with this email does not exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Incorrect password"
            })
        }

        generateJWTandSetCookie(user._id.toString(), res);

        res.status(200).json({
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic
        })

    }
    catch(err) {
        console.error("Error in log in controller ", err);
        res.status(500).json({
            message: "Error in log in controller"
        })
    }
}