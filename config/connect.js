import mongoose from "mongoose";

const URI = "mongodb+srv://abdou:P0WXaWojZsHih7g4@cluster0.ghsi5dc.mongodb.net/auth-node?appName=Cluster0";

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

export default connectDB;