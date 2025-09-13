import express from 'express';
import { registrarFavoritosEnsinar, consultarFavoritosEnsinar, consultarFavoritosEnsinarPorID, deletaFavoritosEnsinarPorID } from '../models/favoritosEnsinar.js'

export const rotasFavoritosEnsinar = express.Router();

/**
 * @swagger
 * /favoritos/mensagem:
 *   post:
 *     summary: Adiciona uma mensagem aos favoritos
 *     tags: [Favoritos - Ensinar]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - texto
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Como funciona a fotossíntese?"
 *               texto:
 *                 type: string
 *                 example: "A fotossíntese ocorre nas plantas e transforma luz solar em energia química."
 *     responses:
 *       201:
 *         description: Mensagem favoritada com sucesso
 *       400:
 *         description: Campos obrigatórios ausentes
 *       500:
 *         description: Erro interno
 */
rotasFavoritosEnsinar.post('/mensagem', async (req, res) => {
    const favoritoEnsinar = req.body;
    res.statusCode = 400;

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

        res.statusCode = 201;
        res.send({
            mensagem: `Mensagem ${favoritoEnsinar.titulo} favoritada com sucesso`,
            titulo: `${favoritoEnsinar.titulo}`,
            texto: `${favoritoEnsinar.texto}`
        });

    } catch (erro) {
        console.log('Falha ao favoritar mensagem', erro);

        res.statusCode = 500;
        const resposta = {
            erro: { mensagem: `Falha ao favoritar mensagem ${favoritoEnsinar.titulo}` }
        };

        res.send(resposta);
        return;
    }
});

/**
 * @swagger
 * /favoritos/mensagem/{id}:
 *   delete:
 *     summary: Remove mensagem favoritada por ID
 *     tags: [Favoritos - Ensinar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da mensagem
 *     responses:
 *       204:
 *         description: Mensagem removida com sucesso
 *       500:
 *         description: Erro interno
 */
rotasFavoritosEnsinar.delete('/mensagem/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const encontrado = await deletaFavoritosEnsinarPorID(id);

        res.statusCode = 204;
        res.send();
        return;

    } catch (erro) {
        console.log('Falha ao deletar mensagem favoritada', erro);
        res.statusCode = 500;
        res.send({
            erro: { mensagem: `Falha ao remover mensagem com ID ${id}` }
        });
        return;
    }
});

/**
 * @swagger
 * /favoritos/mensagem/{id}:
 *   get:
 *     summary: Consulta mensagem favoritada por ID
 *     tags: [Favoritos - Ensinar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da mensagem
 *     responses:
 *       200:
 *         description: Mensagem encontrada
 *       404:
 *         description: Mensagem não encontrada
 *       500:
 *         description: Erro interno
 */
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
        console.log('Falha ao buscar mensagem favoritada por ID', erro);
        res.statusCode = 500;
        resposta = {
            erro: { mensagem: `Falha ao buscar mensagem favoritada com ID ${id}` }
        };
        res.send(resposta);
        return;
    }
});

/**
 * @swagger
 * /favoritos/mensagem:
 *   get:
 *     summary: Lista todas as mensagens favoritadas
 *     tags: [Favoritos - Ensinar]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *       500:
 *         description: Erro interno
 */
rotasFavoritosEnsinar.get('/mensagem', async (req, res) => {
    let resposta;

    try {
        resposta = await consultarFavoritosEnsinar();

        res.statusCode = 200;
        res.send(resposta);
        return;

    } catch (erro) {
        console.log('Falha ao buscar mensagens favoritadas', erro);
        res.statusCode = 500;
        resposta = {
            erro: { mensagem: `Falha ao buscar mensagens favoritadas` }
        };
        res.send(resposta);
        return;
    }
});
