import express from "express";
import { authenticate } from "./config/database.js";
import userRouter from "./routes/userRouter.js";
import courseRouter from "./routes/courseRouter.js";
import { swaggerUi, swaggerSpec } from "./config/swagger.js";

authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados estabelecida.");
    })
    .catch((error) => {
        console.error(`Erro ao conectar o banco de dados: ${error}`);
    });

const port = 8080;
const app = express();

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/courses", courseRouter);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log(`Rodando API na porta: ${port}`);
});