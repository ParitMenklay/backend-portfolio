import "dotenv/config";
import express from "express"
import cors from "cors";
import connectionPool from "./utils/db.mjs";

const app = express()
const port = process.env.PORT || 4000;

app.use(express.json());

app.use(
    cors({
        origin: [
            process.env.FRONTEND_URL, 
            "https://react-portfolio-app-green.vercel.app",   
        ],
    })
);

app.get("/test", (req, res) => {
    return res.json("Server API is working 🚀");
});

app.get("/health", (req, res) => {
    res.status(200).json({ message: "OK" });
});

app.get("/profiles", (req, res) => {
    return res.json({
        data: {
            name: "john",
            age: 20,
        },
    });
});

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});