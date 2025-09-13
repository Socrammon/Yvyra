import express from 'express';
import { registrarFavoritosSimulacao, consultarFavoritosSimulacao, consultarFavoritosSimulacaoPorID, deletaFavoritosSimulacaoPorID } from '../models/favoritosSimulacao.js'

export const rotasFavoritosSimulacao = express.Router();

rotasFavoritosSimulacao.post('/simulacao', async (req, res) => {

    const favoritoSimulacao = req.body; // Converte para objeto JSON
    res.statusCode = 400; // Status padrão de erro

    if (!favoritoSimulacao?.titulo) {
        res.send({
            erro: { mensagem: 'O atributo titulo é obrigatório para favoritar a simulação' }
        });
        return;
    }

    if (!favoritoSimulacao?.codigo) {
        res.send({
            erro: { mensagem: 'O atributo codigo é obrigatório para favoritar a simulação' }
        });
        return;
    }

    try {
        const resposta = await registrarFavoritosSimulacao(favoritoSimulacao);

        res.statusCode = 201; // Created
        res.send({
            mensagem: `Simulação ${favoritoSimulacao.titulo} favoritada com sucesso`,
            titulo: `${favoritoSimulacao.titulo}`,
            codigo: `${favoritoSimulacao.codigo}`
        });

    } catch (erro) {
        console.log('Falha ao favoritar simulação', erro);

        res.statusCode = 500; // Erro interno

        const resposta = {
            erro: { mensagem: `Falha ao favoritar simulação ${favoritoSimulacao.titulo}` }
        };

        res.send(resposta);

        return;
    }

});

rotasFavoritosSimulacao.delete('/simulacao/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const encontrado = await deletaFavoritosSimulacaoPorID(id);

        res.statusCode = 204;

        res.send();

        return;

    } catch (erro) {
        console.log('Falha ao deletar simulação favoritada', erro)
        res.statusCode = 500;
        res.send({
            erro: { mensagem: `Falha ao remover simulação com ID ${id}` }
        });
        return;
    }

});

rotasFavoritosSimulacao.get('/simulacao/:id', async (req, res) => {

    const id = req.params.id;

    let resposta;

    try {

        resposta = await consultarFavoritosSimulacaoPorID(id);

        res.statusCode = 200;

        if (!resposta) {
            res.statusCode = 404;
            res.send({
                erro: { mensagem: `Simulação com ID ${id} não encontrada.` }
            });
            return;
        }

        res.send(resposta);

        return;

    } catch (erro) {
        console.log('Falha ao buscar simulação favoritada por ID', erro)
        res.statusCode = 500;
        resposta = {
            erro: { mensagem: `Falha ao buscar simulação favoritada com ID ${id}` }
        };
        res.send(resposta);
        return;
    }
});

rotasFavoritosSimulacao.get('/simulacao', async (req, res) => {

    let resposta;

    try {

        resposta = await consultarFavoritosSimulacao();

        res.statusCode = 200;

        res.send(resposta);

        return;

    } catch (erro) {
        console.log('Falha ao buscar simulações favoritadas', erro)
        res.statusCode = 500;
        resposta = {
            erro: { mensagem: `Falha ao buscar simulações favoritadas` }
        };
        res.send(resposta);
        return;
    }

});