import { DataTypes } from 'sequelize';

import { sequelize } from '../config/config.js';

export const FavoritoSimulacao = sequelize.define('favoritoSimulacao', {
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
    codigo: {
        type: DataTypes.TEXT('long'),
        allowNull: false
    }
});

export async function registrarFavoritosSimulacao({ titulo, codigo }) {
    try {

        const resultado = await FavoritoSimulacao.create({ titulo, codigo });

        console.log(`\nSimulação '${resultado.titulo}' favoritada com sucesso.`);
        return resultado;

    } catch (erro) {
        console.error('\nErro ao favoritar simulação:', erro);
        throw erro;
    }
}

export async function consultarFavoritosSimulacao() {
    try {
        const resultado = await FavoritoSimulacao.findAll();
        console.log(`\nSimulações favoritadas consultadas com sucesso`, resultado);
        return resultado;
    } catch (erro) {
        console.log('\nErro ao consultar simulações favoritadas!', erro);
        throw erro;
    }
}

export async function consultarFavoritosSimulacaoPorID(id) {
    try {
        const resultado = await FavoritoSimulacao.findByPk(id);
        console.log('\nSimulação favoritada consultada com sucesso!\n', resultado);
        return resultado;
    } catch (erro) {
        console.log('\nFalha ao consultar simulação favoritada!', erro);
        throw erro;
    }
}

export async function deletaFavoritosSimulacaoPorID(id) {
    try {
        const resultado = await FavoritoSimulacao.destroy({ where: { id: id } });
        console.log(`\nSimulação favoritada deletada com sucesso`, resultado);
    } catch (erro) {
        console.log('\nErro ao tentar deletar simulação favoritada!', erro);
        throw erro;
    }
}