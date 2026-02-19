import express from 'express';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes.js';

// Configurando o dotenv para carregar as variáveis de ambiente do arquivo .env
dotenv.config();

// Carregando as variáveis de ambiente do arquivo .env
const PORT = process.env.PORT; 

const app = express()

app.use(express.json()); //habilita o parsing de JSON no corpo das requisições

app.set('json space', 4); //Formata o JSON com 4 espaços

const port = 3333;

const routes = taskRoutes; // Importando as rotas do arquivo taskRoutes.js

app.use('/api', routes); // Usando as rotas com o prefixo /api

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})

