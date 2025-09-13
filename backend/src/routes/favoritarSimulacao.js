import express from 'express';
import { registrarFavoritosSimulacao, consultarFavoritosSimulacao, consultarFavoritosSimulacaoPorID, deletaFavoritosSimulacaoPorID } from '../models/favoritosSimulacao.js'

export const rotasFavoritosSimulacao = express.Router();

/**
 * @swagger
 * /favoritos/simulacao:
 *   post:
 *     summary: Adiciona uma simulação aos favoritos
 *     tags: [Favoritos - Simulação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - codigo
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Simulação de Circuito Elétrico"
 *               codigo:
 *                 type: string
 *                 example: "<script>console.log('Simulação')</script>"
 *     responses:
 *       201:
 *         description: Simulação favoritada com sucesso
 *       400:
 *         description: Campos obrigatórios ausentes
 *       500:
 *         description: Erro interno
 */
rotasFavoritosSimulacao.post('/simulacao', async (req, res) => {
  const favoritoSimulacao = req.body;
  res.statusCode = 400;

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

    res.statusCode = 201;
    res.send({
      mensagem: `Simulação ${favoritoSimulacao.titulo} favoritada com sucesso`,
      titulo: favoritoSimulacao.titulo,
      codigo: favoritoSimulacao.codigo
    });

  } catch (erro) {
    console.log('Falha ao favoritar simulação', erro);
    res.statusCode = 500;
    res.send({
      erro: { mensagem: `Falha ao favoritar simulação ${favoritoSimulacao.titulo}` }
    });
    return;
  }
});

/**
 * @swagger
 * /favoritos/simulacao/{id}:
 *   delete:
 *     summary: Remove simulação favoritada por ID
 *     tags: [Favoritos - Simulação]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da simulação
 *     responses:
 *       204:
 *         description: Simulação removida com sucesso
 *       500:
 *         description: Erro interno
 */
rotasFavoritosSimulacao.delete('/simulacao/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const encontrado = await deletaFavoritosSimulacaoPorID(id);

    res.statusCode = 204;
    res.send();
    return;

  } catch (erro) {
    console.log('Falha ao deletar simulação favoritada', erro);
    res.statusCode = 500;
    res.send({
      erro: { mensagem: `Falha ao remover simulação com ID ${id}` }
    });
    return;
  }
});

/**
 * @swagger
 * /favoritos/simulacao/{id}:
 *   get:
 *     summary: Consulta simulação favoritada por ID
 *     tags: [Favoritos - Simulação]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da simulação
 *     responses:
 *       200:
 *         description: Simulação encontrada
 *       404:
 *         description: Simulação não encontrada
 *       500:
 *         description: Erro interno
 */
rotasFavoritosSimulacao.get('/simulacao/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const resposta = await consultarFavoritosSimulacaoPorID(id);

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
    console.log('Falha ao buscar simulação favoritada por ID', erro);
    res.statusCode = 500;
    res.send({
      erro: { mensagem: `Falha ao buscar simulação favoritada com ID ${id}` }
    });
    return;
  }
});

/**
 * @swagger
 * /favoritos/simulacao:
 *   get:
 *     summary: Lista todas as simulações favoritadas
 *     tags: [Favoritos - Simulação]
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *       500:
 *         description: Erro interno
 */
rotasFavoritosSimulacao.get('/simulacao', async (req, res) => {
  try {
    const resposta = await consultarFavoritosSimulacao();

    res.statusCode = 200;
    res.send(resposta);
    return;

  } catch (erro) {
    console.log('Falha ao buscar simulações favoritadas', erro);
    res.statusCode = 500;
    res.send({
      erro: { mensagem: `Falha ao buscar simulações favoritadas` }
    });
    return;
  }
});