import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';

// Conexão com o MySQL
export const sequelize = new Sequelize('Favoritos', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Remove logs do Sequelize
});

export const favoritosJSON = sequelize.define('favoritoJSON', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    json: {
        type: DataTypes.JSON,
        allowNull: false
    },
    horario: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

export const favoritosCodigo = sequelize.define('favoritoCodigo', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    codigo: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    horario: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

export const favoritosImagem = sequelize.define('favoritoImagem', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    caminho: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    },
    horario: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

//Imagens
export async function registrarFavoritoImagem({ titulo, extensao = 'png' }) {
    try {

        const nomeArquivo = `${titulo.replace(/\s+/g, '_').toLowerCase()}.${extensao}`;
        const caminhoRelativo = path.join('uploads', nomeArquivo);

        const favorito = await favoritosImagem.create({
            titulo,
            caminho: caminhoRelativo,
            horario: new Date()
        });

        console.log(`\nImagem '${titulo}' favoritada com sucesso.`);
        return favorito;

    } catch (erro) {
        console.error('\nErro ao favoritar imagem:', erro);
        throw erro;
    }
}

export async function consultarFavoritoImagens() {
    try {
        const resultado = await favoritosImagem.findAll();
        console.log(`Imagens consultadas com sucesso`, resultado);
        return resultado;
    } catch (erro) {
        console.log('Erro ao consultar imagens!', erro);
        throw erro;
    }
}

export async function consultarFavoritoImagensPorTitulo(id) {
    try {
        const resultado = await Pedido.findByPk(id, { include: Produto });
        console.log('Pedido consultado com sucesso!', resultado);
        return resultado;
    } catch (erro) {
        console.log('Falha ao consultar pedido!', erro);
        throw erro;
    }
}

async function testarConexao() {
    try {
        await sequelize.authenticate();
        console.log('Conectado ao MySQL com sucesso!');
    } catch (erro) {
        console.error('Erro ao conectar ao MySQL:', erro);
    }
}

async function sincronizarTabelas() {
    try {
        await sequelize.sync({ alter: true }); // Usa alter para manter dados existentes
        console.log('Tabelas sincronizadas com sucesso!');
    } catch (erro) {
        console.error('Erro ao sincronizar tabelas:', erro);
    }
}

testarConexao();
sincronizarTabelas();