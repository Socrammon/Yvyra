//Bibliotecas
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
//import dotenv from 'dotenv';
//import mysql from 'mysql2';

//Funções
//import { responderPerguntaSimples } from './services/PerguntaSimples.js';
import { perguntar } from './routes/perguntar.js';

//Rotas
//import { rotasFavoritos } from './routes/produtos.js'

//Mapeamento de objetos
//import { sequelize } from './models/favoritos.js';

const app = express(); //Cria o app express

//Habilitando utilidades do app 
app.use(cors());
app.use(bodyParser.json());
app.use('/perguntar', perguntar);

//app.use(rotaFavoritos);

//Rota para testar se o server ta subindo
app.get("/", (req, res) => {
    res.send("Servidor rodando!");
});

function inicializaApp() {

    const porta = 3000;
    const host = 'localhost';

    app.listen(porta, () => {
        console.log(`\nServidor rodando em http://${host}:${porta}`);
    });
}

inicializaApp();