import { DataTypes } from 'sequelize';

import { sequelize } from '../config/config.js';

export const FavoritoEnsinar = sequelize.define('favoritoEnsinar', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    texto: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export async function registrarFavoritosEnsinar({ titulo, texto }) {
    try {

        const resultado = await FavoritoEnsinar.create({ titulo, texto });

        console.log(`\nMensagem '${resultado.titulo}' favoritada com sucesso.`);
        return resultado;

    } catch (erro) {
        console.error('\nErro ao favoritar mensagem:', erro);
        throw erro;
    }
}

export async function consultarFavoritosEnsinar() {
    try {
        const resultado = await FavoritoEnsinar.findAll();
        console.log(`\nMensagens favoritadas consultadas com sucesso`, resultado);
        return resultado;
    } catch (erro) {
        console.log('\nErro ao consultar mensagens favoritadas!', erro);
        throw erro;
    }
}

export async function consultarFavoritosEnsinarPorID(id) {
    try {
        const resultado = await FavoritoEnsinar.findByPk(id);
        console.log('\nMensagem favoritada consultada com sucesso!\n', resultado);
        return resultado;
    } catch (erro) {
        console.log('\nFalha ao consultar mensagem favoritada!', erro);
        throw erro;
    }
}

export async function deletaFavoritosEnsinarPorID(id) {
    try {
        const resultado = await FavoritoEnsinar.destroy({ where: { id: id } });
        console.log(`\nMensagem favoritada deletado com sucesso`, resultado);
    } catch (erro) {
        console.log('\nErro ao tentar deletar mensagem favoritada!', erro);
        throw erro;
    }
}