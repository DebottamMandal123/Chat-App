import { Request, Response } from "express"

export const logout = (req: Request, res: Response) => {
    try {
        res.cookie("jwt", "", {
            maxAge: 0
        })

        res.status(200).json({
            message: "User logged out successfully"
        })
    }
    catch(err) {
        console.error("Error in log out controller ", err)
        res.status(500).json({
            message: "Error in log out controller"
        })
    }
}