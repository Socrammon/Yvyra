import express from 'express';
import { chamarGPT } from '../services/iaService.js';
import { GeraImagemPDFTex } from '../services/geraImagem.js';

const perguntarImagem = express.Router();

/**
 * @swagger
 * /perguntar/imagem:
 *   post:
 *     summary: Envia uma pergunta para a IA gerar a especificações do sistema para virar imagem
 *     tags: [Perguntar - Imagem]
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
 *                 example: "Eu quero um circuito de led e bateria."
 *     responses:
 *       200:
 *         description: Resposta da IA gerada e imagem criada com sucesso
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
perguntarImagem.post('/', async (req, res) => {

  res.statusCode = 400;

  const { pergunta } = req.body;

  if (!pergunta) {
    return res.send({ error: "Campo 'pergunta' é obrigatório." });
  }

  if (pergunta.trim().split(/\s+/).length > 50) {
    return res.send({ error: "Sua pergunta é muito longa." });
  }

  try {
    const resposta = await chamarGPT("imagem:" + pergunta);

    if (!resposta) {
      console.log("\nSem resposta!");
      res.statusCode = 404;
      return;
    }

    await GeraImagemPDFTex(resposta); // Gera imagem a partir da resposta

    console.log("\nPergunta Imagem");

    res.statusCode = 200;
    res.send({ resposta });

  } catch (erro) {
    console.error(erro);
    res.status(500).json({ error: "Erro ao processar a pergunta." });
  }
});

export default perguntarImagem;
