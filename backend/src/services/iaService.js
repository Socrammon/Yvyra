import fetch from 'node-fetch'; //Traz o fetch para fazer requisições HTTP

//Processo de pergunta simples - Groq
import { GROQ_API_TOKEN as token } from '../config/config.js';
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function chamarGroq(pergunta) {

    if (!token) {
        throw new Error("\nToken obrigatório não definido!");
    }

    const payload = {
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: pergunta }],
        temperature: 0.1,
        max_tokens: 100,
        top_p: 0.9
    };

    const resposta = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
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
