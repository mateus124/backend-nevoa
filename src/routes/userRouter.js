import express from "express";
import { register, login, getUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const app = express.Router();

app.post("/register", register);
app.post("/login", login);
app.get("/profile", authMiddleware, getUser);

export default app;