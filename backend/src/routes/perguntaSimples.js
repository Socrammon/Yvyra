import express from 'express';

import { chamarGroq } from '../services/iaService.js';
import { converterRespostaIA } from '../services/jsonConverter.js';

const perguntaSimples = express.Router();

perguntaSimples.post('/', async (req, res) => {

    const { pergunta } = req.body;

    if (!pergunta) {
        return res.status(400).json({ error: "Campo 'pergunta' é obrigatório." });
    }

    try {
        const respostaIA = await chamarGroq(pergunta);
        const respostaFinal = converterRespostaIA(respostaIA);

        res.json({ resposta: respostaFinal });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ error: "Erro ao processar a pergunta." });
    }

});

export default perguntaSimples;
