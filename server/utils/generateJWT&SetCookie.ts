import jwt from "jsonwebtoken"
import { Response } from "express"

const generateJWTandSetCookie = (userID: string, res: Response) => {
    const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || ""

    if (!JWT_SECRET_KEY) {
        throw new Error("JWT_SECRET_KEY is not defined in the environmental variables")
    }

    const token = jwt.sign({userID}, JWT_SECRET_KEY, {
        expiresIn: "15d"
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // ms
        httpOnly: true, // prevent XSS or cross-site scripting attacks
        sameSite: "strict", // prevent CSRF or cross-site request forgery attcks
        secure: process.env.NODE_ENV !== "development"
    })

    return token;
}

export default generateJWTandSetCookie