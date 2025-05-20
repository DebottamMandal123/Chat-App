import mongoose from "mongoose";

const connectDB = async () => {
    const URI = process.env.MONGO_DB_URI;
    if (!URI) {
        console.log("Mongo DB URI is not found");
        process.exit(1);
    }

    try {
        await mongoose.connect(process.env.MONGO_DB_URI || "");
        console.log("Mongo DB connected")
    }
    catch(err) {
        console.error("Error connecting to Mongo DB ", err);
        process.exit(1);
    }
}

export default connectDB