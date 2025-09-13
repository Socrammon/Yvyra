import express from 'express';

import { chamarGroq } from '../services/iaService.js';

import { converterJson } from '../utils/jsonConverter.js';

const perguntarSimples = express.Router();

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