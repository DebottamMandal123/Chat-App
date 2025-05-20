import { Request, Response } from 'express';
import bcrypt from "bcryptjs"
import User from '../models/user.model';
import generateJWTandSetCookie from '../utils/generateJWT&SetCookie';

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, fullName, password, confirmPassword } = req.body 

        if (!email || !fullName || !password || !confirmPassword) {
            return res.status(400).json({
                message: "All fileds are required"
            })
        }

        if (password < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match, please try again"
            })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                message: "Email already exists"
            })
        } 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            fullName,
            password: hashedPassword
        })

        if (newUser) {
            generateJWTandSetCookie(newUser._id.toString(), res)
            await newUser.save();

            res.status(200).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic
            })
        }
        else {
            return res.status(400).json({
                message: "Invalid user data"
            })
        }
    }
    catch(err) {
        console.error("Error in sign up controller ", err)
        res.status(500).json({
            message: "Error in sign up controller"
        })
    }
}