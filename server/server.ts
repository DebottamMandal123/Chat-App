import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route"
import messageRoutes from "./routes/message.route"
import userRoutes from "./routes/user.route"

import connectDB from "./db/db";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,               
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`You are listening on port ${PORT}`) 
})