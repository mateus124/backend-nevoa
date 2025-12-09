import express from "express";
import * as courseController from "../controllers/courseController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const app = express.Router();

/**
 * @openapi
 * /courses:
 *   post:
 *     tags:
 *       - Courses
 *     summary: Create a course (authenticated)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               duration:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Course created
 */
app.post("/", authMiddleware, courseController.create);

/**
 * @openapi
 * /courses:
 *   get:
 *     tags:
 *       - Courses
 *     summary: List courses with pagination
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       '200':
 *         description: Paginated list of courses
 */
app.get("/", authMiddleware, courseController.list);

/**
 * @openapi
 * /courses/my:
 *   get:
 *     tags:
 *       - Courses
 *     summary: List all courses created by the authenticated user
 *     responses:
 *       '200':
 *         description: List of user's courses
 */
app.get("/my", authMiddleware, courseController.listByAuthor);

/**
 * @openapi
 * /courses/{id}:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Get a course by id (authenticated)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Course object
 */
app.get("/:id", authMiddleware, courseController.getById);

/**
 * @openapi
 * /courses/{id}:
 *   put:
 *     tags:
 *       - Courses
 *     summary: Update a course (authenticated)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       '200':
 *         description: Course updated
 */
app.put("/:id", authMiddleware, courseController.update);

/**
 * @openapi
 * /courses/{id}:
 *   delete:
 *     tags:
 *       - Courses
 *     summary: Delete a course (authenticated)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Course deleted
 */
app.delete("/:id", authMiddleware, courseController.remove);

/**
 * @openapi
 * /courses/public/catalog:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Public catalog of active courses
 *     responses:
 *       '200':
 *         description: Public list of active courses
 */
app.get("/public/catalog", courseController.publicCatalog);

/**
 * @openapi
 * /courses/public/search:
 *   get:
 *     tags:
 *       - Courses
 *     summary: Search courses by title
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: Title or part of the title to search
 *     responses:
 *       '200':
 *         description: List of courses matching the search
 *       '400':
 *         description: Missing or invalid query parameter
 */
app.get("/public/search", courseController.searchByTitle);

export default app;
