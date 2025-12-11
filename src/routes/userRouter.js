import express from "express";
import { register, login, getUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const app = express.Router();

/**
 * @openapi
 * /users/register:
 *   post:
 *     tags:
 *       - Users
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User created
 */
app.post("/register", register);

/**
 * @openapi
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login and receive a JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: JWT token
 */
app.post("/login", login);

/**
 * @openapi
 * /users/profile:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get authenticated user profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User profile
 */
app.get("/profile", authMiddleware, getUser);

export default app;