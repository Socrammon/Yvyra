import { sequelize } from './config.js';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function verificaBanco() {
    const dbPath = path.resolve(__dirname, '../../db/favoritos.db');

    const pasta = path.dirname(dbPath);
    if (!fs.existsSync(pasta)) {
        fs.mkdirSync(pasta, { recursive: true });
    }

    if (!fs.existsSync(dbPath)) {
        console.log('\nBanco não existe. Criando...');
    } else {
        console.log('\nBanco já existe.');
    }

    const dp = new sqlite3.Database(dbPath, (erro) => {
        if (erro) {
            console.log('\nHouve uma falha ao iniciar o banco de dados!');
            return;
        }
        console.log('\nBanco de dados inicializado!');
    });

    await sequelize.sync(); // Só sincronize se quiser criar as tabelas
}

export async function testarConexao() {
    try {
        await sequelize.authenticate();
        console.log('\nConectado ao Sqlite3 com sucesso!');
    } catch (erro) {
        console.error('\nErro ao conectar ao Sqlite3:', erro);
        throw erro;
    }
}

export async function inicializarBanco() {
    await verificaBanco();
    await testarConexao();
}
