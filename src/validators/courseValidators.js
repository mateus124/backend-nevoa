import { z } from "zod";

export const courseSchema = z.object({
    title: z.string().min(3, "Título deve conter pelo menos 3 caracteres!"),
    description: z.string().min(10, "Descrição deve conter pelo menos 10 caracteres!"),
    duration: z.number().positive("Duração deve conter um número positivo!"),
    image: z.string().url("Imagem deve conter um link válido!").optional(),
    status: z.boolean().optional(),
});
