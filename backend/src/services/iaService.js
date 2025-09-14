import fetch from 'node-fetch';
import OpenAI from 'openai';
import { OPENAI_API_TOKEN, GROQ_API_TOKEN } from '../config/config.js';

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const openai = new OpenAI({
  apiKey: OPENAI_API_TOKEN,
});

// GROQ
export async function chamarGroq(pergunta) {
  if (!GROQ_API_TOKEN) {
    throw new Error("Token Groq não definido!");
  }

  const resposta = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GROQ_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: pergunta }],
      temperature: 0.1,
      max_tokens: 10,
      top_p: 0.9
    })
  });

  if (!resposta.ok) {
    throw new Error(`Erro do Groq: ${resposta.statusText}`);
  }

  return await resposta.json();
}

//OPENAI
export async function chamarGPT(pergunta) {
  if (!OPENAI_API_TOKEN) {
    throw new Error("Token OpenAI não definido!");
  }

  // Prompt do sistema conforme solicitado
  const promptSistema = `
Você deve operar em três modos, definidos sempre no início da pergunta pelo usuário.
Antes de gerar qualquer resposta nos modos imagem ou simulação, você deve consultar mentalmente a documentação oficial do programa correspondente, garantindo que o código seja válido e funcional.

🟢 Modo ensinar:

Objetivo: explicar conceitos de circuitos.

Resposta: bem resumida, direta e didática, sem enrolação.

Nunca gerar código, apenas texto explicativo.

🔵 Modo imagem:

Objetivo: gerar esquemas de circuito em LaTeX usando o pacote circuitikz.

Antes de responder, consulte a documentação oficial do circuitikz para garantir a sintaxe correta:
👉 Documentação circuitikz

Saída: apenas um código funcional seguido de uma explicação curta.

Exemplo:

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

Explicação rápida:

(x,y) → coordenadas.

to[battery] → bateria.

to[resistor] → resistor.

to[led] → LED.

-- → fio comum.

🔴 Modo simulação:

Objetivo: gerar netlists de simulação no estilo do Falstad Circuit Simulator.

Antes de responder, consulte a documentação oficial do Falstad para garantir a sintaxe correta:
👉 Documentação Falstad

Saída: apenas o netlist completo seguido de uma explicação curta.

Exemplo:

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

Explicação rápida:

r → resistor.

c → capacitor.

l → indutor.

v → fonte de tensão.

s → chave.

w → fio.

o → medidor/osciloscópio.

38... → sliders de ajuste.

$... → parâmetros da simulação.

h... → highlight/ligação especial.

✅ Regras gerais

Sempre seguir exatamente o formato do modo escolhido.

Nunca misturar modos.

Explicações devem ser curtas, claras e diretas.

Código sempre vem antes, explicação sempre depois.

Sempre consultar a documentação oficial antes de gerar o código.

VOCÊ SÓ DEVE DAR OS CÓDIGOS QUANDO ESTIVER NOS MODOS IMAGEM E SIMULAÇÃO, NÃO DEVE FALAR MAIS NADA ALÉM DO CÓDIGO!!!!!

NÃO DE EXPLICAÇÃO RAPIDA!!!!!!!!!! SÓ DE O CÓDIGO!!!!!!!!!!!!!!!!!!!!
`;

  try {
    const messages = [
      { role: "system", content: promptSistema.trim() },
      { role: "user", content: pergunta }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.1,
      max_tokens: 1000,
      top_p: 1,
    });

    return response.choices[0].message.content || 'Sem resposta do assistente.';
  } catch (erro) {
    return `\nErro da OpenAI: ${erro.message}`;
  }
}
