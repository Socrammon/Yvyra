import express from 'express';
import { registrarFavoritoImagem, consultarFavoritosImagem, consultarFavoritosImagemPorID, deletaFavoritosImagemPorID } from '../models/favoritosImagem.js'

export const rotasFavoritosImagem = express.Router();

/**
 * @swagger
 * /favoritos/imagem:
 *   post:
 *     summary: Adiciona uma imagem aos favoritos
 *     tags: [Favoritos - Imagem]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Minha Imagem Favorita"
 *     responses:
 *       201:
 *         description: Imagem favoritada com sucesso
 *       400:
 *         description: Título é obrigatório
 *       500:
 *         description: Erro interno
 */

rotasFavoritosImagem.post('/imagem', async (req, res) => {

    const favoritoImagem = req.body; // Converte para objeto JSON
    res.statusCode = 400; // Status padrão de erro

    if (!favoritoImagem?.titulo) {
        res.send({
            erro: { mensagem: 'O atributo titulo é obrigatório para favoritar a imagem' }
        });
        return;
    }

    if (!favoritoImagem?.caminho) {
        res.send({
            erro: { mensagem: 'O atributo caminho é obrigatório para favoritar a imagem' }
        });
        return;
    }

    try {
        const resposta = await registrarFavoritoImagem(favoritoImagem);

        res.statusCode = 201; // Created
        res.send({
            mensagem: `Imagem ${favoritoImagem.titulo} favoritada com sucesso`,
            titulo: `${favoritoImagem.titulo}`,
            caminho: `${favoritoImagem.caminho}`
        });

    } catch (erro) {
        console.log('Falha ao favoritar imagem', erro);

        res.statusCode = 500; // Erro interno

        const resposta = {
            erro: { mensagem: `Falha ao favoritar imagem ${favoritoImagem.titulo}` }
        };

        res.send(resposta);

        return;
    }

});

/**
 * @swagger
 * /favoritos/imagem/{id}:
 *   delete:
 *     summary: Remove imagem dos favoritos por ID
 *     tags: [Favoritos - Imagem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da imagem
 *     responses:
 *       204:
 *         description: Imagem removida com sucesso
 *       500:
 *         description: Erro interno
 */

rotasFavoritosImagem.delete('/imagem/:id', async (req, res) => {

    const id = req.params.id;

    try {

        const encontrado = await deletaFavoritosImagemPorID(id);

        res.statusCode = 204;

        res.send();

        return;

    } catch (erro) {
        console.log('Falha ao deletar imagem favoritada', erro)
        res.statusCode = 500;
        res.send({
            erro: { mensagem: `Falha ao remover imagem com ID ${id}` }
        });
        return;
    }

});

/**
 * @swagger
 * /favoritos/imagem/{id}:
 *   get:
 *     summary: Consulta imagem favoritada por ID
 *     tags: [Favoritos - Imagem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da imagem
 *     responses:
 *       200:
 *         description: Imagem encontrada
 *       404:
 *         description: Imagem não encontrada
 *       500:
 *         description: Erro interno
 */

rotasFavoritosImagem.get('/imagem/:id', async (req, res) => {

    const id = req.params.id;

    let resposta;

    try {

        resposta = await consultarFavoritosImagemPorID(id);

        res.statusCode = 200;

        if (!resposta) {
            res.statusCode = 404;
            res.send({
                erro: { mensagem: `Imagem com ID ${id} não encontrada.` }
            });
            return;
        }

        res.send(resposta);

        return;

    } catch (erro) {
        console.log('Falha ao buscar imagem favoritada por ID', erro)
        res.statusCode = 500;
        resposta = {
            erro: { mensagem: `Falha ao buscar imagem favoritada com ID ${id}` }
        };
        res.send(resposta);
        return;
    }
});

/**
 * @swagger
 * /favoritos/imagem:
 *   get:
 *     summary: Lista todas as imagens favoritadas
 *     tags: [Favoritos - Imagem]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *       500:
 *         description: Erro interno
 */

rotasFavoritosImagem.get('/imagem', async (req, res) => {

    let resposta;

    try {

        resposta = await consultarFavoritosImagem();

        res.statusCode = 200;

        res.send(resposta);

        return;

    } catch (erro) {
        console.log('Falha ao buscar imagens favoritadas', erro)
        res.statusCode = 500;
        resposta = {
            erro: { mensagem: `Falha ao buscar imagens favoritadas` }
        };
        res.send(resposta);
        return;
    }

});