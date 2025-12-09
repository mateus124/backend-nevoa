import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createUser(name, email, password) {
    const exist = await User.findOne({ where: { email } });

    if (exist) {
        throw new Error(`O e-mail: ${email} já está sendo utilizado!`);
    }

    const SenhaHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: SenhaHash });

    const userObj = newUser.toJSON();
    delete userObj.password;
    return userObj;
}

export async function loginUser(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error("E-mail não está cadastrado no sistema!");
    }

    const SenhaHash = await bcrypt.compare(password, user.password);
    if (!SenhaHash) {
        throw new Error("A senha informada está incorreta!");
    }

    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1d" });
}

export async function getUserById(id) {
    const user = await User.findByPk(id, { attributes: { exclude: ["password"] } });
    if (!user) {
        throw new Error("Usuário não está cadastrado no sistema!");
    }

    return user;
}