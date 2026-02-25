import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

import path from "path";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001
const __dirname = path.resolve();

if(process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173",
    }));
}
// middleware
app.use(express.json());    // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
    // to serve frontend inside backend url i.e at localhost:5001
    app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    });
}

// our simple custom middleware
// app.use((req, res, next) => {
//     console.log(`Request method is ${req.method} & Request URL is ${req.url}`);
//     next();
// });

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    });
});