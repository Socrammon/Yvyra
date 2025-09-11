export function detectarTipoPergunta(pergunta) {
    const palavrasChaveTecnicas = [
        'código', 'api', 'json', 'javascript', 'python', 'variável', 'função',
        'loop', 'array', 'objeto', 'classe', 'erro', 'terminal', 'framework',
        'npm', 'backend', 'frontend', 'sql', 'banco de dados', 'node', 'express'
    ];

    const perguntaLower = pergunta.toLowerCase();

    const encontrouPalavraTecnica = palavrasChaveTecnicas.some(palavra =>
        perguntaLower.includes(palavra)
    );

    return encontrouPalavraTecnica ? 'tecnica' : 'simples';
}
