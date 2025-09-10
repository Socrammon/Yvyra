import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
    dialect: 'mysql',
    storage: './../db/favoritos.db'
});

sequelize.authenticate();

export const favoritosJSON = sequelize.define('JSON', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    json: {
        type: Sequelize.JSONB,
        allowNull: false,
        unique: true
    },
    horario: {
        type: Sequelize.DATATIME,
        allowNull: false
    }
});

export const favoritosCodigo = sequelize.define('Codigo', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    codigo: {
        type: Sequelize.JSONB,
        allowNull: false,
        unique: true
    },
    horario: {
        type: Sequelize.DATATIME,
        allowNull: false
    }
});

export const favoritosImagem = sequelize.define('Imagem', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    imagem: {
        type: Sequelize.MIME,
        allowNull: false,
        unique: true
    },
    horario: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});