import express from "express";
import * as courseController from "../controllers/courseController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const app = express.Router();

app.post("/", authMiddleware, courseController.create);
app.get("/", authMiddleware, courseController.list);
app.get("/:id", authMiddleware, courseController.getById);
app.put("/:id", authMiddleware, courseController.update);
app.delete("/:id", authMiddleware, courseController.remove);

app.get("/public/catalog", courseController.publicCatalog);

export default app;
