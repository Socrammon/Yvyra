import fetch from 'node-fetch'; //Traz o fetch para fazer requisições HTTP

import OpenAI from "openai";

import { OPENAI_API_TOKEN, GROQ_API_TOKEN } from '../config/config.js';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const openai = new OpenAI({
    apiKey: OPENAI_API_TOKEN,
});

//Processo de pergunta simples - Groq
export async function chamarGroq(pergunta) {

    if (!GROQ_API_TOKEN) {
        throw new Error("\nToken Groq não definido!");
    }

    const payload = {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: pergunta }],
        temperature: 0.1,
        max_tokens: 10,
        top_p: 0.9
    };

    const resposta = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${GROQ_API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    if (!resposta.ok) {
        throw new Error(`\nErro do Groq: \n${resposta.statusText}`);
    }

    return await resposta.json();

}

//Processo de pergunta técnica - Openai
export async function chamarGPT(pergunta) {

    if (!OPENAI_API_TOKEN) {
        throw new Error("\nToken Openai não definido!");
    }

    try {

        const resposta = await openai.responses.create({
            model: "gpt-5-nano",
            input: pergunta,
            store: true,
        });

        return resposta.output_text;

    } catch (erro) {
        throw new Error(`Erro da OpenAI: ${erro.message}`);
    }

}
