import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Token não fornecido!" });
    }

    try {
        const tokenVer = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = tokenVer.id;

        next();
    } catch {
        res.status(401).json({ error: "Token fornecido é inválido!" });
    }
}
