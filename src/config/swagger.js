import path from "path";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Algoritmo Humano",
            version: "1.0.0",
            description: "Documentação da API de usuários e cursos",
        },
        servers: [
            {
                url: "http://localhost:8080/api",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: [path.join(process.cwd(), "src", "routes", "*.js")],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
