const db = require("./db");

const Ordens = db.sequelize.define("ordens", {  
    nome: {
        type: db.Sequelize.STRING
    },

    cpf: {
        type: db.Sequelize.STRING
    },

    telefone: {
        type: db.Sequelize.STRING
    },

    valor: {
        type: db.Sequelize.FLOAT
    },

    local: {
        type: db.Sequelize.STRING
    },

    data: {
        type: db.Sequelize.DATEONLY
    },

    descricao: {
        type: db.Sequelize.STRING
    },

    ativo: {
        type: db.Sequelize.BOOLEAN
    }
});

//Ordens.sync({force: true});

module.exports = Ordens;