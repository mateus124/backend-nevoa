import express, { json } from "express";
import { authenticate } from "./config/database.js";
import userRoutes from "./routes/userRouter.js";

authenticate()
    .then(() => {
        console.log("Conexão com o banco de dados estabelecida.");
    })
    .catch((error) => {
        console.error(`Erro ao conectar o banco de dados: ${error}`);
    });

const port = 8080;
const app = express();

app.use(json());
app.use("/api/user/", userRoutes);

app.listen(port, () => {
    console.log(`Rodando api na porta: ${port}`);
});