import { Response } from "express";
import { CustomRequest } from "../types/CustomReqest";
import cloudinary from "../utils/cloudinary";
import Message from "../models/message.model";

export const sendMessages = async (req: CustomRequest, res: Response) => {
    try {
        const { text, image } = req.body;
        const senderId = req.user._id;
        const receiverId = req.params.id;

        let imageURL
        if (image) {
            const uploadImage = cloudinary.uploader.upload(image);
            imageURL = (await uploadImage).secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageURL
        })

        await newMessage.save()

        // add socket.io for real time functionality

        res.status(201).json(newMessage)
    }
    catch(err) {
        console.error("Error sending messages ", err);
        res.status(500).json({
            message: "Error sending messages"
        })
    }
}