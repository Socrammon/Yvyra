import express from 'express';

import { chamarGPT } from '../services/iaService.js';

const perguntarSimulacao = express.Router();

/**
 * @swagger
 * /perguntar/simulacao:
 *   post:
 *     summary: Envia uma pergunta para simulação à IA e recebe uma resposta
 *     tags: [Perguntar - Simulação]
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
 *                 example: "Quero um sistema de leds e resistores ligados a bateria."
 *     responses:
 *       200:
 *         description: Resposta da IA para a simulação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 resposta:
 *                   type: string
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
perguntarSimulacao.post('/', async (req, res) => {

  res.statusCode = 400;

  const { pergunta } = req.body;

  if (!pergunta) {
    return res.send({ error: "Campo 'pergunta' é obrigatório." });
  }

  if (pergunta.trim().split(/\s+/).length > 50) {
    return res.send({ error: "Sua pergunta é muito longa." });
  }

  try {
    const resposta = await chamarGPT("simulação:" + pergunta);

    if (!resposta) {
      console.log("\nSem resposta!");
      res.statusCode = 404;
      return;
    }

    console.log("\nPergunta Simulação");

    res.statusCode = 200;
    res.send({ resposta });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro ao processar a pergunta." });
  }

});

export default perguntarSimulacao;
