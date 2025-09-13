import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const UPLOADS_DIR = path.join(__dirname, '..', '../uploads');

if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

export const GeraImagemPDFTex = async (codigoCircuito, nomeBase = 'circuito') => {

    const caminhoTex = path.join(UPLOADS_DIR, `${nomeBase}.tex`);
    const caminhoPdf = path.join(UPLOADS_DIR, `${nomeBase}.pdf`);
    const caminhoPng = path.join(UPLOADS_DIR, `${nomeBase}.png`);

    fs.writeFileSync(caminhoTex, codigoCircuito);

    try {

        await execAsync(`pdflatex -interaction=nonstopmode -output-directory "${UPLOADS_DIR}" "${caminhoTex}"`);
        console.log('\nPDF gerado com sucesso em:', caminhoPdf);

        await execAsync(`magick -density 300 "${caminhoPdf}" "${caminhoPng}"`);
        console.log('\nPNG gerado com sucesso em:', caminhoPng);

        return { pdf: caminhoPdf, png: caminhoPng };

    } catch (erro) {
        console.error('\nErro ao gerar PDF/PNG:', erro);
        throw erro;
    }
}
