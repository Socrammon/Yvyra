export function converterJson(conteudo) {
    if (conteudo?.choices?.length > 0) {
        return conteudo.choices[0].message.content.trim();
    } else {
        throw new Error("\nConteudo invalido!");
    }
}