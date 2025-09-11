import express from 'express';

import { chamarGroq, chamarGPT } from '../services/iaService.js';

import { converterRespostaIA } from '../services/jsonConverter.js';

import { salvarJson } from '../services/jsonSalvar.js';

import { uploadJson } from '../services/uploadSupabase.js';

import { detectarTipoPergunta } from '../utils/detectorTipoPergunta.js';

const perguntar = express.Router();

perguntar.post('/', async (req, res) => {

    const { pergunta } = req.body;

    if (!pergunta) {
        return res.status(400).json({ error: "Campo 'mensagem' é obrigatório." });
    }
    if (pergunta.trim().split(/\s+/).length > 50) {
        return res.status(400).json({ error: "Sua mensagem é muito longa." });
    }

    try {

        const tipo = detectarTipoPergunta(pergunta);

        let resposta;

        //if (tipo === 'tecnica') {

            resposta = await chamarGPT(pergunta);
            const respostaJSONstring = JSON.stringify(resposta, null, 2);

            console.log("\nPergunta Técnica");

            const url = await uploadJson('circuito.json', respostaJSONstring);

            salvarJson(respostaJSONstring);

            console.log("\nArquivo JSON disponível em:", url);

        //} else {

            //const respostaIA = await chamarGroq(pergunta);
            //resposta = converterRespostaIA(respostaIA);
            //console.log("\nPergunta Simples");

        //}

        res.json({ resposta });

    } catch (erro) {
        console.error(erro);
        res.status(500).json({ error: "Erro ao processar a mensagem." });
    }

});

export default perguntar;