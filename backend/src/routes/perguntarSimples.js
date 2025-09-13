import express from 'express';

import { chamarGroq } from '../services/iaService.js';
import { converterJson } from '../utils/jsonConverter.js';

const perguntarSimples = express.Router();

/**
 * @swagger
 * /perguntar/simples:
 *   post:
 *     summary: Envia uma pergunta simples para a IA e recebe uma resposta convertida em JSON
 *     tags: [Perguntar - Simples]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pergunta
 *             properties:
 *               pergunta:
 *                 type: string
 *                 example: "Qual a capital da França?"
 *     responses:
 *       200:
 *         description: Resposta da IA processada e convertida em JSON
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resposta:
 *                   type: object
 *       400:
 *         description: Campo obrigatório ausente ou pergunta muito longa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Sem resposta da IA
 *       500:
 *         description: Erro interno ao processar a pergunta
 */
perguntarSimples.post('/', async (req, res) => {

  res.statusCode = 400;

  const { pergunta } = req.body;

  if (!pergunta) {
    return res.send({ error: "Campo 'pergunta' é obrigatório." });
  }

  if (pergunta.trim().split(/\s+/).length > 50) {
    return res.send({ error: "Sua pergunta é muito longa." });
  }

  try {
    const respostaIA = await chamarGroq(pergunta);

    const resposta = converterJson(respostaIA);

    if (!resposta) {
      console.log("\nSem resposta!");
      res.statusCode = 404;
      return;
    }

    console.log("\nPergunta Simples");

    res.statusCode = 200;
    res.send({ resposta });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro ao processar a pergunta." });
  }
});

export default perguntarSimples;
