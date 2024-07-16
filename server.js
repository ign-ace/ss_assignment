import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/users", userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
