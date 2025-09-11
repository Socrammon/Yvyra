export function converterRespostaIA(respostaIA) {
    if (respostaIA?.choices?.length > 0) {
        return respostaIA.choices[0].message.content.trim();
    } else {
        throw new Error("\nResposta inválida do Groq!");
    }
}