import { Response } from "express";
import { CustomRequest } from "../types/CustomReqest";
import Message from "../models/message.model";

export const getMessages = async (req: CustomRequest, res: Response) => {
    try {
        const senderId = req.user._id;
        const receiverId = req.params.id;

        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        })
        .sort({ timestamp: -1 })
        .limit(50)
        .sort({ timestamp: 1 })

        res.status(200).json(messages);
    }
    catch(err) {
        console.error("Error fetching the messages between users ", err);
        res.status(500).json({
            message: "Error fetching the messages between users"
        })
    }
}