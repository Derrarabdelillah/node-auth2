import express from "express";
import authRoutes from "./Routes/authRoutes.js";
import connectDB from "./config/connect.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import checkUser from "./middleware/authMiddleware.js";

const app = express();

const PORT = 3000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true                // Allow cookies to be sent/received
}));

// Routes
app.get(checkUser);
app.use('/api', authRoutes);

// Connect to Database
connectDB();

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
