import { DataTypes } from 'sequelize';

import { sequelize } from '../config/config.js';

import path from 'path';

export const FavoritoImagem = sequelize.define('favoritoImagem', {
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
    caminho: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    }
});

export async function registrarFavoritoImagem({ titulo, extensao = 'png' }) {
    try {

        const nomeArquivo = `${titulo.replace(/\s+/g, '_').toLowerCase()}.${extensao}`;
        const caminhoRelativo = path.join('uploads', nomeArquivo);

        const favorito = await FavoritoImagem.create({
            titulo,
            caminho: caminhoRelativo
        });

        console.log(`\nImagem '${titulo}' favoritada com sucesso.`);
        return favorito;

    } catch (erro) {
        console.error('\nErro ao favoritar imagem:', erro);
        throw erro;
    }
}

export async function consultarFavoritosImagem() {
    try {
        const resultado = await FavoritoImagem.findAll();
        console.log(`\nImagens favoritadas consultadas com sucesso`, resultado);
        return resultado;
    } catch (erro) {
        console.log('\nErro ao consultar imagens favoritadas!', erro);
        throw erro;
    }
}

export async function consultarFavoritosImagemPorID(id) {
    try {
        const resultado = await FavoritoImagem.findByPk(id);
        console.log('\nImagem favoritada consultado com sucesso!\n', resultado);
        return resultado;
    } catch (erro) {
        console.log('\nFalha ao consultar imagem favoritada!', erro);
        throw erro;
    }
}

export async function deletaFavoritosImagemPorID(id) {
    try {
        const resultado = await FavoritoImagem.destroy({ where: { id: id } });
        console.log(`\nImagem favoritada deletada com sucesso`, resultado);
    } catch (erro) {
        console.log('\nErro ao tentar deletar imagem favoritada!', erro);
        throw erro;
    }
}