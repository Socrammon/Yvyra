import express from 'express';
import { registrarFavoritosEnsinar, consultarFavoritosEnsinar, consultarFavoritosEnsinarPorID, deletaFavoritosEnsinarPorID } from '../models/favoritosEnsinar.js'

export const rotasFavoritosEnsinar = express.Router();

rotasFavoritosEnsinar.post('/mensagem', async (req, res) => {

    const favoritoEnsinar = req.body; // Converte para objeto JSON
    res.statusCode = 400; // Status padrão de erro

    if (!favoritoEnsinar?.titulo) {
        res.send({
            erro: { mensagem: 'O atributo titulo é obrigatório para favoritar a mensagem' }
        });
        return;
    }

    if (!favoritoEnsinar?.texto) {
        res.send({
            erro: { mensagem: 'O atributo texto é obrigatório para favoritar a mensagem' }
        });
        return;
    }

    try {
        const resposta = await registrarFavoritosEnsinar(favoritoEnsinar);

        res.statusCode = 201; // Created
        res.send({
            mensagem: `Mensagem ${favoritoEnsinar.titulo} favoritada com sucesso`,
            titulo: `${favoritoEnsinar.titulo}`,
            texto: `${favoritoEnsinar.texto}`
        });

    } catch (erro) {
        console.log('Falha ao favoritar mensagem', erro);

        res.statusCode = 500; // Erro interno

        const resposta = {
            erro: { mensagem: `Falha ao favoritar mensagem ${favoritoEnsinar.titulo}` }
        };

        res.send(resposta);

        return;
    }

});

rotasFavoritosEnsinar.delete('/mensagem/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const encontrado = await deletaFavoritosEnsinarPorID(id);

        res.statusCode = 204;

        res.send();

        return;

    } catch (erro) {
        console.log('Falha ao deletar mensagem favoritada', erro)
        res.statusCode = 500;
        res.send({
            erro: { mensagem: `Falha ao remover mensagem com ID ${id}` }
        });
        return;
    }

});

rotasFavoritosEnsinar.get('/mensagem/:id', async (req, res) => {

    const id = req.params.id;

    let resposta;

    try {

        resposta = await consultarFavoritosEnsinarPorID(id);

        res.statusCode = 200;

        if (!resposta) {
            res.statusCode = 404;
            res.send({
                erro: { mensagem: `Mensagem com ID ${id} não encontrada.` }
            });
            return;
        }

        res.send(resposta);

        return;

    } catch (erro) {
        console.log('Falha ao buscar mensagem favoritada por ID', erro)
        res.statusCode = 500;
        resposta = {
            erro: { mensagem: `Falha ao buscar mensagem favoritada com ID ${id}` }
        };
        res.send(resposta);
        return;
    }
});

rotasFavoritosEnsinar.get('/mensagem', async (req, res) => {

    let resposta;

    try {

        resposta = await consultarFavoritosEnsinar();

        res.statusCode = 200;

        res.send(resposta);

        return;

    } catch (erro) {
        console.log('Falha ao buscar mensagens favoritadas', erro)
        res.statusCode = 500;
        resposta = {
            erro: { mensagem: `Falha ao buscar mensagens favoritadas` }
        };
        res.send(resposta);
        return;
    }

});