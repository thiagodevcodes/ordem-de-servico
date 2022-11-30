const Users = require("../../models/Users");

class Usuario {
    constructor(login, senha, salt, admin, ativo) {
        this.login = login,
        this.senha = senha,
        this.salt = salt,
        this.admin = admin,
        this.ativo = ativo
    }

    async cadastrarUsuario(user) {
        if(user.admin == null) { user.admin = false }

        await Users.create(user)
    }

    async atualizarUsuario(usuario, id) {
        await Users.update(usuario, {
            where: {
                id: id
            }
        })
    }

    async alterarSenha(login, senha, confirm) {
        let alter = false;
        
        if(senha == confirm) {
            Users.update({
                senha: senha
            }, { where: {
                login: login
            }})

            alter = true
        } 

        return alter
    }

    async deleteUsuario(id) {
        await Users.destroy({
            where: {
                id: id
            }
        })
    }

    async mostrarUsuarios() {
        const users = await Users.findAll({
            where: {
                ativo: true
            }
        }, {
            order: [["id", "DESC"]]
        })  
        
        return users
    }

    async mostrarUsuario(id) {
        const user = await Users.findOne({
            where: {
                id: id
            }
        })

        return user;
    }
}

module.exports = Usuario;