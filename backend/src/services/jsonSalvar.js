import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const salvarJson = (conteudoJson, nomeArquivo = 'circuito.json') => {
  const pastaUploads = path.join(__dirname, '..', '../uploads');

  if (!fs.existsSync(pastaUploads)) {
    fs.mkdirSync(pastaUploads, { recursive: true });
  }

  const caminho = path.join(pastaUploads, nomeArquivo);

  fs.writeFile(caminho, conteudoJson, (err) => {
    if (err) {
      console.error('\nErro ao salvar JSON:', err);
    } else {
      console.log('\nJSON salvo com sucesso em:', caminho);
    }
  });
};
