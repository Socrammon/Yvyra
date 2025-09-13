import express from 'express';
import { chamarGPT } from '../services/iaService.js';

const perguntarEnsinar = express.Router();

/**
 * @swagger
 * /perguntar/ensinar:
 *   post:
 *     summary: Envia uma pergunta para o modo "ensinar" da IA
 *     tags: [Perguntar - Ensinar]
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
 *                 example: "Explique como funciona a ohm, volt e ampare."
 *     responses:
 *       200:
 *         description: Resposta gerada com sucesso pela IA
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
perguntarEnsinar.post('/', async (req, res) => {
  res.statusCode = 400;

  const { pergunta } = req.body;

  if (!pergunta) {
    return res.send({ error: "Campo 'pergunta' é obrigatório." });
  }

  if (pergunta.trim().split(/\s+/).length > 50) {
    return res.send({ error: "Sua pergunta é muito longa." });
  }

  try {
    const resposta = await chamarGPT("ensinar:" + pergunta);

    if (!resposta) {
      console.log("\nSem resposta!");
      res.statusCode = 404;
      return;
    }

    console.log("\nPergunta Ensinar");

    res.statusCode = 200;
    res.send({ resposta });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro ao processar a pergunta." });
  }
});

export default perguntarEnsinar;
