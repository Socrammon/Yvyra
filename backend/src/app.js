//Bibliotecas
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2';

//Funções
import { responderPerguntaSimples } from './services/PerguntaSimples.js';

//Rotas
import { rotasFavoritos } from './routes/produtos.js'

//Mapeamento de objetos
import { sequelize } from './models/favoritos.js';

dotenv.config();

const app = express(); //Cria o app express

//Habilitando utilidades do app 
app.use(cors());
app.use(bodyParser.json());
app.use(rotasFavoritos);

//Rota para testar se o server ta subindo
app.get("/", (req, res) => {
    res.send("Servidor rodando!");
});

app.post('/perguntar', async (req, res) => {
    const { pergunta } = req.body;

    if (!pergunta) {
        return res.status(400).json({ error: "Campo 'pergunta' é obrigatório." });
    }

    const respostaIA = await responderPerguntaSimples(pergunta);

    if (Array.isArray(respostaIA) && respostaIA.length > 0 && respostaIA[0].generated_text) {
        res.json({ resposta: respostaIA[0].generated_text });
        console.log(respostaIA);
    } else {
        res.status(500).json({ error: "Resposta inesperada da IA." });
    }
});

function inicializaApp() {

    const porta = 3000;
    const host = 'localhost';

    app.listen(porta, () => {
        console.log(`\nServidor rodando em http://${host}:${porta}`);
    });
}

inicializaApp();