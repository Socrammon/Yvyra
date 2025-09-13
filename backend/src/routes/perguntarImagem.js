import express from 'express';

import { chamarGPT } from '../services/iaService.js';

import { GeraImagemPDFTex } from '../services/geraImagem.js';

const perguntarImagem = express.Router();

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

    //resposta = await chamarGPT("imagem:" + pergunta);

    //teste img
    const resposta = `
      \\documentclass{standalone}
      \\usepackage{circuitikz}
      \\begin{document}
      \\begin{circuitikz}
        \\draw
          (0,0) to[battery] (0,2)
          to[resistor] (2,2)
          to[led] (2,0)
          -- (0,0);
      \\end{circuitikz}
      \\end{document}
    `;

    if (!resposta) {
      console.log("\nSem resposta!");
      res.statusCode = 404;
      return;
    }

    await GeraImagemPDFTex(resposta);

    console.log("\nPergunta Imagem");
    
    res.statusCode = 200;

    res.send({ resposta });

  } catch (erro) {

    console.error(erro);
    res.status(500).json({ error: "Erro ao processar a pergunta." });

  }

});

export default perguntarImagem;