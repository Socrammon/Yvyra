import express from 'express';

import { chamarGPT } from '../services/iaService.js';

const perguntarEnsinar = express.Router();

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

    resposta = await chamarGPT("ensinar:" + pergunta);

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