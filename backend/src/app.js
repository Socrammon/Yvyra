//Bibliotecas
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

//Inicializador do Banco de dados
import { inicializarBanco } from './config/database.js';

//Importação das rotas perguntar
import perguntarSimples from './routes/perguntarSimples.js';
import perguntarEnsinar from './routes/perguntarEnsinar.js';
import perguntarImagem from './routes/perguntarImagem.js';
import perguntarSimulacao from './routes/perguntarSimulacao.js';

//Importação das rotas favoritar
import { rotasFavoritosEnsinar } from './routes/favoritarEnsinar.js';
import { rotasFavoritosImagem } from './routes/favoritarImagem.js';
import { rotasFavoritosSimulacao } from './routes/favoritarSimulacao.js';

const app = express(); //Cria o app express

//Habilitando utilidades do app 
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

//Rotas perguntar
app.use('/perguntar/simples', perguntarSimples);
app.use('/perguntar/ensinar', perguntarEnsinar);
app.use('/perguntar/imagem', perguntarImagem);
app.use('/perguntar/simulacao', perguntarSimulacao);

//Rotas favoritar
app.use('/favoritos', rotasFavoritosEnsinar);
app.use('/favoritos', rotasFavoritosImagem);
app.use('/favoritos', rotasFavoritosSimulacao);

// Inicializa tudo
async function InicializarServidor() {

    try {

        await inicializarBanco();

        const porta = 3000;
        const host = 'localhost';

        app.listen(porta, () => {
            console.log(`\nServidor rodando em http://${host}:${porta}`);
        });

    } catch (erro) {
        console.error('\nErro ao iniciar o servidor:', erro);
        process.exit(1); // Encerra a aplicação se algo der errado
    }

}

InicializarServidor();