import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import User from "../models/user.model";
import { CustomRequest } from "../types/CustomReqest";

export const protectRoute = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.jwt;

        if (!token) {
            res.status(400).json({
                message: "Unauthorized - No Token Provided"
            })
            return;
        }

        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

        if (!JWT_SECRET_KEY) {
            throw new Error("JWT_SECRET_KEY is not defined in the environmental variables")
        }

        const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;

        if (!decoded || typeof decoded === 'string') {
            res.status(401).json({
                error: "Unauthorized - Invalid Token"
            })
            return;
        }

        const user = await User.findById(decoded.userID).select("-password");

        if (!user) {
            res.status(401).json({
                message: "User not found"
            })
            return;
        }

        req.user = user;
        
        next();
    }
    catch(err) {
        console.error("Error in protectRoute middleware ", err);
        res.status(500).json({
            message: "Error in authentication middleware"
        })
    }
}