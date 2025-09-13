//Bibliotecas
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//Importação das rotas
import perguntarSimples from './routes/perguntarSimples.js';
import perguntarEnsinar from './routes/perguntarEnsinar.js';
import perguntarImagem from './routes/perguntarImagem.js';
import perguntarSimulacao from './routes/perguntarSimulacao.js';

const app = express(); //Cria o app express

//Habilitando utilidades do app 
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

//Rotas
app.use('/perguntar/simples', perguntarSimples);
app.use('/perguntar/ensinar', perguntarEnsinar);
app.use('/perguntar/imagem', perguntarImagem);
app.use('/perguntar/simulacao', perguntarSimulacao);

function inicializaApp() {

    const porta = 3000;
    const host = 'localhost';

    app.listen(porta, () => {
        console.log(`\nServidor em http://${host}:${porta}`);
    });
}

inicializaApp();