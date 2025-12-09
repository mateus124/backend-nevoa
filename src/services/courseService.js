import Course from "../models/course.js";
import { Op } from "sequelize";

export async function createCourse(data, userId) {
    return Course.create({ ...data, userId });
}


export async function getCourseById(id) {
    const course = await Course.findByPk(id, {
        include: { association: "author", attributes: ["id", "name", "email"] },
    });

    if (!course) {
        throw new Error("Curso não encontrado!");
    }

    return course;
}

export async function updateCourse(id, newData) {
    const course = await getCourseById(id);
    return course.update(newData);
}

export async function deleteCourse(id) {
    const course = await getCourseById(id);
    await course.destroy();

    return { message: "Curso deletado com sucesso!" };
}

export async function listActiveCourses() {
    return Course.findAll({
        where: { status: true },
        include: { association: "author", attributes: ["id", "name", "email"] },
    });
}

export async function searchCoursesByTitle(title) {
    return Course.findAll({
        where: {
            title: {
                [Op.iLike]: `%${title}%`
            }
        },
        include: { association: "author", attributes: ["id", "name", "email"] }
    });
}

export async function listCourses(page = 1, limit = 10) {
    const parsedPage = Math.max(1, parseInt(page) || 1);
    const parsedLimit = Math.max(1, Math.min(100, parseInt(limit) || 10));

    const offset = (parsedPage - 1) * parsedLimit;

    const { rows, count } = await Course.findAndCountAll({
        offset,
        limit: parsedLimit,
        include: { association: "author", attributes: ["id", "name", "email"] },
        order: [["id", "DESC"]],
    });

    return {
        total: count,
        page: parsedPage,
        limit: parsedLimit,
        totalPages: Math.ceil(count / parsedLimit),
        courses: rows,
    };
}

export async function listCoursesByAuthor(userId) {
    return Course.findAll({
        where: { userId },
        include: { association: "author", attributes: ["id", "name", "email"] },
        order: [["id", "DESC"]],
    });
}
