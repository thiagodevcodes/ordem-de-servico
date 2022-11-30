const Ordens = require("../../models/Ordens");

class Ordem {
    constructor(nome, cpf, telefone, valor, local, data, descricao, ativo=true) {
        this.nome = nome,
        this.cpf = cpf,
        this.telefone = telefone,
        this.valor = valor,
        this.local = local,
        this.data = data,
        this.descricao = descricao,
        this.ativo = ativo
    }

    async cadastrarOrdem(aluno) {
        await Ordens.create(aluno);
    }

    async atualizarOrdem(aluno, id) {
        await Ordens.update(aluno, {
            where: {
                id: id
            }
        })
    }

    async mostrarOrdens() {
        return await Ordens.findAll({
            where: {
                ativo: true
            }
        }, {
            order: [["id", "DESC"]]
        })  
    }

    async mostrarOrdem(id) {
        const student = await Ordens.findOne({
            where: {
                id: id
            }
        })

        return student;
    }

    async deleteOrdem(id) {
        await Ordens.destroy({
            where: {
                id: id
            }
        })
    }
}

module.exports = Ordem;