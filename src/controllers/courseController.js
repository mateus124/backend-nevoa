import * as courseService from "../services/courseService.js";
import { courseSchema } from "../validators/courseValidators.js";

export async function create(req, res) {
    try {
        const courseValido = courseSchema.parse(req.body);
        const author = req.userId;
        const course = await courseService.createCourse(courseValido, author);

        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function list(req, res) {
    try {
        const courseList = await courseService.listCourses();
        res.json(courseList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getById(req, res) {
    try {
        const id = req.params.id;
        const course = await courseService.getCourseById(id);

        res.json(course);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export async function update(req, res) {
    try {
        const courseValido = courseSchema.partial().parse(req.body);
        const id = req.params.id;
        const course = await courseService.updateCourse(id, courseValido);

        res.json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function remove(req, res) {
    try {
        const id = req.params.id;
        const query = await courseService.deleteCourse(id);

        res.json(query);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}

export async function publicCatalog(req, res) {
    try {
        const courseList = await courseService.listActiveCourses();
        res.json(courseList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function searchByTitle(req, res) {
    try {
        const { title } = req.query;
        if (!title) {
            return res.status(400).json({ error: "Parâmetro 'title' é obrigatório!" });
        }

        const courseList = await courseService.searchCoursesByTitle(title);
        res.json(courseList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}