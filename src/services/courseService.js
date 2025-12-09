import Course from "../models/course.js";

export async function createCourse(data) {
    return Course.create(data);
}

export async function listCourses() {
    return Course.findAll();
}

export async function getCourseById(id) {
    const course = await Course.findByPk(id);
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
    return Course.findAll({ where: { status: true } });
}
