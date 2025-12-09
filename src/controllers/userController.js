import * as userService from "../services/userService.js";
import { userSchema } from "../validators/userValidators.js";

export async function register(req, res) {
    try {
        const userValido = userSchema.parse(req.body);

        const user = await userService.createUser(userValido.name, userValido.email, userValido.password);
        res.status(201).json({ message: "Usuário criado com sucesso!", user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const token = await userService.loginUser(email, password);

        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

export async function getUser(req, res) {
    try {
        const user = await userService.getUserById(req.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
}
