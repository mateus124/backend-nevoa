Backend - Plataforma de Cursos

# Como rodar o projeto
Pré-requisitos
- Node.js (>= 18)
- NPM
- Banco de dados PostgreSQL (Recomendo Neon Console)

## Instalação

```bash
# Clonar o repositório
git clone https://github.com/mateus124/backend-nevoa
cd backend-nevoa

# Instalar dependências
npm install
```

## Configuração

Renomieie o arquivo .env.example na raiz para .env:

```env
DATABASE_URL=postgres://usuario:senha@host.neon.tech:5432/nome_do_banco
JWT_SECRET=seuSegredo
```

## Iniciar servidor

```bash
npm run dev
Rodando API na porta: 8080
```

# Decisões importantes da arquitetura

- Framework: Utilizado Express.js pela simplicidade e flexibilidade.

- Autenticação: Implementada via JWT para garantir segurança e escalabilidade.

## Camadas:

- Config: responsável pela configuração do database.js e da documentação com swagger

- Controllers: responsáveis por receber requisições e retornar respostas.

- Routes: responsável por definir as rotas da API e conter as docstrings de documentação

- Services: contêm a lógica de negócio.

- Models: abstraem o acesso ao banco de dados.

- Banco de Dados: PostgreSQL escolhido pela robustez e suporte a relacionamentos.

- ORM: Sequelize para facilitar querys e persistência.

- Middlewares: usados para autenticação JWT.

- Validators: utilização da biblioteca "zod" para validação de dados recebidos nas requisições

Arquitetura modular: cada recurso possui seu próprio módulo com rotas, serviços e modelos.

# Observações relevantes do desenvolvimento

- Autorização: Algumas rotas são protegidas e só podem ser acessadas por usuários autenticados (ex.: /courses/my).

- Validação: Uso de bibliotecas como zod para validar dados de entrada.

- Paginação e busca: Implementadas nas rotas de listagem de cursos para otimizar performance.

## Boas práticas:

- Código organizado em camadas.

- Uso de variáveis de ambiente para dados sensíveis.

## Links úteis

Documentação com Swagger: http://localhost:8080/api/docs/

Pasta de uploads de imagens: http://localhost:8080/uploads/