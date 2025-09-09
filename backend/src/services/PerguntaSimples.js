import fetch from 'node-fetch'; //Traz o fetch para fazer requisições HTTP

export async function responderPerguntaSimples(pergunta) {

    const token = process.env.HUGGINGFACE_API_TOKEN;

    if (!token) {
        console.error("\nToken da HuggingFace não encontrado!");
        throw new Error("Token obrigatório não definido!");
    }

    const API_URL = 'https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill';

    try {

        const resposta = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // Autenticação com o token
                'Content-Type': 'application/json', // Tipo do conteúdo enviado
            },
            body: JSON.stringify({
                inputs: pergunta
            })
        });

        if (!resposta.ok) {
            console.error("Erro na resposta da IA:", resposta.status, resposta.statusText);
            throw new Error(`Erro da IA: ${resposta.statusText}`);
        }

        const data = await resposta.json(); // Transforma a resposta em JSON

        return data; // Retorna a resposta da IA

    } catch (erro) {
        console.error("Erro ao se comunicar com a IA do HuggingFace:", erro.message);
        console.error(erro.stack);
        throw new Error("Erro ao buscar resposta da IA.");
    }

}