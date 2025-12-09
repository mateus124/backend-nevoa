import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: true,
        rejectUnauthorized: false,
    },
});

sequelize.sync({ force: true })
    .then(() => {
        console.log("Banco de dados recriado.");
    })
    .catch(err => {
        console.error(`Erro ao recriar banco: ${err}`);
    });

export async function authenticate() {
    return sequelize.authenticate();
}

export default sequelize;