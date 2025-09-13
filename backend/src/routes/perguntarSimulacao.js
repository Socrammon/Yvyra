import express from 'express';

import { chamarGPT } from '../services/iaService.js';

const perguntarSimulacao = express.Router();

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

    //resposta = await chamarGPT("simulação:" + pergunta);

    //teste falstad
    const resposta = `
      $ 1 0.000005 10.20027730826997 50 5 43 5e-11
      r 176 80 384 80 0 10
      s 384 80 448 80 0 1 false
      w 176 80 176 352 0
      c 384 352 176 352 4 0.000015 -9.86 -10 0
      l 384 80 384 352 0 1 0.03 0
      v 448 352 448 80 0 0 40 5 0 0 0.5
      r 384 352 448 352 0 100
      o 4 64 0 4099 20 0.05 0 2 4 3
      o 3 64 0 4099 20 0.05 1 2 3 3
      o 0 64 0 4099 0.625 0.05 2 2 0 3
      38 3 F1 0 0.000001 0.000101 -1 Capacitance
      38 4 F1 0 0.01 1.01 -1 Inductance
      38 0 F1 0 1 101 -1 Resistance
      h 1 4 3
    `;

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