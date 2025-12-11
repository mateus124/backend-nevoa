import { z } from "zod";

export const userSchema = z.object({
    name: z.string().min(3, "Nome do usuário deve conter pelo menos 3 caracteres!"),
    email: z.string().email("Formato de e-mail inválido!"),
    password: z.string().min(6, "Senha do usuário deve conter pelo menos 6 caracteres!"),
});
